import {createFileRoute,Link} from '@tanstack/react-router';
import {PageTitle} from '@/components/store/store-ui';
import {meta} from '@/lib/products';

export const Route=createFileRoute('/policies')({
  validateSearch:(s:Record<string,unknown>):{section?:string}=>typeof s['section']==='string'?{section:s['section']}:{},
  head:()=>meta('خدمة العملاء','معلومات الطلب، التوصيل، الاستبدال والخصوصية في Roussi Mode.'),
  component:Policies,
});

const content:Record<string,[string,string]>={
  ordering:['كيفاش تطلب 📦','اختار القطعة اللي تعجبك، خير المقاس واللون اللي يوالموك، وزيدها للسلة. عمر بياناتك (الاسم، التليفون، العنوان) وأكد الطلب. راهي ساهلة ماهلة! الطلب حالياً تجريبي وما راحش يترسل للمحل.'],
  delivery:['التوصيل 🚚','نوصلو لـ 58 ولاية جزائرية! التوصيل للباب ولا للمكتب كيما تحب. أسعار التوصيل ومدة الانتظار تتحدد على حساب الولاية نتاعك وتظهرلك قبل ما تأكد الطلبية.'],
  exchange:['تبديل المقاس 🔄','إذا ما جاكش المقاس اللي طلبتو، ماكانش مشكل! تقدر تبدلو في ظرف 3 أيام من تاريخ الاستلام، بشرط تكون القطعة ما تلبستش وفي حالتها الأصلية. مصاريف توصيل الاستبدال تكون على المشتري.'],
  privacy:['سياسة الخصوصية 🔒','معلوماتك (الاسم، رقم الهاتف، العنوان) نستعملوها غير باش نوصلولك الطلبية نتاعك بأمان. ما راحش نشاركوها مع أي جهة أخرى. في هذه المعاينة، المعلومات راهي تُحفظ غير في المتصفح نتاعك.']
};

function Policies(){
  const {section}=Route.useSearch();
  const [title,text]=content[section||'ordering']||['كيفاش تطلب','اختار القطع نتاعك وعمر البيانات باش تكمل الطلب التجريبي.'];
  return <main className="container-store max-w-4xl pb-20">
    <PageTitle title={title}/>
    <nav className="flex flex-wrap gap-5 border-b pb-5 mb-8">
      {Object.entries(content).map(([key,[label]])=><Link key={key} to="/policies" search={{section:key}} className="text-sm">{label.split(' ')[0]}</Link>)}
    </nav>
    <p className="leading-9 text-muted-foreground">{text}</p>
  </main>;
}
