import { r as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { i as require_jsx_runtime } from "../_libs/@radix-ui/react-label+[...].mjs";
import { c as matchesCategory, h as useStore, o as findProduct, r as categories, t as Button, u as money } from "./button-0EtQqkU-.mjs";
import { b as Link, p as useLocation } from "../_libs/@tanstack/react-router+[...].mjs";
import { A as Headphones, G as ArrowLeft, H as ChevronRight, N as Facebook, S as Menu, U as ChevronLeft, _ as RefreshCcw, a as Trash2, f as ShieldCheck, k as Instagram, l as SlidersHorizontal, m as Search, r as Truck, t as X, u as ShoppingBag, v as Plus, x as Minus } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/store-ui-86MHy0ci.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var roussi_logo_asset_default = {
	version: 1,
	asset_id: "045df0fd-0010-4f08-b397-86d031edef93",
	project_id: "81d6aa40-5cc5-44eb-8c41-810e1a122d85",
	url: "/__l5e/assets-v1/045df0fd-0010-4f08-b397-86d031edef93/roussi-logo-full.jpg",
	r2_key: "a/v1/81d6aa40-5cc5-44eb-8c41-810e1a122d85/045df0fd-0010-4f08-b397-86d031edef93/roussi-logo-full.jpg",
	original_filename: "roussi-logo-full.jpg",
	size: 57540,
	content_type: "image/jpeg",
	created_at: "2026-10-04T10:30:39Z"
};
function Modal({ children, title, onClose, drawer = false }) {
	const ref = (0, import_react.useRef)(null);
	(0, import_react.useEffect)(() => {
		const old = document.body.style.overflow;
		document.body.style.overflow = "hidden";
		const previous = document.activeElement;
		ref.current?.focus();
		const key = (e) => {
			if (e.key === "Escape") onClose();
			if (e.key === "Tab" && ref.current) {
				const all = ref.current.querySelectorAll("button,a,input,select,textarea");
				const first = all[0], last = all[all.length - 1];
				if (e.shiftKey && document.activeElement === first) {
					e.preventDefault();
					last?.focus();
				} else if (!e.shiftKey && document.activeElement === last) {
					e.preventDefault();
					first?.focus();
				}
			}
		};
		document.addEventListener("keydown", key);
		return () => {
			document.body.style.overflow = old;
			document.removeEventListener("keydown", key);
			if (previous instanceof HTMLElement) previous.focus();
		};
	}, [onClose]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: `modal-overlay ${drawer ? "drawer-overlay" : ""}`,
		onClick: onClose,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			ref,
			tabIndex: -1,
			role: "dialog",
			"aria-modal": "true",
			"aria-label": title,
			className: `modal ${drawer ? "drawer" : ""}`,
			onClick: (e) => e.stopPropagation(),
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "modal-head",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: title }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "ghost",
					size: "icon",
					onClick: onClose,
					"aria-label": "إغلاق",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, {})
				})]
			}), children]
		})
	});
}
function Header() {
	const { count, drawer, setDrawer, products } = useStore();
	const [search, setSearch] = (0, import_react.useState)(false), [menu, setMenu] = (0, import_react.useState)(false), [q, setQ] = (0, import_react.useState)("");
	const pathname = useLocation().pathname;
	const nav = [
		["/", "الرئيسية"],
		["/products", "منتجاتنا"],
		["/promotions", "العروض"],
		["/about", "من نحن"],
		["/contact", "تواصل معنا"]
	];
	(0, import_react.useEffect)(() => {
		setMenu(false);
		setSearch(false);
	}, [pathname]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "announcement",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "🇩🇿 توصيل لجميع ولايات الجزائر · ستايلك يوصلك لبابك" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "—" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					dir: "ltr",
					children: "ROUSSI MODE"
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("header", {
			className: "site-header",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "container-store header-main flex items-center justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-6",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "ghost",
							size: "icon",
							className: "mobile-only",
							"aria-label": "فتح القائمة",
							onClick: () => setMenu(true),
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Menu, {})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/",
							"aria-label": "Roussi Mode الرئيسية",
							className: "text-xl font-black tracking-widest uppercase flex items-center gap-1.5 font-sans",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "ROUSSI" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								style: { color: "var(--neon)" },
								children: "MODE"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
							className: "header-nav",
							children: nav.map(([to, label]) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to,
								className: pathname === to ? "active" : "",
								children: label
							}, to))
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "header-tools flex items-center",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "ghost",
							size: "icon",
							"aria-label": "البحث",
							title: "البحث",
							onClick: () => setSearch(true),
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, {})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-5 border-l mx-2 desktop-only" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							variant: "ghost",
							size: "icon",
							className: "relative",
							"aria-label": `السلة (${count})`,
							title: "السلة",
							onClick: () => setDrawer(true),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShoppingBag, {}), count > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "cart-count",
								children: count
							})]
						})
					]
				})]
			})
		}),
		menu && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Modal, {
			title: "القائمة",
			onClose: () => setMenu(false),
			drawer: true,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
				className: "footer-links",
				children: nav.map(([to, label]) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to,
					className: "py-4 border-b",
					onClick: () => setMenu(false),
					children: label
				}, to))
			})
		}),
		search && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Modal, {
			title: "واش تقلب عليه؟ 🔍",
			onClose: () => setSearch(false),
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
				className: "field",
				autoFocus: true,
				placeholder: "ابحث على هودي، جينز، سويت شيرت…",
				value: q,
				onChange: (e) => setQ(e.target.value)
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-5",
				children: [q && products.filter((p) => p.name.includes(q) || p.category.includes(q)).map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					className: "cart-row",
					to: "/product/$slug",
					params: { slug: p.slug },
					onClick: () => setSearch(false),
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: p.images[0],
							alt: p.name
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: p.name }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "price",
							children: money(p.price)
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { size: 17 })
					]
				}, p.id)), q && !products.some((p) => p.name.includes(q) || p.category.includes(q)) && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-muted-foreground",
					children: "ما لقينا والو. جرب كلمة أخرى!"
				})]
			})]
		}),
		drawer && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Modal, {
			title: `السلة (${count})`,
			onClose: () => setDrawer(false),
			drawer: true,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CartContents, { compact: true })
		})
	] });
}
function Benefits() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "container-store benefits",
		children: [
			[
				Truck,
				"توصيل لكل الولايات 🇩🇿",
				"من وهران لعنابة، نوصلوك"
			],
			[
				ShieldCheck,
				"جودة مضمونة",
				"خامات عالية وتفاصيل متقنة"
			],
			[
				RefreshCcw,
				"تبديل المقاس",
				"إذا ما جاكش المقاس نبدلوهولك"
			],
			[
				Headphones,
				"خدمة عملاء متوفرة",
				"راسلنا أي وقت ونجاوبوك"
			]
		].map(([Icon, title, sub], i) => {
			return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "benefit",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: title }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: sub })] })]
			}, i);
		})
	});
}
function SectionHeading({ title, subtitle, link = "/products", linkText = "عرض الكل" }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "section-heading",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: title }), subtitle && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: subtitle })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
			to: link,
			className: "text-link",
			children: [linkText, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { size: 15 })]
		})]
	});
}
function QuickAdd({ product, onClose }) {
	const { add, setDrawer } = useStore();
	const [size, setSize] = (0, import_react.useState)(""), [color, setColor] = (0, import_react.useState)(product.colors[0]?.name || ""), [error, setError] = (0, import_react.useState)("");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Modal, {
		title: product.name,
		onClose,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid grid-cols-[100px_1fr] gap-5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: product.images[0],
					alt: product.name,
					className: "w-full rounded-lg"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "price",
						children: money(product.price)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "option-label",
						children: "اختار المقاس"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "variant-options",
						children: product.sizes.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: size === s ? "default" : "outline",
							onClick: () => setSize(s),
							children: s
						}, s))
					})
				] })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "option-label",
				children: "اللون"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "variant-options",
				children: product.colors.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: color === c.name ? "default" : "outline",
					onClick: () => setColor(c.name),
					children: c.name
				}, c.name))
			}),
			error && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				role: "alert",
				className: "text-destructive text-sm mt-4",
				children: error
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				className: "w-full mt-6 h-12",
				disabled: !product.stock,
				onClick: () => {
					if (!size) {
						setError("لازم تختار المقاس أولاً!");
						return;
					}
					if (add(product, size, color, 1)) {
						onClose();
						setDrawer(true);
					} else setError("الكمية اللي طلبتها ماشي متوفرة");
				},
				children: "🛒 أضف للسلة"
			})
		]
	});
}
function ProductCard({ product: p }) {
	const [quick, setQuick] = (0, import_react.useState)(false);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "product-image",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/product/$slug",
					params: { slug: p.slug },
					"aria-label": `عرض ${p.name}`,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: p.images[0],
						alt: p.name,
						width: 512,
						height: 768,
						loading: "lazy"
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "product-badges",
					children: [
						p.isNew && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "product-badge",
							children: "جديد 🔥"
						}),
						p.isPromo && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "product-badge sale",
							children: [
								"−",
								p.discount,
								"%"
							]
						}),
						!p.stock && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "product-badge",
							children: "نفد المخزون"
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "secondary",
					size: "icon",
					className: "product-quick",
					title: "إضافة سريعة",
					"aria-label": `إضافة ${p.name}`,
					disabled: !p.stock,
					onClick: () => setQuick(true),
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, {})
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "product-info",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("small", { children: ["ستريت وير · ", p.category] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/product/$slug",
					params: { slug: p.slug },
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: p.name })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "price",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: money(p.price) }), p.oldPrice && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("del", { children: money(p.oldPrice) })]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex justify-between items-center",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "product-colors",
						children: p.colors.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							title: c.name,
							className: `swatch ${c.token}`
						}, c.name))
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "product-sizes",
						children: p.sizes.slice(0, 5).map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: s }, s))
					})]
				})
			]
		}),
		quick && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(QuickAdd, {
			product: p,
			onClose: () => setQuick(false)
		})
	] });
}
function Catalog({ promo = false, initialCategory = "الكل", home = false }) {
	const { products } = useStore();
	const [category, setCategory] = (0, import_react.useState)(initialCategory), [q, setQ] = (0, import_react.useState)(""), [size, setSize] = (0, import_react.useState)("الكل"), [color, setColor] = (0, import_react.useState)("الكل"), [max, setMax] = (0, import_react.useState)(8e3), [sale, setSale] = (0, import_react.useState)(promo), [sort, setSort] = (0, import_react.useState)("new"), [limit, setLimit] = (0, import_react.useState)(home ? 4 : 6), [open, setOpen] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => setCategory(initialCategory), [initialCategory]);
	const reset = () => {
		setCategory("الكل");
		setQ("");
		setSize("الكل");
		setColor("الكل");
		setMax(8e3);
		setSale(promo);
	};
	const filtered = products.filter((p) => matchesCategory(p, category) && (!sale || p.isPromo) && (size === "الكل" || p.sizes.includes(size)) && (color === "الكل" || p.colors.some((c) => c.name === color)) && p.price <= max && (p.name.includes(q) || p.category.includes(q))).sort((a, b) => sort === "low" ? a.price - b.price : sort === "high" ? b.price - a.price : sort === "discount" ? b.discount - a.discount : Number(b.isNew) - Number(a.isNew));
	const dropdown = (label, value, set, options) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", { children: label }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
		"aria-label": label,
		className: "field",
		value,
		onChange: (e) => set(e.target.value),
		children: options.map((o) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: o }, o))
	})] });
	const sliderRef = (0, import_react.useRef)(null);
	const scroll = (dir) => {
		if (sliderRef.current) sliderRef.current.scrollBy({
			left: dir * 180,
			behavior: "smooth"
		});
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: home ? "" : "catalog-layout",
		children: [!home && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
			className: `filters ${open ? "open" : ""}`,
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-medium",
						children: "فلتر المنتجات"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "ghost",
						size: "icon",
						className: "mobile-only",
						onClick: () => setOpen(false),
						"aria-label": "إغلاق الفلاتر",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, {})
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", { children: "البحث" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					className: "field",
					placeholder: "اسم المنتج…",
					"aria-label": "البحث عن المنتجات",
					value: q,
					onChange: (e) => setQ(e.target.value)
				}),
				dropdown("التصنيف", category, setCategory, categories),
				dropdown("المقاس", size, setSize, ["الكل", ...new Set(products.flatMap((p) => p.sizes))]),
				dropdown("اللون", color, setColor, ["الكل", ...new Set(products.flatMap((p) => p.colors.map((c) => c.name)))]),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: ["السعر حتى ", money(max)] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					className: "w-full accent-primary",
					type: "range",
					min: "2000",
					max: "8000",
					step: "100",
					value: max,
					"aria-label": "الحد الأقصى للسعر",
					onChange: (e) => setMax(Number(e.target.value))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: "flex gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						type: "checkbox",
						checked: sale,
						disabled: promo,
						onChange: (e) => setSale(e.target.checked)
					}), " العروض فقط"]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "link",
					onClick: reset,
					children: "إعادة ضبط الفلاتر"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					className: "mobile-only w-full mt-4",
					onClick: () => setOpen(false),
					children: [
						"عرض ",
						filtered.length,
						" منتجات"
					]
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
			home ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex justify-end gap-2 mb-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "outline",
					size: "icon",
					onClick: () => scroll(1),
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, {})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "outline",
					size: "icon",
					onClick: () => scroll(-1),
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronLeft, {})
				})]
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "catalog-toolbar",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "text-xs text-muted-foreground",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							variant: "outline",
							className: "mobile-only me-2",
							onClick: () => setOpen(true),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SlidersHorizontal, {}), " الفلاتر"]
						}),
						filtered.length,
						" منتجات"
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
					"aria-label": "ترتيب المنتجات",
					className: "field",
					value: sort,
					onChange: (e) => setSort(e.target.value),
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: "new",
							children: "الأحدث أولاً"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: "low",
							children: "السعر: من الأقل"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: "high",
							children: "السعر: من الأعلى"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: "discount",
							children: "أعلى تخفيض"
						})
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: home ? "product-slider" : "product-grid max-md:product-slider",
				ref: sliderRef,
				children: filtered.slice(0, limit).map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProductCard, { product: p }, p.id))
			}),
			!filtered.length && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "empty",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, {}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "ما لقينا والو 😅" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "outline",
						onClick: reset,
						children: "إعادة ضبط الفلاتر"
					})
				]
			}),
			filtered.length > limit && !home && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "text-center mt-9",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					variant: "outline",
					className: "h-11 px-10",
					onClick: () => setLimit((n) => n + 6),
					children: ["عرض المزيد ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, {})]
				})
			})
		] })]
	});
}
function CartContents({ compact = false }) {
	const s = useStore();
	if (!s.cart.length) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "empty",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShoppingBag, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "السلة فارغة 🛒" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "روح تقلب على حاجة تعجبك وزيدها للسلة!" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				asChild: true,
				onClick: () => s.setDrawer(false),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/products",
					children: ["ابدأ التسوق ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, {})]
				})
			})
		]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: s.cart.map((i, n) => {
			const p = findProduct(i.productId);
			if (!p) return null;
			return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "cart-row",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/product/$slug",
						params: { slug: p.slug },
						onClick: () => s.setDrawer(false),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: p.images[0],
							alt: p.name
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: p.name }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("small", { children: [
							i.size,
							" · ",
							i.color
						] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "quantity",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									variant: "ghost",
									size: "icon",
									onClick: () => s.update(n, i.quantity - 1),
									disabled: i.quantity <= 1,
									"aria-label": "تقليل الكمية",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Minus, {})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: i.quantity }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									variant: "ghost",
									size: "icon",
									disabled: i.quantity >= p.stock,
									onClick: () => s.update(n, i.quantity + 1),
									"aria-label": "زيادة الكمية",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, {})
								})
							]
						})
					] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "price",
						children: money(p.price * i.quantity)
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "ghost",
						size: "icon",
						onClick: () => s.remove(n),
						"aria-label": `حذف ${p.name}`,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, {})
					})] })
				]
			}, `${i.productId}-${i.size}-${i.color}`);
		}) }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "summary-line summary-total",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "المجموع" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: money(s.total) })]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-xs text-muted-foreground mb-5",
			children: "رسوم التوصيل تُحدد عند تأكيد الطلب حسب الولاية."
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
			asChild: true,
			className: "w-full h-12",
			onClick: () => s.setDrawer(false),
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
				to: "/checkout",
				children: ["إتمام الطلب ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, {})]
			})
		}),
		compact && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
			asChild: true,
			variant: "link",
			className: "w-full mt-2",
			onClick: () => s.setDrawer(false),
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/cart",
				children: "عرض السلة"
			})
		})
	] });
}
function Footer() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("footer", {
		className: "footer",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "container-store footer-grid",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: roussi_logo_asset_default.url,
							className: "header-logo mb-4",
							alt: "Roussi Mode"
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
						"🇩🇿 ستريت وير جزائري.",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
						"ملابس شبابية بستايل عصري",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
						"وأسعار تناسب الجيب."
					] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex gap-3 mt-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/contact",
							"aria-label": "Instagram",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Instagram, { size: 18 })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/contact",
							"aria-label": "Facebook",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Facebook, { size: 18 })
						})]
					})
				] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: "المتجر" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "footer-links",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/",
							children: "الرئيسية"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/products",
							children: "منتجاتنا"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/promotions",
							children: "العروض"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/about",
							children: "من نحن"
						})
					]
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: "خدمة العملاء" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "footer-links",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/policies",
							search: { section: "ordering" },
							children: "كيفاش تطلب"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/policies",
							search: { section: "delivery" },
							children: "التوصيل"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/policies",
							search: { section: "exchange" },
							children: "تبديل المقاس"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/policies",
							search: { section: "privacy" },
							children: "سياسة الخصوصية"
						})
					]
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: "تواصل معنا" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
						"عندك سؤال على مقاس أو قطعة؟",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
						"راسلنا ونجاوبوك في أقرب وقت."
					] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/contact",
						className: "text-link mt-4",
						children: ["راسلنا ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { size: 14 })]
					})
				] })
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "container-store footer-bottom",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "© 2026 Roussi Mode. جميع الحقوق محفوظة 🇩🇿" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "صُمم للشباب. بكل بساطة." })]
		})]
	});
}
function PageTitle({ title, description }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "page-title",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "breadcrumb",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/",
						children: "الرئيسية"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "/" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: title })
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", { children: title }),
			description && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: description })
		]
	});
}
function OrderSummary() {
	const { cart, total } = useStore();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
		className: "summary",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "text-lg font-medium mb-4",
				children: "ملخص الطلب"
			}),
			cart.map((i, n) => {
				const p = findProduct(i.productId);
				return p ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "summary-line",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [p.name, /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("small", {
						className: "block text-muted-foreground mt-1",
						children: [
							i.size,
							" · ",
							i.color,
							" · الكمية ",
							i.quantity
						]
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "shrink-0",
						children: money(p.price * i.quantity)
					})]
				}, n) : null;
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "summary-line",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "التوصيل" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "يُحدد حسب الولاية" })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "summary-line summary-total",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "مجموع المنتجات" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: money(total) })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs text-muted-foreground leading-6 mt-4",
				children: "المجموع لا يشمل رسوم التوصيل."
			})
		]
	});
}
//#endregion
export { Header as a, ProductCard as c, Footer as i, SectionHeading as l, CartContents as n, OrderSummary as o, Catalog as r, PageTitle as s, Benefits as t };
