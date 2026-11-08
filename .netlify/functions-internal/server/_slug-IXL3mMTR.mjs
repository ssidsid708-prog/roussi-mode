import { r as __toESM } from "./_runtime.mjs";
import { n as require_react } from "./_libs/@radix-ui/react-compose-refs+[...].mjs";
import { i as require_jsx_runtime } from "./_libs/@radix-ui/react-label+[...].mjs";
import { f as products, h as useStore, o as findProduct, t as Button, u as money } from "./_ssr/button-0EtQqkU-.mjs";
import { b as Link, x as useNavigate } from "./_libs/@tanstack/react-router+[...].mjs";
import { G as ArrowLeft, W as Check, r as Truck } from "./_libs/lucide-react.mjs";
import { c as ProductCard, l as SectionHeading } from "./_ssr/store-ui-86MHy0ci.mjs";
import { t as Route } from "./_slug-cjpdD7QK.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_slug-IXL3mMTR.js
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
function Detail() {
	const { slug } = Route.useParams(), store = useStore(), navigate = useNavigate();
	const p = store.products.find((x) => x.slug === slug || x.id === slug) || findProduct(slug);
	const [size, setSize] = (0, import_react.useState)(""), [color, setColor] = (0, import_react.useState)(""), [quantity, setQuantity] = (0, import_react.useState)(1), [error, setError] = (0, import_react.useState)("");
	if (!p) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "container-store empty",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", { children: "المنتج غير موجود" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
			asChild: true,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/products",
				children: "العودة للمنتجات"
			})
		})]
	});
	const handleOrder = (e) => {
		e.preventDefault();
		if (!size || !color) {
			setError("لازم تختار المقاس واللون أولاً!");
			return;
		}
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
		const createdOrder = store.addDirectOrder({
			productId: p.id,
			size,
			color,
			quantity
		}, {
			...values,
			phone
		});
		sessionStorage.setItem("roussi-order", JSON.stringify({
			id: createdOrder.id,
			items: [{
				productId: p.id,
				size,
				color,
				quantity
			}],
			customer: {
				...values,
				phone
			},
			total: p.price * quantity
		}));
		setError("");
		navigate({ to: "/order-success" });
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "container-store",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "breadcrumb pt-7",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/",
						children: "الرئيسية"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "/" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/products",
						children: "منتجاتنا"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "/" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: p.name })
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "detail-layout",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					className: "detail-image",
					src: p.images[0],
					alt: p.name
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex gap-3 mt-3",
					children: p.images.map((img) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						className: "w-16 border rounded-lg",
						src: img,
						alt: p.name
					}, img))
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "detail-copy",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "eyebrow",
							children: ["ستريت وير · ", p.category]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", { children: p.name }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "price",
							children: [
								money(p.price),
								p.oldPrice && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("del", { children: money(p.oldPrice) }),
								p.isPromo && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "product-badge sale",
									children: [
										"−",
										p.discount,
										"%"
									]
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex gap-2 items-center text-xs mt-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { size: 15 }), p.stock ? "✅ متوفر في المخزون" : "❌ نفد من المخزون"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
							onSubmit: handleOrder,
							className: "order-form-card relative mt-8 p-6 sm:p-7",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "green-light-beam-glow pointer-events-none",
								"aria-hidden": "true",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "beam-line" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "beam-spotlight" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "beam-glow-orb" })
								]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "relative z-10",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHeading, {
										title: "تفاصيل الطلب والتوصيل ⚡",
										subtitle: "املأ معلوماتك وسنتصل بك لتأكيد طلبك قبل الإرسال."
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "form-grid mt-5",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
												htmlFor: "size",
												className: "text-sm font-medium",
												children: "المقاس *"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
												id: "size",
												name: "size",
												className: "field w-full mt-1.5",
												required: true,
												value: size,
												onChange: (e) => setSize(e.target.value),
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
													value: "",
													disabled: true,
													children: "اختر المقاس"
												}), p.sizes.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
													value: s,
													children: s
												}, s))]
											})] }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
												htmlFor: "color",
												className: "text-sm font-medium",
												children: "اللون *"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
												id: "color",
												name: "color",
												className: "field w-full mt-1.5",
												required: true,
												value: color,
												onChange: (e) => setColor(e.target.value),
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
													value: "",
													disabled: true,
													children: "اختر اللون"
												}), p.colors.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
													value: c.name,
													children: c.name
												}, c.name))]
											})] }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
												htmlFor: "quantity",
												className: "text-sm font-medium",
												children: "الكمية *"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
												id: "quantity",
												name: "quantity",
												type: "number",
												min: "1",
												max: p.stock,
												required: true,
												className: "field w-full mt-1.5",
												value: quantity,
												onChange: (e) => setQuantity(parseInt(e.target.value) || 1)
											})] }),
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
												className: "text-sm font-medium",
												children: [label, " *"]
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
												id: name,
												name,
												type,
												required: true,
												className: "field w-full mt-1.5",
												minLength: name === "name" ? 3 : 10,
												dir: type === "tel" ? "ltr" : void 0,
												placeholder: type === "tel" ? "05 / 06 / 07..." : void 0
											})] }, name)),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
												htmlFor: "wilaya",
												className: "text-sm font-medium",
												children: "الولاية *"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
												className: "field w-full mt-1.5",
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
												className: "text-sm font-medium",
												children: "البلدية *"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
												className: "field w-full mt-1.5",
												id: "commune",
												name: "commune",
												required: true,
												placeholder: "اسم البلدية"
											})] }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "form-full",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
													htmlFor: "address",
													className: "text-sm font-medium",
													children: "العنوان بالتفصيل *"
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
													className: "field w-full mt-1.5",
													id: "address",
													name: "address",
													required: true,
													minLength: 5,
													placeholder: "الحي، رقم العمارة أو المنزل..."
												})]
											})
										]
									}),
									error && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-destructive mt-4 font-bold",
										role: "alert",
										children: error
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
										disabled: !p.stock,
										className: "w-full h-14 mt-6 text-lg font-bold shadow-lg",
										type: "submit",
										children: ["تأكيد الطلب الآن ⚡ ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "ml-2" })]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "notice flex items-center justify-center gap-2 mt-4 text-sm font-medium",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Truck, { size: 18 }), " 🇩🇿 الدفع عند الاستلام. توصيل سريع لجميع الولايات."]
									})
								]
							})]
						})
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "section border-t mt-12",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHeading, { title: "قد يعجبك أيضاً 👀" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "product-grid",
					children: products.filter((x) => x.id !== p.id).slice(0, 4).map((x) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProductCard, { product: x }, x.id))
				})]
			})
		]
	});
}
//#endregion
export { Detail as component };
