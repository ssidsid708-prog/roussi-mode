import { l as meta } from "./button-Drtlfjic.mjs";
import { _ as lazyRouteComponent, v as createFileRoute } from "../_libs/@tanstack/react-router+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/products-RBhrTWe4.js
var $$splitComponentImporter = () => import("./products-BtBOegH2.mjs");
var Route = createFileRoute("/products")({
	validateSearch: (s) => typeof s["category"] === "string" ? { category: s["category"] } : {},
	head: () => meta("منتجاتنا", "تسوق ملابس شبابية كاجوال وستريت وير مع خيارات المقاسات والألوان."),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
//#endregion
export { Route as t };
