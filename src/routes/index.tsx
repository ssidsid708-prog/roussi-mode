import { createFileRoute, Link } from '@tanstack/react-router';
import { ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Benefits, Catalog, ProductCard, SectionHeading } from '@/components/store/store-ui';
import { meta } from '@/lib/products';
import { useStore } from '@/lib/store-context';
import hoodies from '@/assets/sweatshirt-grey.jpg';
import jeans from '@/assets/jeans-dark.jpg';
import jackets from '@/assets/mens-3.jpg';
import store1 from '@/assets/store-1.jpg';
import store2 from '@/assets/store-2.jpg';
import store3 from '@/assets/store-3.jpg';

export const Route = createFileRoute('/')({
  head: () => meta('ستايلك يبدأ من هنا', 'اكتشف تشكيلة Roussi Mode لملابس الشباب الكاجوال والستريت وير في الجزائر.'),
  component: Home,
});

const heroSlides = [
  {
    image: store1,
    eyebrow: 'تشكيلة جديدة · STREET STYLE 2026',
    title: 'ستايلك يبدا منا 💯',
    desc: 'اكتشف جديد الستريت وير نتاعنا. هوديات، سويت شيرت، جينز وأكثر — كاليتي هربانة وأسعار تخرج عليك.',
    tag: 'STREETWEAR COLLECTION — 2026',
  },
  {
    image: store2,
    eyebrow: 'إطلالات حصرية · NEW ARRIVALS',
    title: 'لوك هربان يخرج عليك 🔥',
    desc: 'بومبر جاكيت وقطع كاجوال عصرية تمنحك حضوراً مميزاً في كل خرجة. جودة عالية وتفاصيل متقنة.',
    tag: 'URBAN VIBES — ALGIERS 2026',
  },
  {
    image: store3,
    eyebrow: 'المتجر الرسمي · ROUSSI MODE STORE',
    title: 'كلش واجد في بلاصة وحدة ⚡',
    desc: 'أحدث التشكيلات الحصرية وأفضل الموديلات بأحسن الأسعار. توصيل سريع لـ 58 ولاية والدفع عند الاستلام.',
    tag: 'FLAGSHIP STORE — ALGERIA',
  },
];

function Home() {
  const { products } = useStore();
  const [currentImg, setCurrentImg] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setCurrentImg(prev => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [isPaused]);

  const prevSlide = () => {
    setCurrentImg(prev => (prev - 1 + heroSlides.length) % heroSlides.length);
  };

  const nextSlide = () => {
    setCurrentImg(prev => (prev + 1) % heroSlides.length);
  };

  return (
    <main>
      <section 
        className="hero relative select-none"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {heroSlides.map((slide, idx) => {
          const isActive = idx === currentImg;
          return (
            <div
              key={idx}
              className={`hero-slide absolute inset-0 transition-opacity duration-1000 ${
                isActive ? 'opacity-100 z-0' : 'opacity-0 -z-10 pointer-events-none'
              }`}
            >
              <img 
                src={slide.image} 
                className={`hero-image w-full h-full object-cover transition-transform duration-7000 ease-out ${
                  isActive ? 'scale-105' : 'scale-100'
                }`}
                style={{ 
                  filter: 'brightness(0.65) contrast(1.1) saturate(1.1)',
                  objectPosition: 'center 35%'
                }}
                alt="Roussi Mode Streetwear" 
              />
            </div>
          );
        })}

        {/* Dynamic content with subtle animation */}
        <div className="hero-content container-store">
          <div className="hero-copy" key={currentImg}>
            <div className="eyebrow">{heroSlides[currentImg].eyebrow}</div>
            <h1>{heroSlides[currentImg].title}</h1>
            <p>{heroSlides[currentImg].desc}</p>
            <div className="hero-actions">
              <Button asChild className="h-12 px-7 shadow-lg">
                <Link to="/products">شري دوكا <ArrowLeft /></Link>
              </Button>
              <Button variant="outline" asChild className="h-12 px-6 bg-background/50 backdrop-blur-md border-white/20 hover:bg-background/80">
                <Link to="/promotions">شوف الصولد</Link>
              </Button>
            </div>
          </div>
        </div>

        {/* Next / Prev Navigation Buttons */}
        <button
          onClick={prevSlide}
          aria-label="الصورة السابقة"
          className="hero-nav-btn prev"
          type="button"
        >
          <ChevronRight size={22} />
        </button>
        <button
          onClick={nextSlide}
          aria-label="الصورة التالية"
          className="hero-nav-btn next"
          type="button"
        >
          <ChevronLeft size={22} />
        </button>

        {/* Indicators */}
        <div className="hero-indicators">
          {heroSlides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentImg(idx)}
              aria-label={`انتقل إلى الشريحة ${idx + 1}`}
              className={`hero-dot ${idx === currentImg ? 'active' : ''}`}
              type="button"
            />
          ))}
        </div>

        <div className="hero-index">
          <b>0{currentImg + 1}</b>
          <span />
          <small>0{heroSlides.length}</small>
        </div>
        <span className="hero-season" dir="ltr">{heroSlides[currentImg].tag}</span>
      </section>

      <Benefits />

      <section className="container-store pt-6 pb-6">
        <div className="new-arrivals-section">
          {/* Green Neon Light Beam & Rays Effects */}
          <div className="green-light-beam-glow" aria-hidden="true">
            <div className="beam-line" />
            <div className="beam-spotlight" />
            <div className="beam-ray beam-ray-1" />
            <div className="beam-ray beam-ray-2" />
            <div className="beam-glow-orb" />
          </div>

          <div className="relative z-10">
            <SectionHeading title="الجديد اللي دخل 🔥" subtitle="أحدث القطع اللي وصلت للحانوت. خف قبل ما تطير!" />
            <Catalog home />
          </div>
        </div>
      </section>

      <section className="container-store section">
        <SectionHeading title="شوبينغ حبة حبة" subtitle="اختار اللوك اللي يعجبك. كل كاتيغوري فيها الحاجة اللي تسحقها." />
        <div className="category-grid">
          {([
            [hoodies, 'هوديات', 'الدفا والستايل 🔥'],
            [jeans, 'جينز', 'كلاسيك ما يتقادمش'],
            [jackets, 'جاكيتات', 'لوك هربان'],
          ] as const).map(([img, c, sub]) => (
            <Link to="/products" search={{ category: c }} key={c} className="category-card">
              <img src={img} alt={c} loading="lazy" />
              <div className="category-label">
                <div><h3>{c}</h3><small>{sub}</small></div>
                <ArrowLeft size={20} />
              </div>
            </Link>
          ))}
        </div>
      </section>

      <div className="container-store">
        <section className="promo-band">
          <div className="promo-content text-center flex flex-col items-center">
            <div className="eyebrow mx-auto justify-center">عروض خاصة · صولد مهبول</div>
            <h2 className="text-3xl font-black mb-3 text-center w-full">برومو ما تتراطاش 💥</h2>
            <p className="mb-6 text-center w-full max-w-md mx-auto">قطع ستريت وير بأسعار هبال. روح شوف قبل ما يخلصو!</p>
          </div>
          <div className="flex justify-center w-full">
            <Button variant="secondary" asChild className="h-12 px-8 w-full sm:max-w-xs">
              <Link to="/promotions" className="flex items-center justify-center gap-2">شوف ڨاع لي برومو <ArrowLeft size={18} /></Link>
            </Button>
          </div>
        </section>
      </div>

      <section className="container-store pt-6 pb-6">
        <div className="all-products-section">
          {/* Green Neon Light Beam & Rays Effects */}
          <div className="green-light-beam-glow" aria-hidden="true">
            <div className="beam-line" />
            <div className="beam-spotlight" />
            <div className="beam-ray beam-ray-1" />
            <div className="beam-ray beam-ray-2" />
            <div className="beam-glow-orb" />
          </div>

          <div className="relative z-10">
            <SectionHeading title="ڨاع السلعة" subtitle="كلش كاين باش تخرج بلوك شبابي مكتمل." />
            <Catalog />
          </div>
        </div>
      </section>

      <section className="container-store section border-t">
        <SectionHeading title="مختارات بأسعار هبال" subtitle="ستايل خشين، بسعر حنين." link="/promotions" />
        <div className="product-grid">
          {products.filter(p => p.isPromo).map(p => <ProductCard product={p} key={p.id} />)}
        </div>
      </section>
    </main>
  );
}
