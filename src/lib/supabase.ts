import { createClient } from '@supabase/supabase-js';
import type { Product } from './products';
import type { DashboardOrder } from './store-context';

export type SupabaseConfig = {
  url: string;
  anonKey: string;
};

// Retrieve config from env or localStorage
export function getSupabaseConfig(): SupabaseConfig {
  const envUrl = (import.meta as any).env?.VITE_SUPABASE_URL || 'https://fcyrgsiatfdsmtfkbsde.supabase.co';
  const envKey = (import.meta as any).env?.VITE_SUPABASE_ANON_KEY || 'sb_publishable_EU4bMmZP0OIYpMNV0ZizwA_gEV7OMFa';

  if (typeof window !== 'undefined') {
    const localUrl = localStorage.getItem('roussi_supabase_url');
    const localKey = localStorage.getItem('roussi_supabase_key');
    if (localUrl || localKey) {
      return {
        url: (localUrl || envUrl || '').trim(),
        anonKey: (localKey || envKey || '').trim(),
      };
    }
  }

  return { url: envUrl.trim(), anonKey: envKey.trim() };
}

export function saveSupabaseConfig(url: string, anonKey: string) {
  if (typeof window === 'undefined') return;
  localStorage.setItem('roussi_supabase_url', url.trim());
  localStorage.setItem('roussi_supabase_key', anonKey.trim());
  window.dispatchEvent(new Event('roussi-supabase-config-changed'));
}

export function clearSupabaseConfig() {
  if (typeof window === 'undefined') return;
  localStorage.removeItem('roussi_supabase_url');
  localStorage.removeItem('roussi_supabase_key');
  window.dispatchEvent(new Event('roussi-supabase-config-changed'));
}

export function isSupabaseConfigured(): boolean {
  const cfg = getSupabaseConfig();
  return Boolean(cfg.url && cfg.anonKey && cfg.url.startsWith('https://'));
}

// Client singleton generator
let cachedClient: ReturnType<typeof createClient> | null = null;
let lastUsedUrl = '';
let lastUsedKey = '';

export function getSupabase() {
  const { url, anonKey } = getSupabaseConfig();
  if (!url || !anonKey || !url.startsWith('https://')) {
    return null;
  }

  if (cachedClient && lastUsedUrl === url && lastUsedKey === anonKey) {
    return cachedClient;
  }

  try {
    cachedClient = createClient(url, anonKey);
    lastUsedUrl = url;
    lastUsedKey = anonKey;
    return cachedClient;
  } catch (err) {
    console.error('Error initializing Supabase client:', err);
    return null;
  }
}

// ─── Products Operations ───

export async function fetchProductsSupabase(): Promise<Product[] | null> {
  const client = getSupabase();
  if (!client) return null;

  try {
    const { data, error } = await client
      .from('products')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.warn('Supabase fetchProducts error:', error.message);
      return null;
    }

    if (!data) return [];

    return data.map((row: any) => ({
      id: String(row.id),
      slug: row.slug,
      name: row.name,
      price: Number(row.price),
      oldPrice: row.old_price ? Number(row.old_price) : undefined,
      discount: row.discount || 0,
      images: Array.isArray(row.images) ? row.images : [row.image || ''],
      category: row.category,
      gender: row.gender || 'شباب',
      ageGroup: row.age_group || 'شباب',
      sizes: Array.isArray(row.sizes) ? row.sizes : ['M', 'L', 'XL'],
      colors: Array.isArray(row.colors) ? row.colors : [{ name: 'أسود', token: 'black' }],
      stock: Number(row.stock) || 0,
      description: row.description || '',
      isNew: Boolean(row.is_new),
      isFeatured: Boolean(row.is_featured),
      isPromo: Boolean(row.is_promo),
      createdAt: row.created_at ? new Date(row.created_at).toISOString().split('T')[0] : '2026-10-01',
    }));
  } catch (err) {
    console.error('Failed to query products from Supabase:', err);
    return null;
  }
}

export async function insertProductSupabase(product: Product): Promise<boolean> {
  const client = getSupabase();
  if (!client) return false;

  try {
    const { error } = await client.from('products').insert([
      {
        id: product.id,
        slug: product.slug,
        name: product.name,
        price: product.price,
        old_price: product.oldPrice || null,
        discount: product.discount || 0,
        images: product.images,
        category: product.category,
        gender: product.gender,
        age_group: product.ageGroup,
        sizes: product.sizes,
        colors: product.colors,
        stock: product.stock,
        description: product.description,
        is_new: product.isNew,
        is_featured: product.isFeatured,
        is_promo: product.isPromo,
      },
    ]);

    if (error) {
      console.error('Supabase insertProduct error:', error);
      return false;
    }
    return true;
  } catch (err) {
    console.error('Error inserting product in Supabase:', err);
    return false;
  }
}

export async function updateProductSupabase(id: string, patch: Partial<Product>): Promise<boolean> {
  const client = getSupabase();
  if (!client) return false;

  try {
    const payload: Record<string, any> = {};
    if (patch.name !== undefined) payload.name = patch.name;
    if (patch.price !== undefined) payload.price = patch.price;
    if (patch.oldPrice !== undefined) payload.old_price = patch.oldPrice;
    if (patch.discount !== undefined) payload.discount = patch.discount;
    if (patch.stock !== undefined) payload.stock = patch.stock;
    if (patch.images !== undefined) payload.images = patch.images;
    if (patch.category !== undefined) payload.category = patch.category;
    if (patch.sizes !== undefined) payload.sizes = patch.sizes;
    if (patch.colors !== undefined) payload.colors = patch.colors;
    if (patch.description !== undefined) payload.description = patch.description;
    if (patch.isNew !== undefined) payload.is_new = patch.isNew;
    if (patch.isFeatured !== undefined) payload.is_featured = patch.isFeatured;
    if (patch.isPromo !== undefined) payload.is_promo = patch.isPromo;

    const { error } = await client.from('products').update(payload).eq('id', id);
    if (error) {
      console.error('Supabase updateProduct error:', error);
      return false;
    }
    return true;
  } catch (err) {
    console.error('Error updating product in Supabase:', err);
    return false;
  }
}

export async function deleteProductSupabase(id: string): Promise<boolean> {
  const client = getSupabase();
  if (!client) return false;

  try {
    const { error } = await client.from('products').delete().eq('id', id);
    if (error) {
      console.error('Supabase deleteProduct error:', error);
      return false;
    }
    return true;
  } catch (err) {
    console.error('Error deleting product in Supabase:', err);
    return false;
  }
}

// ─── Orders Operations ───

export async function fetchOrdersSupabase(): Promise<DashboardOrder[] | null> {
  const client = getSupabase();
  if (!client) return null;

  try {
    const { data, error } = await client
      .from('orders')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.warn('Supabase fetchOrders error:', error.message);
      return null;
    }

    if (!data) return [];

    return data.map((row: any) => ({
      id: row.id,
      customer: {
        name: row.customer_name || '',
        phone: row.customer_phone || '',
        wilaya: row.customer_wilaya || '',
        commune: row.customer_commune || '',
        address: row.customer_address || '',
        notes: row.customer_notes || '',
      },
      items: Array.isArray(row.items) ? row.items : [],
      total: Number(row.total) || 0,
      status: row.status || 'جديد',
      createdAt: row.created_at || new Date().toISOString(),
    }));
  } catch (err) {
    console.error('Failed to query orders from Supabase:', err);
    return null;
  }
}

export async function insertOrderSupabase(order: DashboardOrder): Promise<boolean> {
  const client = getSupabase();
  if (!client) return false;

  try {
    const { error } = await client.from('orders').insert([
      {
        id: order.id,
        customer_name: order.customer.name,
        customer_phone: order.customer.phone,
        customer_wilaya: order.customer.wilaya,
        customer_commune: order.customer.commune,
        customer_address: order.customer.address,
        customer_notes: order.customer.notes || null,
        total: order.total,
        status: order.status,
        items: order.items,
        created_at: order.createdAt,
      },
    ]);

    if (error) {
      console.error('Supabase insertOrder error:', error);
      return false;
    }
    return true;
  } catch (err) {
    console.error('Error inserting order in Supabase:', err);
    return false;
  }
}

export async function updateOrderStatusSupabase(orderId: string, status: DashboardOrder['status']): Promise<boolean> {
  const client = getSupabase();
  if (!client) return false;

  try {
    const { error } = await client.from('orders').update({ status }).eq('id', orderId);
    if (error) {
      console.error('Supabase updateOrderStatus error:', error);
      return false;
    }
    return true;
  } catch (err) {
    console.error('Error updating order status in Supabase:', err);
    return false;
  }
}

export async function deleteOrderSupabase(orderId: string): Promise<boolean> {
  const client = getSupabase();
  if (!client) return false;

  try {
    const { error } = await client.from('orders').delete().eq('id', orderId);
    if (error) {
      console.error('Supabase deleteOrder error:', error);
      return false;
    }
    return true;
  } catch (err) {
    console.error('Error deleting order in Supabase:', err);
    return false;
  }
}

export async function testSupabaseConnection(url: string, key: string): Promise<{ success: boolean; message: string }> {
  try {
    const testClient = createClient(url, key);
    const { error } = await testClient.from('products').select('count', { count: 'exact', head: true });
    if (error && error.code !== 'PGRST116') {
      // If table doesn't exist yet, authentication was still 100% successful!
      if (
        error.code === 'PGRST205' ||
        error.code === '42P01' ||
        error.message?.includes('relation "public.products" does not exist') ||
        error.message?.includes('schema cache')
      ) {
        return {
          success: true,
          message: 'الاتصال بالسيرفر والمفتاح ناجح 100%! 🟢 يتبقى فقط تشغيل كود SQL في Supabase لإنشاء الجداول.',
        };
      }
      return { success: false, message: `خطأ في الاتصال: ${error.message}` };
    }
    return { success: true, message: 'تم الاتصال بقاعدة بيانات سوبابيز بنجاح! 🟢' };
  } catch (err: any) {
    return { success: false, message: `تعذر الاتصال: ${err?.message || err}` };
  }
}
