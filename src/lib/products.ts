export type ProductColor = { name: string; token: string };
export type Product = { id:string; name:string; slug:string; description:string; price:number; oldPrice?:number|undefined; discount:number; images:string[]; category:string; gender:string; ageGroup:string; sizes:string[]; colors:ProductColor[]; stock:number; isNew:boolean; isFeatured:boolean; isPromo:boolean; createdAt:string };

export const categories = ['الكل','هوديات','سويت شيرت','جينز','سراويل كارغو','جاكيتات','تيشيرتات','طقم رياضي','إكسسوارات','عروض'];

// No demo products — start with an empty catalogue
export const defaultProducts: Product[] = [];

// No preset images (demo assets removed)
export const presetImages: { label: string; url: string }[] = [];

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

