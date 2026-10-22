import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import { findProduct, getStoredProducts, saveStoredProducts, type Product } from './products';
import {
  isSupabaseConfigured,
  getSupabase,
  fetchProductsSupabase,
  insertProductSupabase,
  updateProductSupabase,
  deleteProductSupabase,
  fetchOrdersSupabase,
  insertOrderSupabase,
  updateOrderStatusSupabase,
  deleteOrderSupabase,
} from './supabase';

export type CartItem = { productId: string; size: string; color: string; quantity: number };

export type DashboardOrderItem = {
  productId: string;
  name: string;
  price: number;
  image: string;
  size: string;
  color: string;
  quantity: number;
};

export type DashboardOrder = {
  id: string;
  items: DashboardOrderItem[];
  customer: {
    name: string;
    phone: string;
    wilaya: string;
    commune: string;
    address: string;
    notes?: string;
    [key: string]: string | undefined;
  };
  total: number;
  status: 'جديد' | 'تم التأكيد' | 'قيد التوصيل' | 'تم التسليم' | 'ملغي';
  createdAt: string;
};

export type Order = { id: string; items: CartItem[]; customer: Record<string, string>; total: number };

// No demo orders — start with an empty list
const defaultSampleOrders: DashboardOrder[] = [];

type Store = {
  // Cart
  cart: CartItem[];
  add: (p: Product, size: string, color: string, quantity: number) => boolean;
  update: (index: number, quantity: number) => void;
  remove: (index: number) => void;
  count: number;
  total: number;
  drawer: boolean;
  setDrawer: (v: boolean) => void;
  order: Order | null;
  placeOrder: (customer: Record<string, string>) => void;
  addDirectOrder: (item: { productId: string; size: string; color: string; quantity: number }, customer: Record<string, string>) => DashboardOrder;

  // Products
  products: Product[];
  addProduct: (product: Omit<Product, 'id' | 'slug' | 'createdAt'> & { id?: string; slug?: string }) => Product;
  updateProduct: (id: string, data: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  resetProducts: () => void;

  // Orders
  orders: DashboardOrder[];
  updateOrderStatus: (orderId: string, status: DashboardOrder['status']) => void;
  deleteOrder: (orderId: string) => void;
  resetOrders: () => void;

  // Supabase Backend Integration
  isSupabaseActive: boolean;
  supabaseLoading: boolean;
  refreshFromSupabase: () => Promise<void>;
};

const Context = createContext<Store | null>(null);

export function StoreProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [ready, setReady] = useState(false);
  const [drawer, setDrawer] = useState(false);
  const [order, setOrder] = useState<Order | null>(null);

  const [productsList, setProductsList] = useState<Product[]>([]);
  const [ordersList, setOrdersList] = useState<DashboardOrder[]>([]);
  const [isSupabaseActive, setIsSupabaseActive] = useState<boolean>(false);
  const [supabaseLoading, setSupabaseLoading] = useState<boolean>(false);

  const refreshFromSupabase = async () => {
    if (!isSupabaseConfigured()) return;
    setSupabaseLoading(true);
    try {
      const [spProds, spOrders] = await Promise.all([fetchProductsSupabase(), fetchOrdersSupabase()]);
      if (spProds && spProds.length > 0) {
        setProductsList(spProds);
        saveStoredProducts(spProds);
      }
      if (spOrders) {
        setOrdersList(spOrders);
        localStorage.setItem('roussi-orders', JSON.stringify(spOrders));
      }
    } catch (err) {
      console.warn('Refresh from Supabase error:', err);
    } finally {
      setSupabaseLoading(false);
    }
  };

  // Initialize
  useEffect(() => {
    try {
      // Products local initial
      const initialProds = getStoredProducts();
      setProductsList(initialProds);

      // Cart local initial
      const c = JSON.parse(sessionStorage.getItem('roussi-cart') || '[]');
      if (Array.isArray(c)) {
        setCart(
          c.filter(
            (i) =>
              findProduct(i.productId) &&
              typeof i.size === 'string' &&
              typeof i.color === 'string' &&
              Number.isInteger(i.quantity) &&
              i.quantity > 0
          )
        );
      }

      // Last Order (Session)
      const o = JSON.parse(sessionStorage.getItem('roussi-order') || 'null');
      if (o?.id && Array.isArray(o.items)) setOrder(o);

      // Orders for Dashboard local initial
      const savedOrders = localStorage.getItem('roussi-orders');
      if (savedOrders) {
        const parsed = JSON.parse(savedOrders);
        if (Array.isArray(parsed)) {
          setOrdersList(parsed);
        } else {
          setOrdersList([]);
          localStorage.setItem('roussi-orders', JSON.stringify([]));
        }
      } else {
        setOrdersList([]);
        localStorage.setItem('roussi-orders', JSON.stringify([]));
      }

      // Check and connect Supabase if credentials exist
      if (isSupabaseConfigured()) {
        setIsSupabaseActive(true);
        refreshFromSupabase();

        // Subscribe to Supabase Realtime changes
        const sb = getSupabase();
        if (sb) {
          sb.channel('public:orders')
            .on('postgres_changes', { event: '*', schema: 'public', table: 'orders' }, () => {
              fetchOrdersSupabase().then((latest) => {
                if (latest) {
                  setOrdersList(latest);
                  localStorage.setItem('roussi-orders', JSON.stringify(latest));
                }
              });
            })
            .on('postgres_changes', { event: '*', schema: 'public', table: 'products' }, () => {
              fetchProductsSupabase().then((latest) => {
                if (latest && latest.length > 0) {
                  setProductsList(latest);
                  saveStoredProducts(latest);
                }
              });
            })
            .subscribe();
        }
      }
    } catch {
      setOrdersList(defaultSampleOrders);
    }
    setReady(true);
  }, []);

  // Listen for Supabase config change events
  useEffect(() => {
    const handleConfigChange = () => {
      if (isSupabaseConfigured()) {
        setIsSupabaseActive(true);
        refreshFromSupabase();
      } else {
        setIsSupabaseActive(false);
      }
    };
    window.addEventListener('roussi-supabase-config-changed', handleConfigChange);
    return () => window.removeEventListener('roussi-supabase-config-changed', handleConfigChange);
  }, []);

  // Sync Products & Orders updates across tabs/windows
  useEffect(() => {
    const handleProductsUpdate = () => {
      setProductsList(getStoredProducts());
    };
    const handleOrdersUpdate = () => {
      try {
        const saved = localStorage.getItem('roussi-orders');
        if (saved) {
          const parsed = JSON.parse(saved);
          if (Array.isArray(parsed)) setOrdersList(parsed);
        }
      } catch (e) {
        console.error(e);
      }
    };

    window.addEventListener('roussi-products-updated', handleProductsUpdate);
    window.addEventListener('roussi-orders-updated', handleOrdersUpdate);
    window.addEventListener('storage', handleProductsUpdate);
    window.addEventListener('storage', handleOrdersUpdate);

    return () => {
      window.removeEventListener('roussi-products-updated', handleProductsUpdate);
      window.removeEventListener('roussi-orders-updated', handleOrdersUpdate);
      window.removeEventListener('storage', handleProductsUpdate);
      window.removeEventListener('storage', handleOrdersUpdate);
    };
  }, []);

  // Save Cart
  useEffect(() => {
    if (ready) sessionStorage.setItem('roussi-cart', JSON.stringify(cart));
  }, [cart, ready]);

  // Product Actions
  const addProduct = (newProdData: Omit<Product, 'id' | 'slug' | 'createdAt'> & { id?: string; slug?: string }) => {
    const id = newProdData.id || String(Date.now());
    const slug = newProdData.slug || `prod-${Date.now().toString().slice(-5)}`;
    const product: Product = {
      ...newProdData,
      id,
      slug,
      createdAt: new Date().toISOString().split('T')[0] || '2026-10-11',
    };
    const updated = [product, ...productsList];
    setProductsList(updated);
    saveStoredProducts(updated);

    if (isSupabaseConfigured()) {
      insertProductSupabase(product);
    }

    return product;
  };

  const updateProduct = (id: string, patch: Partial<Product>) => {
    const updated = productsList.map((p) => (p.id === id ? { ...p, ...patch } : p));
    setProductsList(updated);
    saveStoredProducts(updated);

    if (isSupabaseConfigured()) {
      updateProductSupabase(id, patch);
    }
  };

  const deleteProduct = (id: string) => {
    const updated = productsList.filter((p) => p.id !== id);
    setProductsList(updated);
    saveStoredProducts(updated);

    if (isSupabaseConfigured()) {
      deleteProductSupabase(id);
    }
  };

  const resetProducts = () => {
    setProductsList(defaultProducts);
    saveStoredProducts(defaultProducts);
  };

  // Orders Actions
  const updateOrderStatus = (orderId: string, status: DashboardOrder['status']) => {
    const updated = ordersList.map((o) => (o.id === orderId ? { ...o, status } : o));
    setOrdersList(updated);
    localStorage.setItem('roussi-orders', JSON.stringify(updated));
    window.dispatchEvent(new Event('roussi-orders-updated'));

    if (isSupabaseConfigured()) {
      updateOrderStatusSupabase(orderId, status);
    }
  };

  const deleteOrder = (orderId: string) => {
    const updated = ordersList.filter((o) => o.id !== orderId);
    setOrdersList(updated);
    localStorage.setItem('roussi-orders', JSON.stringify(updated));
    window.dispatchEvent(new Event('roussi-orders-updated'));

    if (isSupabaseConfigured()) {
      deleteOrderSupabase(orderId);
    }
  };

  const resetOrders = () => {
    setOrdersList(defaultSampleOrders);
    localStorage.setItem('roussi-orders', JSON.stringify(defaultSampleOrders));
    window.dispatchEvent(new Event('roussi-orders-updated'));
  };

  const total = cart.reduce((s, i) => s + (findProduct(i.productId)?.price || 0) * i.quantity, 0);

  const add = (p: Product, size: string, color: string, quantity: number) => {
    const existing = cart.find((i) => i.productId === p.id && i.size === size && i.color === color);
    const all = cart.filter((i) => i.productId === p.id).reduce((s, i) => s + i.quantity, 0);
    if (!p.sizes.includes(size) || !p.colors.some((c) => c.name === color) || quantity < 1 || all + quantity > p.stock)
      return false;
    setCart((v) =>
      existing ? v.map((i) => (i === existing ? { ...i, quantity: i.quantity + quantity } : i)) : [...v, { productId: p.id, size, color, quantity }]
    );
    return true;
  };

  const update = (index: number, quantity: number) => {
    const item = cart[index];
    if (!item) return;
    const p = findProduct(item.productId);
    const others = cart.filter((i, n) => n !== index && i.productId === item.productId).reduce((s, i) => s + i.quantity, 0);
    if (p && quantity > 0 && quantity + others <= p.stock) setCart((v) => v.map((i, n) => (n === index ? { ...i, quantity } : i)));
  };

  // Place Order from Checkout
  const placeOrder = (customer: Record<string, string>) => {
    const orderId = `RM-${Date.now().toString().slice(-6)}`;
    const snapshotItems: DashboardOrderItem[] = cart.map((item) => {
      const p = findProduct(item.productId);
      return {
        productId: item.productId,
        name: p?.name || 'منتج',
        price: p?.price || 0,
        image: p?.images[0] || '',
        size: item.size,
        color: item.color,
        quantity: item.quantity,
      };
    });

    const newDashboardOrder: DashboardOrder = {
      id: orderId,
      items: snapshotItems,
      customer: {
        name: customer['name'] || '',
        phone: customer['phone'] || '',
        wilaya: customer['wilaya'] || '',
        commune: customer['commune'] || '',
        address: customer['address'] || '',
        notes: customer['notes'] || '',
      },
      total,
      status: 'جديد',
      createdAt: new Date().toISOString(),
    };

    const updatedOrders = [newDashboardOrder, ...ordersList];
    setOrdersList(updatedOrders);
    localStorage.setItem('roussi-orders', JSON.stringify(updatedOrders));
    window.dispatchEvent(new Event('roussi-orders-updated'));

    if (isSupabaseConfigured()) {
      insertOrderSupabase(newDashboardOrder);
    }

    // Also update order for order-success route
    const nextSessionOrder: Order = { id: orderId, items: [...cart], customer, total };
    setOrder(nextSessionOrder);
    sessionStorage.setItem('roussi-order', JSON.stringify(nextSessionOrder));

    // Deduct stock
    cart.forEach((item) => {
      const prod = findProduct(item.productId);
      if (prod && prod.stock >= item.quantity) {
        updateProduct(prod.id, { stock: Math.max(0, prod.stock - item.quantity) });
      }
    });

    setCart([]);
  };

  // Add Direct Order from Single Product detail page
  const addDirectOrder = (
    item: { productId: string; size: string; color: string; quantity: number },
    customer: Record<string, string>
  ) => {
    const p = findProduct(item.productId);
    const orderId = `RM-${Date.now().toString().slice(-6)}`;
    const orderTotal = (p?.price || 0) * item.quantity;

    const newDashboardOrder: DashboardOrder = {
      id: orderId,
      items: [
        {
          productId: item.productId,
          name: p?.name || 'منتج',
          price: p?.price || 0,
          image: p?.images[0] || '',
          size: item.size,
          color: item.color,
          quantity: item.quantity,
        },
      ],
      customer: {
        name: customer['name'] || '',
        phone: customer['phone'] || '',
        wilaya: customer['wilaya'] || '',
        commune: customer['commune'] || '',
        address: customer['address'] || '',
        notes: customer['notes'] || '',
      },
      total: orderTotal,
      status: 'جديد',
      createdAt: new Date().toISOString(),
    };

    const updatedOrders = [newDashboardOrder, ...ordersList];
    setOrdersList(updatedOrders);
    localStorage.setItem('roussi-orders', JSON.stringify(updatedOrders));
    window.dispatchEvent(new Event('roussi-orders-updated'));

    if (isSupabaseConfigured()) {
      insertOrderSupabase(newDashboardOrder);
    }

    // Deduct stock
    if (p && p.stock >= item.quantity) {
      updateProduct(p.id, { stock: Math.max(0, p.stock - item.quantity) });
    }

    return newDashboardOrder;
  };

  return (
    <Context.Provider
      value={{
        cart,
        add,
        update,
        remove: (n) => setCart((v) => v.filter((_, i) => i !== n)),
        count: cart.reduce((s, i) => s + i.quantity, 0),
        total,
        drawer,
        setDrawer,
        order,
        placeOrder,
        addDirectOrder,

        products: productsList.length > 0 ? productsList : defaultProducts,
        addProduct,
        updateProduct,
        deleteProduct,
        resetProducts,

        orders: ordersList,
        updateOrderStatus,
        deleteOrder,
        resetOrders,

        isSupabaseActive,
        supabaseLoading,
        refreshFromSupabase,
      }}
    >
      {children}
    </Context.Provider>
  );
}

export function useStore() {
  const c = useContext(Context);
  if (!c) throw new Error('Store provider is missing');
  return c;
}
