import { l as meta } from "./button-Drtlfjic.mjs";
import { _ as lazyRouteComponent, v as createFileRoute } from "../_libs/@tanstack/react-router+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/policies-CFv513jp.js
var $$splitComponentImporter = () => import("./policies-DJm7BSjl.mjs");
var Route = createFileRoute("/policies")({
	validateSearch: (s) => typeof s["section"] === "string" ? { section: s["section"] } : {},
	head: () => meta("خدمة العملاء", "معلومات الطلب، التوصيل، الاستبدال والخصوصية في Roussi Mode."),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
//#endregion
export { Route as t };
