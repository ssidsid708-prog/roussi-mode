import { l as meta, o as findProduct } from "./_ssr/button-Drtlfjic.mjs";
import { _ as lazyRouteComponent, v as createFileRoute } from "./_libs/@tanstack/react-router+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_slug-D-cq6kqK.js
var $$splitComponentImporter = () => import("./_slug-CNqcOqBh.mjs");
var Route = createFileRoute("/product/$slug")({
	head: ({ params }) => {
		const p = findProduct(params.slug);
		return meta(p?.name || "منتج غير موجود", p?.description || "اكتشف تشكيلة المتجر");
	},
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
//#endregion
export { Route as t };
