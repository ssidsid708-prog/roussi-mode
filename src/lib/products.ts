import hoodie from '@/assets/hoodie-black.jpg';
import sweatshirt from '@/assets/sweatshirt-grey.jpg';
import jeans from '@/assets/jeans-dark.jpg';
import m0 from '@/assets/mens-0.jpg';
import m1 from '@/assets/mens-1.jpg';
import m2 from '@/assets/mens-2.jpg';
import m3 from '@/assets/mens-3.jpg';
import k0 from '@/assets/kids-0.jpg';

export type ProductColor = { name: string; token: string };
export type Product = { id:string; name:string; slug:string; description:string; price:number; oldPrice?:number|undefined; discount:number; images:string[]; category:string; gender:string; ageGroup:string; sizes:string[]; colors:ProductColor[]; stock:number; isNew:boolean; isFeatured:boolean; isPromo:boolean; createdAt:string };

export const categories = ['الكل','هوديات','سويت شيرت','جينز','سراويل كارغو','جاكيتات','تيشيرتات','طقم رياضي','إكسسوارات','عروض'];

const seeds = [
 ['hoodie-noir','هودي أسود أوفرسايز',4500,5800,hoodie,'هوديات',['S','M','L','XL','XXL'],'أسود','black'],
 ['sweatshirt-gris','سويت شيرت رمادي كلاسيك',3800,0,sweatshirt,'سويت شيرت',['S','M','L','XL'],'رمادي','grey'],
 ['jean-slim-dark','جينز سليم فيت داكن',4200,5500,jeans,'جينز',['38','40','42','44'],'أزرق داكن','blue'],
 ['cargo-kaki','سروال كارغو خاكي',3900,4800,m0,'سراويل كارغو',['S','M','L','XL'],'خاكي','sage'],
 ['bomber-olive','بومبر جاكيت زيتي',6200,0,m3,'جاكيتات',['M','L','XL','XXL'],'زيتي','sage'],
 ['tshirt-oversize','تيشيرت أوفرسايز أبيض',2500,3200,m1,'تيشيرتات',['S','M','L','XL','XXL'],'أبيض','white'],
 ['tracksuit-black','طقم رياضي أسود',5500,6800,k0,'طقم رياضي',['S','M','L','XL'],'أسود','black'],
 ['hoodie-vert','هودي أخضر فوريست',4500,0,m2,'هوديات',['S','M','L','XL'],'أخضر','sage'],
] as const;

export const defaultProducts: Product[] = seeds.map((s,i)=>({
  id: String(i+1),
  slug: s[0],
  name: s[1],
  price: s[2],
  oldPrice: s[3] || undefined,
  discount: s[3] ? Math.round((1 - s[2] / s[3]) * 100) : 0,
  images: [s[4]],
  category: s[5],
  gender: 'شباب',
  ageGroup: 'شباب',
  sizes: [...s[6]],
  colors: [{ name: s[7], token: s[8] }],
  stock: i === 7 ? 0 : 15,
  description: 'قطعة ستريت وير بتصميم عصري وخامة مريحة تناسب إطلالتك اليومية. قصة أوفرسايز عملية تمنحك ستايل فريد. يُنصح بالغسل على حرارة منخفضة للحفاظ على الجودة.',
  isNew: i < 5,
  isFeatured: i < 4,
  isPromo: !!s[3],
  createdAt: '2026-10-01',
}));

export const presetImages = [
  { label: 'هودي أسود', url: hoodie },
  { label: 'سويت شيرت رمادي', url: sweatshirt },
  { label: 'جينز أزرق داكن', url: jeans },
  { label: 'كارغو خاكي', url: m0 },
  { label: 'تيشيرت أبيض', url: m1 },
  { label: 'هودي أخضر', url: m2 },
  { label: 'بومبر جاكيت', url: m3 },
  { label: 'طقم رياضي', url: k0 },
];

export function getStoredProducts(): Product[] {
  if (typeof window === 'undefined') return defaultProducts;
  try {
    const raw = localStorage.getItem('roussi-products');
    if (!raw) {
      localStorage.setItem('roussi-products', JSON.stringify(defaultProducts));
      return defaultProducts;
    }
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : defaultProducts;
  } catch {
    return defaultProducts;
  }
}

export function saveStoredProducts(list: Product[]) {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem('roussi-products', JSON.stringify(list));
    window.dispatchEvent(new Event('roussi-products-updated'));
  } catch (e) {
    console.error('Failed to save products', e);
  }
}

export const products: Product[] = typeof window !== 'undefined' ? getStoredProducts() : defaultProducts;

export const money = (value: number) => `${value.toLocaleString('fr-DZ')} د.ج`;
export const findProduct = (slugOrId: string) => {
  const current = getStoredProducts();
  return current.find(p => p.slug === slugOrId || p.id === slugOrId) || defaultProducts.find(p => p.slug === slugOrId || p.id === slugOrId);
};
export const matchesCategory = (p: Product, c: string) => !c || c === 'الكل' || (c === 'عروض' ? p.isPromo : p.category === c);
export const meta = (title: string, description: string) => ({
  meta: [
    { title: `${title} | Roussi Mode` },
    { name: 'description', content: description },
    { property: 'og:title', content: `${title} | Roussi Mode` },
    { property: 'og:description', content: description },
    { property: 'og:type', content: 'website' },
    { name: 'twitter:card', content: 'summary_large_image' },
  ],
});

