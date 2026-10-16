import {createFileRoute} from '@tanstack/react-router';
import {Catalog,PageTitle} from '@/components/store/store-ui';
import {meta} from '@/lib/products';

export const Route=createFileRoute('/products')({
  validateSearch:(s:Record<string,unknown>):{category?:string}=>typeof s['category']==='string'?{category:s['category']}:{},
  head:()=>meta('منتجاتنا','تسوق ملابس شبابية كاجوال وستريت وير مع خيارات المقاسات والألوان.'),
  component:Page,
});

function Page(){
  const {category}=Route.useSearch();
  return <main className="container-store">
    <PageTitle title="منتجاتنا" description="كل القطع اللي تحتاجها لستايل شبابي مختلف. 🔥"/>
    <Catalog initialCategory={category || 'الكل'}/>
  </main>;
}
