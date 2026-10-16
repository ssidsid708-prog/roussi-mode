-- ====================================================================
-- ROUSSI MODE — SUPABASE DATABASE SCHEMA
-- انسخ هذا الكود بالكامل والصقه في SQL Editor داخل لوحة تحكم Supabase
-- ====================================================================

-- 1. جدول المنتجات (Products Table)
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

-- 2. جدول الطلبيات (Orders Table)
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

-- 3. تفعيل الأمان وسياسات الوصول (Row Level Security - RLS)
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;

-- سياسات جدول المنتجات (تسمح بالقراءة والإضافة والتعديل والحذف)
DROP POLICY IF EXISTS "Public Read Products" ON public.products;
DROP POLICY IF EXISTS "Allow All on Products" ON public.products;
CREATE POLICY "Allow All on Products" 
ON public.products 
FOR ALL 
USING (true) 
WITH CHECK (true);

-- سياسات جدول الطلبيات (تسمح بإنشاء وقراءة وتعديل الطلبات)
DROP POLICY IF EXISTS "Public Insert Orders" ON public.orders;
DROP POLICY IF EXISTS "Allow All on Orders" ON public.orders;
CREATE POLICY "Allow All on Orders" 
ON public.orders 
FOR ALL 
USING (true) 
WITH CHECK (true);

-- 4. تفعيل التحديثات المباشرة بالوقت الفعلي (Realtime Replication)
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

-- 5. إدراج منتجات المتجر الأولية تلقائياً (Initial Seed Data)
INSERT INTO public.products (id, slug, name, price, old_price, discount, images, category, gender, age_group, sizes, colors, stock, is_new, is_featured, is_promo, description)
VALUES 
(
  '1',
  'hoodie-noir',
  'هودي أسود أوفرسايز',
  4500,
  5800,
  22,
  '["/store-1.jpg"]'::jsonb,
  'هوديات',
  'شباب',
  'شباب',
  '["S","M","L","XL","XXL"]'::jsonb,
  '[{"name":"أسود","token":"black"}]'::jsonb,
  15,
  true,
  true,
  true,
  'قطعة ستريت وير بتصميم عصري وخامة مريحة تناسب إطلالتك اليومية.'
),
(
  '2',
  'sweatshirt-gris',
  'سويت شيرت رمادي كلاسيك',
  3800,
  NULL,
  0,
  '["/store-2.jpg"]'::jsonb,
  'سويت شيرت',
  'شباب',
  'شباب',
  '["S","M","L","XL"]'::jsonb,
  '[{"name":"رمادي","token":"grey"}]'::jsonb,
  12,
  true,
  true,
  false,
  'سويت شيرت قطني مريح وأنيق مناسب لجميع الخرجات اليومية.'
),
(
  '3',
  'jean-slim-dark',
  'جينز سليم فيت داكن',
  4200,
  5500,
  24,
  '["/store-1.jpg"]'::jsonb,
  'جينز',
  'شباب',
  'شباب',
  '["38","40","42","44"]'::jsonb,
  '[{"name":"أزرق داكن","token":"blue"}]'::jsonb,
  18,
  true,
  true,
  true,
  'جينز سليم فيت أزرق داكن بقصة شبابية متناسقة وخامة عالية الجودة.'
),
(
  '4',
  'cargo-kaki',
  'سروال كارغو خاكي',
  3900,
  4800,
  19,
  '["/store-2.jpg"]'::jsonb,
  'سراويل كارغو',
  'شباب',
  'شباب',
  '["S","M","L","XL"]'::jsonb,
  '[{"name":"خاكي","token":"sage"}]'::jsonb,
  10,
  true,
  false,
  true,
  'سروال كارغو متعدد الجيوب لون خاكي ستريت وير عملي ومريح.'
),
(
  '5',
  'bomber-olive',
  'بومبر جاكيت زيتي',
  6200,
  NULL,
  0,
  '["/store-2.jpg"]'::jsonb,
  'جاكيتات',
  'شباب',
  'شباب',
  '["M","L","XL","XXL"]'::jsonb,
  '[{"name":"زيتي","token":"sage"}]'::jsonb,
  8,
  true,
  true,
  false,
  'بومبر جاكيت زيتي عالي الجودة لإطلالة دافئة ومتميزة في موسم 2026.'
),
(
  '6',
  'tshirt-oversize',
  'تيشيرت أوفرسايز أبيض',
  2500,
  3200,
  22,
  '["/store-1.jpg"]'::jsonb,
  'تيشيرتات',
  'شباب',
  'شباب',
  '["S","M","L","XL","XXL"]'::jsonb,
  '[{"name":"أبيض","token":"white"}]'::jsonb,
  25,
  false,
  false,
  true,
  'تيشيرت قطن 100% بقصة أوفرسايز مريحة وطباعة مميزة.'
)
ON CONFLICT (id) DO NOTHING;
