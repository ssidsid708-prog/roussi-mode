import { r as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { i as require_jsx_runtime } from "../_libs/@radix-ui/react-label+[...].mjs";
import { t as Button } from "./button-Drtlfjic.mjs";
import { s as PageTitle } from "./store-ui-S5yLwTDg.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/contact-DwXrWFb3.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Contact() {
	const [saved, setSaved] = (0, import_react.useState)(false);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "container-store",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageTitle, {
			title: "تواصل معنا",
			description: "عندك سؤال؟ راسلنا ونجاوبوك! 💬"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "form-layout",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-2xl font-medium mb-5",
					children: "يسعدنا نسمعوك"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-muted-foreground leading-8 mb-7",
					children: "سؤال على مقاس، لون، أو طلبية؟ راسلنا وفريقنا يجاوبك في أقرب وقت."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "border-t py-5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "text-sm font-medium",
						children: "📱 الهاتف وWhatsApp"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-muted-foreground mt-2",
						children: "سيُضاف رقم المحل قريباً."
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "border-t py-5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "text-sm font-medium",
						children: "📸 Facebook وInstagram"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-muted-foreground mt-2",
						children: "سيُضاف رابط الحساب الرسمي قريباً."
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "border-t py-5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "text-sm font-medium",
						children: "📍 زورونا في المحل"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-muted-foreground mt-2",
						children: "العنوان وأوقات العمل بانتظار تأكيد صاحب المحل."
					})]
				})
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				onSubmit: (e) => {
					e.preventDefault();
					setSaved(true);
				},
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "notice",
						children: "النموذج للمعاينة فقط. لن تُرسل الرسالة إلى المحل حالياً."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "form-grid",
						children: [[["contact-name", "الاسم"], ["contact-phone", "رقم الهاتف"]].map(([id, label]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							htmlFor: id,
							children: [label, " *"]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							id,
							required: true,
							className: "field",
							type: id.includes("phone") ? "tel" : "text"
						})] }, id)), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "form-full",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								htmlFor: "message",
								children: "الرسالة *"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
								className: "field",
								id: "message",
								required: true,
								rows: 6
							})]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						className: "w-full h-12 mt-5",
						type: "submit",
						children: "معاينة الرسالة"
					}),
					saved && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						role: "status",
						className: "text-sm mt-4",
						children: "✅ رسالتك جاهزة. الإرسال الفعلي يكون بعد ربط المتجر."
					})
				]
			})]
		})]
	});
}
//#endregion
export { Contact as component };
