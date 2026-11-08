import { r as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { i as require_jsx_runtime } from "../_libs/@radix-ui/react-label+[...].mjs";
import { h as useStore, t as Button } from "./button-0EtQqkU-.mjs";
import { b as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { G as ArrowLeft, H as ChevronRight, U as ChevronLeft } from "../_libs/lucide-react.mjs";
import { c as ProductCard, l as SectionHeading, r as Catalog, t as Benefits } from "./store-ui-86MHy0ci.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-DmbTpUFe.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var sweatshirt_grey_default = "/assets/sweatshirt-grey-CMrxJACH.jpg";
var jeans_dark_default = "/assets/jeans-dark-CLXLIVqs.jpg";
var mens_3_default = "/assets/mens-3-BLfoY1wJ.jpg";
var heroSlides = [
	{
		image: "/assets/store-1-DChvDcDx.jpg",
		eyebrow: "تشكيلة جديدة · STREET STYLE 2026",
		title: "ستايلك يبدا منا 💯",
		desc: "اكتشف جديد الستريت وير نتاعنا. هوديات، سويت شيرت، جينز وأكثر — كاليتي هربانة وأسعار تخرج عليك.",
		tag: "STREETWEAR COLLECTION — 2026"
	},
	{
		image: "/assets/store-2-3o1WRAXS.jpg",
		eyebrow: "إطلالات حصرية · NEW ARRIVALS",
		title: "لوك هربان يخرج عليك 🔥",
		desc: "بومبر جاكيت وقطع كاجوال عصرية تمنحك حضوراً مميزاً في كل خرجة. جودة عالية وتفاصيل متقنة.",
		tag: "URBAN VIBES — ALGIERS 2026"
	},
	{
		image: "/assets/store-3-Bf2HA300.jpg",
		eyebrow: "المتجر الرسمي · ROUSSI MODE STORE",
		title: "كلش واجد في بلاصة وحدة ⚡",
		desc: "أحدث التشكيلات الحصرية وأفضل الموديلات بأحسن الأسعار. توصيل سريع لـ 58 ولاية والدفع عند الاستلام.",
		tag: "FLAGSHIP STORE — ALGERIA"
	}
];
function Home() {
	const { products } = useStore();
	const [currentImg, setCurrentImg] = (0, import_react.useState)(0);
	const [isPaused, setIsPaused] = (0, import_react.useState)(false);
	const currentSlide = heroSlides[currentImg] ?? heroSlides[0];
	(0, import_react.useEffect)(() => {
		if (isPaused) return;
		const timer = setInterval(() => {
			setCurrentImg((prev) => (prev + 1) % heroSlides.length);
		}, 5e3);
		return () => clearInterval(timer);
	}, [isPaused]);
	const prevSlide = () => {
		setCurrentImg((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
	};
	const nextSlide = () => {
		setCurrentImg((prev) => (prev + 1) % heroSlides.length);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "hero relative select-none",
			onMouseEnter: () => setIsPaused(true),
			onMouseLeave: () => setIsPaused(false),
			children: [
				heroSlides.map((slide, idx) => {
					const isActive = idx === currentImg;
					return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: `hero-slide absolute inset-0 transition-opacity duration-1000 ${isActive ? "opacity-100 z-0" : "opacity-0 -z-10 pointer-events-none"}`,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: slide.image,
							className: `hero-image w-full h-full object-cover transition-transform duration-7000 ease-out ${isActive ? "scale-105" : "scale-100"}`,
							style: {
								filter: "brightness(0.65) contrast(1.1) saturate(1.1)",
								objectPosition: "center 35%"
							},
							alt: "Roussi Mode Streetwear"
						})
					}, idx);
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "hero-content container-store",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "hero-copy",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "eyebrow",
								children: currentSlide.eyebrow
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", { children: currentSlide.title }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: currentSlide.desc }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "hero-actions",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									asChild: true,
									className: "h-12 px-7 shadow-lg",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
										to: "/products",
										children: ["شري دوكا ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, {})]
									})
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									variant: "outline",
									asChild: true,
									className: "h-12 px-6 bg-background/50 backdrop-blur-md border-white/20 hover:bg-background/80",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
										to: "/promotions",
										children: "شوف الصولد"
									})
								})]
							})
						]
					}, currentImg)
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					onClick: prevSlide,
					"aria-label": "الصورة السابقة",
					className: "hero-nav-btn prev",
					type: "button",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { size: 22 })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					onClick: nextSlide,
					"aria-label": "الصورة التالية",
					className: "hero-nav-btn next",
					type: "button",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronLeft, { size: 22 })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "hero-indicators",
					children: heroSlides.map((_, idx) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => setCurrentImg(idx),
						"aria-label": `انتقل إلى الشريحة ${idx + 1}`,
						className: `hero-dot ${idx === currentImg ? "active" : ""}`,
						type: "button"
					}, idx))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "hero-index",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("b", { children: ["0", currentImg + 1] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("small", { children: ["0", heroSlides.length] })
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "hero-season",
					dir: "ltr",
					children: currentSlide.tag
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Benefits, {}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "container-store pt-6 pb-6",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "new-arrivals-section",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "green-light-beam-glow",
					"aria-hidden": "true",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "beam-line" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "beam-spotlight" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "beam-ray beam-ray-1" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "beam-ray beam-ray-2" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "beam-glow-orb" })
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative z-10",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHeading, {
						title: "الجديد اللي دخل 🔥",
						subtitle: "أحدث القطع اللي وصلت للحانوت. خف قبل ما تطير!"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Catalog, { home: true })]
				})]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "container-store section",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHeading, {
				title: "شوبينغ حبة حبة",
				subtitle: "اختار اللوك اللي يعجبك. كل كاتيغوري فيها الحاجة اللي تسحقها."
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "category-grid",
				children: [
					[
						sweatshirt_grey_default,
						"هوديات",
						"الدفا والستايل 🔥"
					],
					[
						jeans_dark_default,
						"جينز",
						"كلاسيك ما يتقادمش"
					],
					[
						mens_3_default,
						"جاكيتات",
						"لوك هربان"
					]
				].map(([img, c, sub]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/products",
					search: { category: c },
					className: "category-card",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: img,
						alt: c,
						loading: "lazy"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "category-label",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: c }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: sub })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { size: 20 })]
					})]
				}, c))
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "container-store",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "promo-band",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "promo-content text-center flex flex-col items-center",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "eyebrow mx-auto justify-center",
							children: "عروض خاصة · صولد مهبول"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "text-3xl font-black mb-3 text-center w-full",
							children: "برومو ما تتراطاش 💥"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mb-6 text-center w-full max-w-md mx-auto",
							children: "قطع ستريت وير بأسعار هبال. روح شوف قبل ما يخلصو!"
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex justify-center w-full",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "secondary",
						asChild: true,
						className: "h-12 px-8 w-full sm:max-w-xs",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/promotions",
							className: "flex items-center justify-center gap-2",
							children: ["شوف ڨاع لي برومو ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { size: 18 })]
						})
					})
				})]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "container-store pt-6 pb-6",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "all-products-section",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "green-light-beam-glow",
					"aria-hidden": "true",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "beam-line" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "beam-spotlight" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "beam-ray beam-ray-1" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "beam-ray beam-ray-2" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "beam-glow-orb" })
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative z-10",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHeading, {
						title: "ڨاع السلعة",
						subtitle: "كلش كاين باش تخرج بلوك شبابي مكتمل."
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Catalog, {})]
				})]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "container-store section border-t",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHeading, {
				title: "مختارات بأسعار هبال",
				subtitle: "ستايل خشين، بسعر حنين.",
				link: "/promotions"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "product-grid",
				children: products.filter((p) => p.isPromo).map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProductCard, { product: p }, p.id))
			})]
		})
	] });
}
//#endregion
export { Home as component };
