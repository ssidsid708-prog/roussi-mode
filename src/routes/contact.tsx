import {createFileRoute} from '@tanstack/react-router';
import {useState} from 'react';
import {Button} from '@/components/ui/button';
import {PageTitle} from '@/components/store/store-ui';
import {meta} from '@/lib/products';

export const Route=createFileRoute('/contact')({head:()=>meta('تواصل معنا','تواصل مع Roussi Mode للاستفسار عن الملابس والمقاسات والطلبات.'),component:Contact});

function Contact(){
  const [saved,setSaved]=useState(false);
  return <main className="container-store">
    <PageTitle title="تواصل معنا" description="عندك سؤال؟ راسلنا ونجاوبوك! 💬"/>
    <div className="form-layout">
      <div>
        <h2 className="text-2xl font-medium mb-5">يسعدنا نسمعوك</h2>
        <p className="text-sm text-muted-foreground leading-8 mb-7">سؤال على مقاس، لون، أو طلبية؟ راسلنا وفريقنا يجاوبك في أقرب وقت.</p>
        <div className="border-t py-5">
          <h3 className="text-sm font-medium">📱 الهاتف وWhatsApp</h3>
          <p className="text-sm text-muted-foreground mt-2">سيُضاف رقم المحل قريباً.</p>
        </div>
        <div className="border-t py-5">
          <h3 className="text-sm font-medium">📸 Facebook وInstagram</h3>
          <p className="text-sm text-muted-foreground mt-2">سيُضاف رابط الحساب الرسمي قريباً.</p>
        </div>
        <div className="border-t py-5">
          <h3 className="text-sm font-medium">📍 زورونا في المحل</h3>
          <p className="text-sm text-muted-foreground mt-2">العنوان وأوقات العمل بانتظار تأكيد صاحب المحل.</p>
        </div>
      </div>
      <form onSubmit={e=>{e.preventDefault();setSaved(true);}}>
        <div className="notice">النموذج للمعاينة فقط. لن تُرسل الرسالة إلى المحل حالياً.</div>
        <div className="form-grid">
          {([['contact-name','الاسم'],['contact-phone','رقم الهاتف']] as const).map(([id,label])=>
            <div key={id}><label htmlFor={id}>{label} *</label><input id={id} required className="field" type={id.includes('phone')?'tel':'text'}/></div>
          )}
          <div className="form-full"><label htmlFor="message">الرسالة *</label><textarea className="field" id="message" required rows={6}/></div>
        </div>
        <Button className="w-full h-12 mt-5" type="submit">معاينة الرسالة</Button>
        {saved&&<p role="status" className="text-sm mt-4">✅ رسالتك جاهزة. الإرسال الفعلي يكون بعد ربط المتجر.</p>}
      </form>
    </div>
  </main>;
}
