import {createFileRoute,Link} from '@tanstack/react-router';
import {Button} from '@/components/ui/button';
import {PageTitle,Benefits} from '@/components/store/store-ui';
import {meta} from '@/lib/products';
import campaign from '@/assets/hoodie-black.jpg';

export const Route=createFileRoute('/about')({
  head:()=>meta('من نحن','Roussi Mode — ستريت وير جزائري بطابع شبابي وأسعار مناسبة.'),
  component:()=> <main>
    <div className="container-store">
      <PageTitle title="من نحن" description="Roussi Mode — ستريت وير جزائري. 🇩🇿"/>
      <section className="story">
        <img src={campaign} alt="ملابس شبابية ستريت وير"/>
        <div>
          <div className="eyebrow">ROUSSI MODE · EST. 2026</div>
          <h2>ستايل جزائري.<br/>روح شبابية. 🔥</h2>
          <p>نؤمنو بلي الستايل ماشي غير ملابس — هو طريقة تعبير. في Roussi Mode، نجيبولك أحسن القطع الكاجوال والستريت وير اللي تناسب حياتك اليومية.</p>
          <p>هوديات مريحة، جينز بقصات عصرية، جاكيتات تخليك تبان مختلف. كل قطعة مختارة بعناية باش تعطيك لوك فوق العادة بسعر يناسب الجيب.</p>
          <p>من الجزائر، للشباب الجزائريين. 🇩🇿</p>
          <Button asChild className="mt-5 h-12"><Link to="/products">اكتشف التشكيلة</Link></Button>
        </div>
      </section>
    </div>
    <Benefits/>
  </main>
});
