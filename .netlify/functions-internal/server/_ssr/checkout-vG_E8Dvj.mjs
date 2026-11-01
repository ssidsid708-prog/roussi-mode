import { r as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { i as require_jsx_runtime } from "../_libs/@radix-ui/react-label+[...].mjs";
import { h as useStore, t as Button } from "./button-Drtlfjic.mjs";
import { b as Link, x as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { o as OrderSummary, s as PageTitle } from "./store-ui-S5yLwTDg.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/checkout-vG_E8Dvj.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var wilayas = [
	"أدرار",
	"الشلف",
	"الأغواط",
	"أم البواقي",
	"باتنة",
	"بجاية",
	"بسكرة",
	"بشار",
	"البليدة",
	"البويرة",
	"تمنراست",
	"تبسة",
	"تلمسان",
	"تيارت",
	"تيزي وزو",
	"الجزائر",
	"الجلفة",
	"جيجل",
	"سطيف",
	"سعيدة",
	"سكيكدة",
	"سيدي بلعباس",
	"عنابة",
	"قالمة",
	"قسنطينة",
	"المدية",
	"مستغانم",
	"المسيلة",
	"معسكر",
	"ورقلة",
	"وهران",
	"البيض",
	"إليزي",
	"برج بوعريريج",
	"بومرداس",
	"الطارف",
	"تندوف",
	"تيسمسيلت",
	"الوادي",
	"خنشلة",
	"سوق أهراس",
	"تيبازة",
	"ميلة",
	"عين الدفلى",
	"النعامة",
	"عين تموشنت",
	"غرداية",
	"غليزان",
	"تيميمون",
	"برج باجي مختار",
	"أولاد جلال",
	"بني عباس",
	"عين صالح",
	"عين قزام",
	"تقرت",
	"جانت",
	"المغير",
	"المنيعة"
];
function Checkout() {
	const s = useStore(), nav = useNavigate(), [error, setError] = (0, import_react.useState)("");
	if (!s.cart.length) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "empty",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", { children: "ما كاين والو في السلة" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
			asChild: true,
			className: "mt-6",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/products",
				children: "تسوق الآن"
			})
		})]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "container-store",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageTitle, {
				title: "إتمام طلبك",
				description: "عبي بياناتك وخلاص. بلا حساب وبلا تعقيد. 📦"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "notice",
				children: "⚠️ هذي معاينة للطلب فقط. الطلبية ماراحش تتوصل في هذي المرحلة."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "form-layout",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
					className: "order-form-card relative p-6 sm:p-7",
					onSubmit: (e) => {
						e.preventDefault();
						const values = Object.fromEntries(new FormData(e.currentTarget));
						const phone = (values["phone"] || "").replace(/[\s-]/g, "");
						if (!/^(0[567]\d{8}|\+213[567]\d{8})$/.test(phone)) {
							setError("أدخل رقم هاتف جزائري صحيح يبدأ بـ 05 أو 06 أو 07");
							return;
						}
						if ([
							"name",
							"wilaya",
							"commune",
							"address"
						].some((k) => !values[k]?.trim())) {
							setError("لازم تعبي جميع البيانات المطلوبة");
							return;
						}
						s.placeOrder({
							...values,
							phone
						});
						nav({ to: "/order-success" });
					},
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "green-light-beam-glow pointer-events-none",
						"aria-hidden": "true",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "beam-line" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "beam-spotlight" })]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "relative z-10",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "form-grid",
								children: [
									[[
										"name",
										"الاسم واللقب",
										"text"
									], [
										"phone",
										"رقم الهاتف",
										"tel"
									]].map(([name, label, type]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
										htmlFor: name,
										children: [label, " *"]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										id: name,
										name,
										type,
										required: true,
										className: "field",
										minLength: name === "name" ? 3 : 10,
										dir: type === "tel" ? "ltr" : void 0
									})] }, name)),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
										htmlFor: "wilaya",
										children: "الولاية *"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
										className: "field",
										id: "wilaya",
										name: "wilaya",
										required: true,
										defaultValue: "",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: "",
											disabled: true,
											children: "اختر الولاية"
										}), wilayas.map((w, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("option", { children: [
											String(i + 1).padStart(2, "0"),
											" — ",
											w
										] }, w))]
									})] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
										htmlFor: "commune",
										children: "البلدية *"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										className: "field",
										id: "commune",
										name: "commune",
										required: true
									})] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "form-full",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
											htmlFor: "address",
											children: "العنوان بالتفصيل *"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
											className: "field",
											id: "address",
											name: "address",
											required: true,
											minLength: 5
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "form-full",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
											htmlFor: "notes",
											children: "ملاحظات إضافية"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
											className: "field",
											id: "notes",
											name: "notes",
											rows: 3
										})]
									})
								]
							}),
							error && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								role: "alert",
								className: "text-destructive text-sm mt-4 font-bold",
								children: error
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								className: "w-full h-14 mt-7 text-lg font-bold",
								type: "submit",
								children: "تأكيد الطلب التجريبي ⚡"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs text-muted-foreground mt-3 text-center",
								children: "🇩🇿 الدفع عند الاستلام. لا يُطلب منك أي دفع إلكتروني مسبقاً."
							})
						]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(OrderSummary, {})]
			})
		]
	});
}
//#endregion
export { Checkout as component };
