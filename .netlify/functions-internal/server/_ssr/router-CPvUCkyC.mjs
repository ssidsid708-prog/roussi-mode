import { r as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { i as require_jsx_runtime } from "../_libs/@radix-ui/react-label+[...].mjs";
import { l as meta, n as StoreProvider } from "./button-0EtQqkU-.mjs";
import { S as useRouter, _ as lazyRouteComponent, b as Link, d as Scripts, f as HeadContent, g as Outlet, h as createRouter, p as useLocation, v as createFileRoute, y as createRootRouteWithContext } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as Header, i as Footer } from "./store-ui-86MHy0ci.mjs";
import { t as Route$9 } from "../_slug-cjpdD7QK.mjs";
import { n as Route$10 } from "./dashboard-CkTyOfBY.mjs";
import { t as Route$11 } from "./policies-CSb7aXWn.mjs";
import { t as Route$12 } from "./products-DboTULtq.mjs";
import { t as QueryClient } from "../_libs/tanstack__query-core.mjs";
import { t as QueryClientProvider } from "../_libs/tanstack__react-query.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/router-CPvUCkyC.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var styles_default = "/assets/styles-ByhLcNdm.css";
function reportLovableError(error, context = {}) {
	if (typeof window === "undefined") return;
	window.__lovableEvents?.captureException?.(error, {
		source: "react_error_boundary",
		route: window.location.pathname,
		...context
	}, {
		mechanism: "react_error_boundary",
		handled: false,
		severity: "error"
	});
	const message = error instanceof Response ? `Response ${error.status}${error.url ? ` at ${error.url}` : ""}` : error instanceof Error ? error.message : String(error);
	const stack = error instanceof Error ? error.stack : void 0;
	window.__lovableReportRuntimeError?.({
		message,
		...stack !== void 0 && { stack },
		filename: window.location.pathname
	});
}
function NotFoundComponent() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center bg-background px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-md text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-7xl font-bold text-foreground",
					children: "404"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mt-4 text-xl font-semibold text-foreground",
					children: "Page not found"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "The page you're looking for doesn't exist or has been moved."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-6",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/",
						className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
						children: "Go home"
					})
				})
			]
		})
	});
}
function ErrorComponent({ error, reset }) {
	console.error(error);
	const router = useRouter();
	(0, import_react.useEffect)(() => {
		reportLovableError(error, { boundary: "tanstack_root_error_component" });
	}, [error]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center bg-background px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-md text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-xl font-semibold tracking-tight text-foreground",
					children: "This page didn't load"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "Something went wrong on our end. You can try refreshing or head back home."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-6 flex flex-wrap justify-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => {
							router.invalidate();
							reset();
						},
						className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
						children: "Try again"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: "/",
						className: "inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent",
						children: "Go home"
					})]
				})
			]
		})
	});
}
var Route$8 = createRootRouteWithContext()({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1"
			},
			{ title: "Roussi Mode" },
			{
				name: "description",
				content: "ملابس رجالية وملابس أطفال في الجزائر"
			},
			{
				property: "og:title",
				content: "Roussi Mode"
			},
			{
				property: "og:description",
				content: "ملابس رجالية وملابس أطفال في الجزائر"
			},
			{
				property: "og:type",
				content: "website"
			},
			{
				name: "twitter:card",
				content: "summary_large_image"
			}
		],
		links: [
			{
				rel: "stylesheet",
				href: styles_default
			},
			{
				rel: "icon",
				href: "/favicon.ico"
			},
			{
				rel: "icon",
				href: "/favicon.png",
				type: "image/png"
			},
			{
				rel: "stylesheet",
				href: "https://fonts.googleapis.com/css2?family=IBM+Plex+Sans+Arabic:wght@400;500;600;700&display=swap"
			}
		]
	}),
	shellComponent: RootShell,
	component: RootComponent,
	notFoundComponent: NotFoundComponent,
	errorComponent: ErrorComponent
});
function RootShell({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("html", {
		lang: "ar",
		dir: "rtl",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("head", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeadContent, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("body", { children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scripts, {})] })]
	});
}
function RootLayout() {
	const pathname = useLocation().pathname;
	if (pathname.startsWith("/dashboard") || pathname.startsWith("/admin")) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Header, {}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Footer, {})
	] });
}
function RootComponent() {
	const { queryClient } = Route$8.useRouteContext();
	(0, import_react.useEffect)(() => {
		const remove = () => {
			const badge = document.getElementById("nl-badge");
			if (badge) {
				badge.remove();
				return;
			}
			document.querySelectorAll("[id*=\"netlify\"], [class*=\"netlify\"], a[href*=\"netlify.com\"]").forEach((el) => {
				(el.closest("div[style*=\"position\"]") ?? el).remove();
			});
		};
		remove();
		const obs = new MutationObserver(remove);
		obs.observe(document.body, {
			childList: true,
			subtree: true
		});
		return () => obs.disconnect();
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(QueryClientProvider, {
		client: queryClient,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StoreProvider, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RootLayout, {}) })
	});
}
var $$splitComponentImporter$7 = () => import("./routes-DmbTpUFe.mjs");
var Route$7 = createFileRoute("/")({
	head: () => meta("ستايلك يبدأ من هنا", "اكتشف تشكيلة Roussi Mode لملابس الشباب الكاجوال والستريت وير في الجزائر."),
	component: lazyRouteComponent($$splitComponentImporter$7, "component")
});
var $$splitComponentImporter$6 = () => import("./about-8Cnh1QoV.mjs");
var Route$6 = createFileRoute("/about")({
	head: () => meta("من نحن", "Roussi Mode — ستريت وير جزائري بطابع شبابي وأسعار مناسبة."),
	component: lazyRouteComponent($$splitComponentImporter$6, "component")
});
var $$splitComponentImporter$5 = () => import("./admin-BHMEcu4m.mjs");
var Route$5 = createFileRoute("/admin")({
	head: () => ({ meta: [{ title: "لوحة التحكم | Roussi Mode" }] }),
	component: lazyRouteComponent($$splitComponentImporter$5, "component")
});
var $$splitComponentImporter$4 = () => import("./cart-CJgQu2uM.mjs");
var Route$4 = createFileRoute("/cart")({
	head: () => meta("سلة التسوق", "راجع اختياراتك والمقاسات والكميات قبل إتمام طلبك."),
	component: lazyRouteComponent($$splitComponentImporter$4, "component")
});
var $$splitComponentImporter$3 = () => import("./checkout-BUdc8zb6.mjs");
var Route$3 = createFileRoute("/checkout")({
	head: () => meta("إتمام طلبك", "أكمل بيانات الطلب مباشرة دون إنشاء حساب."),
	component: lazyRouteComponent($$splitComponentImporter$3, "component")
});
var $$splitComponentImporter$2 = () => import("./contact-BHbhBOnn.mjs");
var Route$2 = createFileRoute("/contact")({
	head: () => meta("تواصل معنا", "تواصل مع Roussi Mode للاستفسار عن الملابس والمقاسات والطلبات."),
	component: lazyRouteComponent($$splitComponentImporter$2, "component")
});
var $$splitComponentImporter$1 = () => import("./order-success-CD5aLbtf.mjs");
var Route$1 = createFileRoute("/order-success")({
	head: () => meta("تأكيد الطلب", "ملخص طلبك التجريبي لدى Roussi Mode."),
	component: lazyRouteComponent($$splitComponentImporter$1, "component")
});
var $$splitComponentImporter = () => import("./promotions-3GFeBm_D.mjs");
var Route = createFileRoute("/promotions")({
	head: () => meta("عروضنا", "اكتشف تخفيضات Roussi Mode على ملابس الشباب الكاجوال والستريت وير."),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
var rootRouteChildren = {
	IndexRoute: Route$7.update({
		id: "/",
		path: "/",
		getParentRoute: () => Route$8
	}),
	AboutRoute: Route$6.update({
		id: "/about",
		path: "/about",
		getParentRoute: () => Route$8
	}),
	AdminRoute: Route$5.update({
		id: "/admin",
		path: "/admin",
		getParentRoute: () => Route$8
	}),
	CartRoute: Route$4.update({
		id: "/cart",
		path: "/cart",
		getParentRoute: () => Route$8
	}),
	CheckoutRoute: Route$3.update({
		id: "/checkout",
		path: "/checkout",
		getParentRoute: () => Route$8
	}),
	ContactRoute: Route$2.update({
		id: "/contact",
		path: "/contact",
		getParentRoute: () => Route$8
	}),
	DashboardRoute: Route$10.update({
		id: "/dashboard",
		path: "/dashboard",
		getParentRoute: () => Route$8
	}),
	OrderSuccessRoute: Route$1.update({
		id: "/order-success",
		path: "/order-success",
		getParentRoute: () => Route$8
	}),
	PoliciesRoute: Route$11.update({
		id: "/policies",
		path: "/policies",
		getParentRoute: () => Route$8
	}),
	ProductsRoute: Route$12.update({
		id: "/products",
		path: "/products",
		getParentRoute: () => Route$8
	}),
	PromotionsRoute: Route.update({
		id: "/promotions",
		path: "/promotions",
		getParentRoute: () => Route$8
	}),
	ProductSlugRoute: Route$9.update({
		id: "/product/$slug",
		path: "/product/$slug",
		getParentRoute: () => Route$8
	})
};
var routeTree = Route$8._addFileChildren(rootRouteChildren)._addFileTypes();
var getRouter = () => {
	const queryClient = new QueryClient();
	return createRouter({
		routeTree,
		context: { queryClient },
		scrollRestoration: true,
		defaultPreloadStaleTime: 0
	});
};
//#endregion
export { getRouter };
