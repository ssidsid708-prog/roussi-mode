import {createFileRoute,Link,useNavigate} from '@tanstack/react-router';
import {useState} from 'react';
import {ArrowLeft,Plus,Minus,Check,Truck} from 'lucide-react';
import {Button} from '@/components/ui/button';
import {ProductCard,SectionHeading} from '@/components/store/store-ui';
import {findProduct,products,money,meta} from '@/lib/products';
import {useStore} from '@/lib/store-context';

export const Route=createFileRoute('/product/$slug')({
  head:({params})=>{const p=findProduct(params.slug);return meta(p?.name||'منتج غير موجود',p?.description||'اكتشف تشكيلة المتجر');},
  component:Detail,
});

const wilayas=['أدرار','الشلف','الأغواط','أم البواقي','باتنة','بجاية','بسكرة','بشار','البليدة','البويرة','تمنراست','تبسة','تلمسان','تيارت','تيزي وزو','الجزائر','الجلفة','جيجل','سطيف','سعيدة','سكيكدة','سيدي بلعباس','عنابة','قالمة','قسنطينة','المدية','مستغانم','المسيلة','معسكر','ورقلة','وهران','البيض','إليزي','برج بوعريريج','بومرداس','الطارف','تندوف','تيسمسيلت','الوادي','خنشلة','سوق أهراس','تيبازة','ميلة','عين الدفلى','النعامة','عين تموشنت','غرداية','غليزان','تيميمون','برج باجي مختار','أولاد جلال','بني عباس','عين صالح','عين قزام','تقرت','جانت','المغير','المنيعة'];

function Detail(){
  const {slug}=Route.useParams(),store=useStore(),navigate=useNavigate();
  const p = store.products.find(x => x.slug === slug || x.id === slug) || findProduct(slug);
  const [size,setSize]=useState(''),[color,setColor]=useState(''),[quantity,setQuantity]=useState(1),[error,setError]=useState('');

  if(!p) return <main className="container-store empty"><h1>المنتج غير موجود</h1><Button asChild><Link to="/products">العودة للمنتجات</Link></Button></main>;

  const handleOrder = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if(!size||!color){setError('لازم تختار المقاس واللون أولاً!');return;}
    
    const values=Object.fromEntries(new FormData(e.currentTarget)) as Record<string,string>;
    const phone=(values['phone']||'').replace(/[\s-]/g,'');
    if(!/^(0[567]\d{8}|\+213[567]\d{8})$/.test(phone)){setError('أدخل رقم هاتف جزائري صحيح يبدأ بـ 05 أو 06 أو 07');return;}
    if(['name','wilaya','commune','address'].some(k=>!values[k]?.trim())){setError('لازم تعبي جميع البيانات المطلوبة');return;}
    
    const createdOrder = store.addDirectOrder(
      { productId: p.id, size, color, quantity },
      { ...values, phone }
    );
    sessionStorage.setItem(
      'roussi-order',
      JSON.stringify({
        id: createdOrder.id,
        items: [{ productId: p.id, size, color, quantity }],
        customer: { ...values, phone },
        total: p.price * quantity,
      })
    );

    setError('');
    navigate({ to: '/order-success' });
  };

  return <main className="container-store">
    <div className="breadcrumb pt-7"><Link to="/">الرئيسية</Link><span>/</span><Link to="/products">منتجاتنا</Link><span>/</span><span>{p.name}</span></div>
    <div className="detail-layout">
      <div>
        <img className="detail-image" src={p.images[0]} alt={p.name}/>
        <div className="flex gap-3 mt-3">{p.images.map(img=><img key={img} className="w-16 border rounded-lg" src={img} alt={p.name}/>)}</div>
      </div>
      <div className="detail-copy">
        <div className="eyebrow">ستريت وير · {p.category}</div>
        <h1>{p.name}</h1>
        <div className="price">{money(p.price)}{p.oldPrice&&<del>{money(p.oldPrice)}</del>}{p.isPromo&&<span className="product-badge sale">−{p.discount}%</span>}</div>
        <div className="flex gap-2 items-center text-xs mt-4"><Check size={15}/>{p.stock?'✅ متوفر في المخزون':'❌ نفد من المخزون'}</div>
        
        <form onSubmit={handleOrder} className="order-form-card relative mt-8 p-6 sm:p-7">
          {/* Green Neon Light Beam & Rays Effects */}
          <div className="green-light-beam-glow pointer-events-none" aria-hidden="true">
            <div className="beam-line" />
            <div className="beam-spotlight" />
            <div className="beam-glow-orb" />
          </div>

          <div className="relative z-10">
            <SectionHeading title="تفاصيل الطلب والتوصيل ⚡" subtitle="املأ معلوماتك وسنتصل بك لتأكيد طلبك قبل الإرسال." />
            <div className="form-grid mt-5">
              <div>
                <label htmlFor="size" className="text-sm font-medium">المقاس *</label>
                <select id="size" name="size" className="field w-full mt-1.5" required value={size} onChange={e=>setSize(e.target.value)}>
                  <option value="" disabled>اختر المقاس</option>
                  {p.sizes.map(s=><option key={s} value={s}>{s}</option>)}
                </select>
              </div>
              
              <div>
                <label htmlFor="color" className="text-sm font-medium">اللون *</label>
                <select id="color" name="color" className="field w-full mt-1.5" required value={color} onChange={e=>setColor(e.target.value)}>
                  <option value="" disabled>اختر اللون</option>
                  {p.colors.map(c=><option key={c.name} value={c.name}>{c.name}</option>)}
                </select>
              </div>

              <div>
                <label htmlFor="quantity" className="text-sm font-medium">الكمية *</label>
                <input id="quantity" name="quantity" type="number" min="1" max={p.stock} required className="field w-full mt-1.5" value={quantity} onChange={e=>setQuantity(parseInt(e.target.value)||1)} />
              </div>

              {([['name','الاسم واللقب','text'],['phone','رقم الهاتف','tel']] as const).map(([name,label,type])=>
                <div key={name}>
                  <label htmlFor={name} className="text-sm font-medium">{label} *</label>
                  <input id={name} name={name} type={type} required className="field w-full mt-1.5" minLength={name==='name'?3:10} dir={type==='tel'?'ltr':undefined} placeholder={type==='tel'?'05 / 06 / 07...':undefined}/>
                </div>
              )}
              <div>
                <label htmlFor="wilaya" className="text-sm font-medium">الولاية *</label>
                <select className="field w-full mt-1.5" id="wilaya" name="wilaya" required defaultValue="">
                  <option value="" disabled>اختر الولاية</option>
                  {wilayas.map((w,i)=><option key={w}>{String(i+1).padStart(2,'0')} — {w}</option>)}
                </select>
              </div>
              <div>
                <label htmlFor="commune" className="text-sm font-medium">البلدية *</label>
                <input className="field w-full mt-1.5" id="commune" name="commune" required placeholder="اسم البلدية"/>
              </div>
              <div className="form-full">
                <label htmlFor="address" className="text-sm font-medium">العنوان بالتفصيل *</label>
                <input className="field w-full mt-1.5" id="address" name="address" required minLength={5} placeholder="الحي، رقم العمارة أو المنزل..."/>
              </div>
            </div>
            
            {error&&<p className="text-destructive mt-4 font-bold" role="alert">{error}</p>}
            <Button disabled={!p.stock} className="w-full h-14 mt-6 text-lg font-bold shadow-lg" type="submit">
              تأكيد الطلب الآن ⚡ <ArrowLeft className="ml-2"/>
            </Button>
            <div className="notice flex items-center justify-center gap-2 mt-4 text-sm font-medium">
              <Truck size={18}/> 🇩🇿 الدفع عند الاستلام. توصيل سريع لجميع الولايات.
            </div>
          </div>
        </form>
      </div>
    </div>
    <section className="section border-t mt-12">
      <SectionHeading title="قد يعجبك أيضاً 👀"/>
      <div className="product-grid">{products.filter(x=>x.id!==p.id).slice(0,4).map(x=><ProductCard key={x.id} product={x}/>)}</div>
    </section>
  </main>;
}
