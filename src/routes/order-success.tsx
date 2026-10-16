import {createFileRoute,Link} from '@tanstack/react-router';
import {Check} from 'lucide-react';
import {Button} from '@/components/ui/button';
import {useStore} from '@/lib/store-context';
import {findProduct,meta,money} from '@/lib/products';

export const Route=createFileRoute('/order-success')({head:()=>meta('تأكيد الطلب','ملخص طلبك التجريبي لدى Roussi Mode.'),component:Success});

function Success(){
  const {order}=useStore();
  if(!order) return <main className="empty"><h1>ما كاين حتى طلبية بعد</h1><Button asChild className="mt-5"><Link to="/products">تسوق الآن</Link></Button></main>;
  return <main className="container-store max-w-3xl py-14">
    <div className="text-center">
      <Check className="mx-auto size-12 mb-5"/>
      <h1 className="text-3xl font-medium">تم إنشاء طلبك التجريبي بنجاح ✅</h1>
      <p className="text-muted-foreground mt-4 mb-7">شكراً لثقتك بينا! هذي معاينة فقط، الطلبية ماراحش تتوصل.</p>
      <p className="text-sm">رقم الطلب: <b dir="ltr">{order.id}</b></p>
    </div>
    <div className="summary mt-8">
      {order.items.map((i,n)=>{const p=findProduct(i.productId);return <div className="summary-line" key={n}><span>{p?.name}<small className="block text-muted-foreground">{i.size} · {i.color} · {i.quantity}</small></span><span>{money((p?.price||0)*i.quantity)}</span></div>;})}
      <div className="summary-line summary-total"><span>مجموع المنتجات</span><span>{money(order.total)}</span></div>
      <div className="border-t mt-5 pt-5 text-sm leading-8">
        <p>{order.customer['name']}</p>
        <p dir="ltr" className="text-right">{order.customer['phone']}</p>
        <p>{order.customer['wilaya']}، {order.customer['commune']}</p>
        <p>{order.customer['address']}</p>
      </div>
    </div>
    <Button asChild className="w-full h-12 mt-7"><Link to="/">العودة للمتجر</Link></Button>
  </main>;
}
