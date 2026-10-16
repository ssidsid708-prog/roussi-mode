import {createFileRoute,Link,useNavigate} from '@tanstack/react-router';
import {useState} from 'react';
import {Button} from '@/components/ui/button';
import {PageTitle,OrderSummary} from '@/components/store/store-ui';
import {meta} from '@/lib/products';
import {useStore} from '@/lib/store-context';

export const Route=createFileRoute('/checkout')({head:()=>meta('إتمام طلبك','أكمل بيانات الطلب مباشرة دون إنشاء حساب.'),component:Checkout});

const wilayas=['أدرار','الشلف','الأغواط','أم البواقي','باتنة','بجاية','بسكرة','بشار','البليدة','البويرة','تمنراست','تبسة','تلمسان','تيارت','تيزي وزو','الجزائر','الجلفة','جيجل','سطيف','سعيدة','سكيكدة','سيدي بلعباس','عنابة','قالمة','قسنطينة','المدية','مستغانم','المسيلة','معسكر','ورقلة','وهران','البيض','إليزي','برج بوعريريج','بومرداس','الطارف','تندوف','تيسمسيلت','الوادي','خنشلة','سوق أهراس','تيبازة','ميلة','عين الدفلى','النعامة','عين تموشنت','غرداية','غليزان','تيميمون','برج باجي مختار','أولاد جلال','بني عباس','عين صالح','عين قزام','تقرت','جانت','المغير','المنيعة'];

function Checkout(){
  const s=useStore(),nav=useNavigate(),[error,setError]=useState('');
  if(!s.cart.length) return <main className="empty"><h1>ما كاين والو في السلة</h1><Button asChild className="mt-6"><Link to="/products">تسوق الآن</Link></Button></main>;
  return <main className="container-store">
    <PageTitle title="إتمام طلبك" description="عبي بياناتك وخلاص. بلا حساب وبلا تعقيد. 📦"/>
    <div className="notice">⚠️ هذي معاينة للطلب فقط. الطلبية ماراحش تتوصل في هذي المرحلة.</div>
    <div className="form-layout">
      <form className="order-form-card relative p-6 sm:p-7" onSubmit={e=>{e.preventDefault();const values=Object.fromEntries(new FormData(e.currentTarget)) as Record<string,string>;const phone=(values['phone']||'').replace(/[\s-]/g,'');if(!/^(0[567]\d{8}|\+213[567]\d{8})$/.test(phone)){setError('أدخل رقم هاتف جزائري صحيح يبدأ بـ 05 أو 06 أو 07');return;}if(['name','wilaya','commune','address'].some(k=>!values[k]?.trim())){setError('لازم تعبي جميع البيانات المطلوبة');return;}s.placeOrder({...values,phone});nav({to:'/order-success'});}}>
        <div className="green-light-beam-glow pointer-events-none" aria-hidden="true">
          <div className="beam-line" />
          <div className="beam-spotlight" />
        </div>
        <div className="relative z-10">
          <div className="form-grid">
            {([['name','الاسم واللقب','text'],['phone','رقم الهاتف','tel']] as const).map(([name,label,type])=>
              <div key={name}><label htmlFor={name}>{label} *</label><input id={name} name={name} type={type} required className="field" minLength={name==='name'?3:10} dir={type==='tel'?'ltr':undefined}/></div>
            )}
            <div><label htmlFor="wilaya">الولاية *</label><select className="field" id="wilaya" name="wilaya" required defaultValue=""><option value="" disabled>اختر الولاية</option>{wilayas.map((w,i)=><option key={w}>{String(i+1).padStart(2,'0')} — {w}</option>)}</select></div>
            <div><label htmlFor="commune">البلدية *</label><input className="field" id="commune" name="commune" required/></div>
            <div className="form-full"><label htmlFor="address">العنوان بالتفصيل *</label><input className="field" id="address" name="address" required minLength={5}/></div>
            <div className="form-full"><label htmlFor="notes">ملاحظات إضافية</label><textarea className="field" id="notes" name="notes" rows={3}/></div>
          </div>
          {error&&<p role="alert" className="text-destructive text-sm mt-4 font-bold">{error}</p>}
          <Button className="w-full h-14 mt-7 text-lg font-bold" type="submit">تأكيد الطلب التجريبي ⚡</Button>
          <p className="text-xs text-muted-foreground mt-3 text-center">🇩🇿 الدفع عند الاستلام. لا يُطلب منك أي دفع إلكتروني مسبقاً.</p>
        </div>
      </form>
      <OrderSummary/>
    </div>
  </main>;
}
