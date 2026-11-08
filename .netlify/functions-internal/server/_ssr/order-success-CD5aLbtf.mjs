import { i as require_jsx_runtime } from "../_libs/@radix-ui/react-label+[...].mjs";
import { h as useStore, o as findProduct, t as Button, u as money } from "./button-0EtQqkU-.mjs";
import { b as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { W as Check } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/order-success-CD5aLbtf.js
var import_jsx_runtime = require_jsx_runtime();
function Success() {
	const { order } = useStore();
	if (!order) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "empty",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", { children: "ما كاين حتى طلبية بعد" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
			asChild: true,
			className: "mt-5",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/products",
				children: "تسوق الآن"
			})
		})]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "container-store max-w-3xl py-14",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "text-center",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "mx-auto size-12 mb-5" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "text-3xl font-medium",
						children: "تم إنشاء طلبك التجريبي بنجاح ✅"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-muted-foreground mt-4 mb-7",
						children: "شكراً لثقتك بينا! هذي معاينة فقط، الطلبية ماراحش تتوصل."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-sm",
						children: ["رقم الطلب: ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", {
							dir: "ltr",
							children: order.id
						})]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "summary mt-8",
				children: [
					order.items.map((i, n) => {
						const p = findProduct(i.productId);
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "summary-line",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [p?.name, /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("small", {
								className: "block text-muted-foreground",
								children: [
									i.size,
									" · ",
									i.color,
									" · ",
									i.quantity
								]
							})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: money((p?.price || 0) * i.quantity) })]
						}, n);
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "summary-line summary-total",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "مجموع المنتجات" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: money(order.total) })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "border-t mt-5 pt-5 text-sm leading-8",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: order.customer["name"] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								dir: "ltr",
								className: "text-right",
								children: order.customer["phone"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
								order.customer["wilaya"],
								"، ",
								order.customer["commune"]
							] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: order.customer["address"] })
						]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				asChild: true,
				className: "w-full h-12 mt-7",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/",
					children: "العودة للمتجر"
				})
			})
		]
	});
}
//#endregion
export { Success as component };
