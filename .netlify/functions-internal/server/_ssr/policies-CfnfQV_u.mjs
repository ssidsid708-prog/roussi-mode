import { i as require_jsx_runtime } from "../_libs/@radix-ui/react-label+[...].mjs";
import { b as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { s as PageTitle } from "./store-ui-86MHy0ci.mjs";
import { t as Route } from "./policies-CSb7aXWn.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/policies-CfnfQV_u.js
var import_jsx_runtime = require_jsx_runtime();
var content = {
	ordering: ["كيفاش تطلب 📦", "اختار القطعة اللي تعجبك، خير المقاس واللون اللي يوالموك، وزيدها للسلة. عمر بياناتك (الاسم، التليفون، العنوان) وأكد الطلب. راهي ساهلة ماهلة! الطلب حالياً تجريبي وما راحش يترسل للمحل."],
	delivery: ["التوصيل 🚚", "نوصلو لـ 58 ولاية جزائرية! التوصيل للباب ولا للمكتب كيما تحب. أسعار التوصيل ومدة الانتظار تتحدد على حساب الولاية نتاعك وتظهرلك قبل ما تأكد الطلبية."],
	exchange: ["تبديل المقاس 🔄", "إذا ما جاكش المقاس اللي طلبتو، ماكانش مشكل! تقدر تبدلو في ظرف 3 أيام من تاريخ الاستلام، بشرط تكون القطعة ما تلبستش وفي حالتها الأصلية. مصاريف توصيل الاستبدال تكون على المشتري."],
	privacy: ["سياسة الخصوصية 🔒", "معلوماتك (الاسم، رقم الهاتف، العنوان) نستعملوها غير باش نوصلولك الطلبية نتاعك بأمان. ما راحش نشاركوها مع أي جهة أخرى. في هذه المعاينة، المعلومات راهي تُحفظ غير في المتصفح نتاعك."]
};
function Policies() {
	const { section } = Route.useSearch();
	const [title, text] = content[section || "ordering"] || ["كيفاش تطلب", "اختار القطع نتاعك وعمر البيانات باش تكمل الطلب التجريبي."];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "container-store max-w-4xl pb-20",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageTitle, { title }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
				className: "flex flex-wrap gap-5 border-b pb-5 mb-8",
				children: Object.entries(content).map(([key, [label]]) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/policies",
					search: { section: key },
					className: "text-sm",
					children: label.split(" ")[0]
				}, key))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "leading-9 text-muted-foreground",
				children: text
			})
		]
	});
}
//#endregion
export { Policies as component };
