import {createFileRoute} from '@tanstack/react-router';
import {Catalog,PageTitle} from '@/components/store/store-ui';
import {meta} from '@/lib/products';

export const Route=createFileRoute('/promotions')({
  head:()=>meta('عروضنا','اكتشف تخفيضات Roussi Mode على ملابس الشباب الكاجوال والستريت وير.'),
  component:()=> <main className="container-store">
    <PageTitle title="عروضنا 💥" description="قطع بتخفيضات كبيرة. سارع قبل ما تخلص!"/>
    <Catalog promo/>
  </main>
});
