import { i as require_jsx_runtime } from "../_libs/@radix-ui/react-label+[...].mjs";
import { r as Catalog, s as PageTitle } from "./store-ui-S5yLwTDg.mjs";
import { t as Route } from "./products-RBhrTWe4.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/products-BtBOegH2.js
var import_jsx_runtime = require_jsx_runtime();
function Page() {
	const { category } = Route.useSearch();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "container-store",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageTitle, {
			title: "منتجاتنا",
			description: "كل القطع اللي تحتاجها لستايل شبابي مختلف. 🔥"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Catalog, { initialCategory: category || "الكل" })]
	});
}
//#endregion
export { Page as component };
