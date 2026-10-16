import {createFileRoute} from '@tanstack/react-router';
import {CartContents,PageTitle} from '@/components/store/store-ui';
import {meta} from '@/lib/products';
export const Route=createFileRoute('/cart')({head:()=>meta('سلة التسوق','راجع اختياراتك والمقاسات والكميات قبل إتمام طلبك.'),component:()=> <main className="container-store max-w-4xl pb-16"><PageTitle title="سلة التسوق" description="اختيارات جميلة. خطوة واحدة تفصلك عنها."/><CartContents/></main>});
