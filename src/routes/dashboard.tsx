import { createFileRoute, Link } from '@tanstack/react-router';
import { useState, useMemo } from 'react';
import {
  LayoutDashboard,
  Package,
  ShoppingBag,
  Users,
  Settings,
  Plus,
  Search,
  Trash2,
  Edit,
  ExternalLink,
  TrendingUp,
  AlertCircle,
  CheckCircle2,
  Clock,
  Truck,
  Phone,
  MapPin,
  RotateCcw,
  DollarSign,
  Layers,
  Eye,
  Filter,
  X,
  Store,
  ChevronRight,
  Sparkles,
  Database,
  Copy,
  Check,
  Globe,
  Key,
  RefreshCw,
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import {
  categories,
  money,
  presetImages,
  type Product,
} from '@/lib/products';
import { useStore, type DashboardOrder } from '@/lib/store-context';
import {
  getSupabaseConfig,
  saveSupabaseConfig,
  clearSupabaseConfig,
  testSupabaseConnection,
} from '@/lib/supabase';

export const Route = createFileRoute('/dashboard')({
  component: DashboardPage,
});

type DashboardTab = 'overview' | 'products' | 'orders' | 'customers' | 'settings';

function DashboardPage() {
  const {
    products,
    addProduct,
    updateProduct,
    deleteProduct,
    resetProducts,
    orders,
    updateOrderStatus,
    deleteOrder,
    resetOrders,
    isSupabaseActive,
    supabaseLoading,
    refreshFromSupabase,
  } = useStore();

  const [sbConfig, setSbConfig] = useState(() => {
    const cfg = getSupabaseConfig();
    return {
      url: cfg.url || 'https://fcyrgsiatfdsmtfkbsde.supabase.co',
      anonKey: cfg.anonKey || 'sb_publishable_EU4bMmZP0OIYpMNV0ZizwA_gEV7OMFa',
    };
  });
  const [sbTesting, setSbTesting] = useState(false);
  const [sbTestResult, setSbTestResult] = useState<{ success: boolean; message: string } | null>(null);
  const [copiedSql, setCopiedSql] = useState(false);
  const [showSqlCode, setShowSqlCode] = useState(false);

  const [activeTab, setActiveTab] = useState<DashboardTab>('overview');
  const [productModalOpen, setProductModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  // Search & Filters for Products
  const [productSearch, setProductSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('الكل');

  // Search & Filters for Orders
  const [orderSearch, setOrderSearch] = useState('');
  const [selectedOrderStatus, setSelectedOrderStatus] = useState('الكل');

  // New/Edit Product Form State
  const [name, setName] = useState('');
  const [category, setCategory] = useState(categories[1] || 'هوديات');
  const [price, setPrice] = useState<number | ''>(4500);
  const [oldPrice, setOldPrice] = useState<number | ''>('');
  const [stock, setStock] = useState<number | ''>(20);
  const [selectedImage, setSelectedImage] = useState(presetImages[0]?.url || '');
  const [customImageUrl, setCustomImageUrl] = useState('');
  const [description, setDescription] = useState('');
  const [selectedSizes, setSelectedSizes] = useState<string[]>(['M', 'L', 'XL']);
  const [selectedColorName, setSelectedColorName] = useState('أسود');
  const [selectedColorToken, setSelectedColorToken] = useState('black');
  const [isNew, setIsNew] = useState(true);
  const [formSuccess, setFormSuccess] = useState('');

  // Overview Metrics
  const totalRevenue = useMemo(() => {
    return orders
      .filter((o) => o.status !== 'ملغي')
      .reduce((sum, o) => sum + o.total, 0);
  }, [orders]);

  const newOrdersCount = useMemo(() => {
    return orders.filter((o) => o.status === 'جديد').length;
  }, [orders]);

  const totalStockCount = useMemo(() => {
    return products.reduce((sum, p) => sum + p.stock, 0);
  }, [products]);

  const lowStockProducts = useMemo(() => {
    return products.filter((p) => p.stock < 5);
  }, [products]);

  // Filtered Products
  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const matchCat = selectedCategory === 'الكل' || p.category === selectedCategory;
      const matchSearch =
        p.name.toLowerCase().includes(productSearch.toLowerCase()) ||
        p.category.toLowerCase().includes(productSearch.toLowerCase());
      return matchCat && matchSearch;
    });
  }, [products, selectedCategory, productSearch]);

  // Filtered Orders
  const filteredOrders = useMemo(() => {
    return orders.filter((o) => {
      const matchStatus = selectedOrderStatus === 'الكل' || o.status === selectedOrderStatus;
      const matchQuery =
        o.id.toLowerCase().includes(orderSearch.toLowerCase()) ||
        o.customer.name.toLowerCase().includes(orderSearch.toLowerCase()) ||
        o.customer.phone.includes(orderSearch) ||
        o.customer.wilaya.toLowerCase().includes(orderSearch.toLowerCase());
      return matchStatus && matchQuery;
    });
  }, [orders, selectedOrderStatus, orderSearch]);

  // Unique Customers
  const customersList = useMemo(() => {
    const map = new Map<string, { name: string; phone: string; wilaya: string; ordersCount: number; totalSpent: number }>();
    orders.forEach((o) => {
      const phone = o.customer.phone;
      if (!map.has(phone)) {
        map.set(phone, {
          name: o.customer.name,
          phone: o.customer.phone,
          wilaya: o.customer.wilaya,
          ordersCount: 1,
          totalSpent: o.status !== 'ملغي' ? o.total : 0,
        });
      } else {
        const existing = map.get(phone)!;
        existing.ordersCount += 1;
        if (o.status !== 'ملغي') existing.totalSpent += o.total;
      }
    });
    return Array.from(map.values());
  }, [orders]);

  const openAddProductModal = () => {
    setEditingProduct(null);
    setName('');
    setCategory('هوديات');
    setPrice(4500);
    setOldPrice('');
    setStock(20);
    setSelectedImage(presetImages[0]?.url || '');
    setCustomImageUrl('');
    setDescription('قطعة ستريت وير بتصميم عصري وخامة قطنية ممتازة تناسب الإطلالة اليومية.');
    setSelectedSizes(['M', 'L', 'XL']);
    setSelectedColorName('أسود');
    setSelectedColorToken('black');
    setIsNew(true);
    setFormSuccess('');
    setProductModalOpen(true);
  };

  const openEditProductModal = (prod: Product) => {
    setEditingProduct(prod);
    setName(prod.name);
    setCategory(prod.category);
    setPrice(prod.price);
    setOldPrice(prod.oldPrice || '');
    setStock(prod.stock);
    setSelectedImage(prod.images[0] || '');
    setCustomImageUrl(prod.images[0]?.startsWith('http') ? prod.images[0] : '');
    setDescription(prod.description);
    setSelectedSizes(prod.sizes);
    setSelectedColorName(prod.colors[0]?.name || 'أسود');
    setSelectedColorToken(prod.colors[0]?.token || 'black');
    setIsNew(prod.isNew);
    setFormSuccess('');
    setProductModalOpen(true);
  };

  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    const imgToUse = customImageUrl.trim() ? customImageUrl.trim() : selectedImage;
    const finalPrice = Number(price) || 0;
    const finalOldPrice = oldPrice ? Number(oldPrice) : undefined;
    const finalStock = Number(stock) || 0;

    if (editingProduct) {
      updateProduct(editingProduct.id, {
        name,
        category,
        price: finalPrice,
        oldPrice: finalOldPrice,
        discount: finalOldPrice && finalOldPrice > finalPrice ? Math.round((1 - finalPrice / finalOldPrice) * 100) : 0,
        stock: finalStock,
        images: [imgToUse],
        sizes: selectedSizes,
        colors: [{ name: selectedColorName, token: selectedColorToken }],
        description,
        isNew,
        isPromo: Boolean(finalOldPrice && finalOldPrice > finalPrice),
      });
      setFormSuccess('تم تحديث بيانات المنتج بنجاح!');
    } else {
      addProduct({
        name,
        category,
        price: finalPrice,
        oldPrice: finalOldPrice,
        discount: finalOldPrice && finalOldPrice > finalPrice ? Math.round((1 - finalPrice / finalOldPrice) * 100) : 0,
        stock: finalStock,
        images: [imgToUse],
        gender: 'شباب',
        ageGroup: 'شباب',
        sizes: selectedSizes,
        colors: [{ name: selectedColorName, token: selectedColorToken }],
        description,
        isNew,
        isFeatured: true,
        isPromo: Boolean(finalOldPrice && finalOldPrice > finalPrice),
      });
      setFormSuccess('تمت إضافة المنتج بنجاح إلى المتجر والمخزون!');
    }

    setTimeout(() => {
      setProductModalOpen(false);
      setFormSuccess('');
    }, 1200);
  };

  const toggleSize = (s: string) => {
    setSelectedSizes((prev) => (prev.includes(s) ? prev.filter((item) => item !== s) : [...prev, s]));
  };

  return (
    <div className="min-h-screen bg-[#0d0f12] text-zinc-100 flex flex-col md:flex-row" dir="rtl">
      {/* ─── SIDEBAR ─── */}
      <aside className="w-full md:w-64 bg-[#13161c] border-b md:border-b-0 md:border-l border-zinc-800 flex flex-col shrink-0 select-none">
        {/* Brand Header */}
        <div className="p-6 border-b border-zinc-800/80 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
              <h1 className="text-xl font-black tracking-wider text-white">ROUSSI MODE</h1>
            </div>
            <p className="text-xs text-zinc-400 mt-1">لوحة التحكم وإدارة المتجر ⚡</p>
          </div>
          <Badge variant="outline" className={`text-[10px] ${isSupabaseActive ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30' : 'bg-zinc-800 text-zinc-400 border-zinc-700'}`}>
            {isSupabaseActive ? '🟢 سوبابيز سحابي' : '⚪ تخزين محلي'}
          </Badge>
        </div>

        {/* Navigation Links */}
        <nav className="p-4 space-y-1.5 flex-1">
          <button
            onClick={() => setActiveTab('overview')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
              activeTab === 'overview'
                ? 'bg-emerald-500 text-black font-semibold shadow-lg shadow-emerald-500/20'
                : 'text-zinc-400 hover:text-white hover:bg-zinc-800/60'
            }`}
          >
            <LayoutDashboard size={18} />
            <span>نظرة عامة والإحصائيات</span>
          </button>

          <button
            onClick={() => setActiveTab('products')}
            className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium transition-all ${
              activeTab === 'products'
                ? 'bg-emerald-500 text-black font-semibold shadow-lg shadow-emerald-500/20'
                : 'text-zinc-400 hover:text-white hover:bg-zinc-800/60'
            }`}
          >
            <div className="flex items-center gap-3">
              <Package size={18} />
              <span>إدارة المنتجات</span>
            </div>
            <span
              className={`text-xs px-2 py-0.5 rounded-full ${
                activeTab === 'products' ? 'bg-black/20 text-black' : 'bg-zinc-800 text-zinc-400'
              }`}
            >
              {products.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('orders')}
            className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium transition-all ${
              activeTab === 'orders'
                ? 'bg-emerald-500 text-black font-semibold shadow-lg shadow-emerald-500/20'
                : 'text-zinc-400 hover:text-white hover:bg-zinc-800/60'
            }`}
          >
            <div className="flex items-center gap-3">
              <ShoppingBag size={18} />
              <span>إدارة الطلبات</span>
            </div>
            {newOrdersCount > 0 && (
              <span className="text-xs px-2 py-0.5 rounded-full bg-amber-500 text-black font-bold animate-pulse">
                {newOrdersCount} جديد
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('customers')}
            className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium transition-all ${
              activeTab === 'customers'
                ? 'bg-emerald-500 text-black font-semibold shadow-lg shadow-emerald-500/20'
                : 'text-zinc-400 hover:text-white hover:bg-zinc-800/60'
            }`}
          >
            <div className="flex items-center gap-3">
              <Users size={18} />
              <span>الزبائن</span>
            </div>
            <span className="text-xs px-2 py-0.5 rounded-full bg-zinc-800 text-zinc-400">{customersList.length}</span>
          </button>

          <button
            onClick={() => setActiveTab('settings')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
              activeTab === 'settings'
                ? 'bg-emerald-500 text-black font-semibold shadow-lg shadow-emerald-500/20'
                : 'text-zinc-400 hover:text-white hover:bg-zinc-800/60'
            }`}
          >
            <Settings size={18} />
            <span>إعدادات المتجر</span>
          </button>
        </nav>

        {/* Bottom Store Link */}
        <div className="p-4 border-t border-zinc-800 space-y-2">
          <Link
            to="/"
            className="flex items-center justify-between w-full px-4 py-2.5 rounded-xl text-sm font-medium text-zinc-300 hover:text-white bg-zinc-800/50 hover:bg-zinc-800 transition"
          >
            <div className="flex items-center gap-2">
              <Store size={16} className="text-emerald-400" />
              <span>زيارة المتجر الرئيسي</span>
            </div>
            <ExternalLink size={14} className="text-zinc-500" />
          </Link>
          <div className="text-[11px] text-zinc-500 text-center pt-2">
            Roussi Mode · الجزائر 🇩🇿
          </div>
        </div>
      </aside>

      {/* ─── MAIN CONTENT AREA ─── */}
      <main className="flex-1 p-4 md:p-8 overflow-y-auto">
        {/* Top Bar */}
        <header className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-8 border-b border-zinc-800/80 mb-8">
          <div>
            <div className="flex items-center gap-2 text-xs text-zinc-400 mb-1">
              <span>لوحة التحكم</span>
              <ChevronRight size={12} className="rotate-180" />
              <span className="text-emerald-400 font-medium">
                {activeTab === 'overview' && 'نظرة عامة والإحصائيات'}
                {activeTab === 'products' && 'إدارة المنتجات'}
                {activeTab === 'orders' && 'إدارة الطلبات'}
                {activeTab === 'customers' && 'قائمة الزبائن'}
                {activeTab === 'settings' && 'إعدادات المتجر'}
              </span>
            </div>
            <h2 className="text-2xl font-bold text-white tracking-tight">
              {activeTab === 'overview' && 'إحصائيات ونشاط المتجر'}
              {activeTab === 'products' && 'كتالوج المنتجات والمخزون'}
              {activeTab === 'orders' && 'الطلبات المستلمة من الزبائن'}
              {activeTab === 'customers' && 'سجل زبائن المتجر'}
              {activeTab === 'settings' && 'إعدادات لوحة التحكم'}
            </h2>
          </div>

          <div className="flex items-center gap-3">
            <Button
              onClick={openAddProductModal}
              className="bg-emerald-500 hover:bg-emerald-400 text-black font-semibold h-11 px-5 rounded-xl shadow-lg shadow-emerald-500/20 flex items-center gap-2"
            >
              <Plus size={18} />
              <span>إضافة منتج جديد</span>
            </Button>
            <Link to="/products" className="inline-flex">
              <Button variant="outline" className="border-zinc-700 bg-zinc-800/80 text-zinc-300 hover:text-white h-11 px-4 rounded-xl">
                <Eye size={16} className="me-2" />
                معاينة المتجر
              </Button>
            </Link>
          </div>
        </header>

        {/* ═════════════════════════════════════════════ */}
        {/* TAB 1: OVERVIEW & STATS                       */}
        {/* ═════════════════════════════════════════════ */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* Metric Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-[#14171f] border border-zinc-800/80 p-5 rounded-2xl relative overflow-hidden">
                <div className="flex items-center justify-between text-zinc-400 text-sm mb-3">
                  <span>إجمالي المبيعات المؤكدة</span>
                  <div className="w-9 h-9 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-400">
                    <DollarSign size={18} />
                  </div>
                </div>
                <div className="text-2xl font-black text-white">{money(totalRevenue)}</div>
                <div className="flex items-center gap-1.5 text-xs text-emerald-400 mt-2">
                  <TrendingUp size={14} />
                  <span>محسوبة من كافة الطلبات غير الملغاة</span>
                </div>
              </div>

              <div className="bg-[#14171f] border border-zinc-800/80 p-5 rounded-2xl relative overflow-hidden">
                <div className="flex items-center justify-between text-zinc-400 text-sm mb-3">
                  <span>عدد الطلبات الإجمالي</span>
                  <div className="w-9 h-9 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-400">
                    <ShoppingBag size={18} />
                  </div>
                </div>
                <div className="text-2xl font-black text-white">{orders.length} طلب</div>
                <div className="flex items-center gap-2 text-xs text-zinc-400 mt-2">
                  <span className="text-amber-400 font-semibold">{newOrdersCount} جديد بحاجة للمعالجة</span>
                </div>
              </div>

              <div className="bg-[#14171f] border border-zinc-800/80 p-5 rounded-2xl relative overflow-hidden">
                <div className="flex items-center justify-between text-zinc-400 text-sm mb-3">
                  <span>المنتجات في الكتالوج</span>
                  <div className="w-9 h-9 rounded-xl bg-purple-500/10 flex items-center justify-center text-purple-400">
                    <Layers size={18} />
                  </div>
                </div>
                <div className="text-2xl font-black text-white">{products.length} موديل</div>
                <div className="text-xs text-zinc-400 mt-2">
                  إجمالي القطع في المخزن: <b className="text-white">{totalStockCount}</b>
                </div>
              </div>

              <div className="bg-[#14171f] border border-zinc-800/80 p-5 rounded-2xl relative overflow-hidden">
                <div className="flex items-center justify-between text-zinc-400 text-sm mb-3">
                  <span>تنبيهات المخزون</span>
                  <div className="w-9 h-9 rounded-xl bg-rose-500/10 flex items-center justify-center text-rose-400">
                    <AlertCircle size={18} />
                  </div>
                </div>
                <div className="text-2xl font-black text-white">{lowStockProducts.length} منتجات</div>
                <div className="text-xs text-rose-400 mt-2">
                  قطع مخزونها أقل من 5 حبات
                </div>
              </div>
            </div>

            {/* Quick Actions & Recent Orders Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Recent Orders Card */}
              <div className="lg:col-span-2 bg-[#14171f] border border-zinc-800/80 rounded-2xl p-6">
                <div className="flex items-center justify-between mb-5">
                  <h3 className="text-lg font-bold text-white flex items-center gap-2">
                    <ShoppingBag size={18} className="text-emerald-400" />
                    <span>آخر الطلبات المستلمة</span>
                  </h3>
                  <button
                    onClick={() => setActiveTab('orders')}
                    className="text-xs text-emerald-400 hover:underline"
                  >
                    عرض جميع الطلبات ({orders.length}) ←
                  </button>
                </div>

                <div className="space-y-3">
                  {orders.slice(0, 4).map((order) => (
                    <div
                      key={order.id}
                      className="p-4 rounded-xl bg-zinc-900/60 border border-zinc-800/60 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3"
                    >
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-white">{order.id}</span>
                          <Badge
                            className={
                              order.status === 'جديد'
                                ? 'bg-amber-500/20 text-amber-300 border-amber-500/30'
                                : order.status === 'تم التسليم'
                                ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
                                : order.status === 'قيد التوصيل'
                                ? 'bg-blue-500/20 text-blue-300 border-blue-500/30'
                                : 'bg-zinc-800 text-zinc-300'
                            }
                          >
                            {order.status}
                          </Badge>
                        </div>
                        <div className="text-xs text-zinc-400 mt-1 flex items-center gap-2">
                          <span>👤 {order.customer.name}</span>
                          <span>·</span>
                          <span>📍 {order.customer.wilaya}</span>
                          <span>·</span>
                          <span>📞 {order.customer.phone}</span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between sm:justify-end w-full sm:w-auto gap-4">
                        <div className="text-right">
                          <div className="font-bold text-emerald-400">{money(order.total)}</div>
                          <div className="text-[11px] text-zinc-500">
                            {order.items.length} منتج ({order.items.map((i) => i.name).join(', ')})
                          </div>
                        </div>

                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setActiveTab('orders')}
                          className="h-8 text-xs text-zinc-300 hover:text-white hover:bg-zinc-800"
                        >
                          تفاصيل
                        </Button>
                      </div>
                    </div>
                  ))}

                  {orders.length === 0 && (
                    <div className="text-center py-8 text-zinc-500 text-sm">
                      لم يتم استلام أي طلبات بعد. ستظهر هنا بمجرد قيام الزبائن بالطلب.
                    </div>
                  )}
                </div>
              </div>

              {/* Store Health & Alerts */}
              <div className="bg-[#14171f] border border-zinc-800/80 rounded-2xl p-6 flex flex-col justify-between">
                <div>
                  <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                    <Sparkles size={18} className="text-amber-400" />
                    <span>مزامنة الموقع مع لوحة التحكم</span>
                  </h3>
                  <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 mb-4">
                    <div className="flex items-center gap-2 text-emerald-400 text-sm font-semibold mb-1">
                      <CheckCircle2 size={16} />
                      <span>المزامنة التلقائية مفعلة</span>
                    </div>
                    <p className="text-xs text-zinc-300 leading-relaxed">
                      أي منتج تضيفه أو تعدله هنا يظهر فوراً في المتجر الرئيسي! وأي طلب يسجله الزبون يظهر مباشرة في هذا الداشبورد.
                    </p>
                  </div>

                  <div className="space-y-3 mt-4">
                    <div className="text-xs font-semibold text-zinc-400">الروابط السريعة:</div>
                    <Link
                      to="/products"
                      className="block p-3 rounded-xl bg-zinc-900 border border-zinc-800 text-xs text-zinc-300 hover:text-white hover:border-zinc-700 transition"
                    >
                      👕 صفحة الكتالوج (/products)
                    </Link>
                    <Link
                      to="/checkout"
                      className="block p-3 rounded-xl bg-zinc-900 border border-zinc-800 text-xs text-zinc-300 hover:text-white hover:border-zinc-700 transition"
                    >
                      🛍️ صفحة الدفع والطلب (/checkout)
                    </Link>
                  </div>
                </div>

                <div className="pt-6 border-t border-zinc-800/60 mt-6">
                  <Button
                    onClick={openAddProductModal}
                    className="w-full bg-emerald-500 hover:bg-emerald-400 text-black font-semibold h-11"
                  >
                    + إضافة منتج جديد الآن
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ═════════════════════════════════════════════ */}
        {/* TAB 2: PRODUCTS MANAGEMENT                   */}
        {/* ═════════════════════════════════════════════ */}
        {activeTab === 'products' && (
          <div className="space-y-6">
            {/* Filter & Search Bar */}
            <div className="bg-[#14171f] border border-zinc-800/80 p-4 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex flex-1 items-center gap-3 w-full">
                <div className="relative flex-1">
                  <Search size={18} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-zinc-500" />
                  <Input
                    placeholder="ابحث عن اسم المنتج، الفئة..."
                    value={productSearch}
                    onChange={(e) => setProductSearch(e.target.value)}
                    className="pr-10 bg-zinc-900 border-zinc-800 h-11 text-sm text-white placeholder:text-zinc-500 focus-visible:ring-emerald-500"
                  />
                </div>

                <div className="shrink-0 flex items-center gap-2">
                  <Filter size={16} className="text-zinc-500" />
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="bg-zinc-900 border border-zinc-800 rounded-lg h-11 px-3 text-sm text-white focus:outline-none focus:ring-1 focus:ring-emerald-500"
                  >
                    {categories.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="flex items-center gap-2 w-full md:w-auto justify-end">
                <Button
                  onClick={openAddProductModal}
                  className="bg-emerald-500 hover:bg-emerald-400 text-black font-semibold h-11 px-6 rounded-xl flex items-center gap-2 w-full md:w-auto"
                >
                  <Plus size={18} />
                  <span>إضافة منتج</span>
                </Button>
              </div>
            </div>

            {/* Products Table */}
            <div className="bg-[#14171f] border border-zinc-800/80 rounded-2xl overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-right text-sm text-zinc-300">
                  <thead className="bg-[#0f1117] text-xs uppercase text-zinc-400 border-b border-zinc-800">
                    <tr>
                      <th className="py-4 px-6">المنتج</th>
                      <th className="py-4 px-6">التصنيف</th>
                      <th className="py-4 px-6">السعر</th>
                      <th className="py-4 px-6">المخزون المتوفر</th>
                      <th className="py-4 px-6">الحالة</th>
                      <th className="py-4 px-6 text-center">إجراءات</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-800/60">
                    {filteredProducts.map((p) => (
                      <tr key={p.id} className="hover:bg-zinc-800/30 transition">
                        {/* Product Info & Thumbnail */}
                        <td className="py-4 px-6">
                          <div className="flex items-center gap-3">
                            <img
                              src={p.images[0]}
                              alt={p.name}
                              className="w-12 h-14 object-cover rounded-lg border border-zinc-800 shrink-0 bg-zinc-900"
                            />
                            <div>
                              <div className="font-bold text-white text-base">{p.name}</div>
                              <div className="text-xs text-zinc-500 flex items-center gap-2 mt-0.5">
                                <span>المقاسات: {p.sizes.join(', ')}</span>
                                <span>·</span>
                                <span>اللون: {p.colors[0]?.name}</span>
                              </div>
                            </div>
                          </div>
                        </td>

                        {/* Category */}
                        <td className="py-4 px-6">
                          <Badge variant="outline" className="bg-zinc-800/60 border-zinc-700 text-zinc-300">
                            {p.category}
                          </Badge>
                        </td>

                        {/* Price */}
                        <td className="py-4 px-6">
                          <div className="font-bold text-emerald-400">{money(p.price)}</div>
                          {p.oldPrice && (
                            <del className="text-xs text-zinc-500 block">{money(p.oldPrice)}</del>
                          )}
                        </td>

                        {/* Stock Management */}
                        <td className="py-4 px-6">
                          <div className="flex items-center gap-2">
                            <span
                              className={`font-semibold ${
                                p.stock === 0
                                  ? 'text-rose-400'
                                  : p.stock < 5
                                  ? 'text-amber-400'
                                  : 'text-zinc-200'
                              }`}
                            >
                              {p.stock} قطعة
                            </span>
                            <div className="flex items-center gap-1">
                              <button
                                onClick={() => updateProduct(p.id, { stock: Math.max(0, p.stock - 1) })}
                                className="w-6 h-6 rounded bg-zinc-800 hover:bg-zinc-700 flex items-center justify-center text-xs text-zinc-400 hover:text-white"
                                title="تقليل المخزون"
                              >
                                -
                              </button>
                              <button
                                onClick={() => updateProduct(p.id, { stock: p.stock + 1 })}
                                className="w-6 h-6 rounded bg-zinc-800 hover:bg-zinc-700 flex items-center justify-center text-xs text-zinc-400 hover:text-white"
                                title="زيادة المخزون"
                              >
                                +
                              </button>
                            </div>
                          </div>
                        </td>

                        {/* Status Badges */}
                        <td className="py-4 px-6">
                          {p.stock === 0 ? (
                            <Badge className="bg-rose-500/20 text-rose-300 border-rose-500/30">نفد المخزون</Badge>
                          ) : p.isPromo ? (
                            <Badge className="bg-amber-500/20 text-amber-300 border-amber-500/30">تخفيض -{p.discount}%</Badge>
                          ) : p.isNew ? (
                            <Badge className="bg-emerald-500/20 text-emerald-300 border-emerald-500/30">جديد 🔥</Badge>
                          ) : (
                            <Badge className="bg-zinc-800 text-zinc-400">متوفر</Badge>
                          )}
                        </td>

                        {/* Actions */}
                        <td className="py-4 px-6 text-center">
                          <div className="flex items-center justify-center gap-2">
                            <Link
                              to="/product/$slug"
                              params={{ slug: p.slug }}
                              className="p-2 rounded-lg bg-zinc-800/80 hover:bg-zinc-700 text-zinc-400 hover:text-white transition"
                              title="معاينة في المتجر"
                            >
                              <ExternalLink size={15} />
                            </Link>

                            <button
                              onClick={() => openEditProductModal(p)}
                              className="p-2 rounded-lg bg-zinc-800/80 hover:bg-zinc-700 text-blue-400 hover:text-blue-300 transition"
                              title="تعديل المنتج"
                            >
                              <Edit size={15} />
                            </button>

                            <button
                              onClick={() => {
                                if (confirm(`هل أنت متأكد من حذف المنتج "${p.name}"؟`)) {
                                  deleteProduct(p.id);
                                }
                              }}
                              className="p-2 rounded-lg bg-zinc-800/80 hover:bg-zinc-700 text-rose-400 hover:text-rose-300 transition"
                              title="حذف المنتج"
                            >
                              <Trash2 size={15} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}

                    {filteredProducts.length === 0 && (
                      <tr>
                        <td colSpan={6} className="text-center py-12 text-zinc-500">
                          لا توجد منتجات مطابقة لعملية البحث.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ═════════════════════════════════════════════ */}
        {/* TAB 3: ORDERS MANAGEMENT                     */}
        {/* ═════════════════════════════════════════════ */}
        {activeTab === 'orders' && (
          <div className="space-y-6">
            {/* Filter & Search Bar */}
            <div className="bg-[#14171f] border border-zinc-800/80 p-4 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex flex-1 items-center gap-3 w-full">
                <div className="relative flex-1">
                  <Search size={18} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-zinc-500" />
                  <Input
                    placeholder="ابحث برقم الطلب، اسم الزبون، رقم الهاتف أو الولاية..."
                    value={orderSearch}
                    onChange={(e) => setOrderSearch(e.target.value)}
                    className="pr-10 bg-zinc-900 border-zinc-800 h-11 text-sm text-white placeholder:text-zinc-500 focus-visible:ring-emerald-500"
                  />
                </div>

                <div className="shrink-0 flex items-center gap-2">
                  <Filter size={16} className="text-zinc-500" />
                  <select
                    value={selectedOrderStatus}
                    onChange={(e) => setSelectedOrderStatus(e.target.value)}
                    className="bg-zinc-900 border border-zinc-800 rounded-lg h-11 px-3 text-sm text-white focus:outline-none focus:ring-1 focus:ring-emerald-500"
                  >
                    <option value="الكل">كل الحالات</option>
                    <option value="جديد">جديد</option>
                    <option value="تم التأكيد">تم التأكيد</option>
                    <option value="قيد التوصيل">قيد التوصيل</option>
                    <option value="تم التسليم">تم التسليم</option>
                    <option value="ملغي">ملغي</option>
                  </select>
                </div>
              </div>

              <div className="text-xs text-zinc-400">
                إجمالي الطلبات: <b className="text-white">{filteredOrders.length}</b>
              </div>
            </div>

            {/* Orders List Cards */}
            <div className="space-y-4">
              {filteredOrders.map((order) => (
                <div
                  key={order.id}
                  className="bg-[#14171f] border border-zinc-800/80 rounded-2xl p-5 hover:border-zinc-700 transition"
                >
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between pb-4 border-b border-zinc-800/60 gap-4">
                    <div className="flex items-center gap-3">
                      <span className="text-lg font-black text-white">{order.id}</span>
                      <span className="text-xs text-zinc-500">
                        {new Date(order.createdAt).toLocaleDateString('ar-DZ')} {new Date(order.createdAt).toLocaleTimeString('ar-DZ', { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>

                    <div className="flex items-center gap-3 flex-wrap">
                      <span className="text-xs text-zinc-400">تغيير الحالة:</span>
                      <select
                        value={order.status}
                        onChange={(e) => updateOrderStatus(order.id, e.target.value as DashboardOrder['status'])}
                        className={`text-xs font-bold px-3 py-1.5 rounded-lg border focus:outline-none cursor-pointer ${
                          order.status === 'جديد'
                            ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                            : order.status === 'تم التأكيد'
                            ? 'bg-blue-500/20 text-blue-300 border-blue-500/40'
                            : order.status === 'قيد التوصيل'
                            ? 'bg-indigo-500/20 text-indigo-300 border-indigo-500/40'
                            : order.status === 'تم التسليم'
                            ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                            : 'bg-rose-500/20 text-rose-300 border-rose-500/40'
                        }`}
                      >
                        <option value="جديد" className="bg-zinc-900 text-white">جديد 🟡</option>
                        <option value="تم التأكيد" className="bg-zinc-900 text-white">تم التأكيد 🔵</option>
                        <option value="قيد التوصيل" className="bg-zinc-900 text-white">قيد التوصيل 🚚</option>
                        <option value="تم التسليم" className="bg-zinc-900 text-white">تم التسليم 🟢</option>
                        <option value="ملغي" className="bg-zinc-900 text-white">ملغي 🔴</option>
                      </select>

                      <button
                        onClick={() => {
                          if (confirm(`هل أنت متأكد من حذف الطلب "${order.id}"؟`)) {
                            deleteOrder(order.id);
                          }
                        }}
                        className="p-1.5 rounded-lg bg-zinc-800 text-zinc-400 hover:text-rose-400 hover:bg-zinc-700 transition"
                        title="حذف الطلب"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>

                  {/* Customer Info & Order Items Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
                    {/* Customer Contact */}
                    <div className="space-y-2 bg-zinc-900/50 p-4 rounded-xl border border-zinc-800/40">
                      <div className="text-xs font-semibold text-zinc-400">معلومات الزبون:</div>
                      <div className="text-base font-bold text-white">{order.customer.name}</div>
                      <div className="flex items-center gap-2 text-sm text-zinc-300">
                        <Phone size={14} className="text-emerald-400" />
                        <span dir="ltr">{order.customer.phone}</span>
                        <a
                          href={`tel:${order.customer.phone}`}
                          className="text-xs text-emerald-400 hover:underline mr-2"
                        >
                          اتصال
                        </a>
                      </div>
                      <div className="flex items-start gap-2 text-xs text-zinc-400">
                        <MapPin size={14} className="text-zinc-500 shrink-0 mt-0.5" />
                        <span>
                          {order.customer.wilaya} · {order.customer.commune}
                          <br />
                          {order.customer.address}
                        </span>
                      </div>
                      {order.customer.notes && (
                        <div className="text-xs text-amber-300/90 bg-amber-500/10 p-2 rounded-lg mt-2">
                          ملاحظة الزبون: {order.customer.notes}
                        </div>
                      )}
                    </div>

                    {/* Items Ordered */}
                    <div className="md:col-span-2 flex flex-col justify-between">
                      <div>
                        <div className="text-xs font-semibold text-zinc-400 mb-2">المنتجات المطلوبة:</div>
                        <div className="space-y-2">
                          {order.items.map((item, idx) => (
                            <div
                              key={idx}
                              className="flex items-center justify-between p-2.5 rounded-lg bg-zinc-900/40 border border-zinc-800/40 text-sm"
                            >
                              <div className="flex items-center gap-3">
                                {item.image && (
                                  <img
                                    src={item.image}
                                    alt={item.name}
                                    className="w-10 h-10 object-cover rounded-md border border-zinc-800 bg-zinc-900"
                                  />
                                )}
                                <div>
                                  <div className="font-semibold text-white">{item.name}</div>
                                  <div className="text-xs text-zinc-400">
                                    المقاس: <b>{item.size}</b> · اللون: <b>{item.color}</b> · الكمية:{' '}
                                    <b>{item.quantity}</b>
                                  </div>
                                </div>
                              </div>
                              <div className="font-bold text-zinc-200">
                                {money(item.price * item.quantity)}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="flex items-center justify-between pt-3 border-t border-zinc-800/60 mt-3">
                        <span className="text-xs text-zinc-400">الدفع عند الاستلام (COD)</span>
                        <div className="text-lg font-black text-emerald-400">
                          الإجمالي: {money(order.total)}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {filteredOrders.length === 0 && (
                <div className="text-center py-16 bg-[#14171f] border border-zinc-800/80 rounded-2xl text-zinc-500">
                  <ShoppingBag size={32} className="mx-auto mb-3 opacity-40" />
                  <p className="text-base font-semibold text-zinc-400">لا توجد طلبات مطابقة</p>
                  <p className="text-xs text-zinc-600 mt-1">ستظهر الطلبات الجديدة هنا مباشرة عند قيام الزبائن بالطلب.</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ═════════════════════════════════════════════ */}
        {/* TAB 4: CUSTOMERS                             */}
        {/* ═════════════════════════════════════════════ */}
        {activeTab === 'customers' && (
          <div className="space-y-6">
            <div className="bg-[#14171f] border border-zinc-800/80 rounded-2xl overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-right text-sm text-zinc-300">
                  <thead className="bg-[#0f1117] text-xs uppercase text-zinc-400 border-b border-zinc-800">
                    <tr>
                      <th className="py-4 px-6">اسم الزبون</th>
                      <th className="py-4 px-6">رقم الهاتف</th>
                      <th className="py-4 px-6">الولاية</th>
                      <th className="py-4 px-6">عدد الطلبات</th>
                      <th className="py-4 px-6">إجمالي المشتريات</th>
                      <th className="py-4 px-6 text-center">إجراءات</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-800/60">
                    {customersList.map((c, i) => (
                      <tr key={i} className="hover:bg-zinc-800/30 transition">
                        <td className="py-4 px-6 font-bold text-white">{c.name}</td>
                        <td className="py-4 px-6 text-zinc-300" dir="ltr">{c.phone}</td>
                        <td className="py-4 px-6 text-zinc-400">{c.wilaya}</td>
                        <td className="py-4 px-6 font-semibold">{c.ordersCount} طلبات</td>
                        <td className="py-4 px-6 font-bold text-emerald-400">{money(c.totalSpent)}</td>
                        <td className="py-4 px-6 text-center">
                          <a
                            href={`tel:${c.phone}`}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20 text-xs font-semibold"
                          >
                            <Phone size={13} />
                            اتصال مباشر
                          </a>
                        </td>
                      </tr>
                    ))}
                    {customersList.length === 0 && (
                      <tr>
                        <td colSpan={6} className="text-center py-12 text-zinc-500">
                          لا يوجد زبائن مسجلين بعد.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ═════════════════════════════════════════════ */}
        {/* TAB 5: SETTINGS                              */}
        {/* ═════════════════════════════════════════════ */}
        {activeTab === 'settings' && (
          <div className="max-w-2xl space-y-6">
            {/* ─── SUPABASE BACKEND INTEGRATION ─── */}
            <div className="bg-[#14171f] border border-zinc-800/80 p-6 rounded-2xl space-y-5">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-bold text-white flex items-center gap-2">
                    <Database size={20} className="text-emerald-400" />
                    <span>ربط قاعدة بيانات سوبابيز (Supabase Cloud Backend)</span>
                  </h3>
                  <p className="text-xs text-zinc-400 mt-1">
                    اربط متجرك بقاعدة بيانات PostgreSQL سحابية حقيقية لحفظ الطلبيات والمنتجات ومزامنتها فورياً.
                  </p>
                </div>
                <Badge
                  variant="outline"
                  className={`text-xs px-2.5 py-1 ${
                    isSupabaseActive
                      ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                      : 'bg-zinc-800 text-zinc-400 border-zinc-700'
                  }`}
                >
                  {isSupabaseActive ? '🟢 متصل بسوبابيز' : '⚪ تخزين محلي (Offline)'}
                </Badge>
              </div>

              {/* Status Alert */}
              {sbTestResult && (
                <div
                  className={`p-3.5 rounded-xl text-xs font-semibold flex items-center gap-2 ${
                    sbTestResult.success
                      ? 'bg-emerald-500/15 border border-emerald-500/30 text-emerald-400'
                      : 'bg-rose-500/15 border border-rose-500/30 text-rose-400'
                  }`}
                >
                  {sbTestResult.success ? <Check size={16} /> : <AlertCircle size={16} />}
                  <span>{sbTestResult.message}</span>
                </div>
              )}

              <div className="space-y-4 pt-2">
                <div className="space-y-1.5">
                  <Label className="text-zinc-300 flex items-center gap-2 text-xs">
                    <Globe size={14} className="text-emerald-400" />
                    <span>رابط المشروع (Project URL)</span>
                  </Label>
                  <Input
                    placeholder="https://xyzcompany.supabase.co"
                    value={sbConfig.url}
                    onChange={(e) => setSbConfig({ ...sbConfig, url: e.target.value })}
                    dir="ltr"
                    className="bg-zinc-900 border-zinc-800 text-white font-mono text-xs focus-visible:ring-emerald-500"
                  />
                </div>

                <div className="space-y-1.5">
                  <Label className="text-zinc-300 flex items-center gap-2 text-xs">
                    <Key size={14} className="text-emerald-400" />
                    <span>المفتاح العام (anon / public API key)</span>
                  </Label>
                  <Input
                    type="password"
                    placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
                    value={sbConfig.anonKey}
                    onChange={(e) => setSbConfig({ ...sbConfig, anonKey: e.target.value })}
                    dir="ltr"
                    className="bg-zinc-900 border-zinc-800 text-white font-mono text-xs focus-visible:ring-emerald-500"
                  />
                </div>

                <div className="flex flex-wrap items-center gap-3 pt-2">
                  <Button
                    onClick={async () => {
                      if (!sbConfig.url.trim() || !sbConfig.anonKey.trim()) {
                        setSbTestResult({
                          success: false,
                          message: 'يرجى إدخال رابط المشروع (Project URL) والمفتاح العام (Anon Key).',
                        });
                        return;
                      }
                      setSbTesting(true);
                      const res = await testSupabaseConnection(sbConfig.url, sbConfig.anonKey);
                      setSbTesting(false);
                      setSbTestResult(res);
                      if (res.success) {
                        saveSupabaseConfig(sbConfig.url, sbConfig.anonKey);
                        refreshFromSupabase();
                      }
                    }}
                    disabled={sbTesting}
                    className="bg-emerald-500 hover:bg-emerald-400 text-black font-bold h-10 px-5 text-xs shadow-md shadow-emerald-500/20"
                  >
                    {sbTesting ? 'جاري الاختبار والربط...' : 'حفظ واختبار الاتصال ⚡'}
                  </Button>

                  {isSupabaseActive && (
                    <>
                      <Button
                        variant="outline"
                        onClick={() => refreshFromSupabase()}
                        disabled={supabaseLoading}
                        className="border-zinc-700 bg-zinc-900 hover:bg-zinc-800 text-zinc-300 h-10 px-4 text-xs flex items-center gap-2"
                      >
                        <RefreshCw size={14} className={supabaseLoading ? 'animate-spin' : ''} />
                        <span>مزامنة البيانات الآن</span>
                      </Button>

                      <Button
                        variant="outline"
                        onClick={() => {
                          if (confirm('هل أنت متأكد من قطع الاتصال؟ سيعود المتجر إلى وضع التخزين المحلي.')) {
                            clearSupabaseConfig();
                            setSbConfig({ url: '', anonKey: '' });
                            setSbTestResult(null);
                          }
                        }}
                        className="border-rose-900/50 hover:bg-rose-950/30 text-rose-400 h-10 px-4 text-xs"
                      >
                        قطع الاتصال
                      </Button>
                    </>
                  )}
                </div>
              </div>

              {/* SQL Schema Helper */}
              <div className="border-t border-zinc-800/80 pt-4 mt-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-xs font-bold text-zinc-300">مخطط قاعدة البيانات (SQL Schema)</h4>
                    <p className="text-[11px] text-zinc-500 mt-0.5">
                      تم إنشاء ملف <code>supabase_schema.sql</code> في مشروعك. يمكنك نسخه بالضغط أدناه ولصقه في SQL Editor داخل Supabase.
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setShowSqlCode(!showSqlCode)}
                      className="text-xs text-zinc-400 hover:text-white h-8"
                    >
                      {showSqlCode ? 'إخفاء' : 'معاينة'}
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        const sql = `-- ROUSSI MODE SCHEMA
CREATE TABLE IF NOT EXISTS public.products (
  id TEXT PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  price NUMERIC NOT NULL,
  old_price NUMERIC,
  discount INTEGER DEFAULT 0,
  images JSONB DEFAULT '[]'::jsonb,
  category TEXT NOT NULL,
  gender TEXT DEFAULT 'شباب',
  age_group TEXT DEFAULT 'شباب',
  sizes JSONB DEFAULT '["S","M","L","XL"]'::jsonb,
  colors JSONB DEFAULT '[{"name":"أسود","token":"black"}]'::jsonb,
  stock INTEGER DEFAULT 15,
  description TEXT,
  is_new BOOLEAN DEFAULT true,
  is_featured BOOLEAN DEFAULT false,
  is_promo BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE TABLE IF NOT EXISTS public.orders (
  id TEXT PRIMARY KEY,
  customer_name TEXT NOT NULL,
  customer_phone TEXT NOT NULL,
  customer_wilaya TEXT NOT NULL,
  customer_commune TEXT NOT NULL,
  customer_address TEXT NOT NULL,
  customer_notes TEXT,
  total NUMERIC NOT NULL,
  status TEXT DEFAULT 'جديد' NOT NULL,
  items JSONB NOT NULL DEFAULT '[]'::jsonb,
  created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Public Read Products" ON public.products;
DROP POLICY IF EXISTS "Allow All on Products" ON public.products;
CREATE POLICY "Allow All on Products" ON public.products FOR ALL USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Public Insert Orders" ON public.orders;
DROP POLICY IF EXISTS "Allow All on Orders" ON public.orders;
CREATE POLICY "Allow All on Orders" ON public.orders FOR ALL USING (true) WITH CHECK (true);

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_publication_tables 
    WHERE pubname = 'supabase_realtime' AND tablename = 'orders'
  ) THEN
    ALTER PUBLICATION supabase_realtime ADD TABLE public.orders;
  END IF;
  
  IF NOT EXISTS (
    SELECT 1 FROM pg_publication_tables 
    WHERE pubname = 'supabase_realtime' AND tablename = 'products'
  ) THEN
    ALTER PUBLICATION supabase_realtime ADD TABLE public.products;
  END IF;
END $$;
`;
                        navigator.clipboard.writeText(sql);
                        setCopiedSql(true);
                        setTimeout(() => setCopiedSql(false), 2000);
                      }}
                      className="text-xs border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/10 h-8 flex items-center gap-1.5"
                    >
                      {copiedSql ? <Check size={13} /> : <Copy size={13} />}
                      <span>{copiedSql ? 'تم النسخ!' : 'نسخ كود SQL'}</span>
                    </Button>
                  </div>
                </div>

                {showSqlCode && (
                  <pre
                    dir="ltr"
                    className="mt-3 p-3.5 rounded-xl bg-black/60 border border-zinc-800 text-[11px] font-mono text-zinc-300 max-h-48 overflow-auto text-left"
                  >
{`CREATE TABLE public.products (
  id TEXT PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  price NUMERIC NOT NULL,
  ...
);
CREATE TABLE public.orders (
  id TEXT PRIMARY KEY,
  customer_name TEXT NOT NULL,
  total NUMERIC NOT NULL,
  items JSONB NOT NULL,
  ...
);`}
                  </pre>
                )}
              </div>
            </div>

            <div className="bg-[#14171f] border border-zinc-800/80 p-6 rounded-2xl space-y-5">
              <h3 className="text-lg font-bold text-white">إعدادات المتجر العامة</h3>

              <div className="space-y-2">
                <Label className="text-zinc-300">اسم المتجر</Label>
                <Input defaultValue="Roussi Mode" className="bg-zinc-900 border-zinc-800 text-white" />
              </div>

              <div className="space-y-2">
                <Label className="text-zinc-300">العملة الافتراضية</Label>
                <Input defaultValue="د.ج (الدينار الجزائري)" disabled className="bg-zinc-900/60 border-zinc-800 text-zinc-400" />
              </div>

              <div className="space-y-2">
                <Label className="text-zinc-300">الدولة المستهدفة</Label>
                <Input defaultValue="الجزائر 🇩🇿 (58 ولاية)" disabled className="bg-zinc-900/60 border-zinc-800 text-zinc-400" />
              </div>
            </div>

            <div className="bg-[#14171f] border border-zinc-800/80 p-6 rounded-2xl space-y-4">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <RotateCcw size={18} className="text-amber-400" />
                <span>إعادة تعيين البيانات التجريبية (Demo Reset)</span>
              </h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                إذا قمت بحذف المنتجات أو ترغب في إعادة ضبط المتجر إلى التشكيلة والطلبات التجريبية الأصلية، يمكنك الضغط على الأزرار أدناه.
              </p>

              <div className="flex items-center gap-3 pt-2">
                <Button
                  variant="outline"
                  onClick={() => {
                    if (confirm('هل تريد استرجاع قائمة المنتجات الأصلية؟')) {
                      resetProducts();
                      alert('تمت استعادة المنتجات الافتراضية بنجاح!');
                    }
                  }}
                  className="border-zinc-700 bg-zinc-900 hover:bg-zinc-800 text-zinc-300"
                >
                  استعادة المنتجات الافتراضية
                </Button>

                <Button
                  variant="outline"
                  onClick={() => {
                    if (confirm('هل تريد استرجاع الطلبات التجريبية الأصلية؟')) {
                      resetOrders();
                      alert('تمت استعادة الطلبات التجريبية بنجاح!');
                    }
                  }}
                  className="border-zinc-700 bg-zinc-900 hover:bg-zinc-800 text-zinc-300"
                >
                  استعادة الطلبات التجريبية
                </Button>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* ═════════════════════════════════════════════ */}
      {/* ADD / EDIT PRODUCT MODAL                      */}
      {/* ═════════════════════════════════════════════ */}
      {productModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-[#14171f] border border-zinc-800 rounded-2xl w-full max-w-2xl max-h-[90vh] flex flex-col shadow-2xl animate-in fade-in zoom-in-95 duration-200">
            {/* Modal Header */}
            <div className="p-6 border-b border-zinc-800 flex items-center justify-between shrink-0">
              <div>
                <h3 className="text-xl font-bold text-white">
                  {editingProduct ? 'تعديل بيانات المنتج' : 'إضافة منتج جديد للمتجر'}
                </h3>
                <p className="text-xs text-zinc-400 mt-1">
                  أدخل تفاصيل القطعة ليتم نشرها وتوفيرها للزبائن فوراً في الموقع.
                </p>
              </div>
              <button
                onClick={() => setProductModalOpen(false)}
                className="w-8 h-8 rounded-lg bg-zinc-800/80 text-zinc-400 hover:text-white flex items-center justify-center"
              >
                <X size={18} />
              </button>
            </div>

            {/* Modal Body */}
            <form onSubmit={handleSaveProduct} className="p-6 space-y-6 overflow-y-auto flex-1">
              {formSuccess && (
                <div className="p-4 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-sm flex items-center gap-2">
                  <CheckCircle2 size={18} />
                  <span>{formSuccess}</span>
                </div>
              )}

              {/* Product Name & Category */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-zinc-300">اسم المنتج *</Label>
                  <Input
                    placeholder="مثال: هودي أوفرسايز بيج 2026"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="bg-zinc-900 border-zinc-800 text-white focus-visible:ring-emerald-500"
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-zinc-300">التصنيف *</Label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full bg-zinc-900 border border-zinc-800 rounded-lg h-10 px-3 text-sm text-white focus:outline-none focus:ring-1 focus:ring-emerald-500"
                  >
                    {categories.filter((c) => c !== 'الكل' && c !== 'عروض').map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Price, Old Price, Stock */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label className="text-zinc-300">السعر الحالي (د.ج) *</Label>
                  <Input
                    type="number"
                    placeholder="مثال: 4500"
                    value={price}
                    onChange={(e) => setPrice(e.target.value === '' ? '' : Number(e.target.value))}
                    required
                    className="bg-zinc-900 border-zinc-800 text-white focus-visible:ring-emerald-500"
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-zinc-300">السعر قبل التخفيض (اختياري)</Label>
                  <Input
                    type="number"
                    placeholder="مثال: 5800"
                    value={oldPrice}
                    onChange={(e) => setOldPrice(e.target.value === '' ? '' : Number(e.target.value))}
                    className="bg-zinc-900 border-zinc-800 text-white focus-visible:ring-emerald-500"
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-zinc-300">الكمية في المخزن *</Label>
                  <Input
                    type="number"
                    placeholder="مثال: 25"
                    value={stock}
                    onChange={(e) => setStock(e.target.value === '' ? '' : Number(e.target.value))}
                    required
                    className="bg-zinc-900 border-zinc-800 text-white focus-visible:ring-emerald-500"
                  />
                </div>
              </div>

              {/* Image Selection Presets + Custom URL */}
              <div className="space-y-3">
                <Label className="text-zinc-300">صورة المنتج</Label>
                <div className="text-xs text-zinc-400 mb-2">
                  اختر من الصور الجاهزة أو ضع رابط صورة خارجي:
                </div>

                <div className="grid grid-cols-4 sm:grid-cols-8 gap-2">
                  {presetImages.map((preset, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => {
                        setSelectedImage(preset.url);
                        setCustomImageUrl('');
                      }}
                      className={`relative aspect-[3/4] rounded-lg overflow-hidden border-2 transition ${
                        selectedImage === preset.url && !customImageUrl
                          ? 'border-emerald-500 scale-105 shadow-md shadow-emerald-500/30'
                          : 'border-zinc-800 hover:border-zinc-700 opacity-70 hover:opacity-100'
                      }`}
                    >
                      <img src={preset.url} alt={preset.label} className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>

                <div className="mt-2">
                  <Input
                    placeholder="أو أدخل رابط صورة مباشرة (https://...)"
                    value={customImageUrl}
                    onChange={(e) => setCustomImageUrl(e.target.value)}
                    className="bg-zinc-900 border-zinc-800 text-white text-xs h-9 focus-visible:ring-emerald-500"
                  />
                </div>
              </div>

              {/* Sizes Available */}
              <div className="space-y-2">
                <Label className="text-zinc-300">المقاسات المتوفرة</Label>
                <div className="flex flex-wrap gap-2">
                  {['S', 'M', 'L', 'XL', 'XXL', '38', '40', '42', '44'].map((sizeOption) => (
                    <button
                      key={sizeOption}
                      type="button"
                      onClick={() => toggleSize(sizeOption)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                        selectedSizes.includes(sizeOption)
                          ? 'bg-emerald-500 text-black shadow-sm shadow-emerald-500/20'
                          : 'bg-zinc-800 text-zinc-400 hover:bg-zinc-700 hover:text-white'
                      }`}
                    >
                      {sizeOption}
                    </button>
                  ))}
                </div>
              </div>

              {/* Color Selection */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-zinc-300">اسم اللون الأساسي</Label>
                  <Input
                    placeholder="مثال: أسود، بيج، رمادي، زيتي"
                    value={selectedColorName}
                    onChange={(e) => setSelectedColorName(e.target.value)}
                    className="bg-zinc-900 border-zinc-800 text-white focus-visible:ring-emerald-500"
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-zinc-300">رمز اللون (لون الدائرة)</Label>
                  <select
                    value={selectedColorToken}
                    onChange={(e) => setSelectedColorToken(e.target.value)}
                    className="w-full bg-zinc-900 border border-zinc-800 rounded-lg h-10 px-3 text-sm text-white focus:outline-none focus:ring-1 focus:ring-emerald-500"
                  >
                    <option value="black">أسود (Black)</option>
                    <option value="grey">رمادي (Grey)</option>
                    <option value="white">أبيض (White)</option>
                    <option value="blue">أزرق داكن (Blue)</option>
                    <option value="sage">زيتي / خاكي (Sage)</option>
                    <option value="beige">بيج (Beige)</option>
                  </select>
                </div>
              </div>

              {/* Description */}
              <div className="space-y-2">
                <Label className="text-zinc-300">وصف المنتج</Label>
                <Textarea
                  rows={3}
                  placeholder="أدخل مواصفات المنتج والخامة وطريقة الغسيل..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="bg-zinc-900 border-zinc-800 text-white focus-visible:ring-emerald-500 text-sm"
                />
              </div>

              {/* Modal Footer */}
              <div className="pt-4 border-t border-zinc-800 flex items-center justify-end gap-3">
                <Button
                  type="button"
                  variant="ghost"
                  onClick={() => setProductModalOpen(false)}
                  className="text-zinc-400 hover:text-white"
                >
                  إلغاء
                </Button>
                <Button
                  type="submit"
                  className="bg-emerald-500 hover:bg-emerald-400 text-black font-semibold h-11 px-8 rounded-xl shadow-lg shadow-emerald-500/20"
                >
                  {editingProduct ? 'حفظ التعديلات ✅' : 'نشر المنتج في المتجر 🚀'}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
