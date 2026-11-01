import { r as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { i as require_jsx_runtime, t as Root } from "../_libs/@radix-ui/react-label+[...].mjs";
import { t as cva } from "../_libs/class-variance-authority+clsx.mjs";
import { a as cn, d as presetImages, h as useStore, i as clearSupabaseConfig, m as testSupabaseConnection, p as saveSupabaseConfig, r as categories, s as getSupabaseConfig, t as Button, u as money } from "./button-Drtlfjic.mjs";
import { b as Link, v as createFileRoute } from "../_libs/@tanstack/react-router+[...].mjs";
import { B as CircleCheck, C as MapPin, D as Layers, E as LayoutDashboard, F as EyeOff, H as ChevronRight, I as ExternalLink, L as DollarSign, M as Funnel, O as Key, P as Eye, R as Database, T as Lock, V as CircleAlert, W as Check, a as Trash2, b as Package, c as Sparkles, d as Shield, g as RefreshCw, h as RotateCcw, i as TrendingUp, j as Globe, m as Search, n as Users, o as Store, p as Settings, s as SquarePen, t as X, u as ShoppingBag, v as Plus, w as LogOut, y as Phone, z as Copy } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/dashboard-BrmptWsp.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var Input = import_react.forwardRef(({ className, type, ...props }, ref) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
		type,
		className: cn("flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm", className),
		ref,
		...props
	});
});
Input.displayName = "Input";
var labelVariants = cva("text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70");
var Label = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Root, {
	ref,
	className: cn(labelVariants(), className),
	...props
}));
Label.displayName = Root.displayName;
var Textarea = import_react.forwardRef(({ className, ...props }, ref) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
		className: cn("flex min-h-[60px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-base shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm", className),
		ref,
		...props
	});
});
Textarea.displayName = "Textarea";
var badgeVariants = cva("inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2", {
	variants: { variant: {
		default: "border-transparent bg-primary text-primary-foreground shadow hover:bg-primary/80",
		secondary: "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
		destructive: "border-transparent bg-destructive text-destructive-foreground shadow hover:bg-destructive/80",
		outline: "text-foreground"
	} },
	defaultVariants: { variant: "default" }
});
function Badge({ className, variant, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: cn(badgeVariants({ variant }), className),
		...props
	});
}
var Route = createFileRoute("/dashboard")({ component: DashboardPage });
function DashboardPage() {
	const ADMIN_USER = "admin1234";
	const ADMIN_PASS = "rosimode2026";
	const [isAuthenticated, setIsAuthenticated] = (0, import_react.useState)(() => {
		if (typeof window === "undefined") return false;
		return sessionStorage.getItem("roussi_admin_auth") === "true" || localStorage.getItem("roussi_admin_auth") === "true";
	});
	const [loginUsername, setLoginUsername] = (0, import_react.useState)("");
	const [loginPassword, setLoginPassword] = (0, import_react.useState)("");
	const [showPassword, setShowPassword] = (0, import_react.useState)(false);
	const [loginError, setLoginError] = (0, import_react.useState)("");
	const handleLogin = (e) => {
		e.preventDefault();
		if (loginUsername.trim() === ADMIN_USER && loginPassword.trim() === ADMIN_PASS) {
			sessionStorage.setItem("roussi_admin_auth", "true");
			localStorage.setItem("roussi_admin_auth", "true");
			setIsAuthenticated(true);
			setLoginError("");
		} else setLoginError("اسم المستخدم أو كلمة المرور غير صحيحة!");
	};
	const handleLogout = () => {
		sessionStorage.removeItem("roussi_admin_auth");
		localStorage.removeItem("roussi_admin_auth");
		setIsAuthenticated(false);
	};
	const { products, addProduct, updateProduct, deleteProduct, resetProducts, orders, updateOrderStatus, deleteOrder, resetOrders, isSupabaseActive, supabaseLoading, refreshFromSupabase } = useStore();
	const [sbConfig, setSbConfig] = (0, import_react.useState)(() => {
		const cfg = getSupabaseConfig();
		return {
			url: cfg.url || "https://fcyrgsiatfdsmtfkbsde.supabase.co",
			anonKey: cfg.anonKey || "sb_publishable_EU4bMmZP0OIYpMNV0ZizwA_gEV7OMFa"
		};
	});
	const [sbTesting, setSbTesting] = (0, import_react.useState)(false);
	const [sbTestResult, setSbTestResult] = (0, import_react.useState)(null);
	const [copiedSql, setCopiedSql] = (0, import_react.useState)(false);
	const [showSqlCode, setShowSqlCode] = (0, import_react.useState)(false);
	const [activeTab, setActiveTab] = (0, import_react.useState)("overview");
	const [productModalOpen, setProductModalOpen] = (0, import_react.useState)(false);
	const [editingProduct, setEditingProduct] = (0, import_react.useState)(null);
	const [productSearch, setProductSearch] = (0, import_react.useState)("");
	const [selectedCategory, setSelectedCategory] = (0, import_react.useState)("الكل");
	const [orderSearch, setOrderSearch] = (0, import_react.useState)("");
	const [selectedOrderStatus, setSelectedOrderStatus] = (0, import_react.useState)("الكل");
	const [name, setName] = (0, import_react.useState)("");
	const [category, setCategory] = (0, import_react.useState)(categories[1] || "هوديات");
	const [price, setPrice] = (0, import_react.useState)(4500);
	const [oldPrice, setOldPrice] = (0, import_react.useState)("");
	const [stock, setStock] = (0, import_react.useState)(20);
	const [selectedImage, setSelectedImage] = (0, import_react.useState)(presetImages[0]?.url || "");
	const [customImageUrl, setCustomImageUrl] = (0, import_react.useState)("");
	const [description, setDescription] = (0, import_react.useState)("");
	const [selectedSizes, setSelectedSizes] = (0, import_react.useState)([
		"M",
		"L",
		"XL"
	]);
	const [selectedColorName, setSelectedColorName] = (0, import_react.useState)("أسود");
	const [selectedColorToken, setSelectedColorToken] = (0, import_react.useState)("black");
	const [isNew, setIsNew] = (0, import_react.useState)(true);
	const [formSuccess, setFormSuccess] = (0, import_react.useState)("");
	const totalRevenue = (0, import_react.useMemo)(() => {
		return orders.filter((o) => o.status !== "ملغي").reduce((sum, o) => sum + o.total, 0);
	}, [orders]);
	const newOrdersCount = (0, import_react.useMemo)(() => {
		return orders.filter((o) => o.status === "جديد").length;
	}, [orders]);
	const totalStockCount = (0, import_react.useMemo)(() => {
		return products.reduce((sum, p) => sum + p.stock, 0);
	}, [products]);
	const lowStockProducts = (0, import_react.useMemo)(() => {
		return products.filter((p) => p.stock < 5);
	}, [products]);
	const filteredProducts = (0, import_react.useMemo)(() => {
		return products.filter((p) => {
			const matchCat = selectedCategory === "الكل" || p.category === selectedCategory;
			const matchSearch = p.name.toLowerCase().includes(productSearch.toLowerCase()) || p.category.toLowerCase().includes(productSearch.toLowerCase());
			return matchCat && matchSearch;
		});
	}, [
		products,
		selectedCategory,
		productSearch
	]);
	const filteredOrders = (0, import_react.useMemo)(() => {
		return orders.filter((o) => {
			const matchStatus = selectedOrderStatus === "الكل" || o.status === selectedOrderStatus;
			const matchQuery = o.id.toLowerCase().includes(orderSearch.toLowerCase()) || o.customer.name.toLowerCase().includes(orderSearch.toLowerCase()) || o.customer.phone.includes(orderSearch) || o.customer.wilaya.toLowerCase().includes(orderSearch.toLowerCase());
			return matchStatus && matchQuery;
		});
	}, [
		orders,
		selectedOrderStatus,
		orderSearch
	]);
	const customersList = (0, import_react.useMemo)(() => {
		const map = /* @__PURE__ */ new Map();
		orders.forEach((o) => {
			const phone = o.customer.phone;
			if (!map.has(phone)) map.set(phone, {
				name: o.customer.name,
				phone: o.customer.phone,
				wilaya: o.customer.wilaya,
				ordersCount: 1,
				totalSpent: o.status !== "ملغي" ? o.total : 0
			});
			else {
				const existing = map.get(phone);
				existing.ordersCount += 1;
				if (o.status !== "ملغي") existing.totalSpent += o.total;
			}
		});
		return Array.from(map.values());
	}, [orders]);
	const openAddProductModal = () => {
		setEditingProduct(null);
		setName("");
		setCategory("هوديات");
		setPrice(4500);
		setOldPrice("");
		setStock(20);
		setSelectedImage(presetImages[0]?.url || "");
		setCustomImageUrl("");
		setDescription("قطعة ستريت وير بتصميم عصري وخامة قطنية ممتازة تناسب الإطلالة اليومية.");
		setSelectedSizes([
			"M",
			"L",
			"XL"
		]);
		setSelectedColorName("أسود");
		setSelectedColorToken("black");
		setIsNew(true);
		setFormSuccess("");
		setProductModalOpen(true);
	};
	const openEditProductModal = (prod) => {
		setEditingProduct(prod);
		setName(prod.name);
		setCategory(prod.category);
		setPrice(prod.price);
		setOldPrice(prod.oldPrice || "");
		setStock(prod.stock);
		setSelectedImage(prod.images[0] || "");
		setCustomImageUrl(prod.images[0]?.startsWith("http") ? prod.images[0] : "");
		setDescription(prod.description);
		setSelectedSizes(prod.sizes);
		setSelectedColorName(prod.colors[0]?.name || "أسود");
		setSelectedColorToken(prod.colors[0]?.token || "black");
		setIsNew(prod.isNew);
		setFormSuccess("");
		setProductModalOpen(true);
	};
	const handleSaveProduct = (e) => {
		e.preventDefault();
		if (!name.trim()) return;
		const imgToUse = customImageUrl.trim() ? customImageUrl.trim() : selectedImage;
		const finalPrice = Number(price) || 0;
		const finalOldPrice = oldPrice ? Number(oldPrice) : void 0;
		const finalStock = Number(stock) || 0;
		if (editingProduct) {
			updateProduct(editingProduct.id, {
				name,
				category,
				price: finalPrice,
				oldPrice: finalOldPrice,
				discount: finalOldPrice && finalOldPrice > finalPrice ? Math.round((1 - finalPrice / finalOldPrice) * 100) : 0,
				stock: finalStock,
				images: [imgToUse],
				sizes: selectedSizes,
				colors: [{
					name: selectedColorName,
					token: selectedColorToken
				}],
				description,
				isNew,
				isPromo: Boolean(finalOldPrice && finalOldPrice > finalPrice)
			});
			setFormSuccess("تم تحديث بيانات المنتج بنجاح!");
		} else {
			addProduct({
				name,
				category,
				price: finalPrice,
				oldPrice: finalOldPrice,
				discount: finalOldPrice && finalOldPrice > finalPrice ? Math.round((1 - finalPrice / finalOldPrice) * 100) : 0,
				stock: finalStock,
				images: [imgToUse],
				gender: "شباب",
				ageGroup: "شباب",
				sizes: selectedSizes,
				colors: [{
					name: selectedColorName,
					token: selectedColorToken
				}],
				description,
				isNew,
				isFeatured: true,
				isPromo: Boolean(finalOldPrice && finalOldPrice > finalPrice)
			});
			setFormSuccess("تمت إضافة المنتج بنجاح إلى المتجر والمخزون!");
		}
		setTimeout(() => {
			setProductModalOpen(false);
			setFormSuccess("");
		}, 1200);
	};
	if (!isAuthenticated) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen bg-[#0b0d13] flex items-center justify-center p-4 relative overflow-hidden",
		dir: "rtl",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-[140px] pointer-events-none" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute bottom-10 left-10 w-[300px] h-[300px] bg-emerald-600/5 rounded-full blur-[100px] pointer-events-none" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "w-full max-w-md bg-[#14171f]/95 border border-zinc-800 rounded-3xl p-8 backdrop-blur-xl shadow-2xl shadow-black/80 relative z-10 animate-in fade-in zoom-in-95 duration-200",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "text-center mb-8",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-500/20 to-emerald-500/5 border border-emerald-500/30 flex items-center justify-center mx-auto mb-4 text-emerald-400 shadow-lg shadow-emerald-500/10",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Shield, { size: 32 })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-xs font-black tracking-widest uppercase text-emerald-400 mb-1",
								children: "ROUSSI MODE"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
								className: "text-2xl font-black text-white",
								children: "لوحة تحكم الإدارة"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs text-zinc-400 mt-2",
								children: "منطقة مخصصة للإدارة فقط. يرجى إدخال اسم المستخدم وكلمة المرور للمتابعة."
							})
						]
					}),
					loginError && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mb-6 p-3.5 rounded-xl bg-rose-500/15 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleAlert, {
							size: 16,
							className: "shrink-0"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: loginError })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
						onSubmit: handleLogin,
						className: "space-y-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
									className: "text-xs font-bold text-zinc-300",
									children: "اسم المستخدم"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									type: "text",
									placeholder: "أدخل اسم المستخدم",
									value: loginUsername,
									onChange: (e) => setLoginUsername(e.target.value),
									required: true,
									className: "bg-zinc-900/80 border-zinc-800 text-white h-11 text-sm focus-visible:ring-emerald-500 font-sans",
									dir: "ltr"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
									className: "text-xs font-bold text-zinc-300",
									children: "كلمة المرور"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "relative",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										type: showPassword ? "text" : "password",
										placeholder: "••••••••••••",
										value: loginPassword,
										onChange: (e) => setLoginPassword(e.target.value),
										required: true,
										className: "bg-zinc-900/80 border-zinc-800 text-white h-11 text-sm focus-visible:ring-emerald-500 pl-10 font-sans",
										dir: "ltr"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "button",
										onClick: () => setShowPassword(!showPassword),
										className: "absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-white",
										tabIndex: -1,
										children: showPassword ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EyeOff, { size: 16 }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eye, { size: 16 })
									})]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								type: "submit",
								className: "w-full h-11 mt-2 bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-sm shadow-lg shadow-emerald-500/20 transition-all flex items-center justify-center gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lock, { size: 16 }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "تسجيل الدخول" })]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-6 pt-6 border-t border-zinc-800/80 text-center",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/",
							className: "text-xs text-zinc-400 hover:text-white inline-flex items-center gap-1 transition",
							children: "← العودة إلى المتجر الرئيسي"
						})
					})
				]
			})
		]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen bg-[#0d0f12] text-zinc-100 flex flex-col md:flex-row",
		dir: "rtl",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
				className: "w-full md:w-64 bg-[#13161c] border-b md:border-b-0 md:border-l border-zinc-800 flex flex-col shrink-0 select-none",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "p-6 border-b border-zinc-800/80 flex items-center justify-between",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
								className: "text-xl font-black tracking-wider text-white",
								children: "ROUSSI MODE"
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-zinc-400 mt-1",
							children: "لوحة التحكم وإدارة المتجر ⚡"
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
							variant: "outline",
							className: `text-[10px] ${isSupabaseActive ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/30" : "bg-zinc-800 text-zinc-400 border-zinc-700"}`,
							children: isSupabaseActive ? "🟢 سوبابيز سحابي" : "⚪ تخزين محلي"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
						className: "p-4 space-y-1.5 flex-1",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								onClick: () => setActiveTab("overview"),
								className: `w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${activeTab === "overview" ? "bg-emerald-500 text-black font-semibold shadow-lg shadow-emerald-500/20" : "text-zinc-400 hover:text-white hover:bg-zinc-800/60"}`,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LayoutDashboard, { size: 18 }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "نظرة عامة والإحصائيات" })]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								onClick: () => setActiveTab("products"),
								className: `w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium transition-all ${activeTab === "products" ? "bg-emerald-500 text-black font-semibold shadow-lg shadow-emerald-500/20" : "text-zinc-400 hover:text-white hover:bg-zinc-800/60"}`,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Package, { size: 18 }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "إدارة المنتجات" })]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: `text-xs px-2 py-0.5 rounded-full ${activeTab === "products" ? "bg-black/20 text-black" : "bg-zinc-800 text-zinc-400"}`,
									children: products.length
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								onClick: () => setActiveTab("orders"),
								className: `w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium transition-all ${activeTab === "orders" ? "bg-emerald-500 text-black font-semibold shadow-lg shadow-emerald-500/20" : "text-zinc-400 hover:text-white hover:bg-zinc-800/60"}`,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShoppingBag, { size: 18 }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "إدارة الطلبات" })]
								}), newOrdersCount > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "text-xs px-2 py-0.5 rounded-full bg-amber-500 text-black font-bold animate-pulse",
									children: [newOrdersCount, " جديد"]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								onClick: () => setActiveTab("customers"),
								className: `w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium transition-all ${activeTab === "customers" ? "bg-emerald-500 text-black font-semibold shadow-lg shadow-emerald-500/20" : "text-zinc-400 hover:text-white hover:bg-zinc-800/60"}`,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Users, { size: 18 }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "الزبائن" })]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-xs px-2 py-0.5 rounded-full bg-zinc-800 text-zinc-400",
									children: customersList.length
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								onClick: () => setActiveTab("settings"),
								className: `w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${activeTab === "settings" ? "bg-emerald-500 text-black font-semibold shadow-lg shadow-emerald-500/20" : "text-zinc-400 hover:text-white hover:bg-zinc-800/60"}`,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Settings, { size: 18 }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "إعدادات المتجر" })]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "p-4 border-t border-zinc-800 space-y-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								to: "/",
								className: "flex items-center justify-between w-full px-4 py-2.5 rounded-xl text-sm font-medium text-zinc-300 hover:text-white bg-zinc-800/50 hover:bg-zinc-800 transition",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Store, {
										size: 16,
										className: "text-emerald-400"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "زيارة المتجر الرئيسي" })]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExternalLink, {
									size: 14,
									className: "text-zinc-500"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: handleLogout,
								className: "flex items-center justify-between w-full px-4 py-2.5 rounded-xl text-sm font-medium text-rose-400 hover:text-rose-300 bg-rose-950/20 hover:bg-rose-950/40 border border-rose-900/30 transition",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LogOut, { size: 16 }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "تسجيل الخروج" })]
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-[11px] text-zinc-500 text-center pt-2",
								children: "Roussi Mode · الجزائر 🇩🇿"
							})
						]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
				className: "flex-1 p-4 md:p-8 overflow-y-auto",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
						className: "flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-8 border-b border-zinc-800/80 mb-8",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2 text-xs text-zinc-400 mb-1",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "لوحة التحكم" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, {
									size: 12,
									className: "rotate-180"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "text-emerald-400 font-medium",
									children: [
										activeTab === "overview" && "نظرة عامة والإحصائيات",
										activeTab === "products" && "إدارة المنتجات",
										activeTab === "orders" && "إدارة الطلبات",
										activeTab === "customers" && "قائمة الزبائن",
										activeTab === "settings" && "إعدادات المتجر"
									]
								})
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
							className: "text-2xl font-bold text-white tracking-tight",
							children: [
								activeTab === "overview" && "إحصائيات ونشاط المتجر",
								activeTab === "products" && "كتالوج المنتجات والمخزون",
								activeTab === "orders" && "الطلبات المستلمة من الزبائن",
								activeTab === "customers" && "سجل زبائن المتجر",
								activeTab === "settings" && "إعدادات لوحة التحكم"
							]
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-3",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
									onClick: openAddProductModal,
									className: "bg-emerald-500 hover:bg-emerald-400 text-black font-semibold h-11 px-5 rounded-xl shadow-lg shadow-emerald-500/20 flex items-center gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { size: 18 }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "إضافة منتج جديد" })]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: "/products",
									className: "inline-flex",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
										variant: "outline",
										className: "border-zinc-700 bg-zinc-800/80 text-zinc-300 hover:text-white h-11 px-4 rounded-xl",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eye, {
											size: 16,
											className: "me-2"
										}), "معاينة المتجر"]
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
									variant: "outline",
									onClick: handleLogout,
									className: "border-rose-900/40 bg-rose-950/20 text-rose-300 hover:bg-rose-900/40 hover:text-white h-11 px-4 rounded-xl flex items-center gap-1.5",
									title: "تسجيل الخروج",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LogOut, { size: 16 }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "خروج" })]
								})
							]
						})]
					}),
					activeTab === "overview" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-8",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "bg-[#14171f] border border-zinc-800/80 p-5 rounded-2xl relative overflow-hidden",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center justify-between text-zinc-400 text-sm mb-3",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "إجمالي المبيعات المؤكدة" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "w-9 h-9 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-400",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DollarSign, { size: 18 })
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "text-2xl font-black text-white",
											children: money(totalRevenue)
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center gap-1.5 text-xs text-emerald-400 mt-2",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TrendingUp, { size: 14 }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "محسوبة من كافة الطلبات غير الملغاة" })]
										})
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "bg-[#14171f] border border-zinc-800/80 p-5 rounded-2xl relative overflow-hidden",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center justify-between text-zinc-400 text-sm mb-3",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "عدد الطلبات الإجمالي" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "w-9 h-9 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-400",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShoppingBag, { size: 18 })
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "text-2xl font-black text-white",
											children: [orders.length, " طلب"]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "flex items-center gap-2 text-xs text-zinc-400 mt-2",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												className: "text-amber-400 font-semibold",
												children: [newOrdersCount, " جديد بحاجة للمعالجة"]
											})
										})
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "bg-[#14171f] border border-zinc-800/80 p-5 rounded-2xl relative overflow-hidden",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center justify-between text-zinc-400 text-sm mb-3",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "المنتجات في الكتالوج" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "w-9 h-9 rounded-xl bg-purple-500/10 flex items-center justify-center text-purple-400",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Layers, { size: 18 })
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "text-2xl font-black text-white",
											children: [products.length, " موديل"]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "text-xs text-zinc-400 mt-2",
											children: ["إجمالي القطع في المخزن: ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", {
												className: "text-white",
												children: totalStockCount
											})]
										})
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "bg-[#14171f] border border-zinc-800/80 p-5 rounded-2xl relative overflow-hidden",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center justify-between text-zinc-400 text-sm mb-3",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "تنبيهات المخزون" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "w-9 h-9 rounded-xl bg-rose-500/10 flex items-center justify-center text-rose-400",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleAlert, { size: 18 })
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "text-2xl font-black text-white",
											children: [lowStockProducts.length, " منتجات"]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "text-xs text-rose-400 mt-2",
											children: "قطع مخزونها أقل من 5 حبات"
										})
									]
								})
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid grid-cols-1 lg:grid-cols-3 gap-6",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "lg:col-span-2 bg-[#14171f] border border-zinc-800/80 rounded-2xl p-6",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center justify-between mb-5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
										className: "text-lg font-bold text-white flex items-center gap-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShoppingBag, {
											size: 18,
											className: "text-emerald-400"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "آخر الطلبات المستلمة" })]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
										onClick: () => setActiveTab("orders"),
										className: "text-xs text-emerald-400 hover:underline",
										children: [
											"عرض جميع الطلبات (",
											orders.length,
											") ←"
										]
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-3",
									children: [orders.slice(0, 4).map((order) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "p-4 rounded-xl bg-zinc-900/60 border border-zinc-800/60 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center gap-2",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "font-bold text-white",
												children: order.id
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
												className: order.status === "جديد" ? "bg-amber-500/20 text-amber-300 border-amber-500/30" : order.status === "تم التسليم" ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/30" : order.status === "قيد التوصيل" ? "bg-blue-500/20 text-blue-300 border-blue-500/30" : "bg-zinc-800 text-zinc-300",
												children: order.status
											})]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "text-xs text-zinc-400 mt-1 flex items-center gap-2",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["👤 ", order.customer.name] }),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "·" }),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["📍 ", order.customer.wilaya] }),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "·" }),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["📞 ", order.customer.phone] })
											]
										})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center justify-between sm:justify-end w-full sm:w-auto gap-4",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "text-right",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
													className: "font-bold text-emerald-400",
													children: money(order.total)
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "text-[11px] text-zinc-500",
													children: [
														order.items.length,
														" منتج (",
														order.items.map((i) => i.name).join(", "),
														")"
													]
												})]
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
												variant: "ghost",
												size: "sm",
												onClick: () => setActiveTab("orders"),
												className: "h-8 text-xs text-zinc-300 hover:text-white hover:bg-zinc-800",
												children: "تفاصيل"
											})]
										})]
									}, order.id)), orders.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "text-center py-8 text-zinc-500 text-sm",
										children: "لم يتم استلام أي طلبات بعد. ستظهر هنا بمجرد قيام الزبائن بالطلب."
									})]
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "bg-[#14171f] border border-zinc-800/80 rounded-2xl p-6 flex flex-col justify-between",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
										className: "text-lg font-bold text-white mb-4 flex items-center gap-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, {
											size: 18,
											className: "text-amber-400"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "مزامنة الموقع مع لوحة التحكم" })]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 mb-4",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center gap-2 text-emerald-400 text-sm font-semibold mb-1",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { size: 16 }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "المزامنة التلقائية مفعلة" })]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-xs text-zinc-300 leading-relaxed",
											children: "أي منتج تضيفه أو تعدله هنا يظهر فوراً في المتجر الرئيسي! وأي طلب يسجله الزبون يظهر مباشرة في هذا الداشبورد."
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "space-y-3 mt-4",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "text-xs font-semibold text-zinc-400",
												children: "الروابط السريعة:"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
												to: "/products",
												className: "block p-3 rounded-xl bg-zinc-900 border border-zinc-800 text-xs text-zinc-300 hover:text-white hover:border-zinc-700 transition",
												children: "👕 صفحة الكتالوج (/products)"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
												to: "/checkout",
												className: "block p-3 rounded-xl bg-zinc-900 border border-zinc-800 text-xs text-zinc-300 hover:text-white hover:border-zinc-700 transition",
												children: "🛍️ صفحة الدفع والطلب (/checkout)"
											})
										]
									})
								] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "pt-6 border-t border-zinc-800/60 mt-6",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										onClick: openAddProductModal,
										className: "w-full bg-emerald-500 hover:bg-emerald-400 text-black font-semibold h-11",
										children: "+ إضافة منتج جديد الآن"
									})
								})]
							})]
						})]
					}),
					activeTab === "products" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-6",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "bg-[#14171f] border border-zinc-800/80 p-4 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex flex-1 items-center gap-3 w-full",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "relative flex-1",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, {
										size: 18,
										className: "absolute right-3.5 top-1/2 -translate-y-1/2 text-zinc-500"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										placeholder: "ابحث عن اسم المنتج، الفئة...",
										value: productSearch,
										onChange: (e) => setProductSearch(e.target.value),
										className: "pr-10 bg-zinc-900 border-zinc-800 h-11 text-sm text-white placeholder:text-zinc-500 focus-visible:ring-emerald-500"
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "shrink-0 flex items-center gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Funnel, {
										size: 16,
										className: "text-zinc-500"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
										value: selectedCategory,
										onChange: (e) => setSelectedCategory(e.target.value),
										className: "bg-zinc-900 border border-zinc-800 rounded-lg h-11 px-3 text-sm text-white focus:outline-none focus:ring-1 focus:ring-emerald-500",
										children: categories.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: c,
											children: c
										}, c))
									})]
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "flex items-center gap-2 w-full md:w-auto justify-end",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
									onClick: openAddProductModal,
									className: "bg-emerald-500 hover:bg-emerald-400 text-black font-semibold h-11 px-6 rounded-xl flex items-center gap-2 w-full md:w-auto",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { size: 18 }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "إضافة منتج" })]
								})
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "bg-[#14171f] border border-zinc-800/80 rounded-2xl overflow-hidden",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "overflow-x-auto",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
									className: "w-full text-right text-sm text-zinc-300",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", {
										className: "bg-[#0f1117] text-xs uppercase text-zinc-400 border-b border-zinc-800",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
												className: "py-4 px-6",
												children: "المنتج"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
												className: "py-4 px-6",
												children: "التصنيف"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
												className: "py-4 px-6",
												children: "السعر"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
												className: "py-4 px-6",
												children: "المخزون المتوفر"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
												className: "py-4 px-6",
												children: "الحالة"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
												className: "py-4 px-6 text-center",
												children: "إجراءات"
											})
										] })
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tbody", {
										className: "divide-y divide-zinc-800/60",
										children: [filteredProducts.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
											className: "hover:bg-zinc-800/30 transition",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
													className: "py-4 px-6",
													children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
														className: "flex items-center gap-3",
														children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
															src: p.images[0],
															alt: p.name,
															className: "w-12 h-14 object-cover rounded-lg border border-zinc-800 shrink-0 bg-zinc-900"
														}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
															className: "font-bold text-white text-base",
															children: p.name
														}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
															className: "text-xs text-zinc-500 flex items-center gap-2 mt-0.5",
															children: [
																/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["المقاسات: ", p.sizes.join(", ")] }),
																/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "·" }),
																/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["اللون: ", p.colors[0]?.name] })
															]
														})] })]
													})
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
													className: "py-4 px-6",
													children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
														variant: "outline",
														className: "bg-zinc-800/60 border-zinc-700 text-zinc-300",
														children: p.category
													})
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
													className: "py-4 px-6",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
														className: "font-bold text-emerald-400",
														children: money(p.price)
													}), p.oldPrice && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("del", {
														className: "text-xs text-zinc-500 block",
														children: money(p.oldPrice)
													})]
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
													className: "py-4 px-6",
													children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
														className: "flex items-center gap-2",
														children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
															className: `font-semibold ${p.stock === 0 ? "text-rose-400" : p.stock < 5 ? "text-amber-400" : "text-zinc-200"}`,
															children: [p.stock, " قطعة"]
														}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
															className: "flex items-center gap-1",
															children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
																onClick: () => updateProduct(p.id, { stock: Math.max(0, p.stock - 1) }),
																className: "w-6 h-6 rounded bg-zinc-800 hover:bg-zinc-700 flex items-center justify-center text-xs text-zinc-400 hover:text-white",
																title: "تقليل المخزون",
																children: "-"
															}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
																onClick: () => updateProduct(p.id, { stock: p.stock + 1 }),
																className: "w-6 h-6 rounded bg-zinc-800 hover:bg-zinc-700 flex items-center justify-center text-xs text-zinc-400 hover:text-white",
																title: "زيادة المخزون",
																children: "+"
															})]
														})]
													})
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
													className: "py-4 px-6",
													children: p.stock === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
														className: "bg-rose-500/20 text-rose-300 border-rose-500/30",
														children: "نفد المخزون"
													}) : p.isPromo ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
														className: "bg-amber-500/20 text-amber-300 border-amber-500/30",
														children: [
															"تخفيض -",
															p.discount,
															"%"
														]
													}) : p.isNew ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
														className: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
														children: "جديد 🔥"
													}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
														className: "bg-zinc-800 text-zinc-400",
														children: "متوفر"
													})
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
													className: "py-4 px-6 text-center",
													children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
														className: "flex items-center justify-center gap-2",
														children: [
															/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
																to: "/product/$slug",
																params: { slug: p.slug },
																className: "p-2 rounded-lg bg-zinc-800/80 hover:bg-zinc-700 text-zinc-400 hover:text-white transition",
																title: "معاينة في المتجر",
																children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExternalLink, { size: 15 })
															}),
															/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
																onClick: () => openEditProductModal(p),
																className: "p-2 rounded-lg bg-zinc-800/80 hover:bg-zinc-700 text-blue-400 hover:text-blue-300 transition",
																title: "تعديل المنتج",
																children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SquarePen, { size: 15 })
															}),
															/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
																onClick: () => {
																	if (confirm(`هل أنت متأكد من حذف المنتج "${p.name}"؟`)) deleteProduct(p.id);
																},
																className: "p-2 rounded-lg bg-zinc-800/80 hover:bg-zinc-700 text-rose-400 hover:text-rose-300 transition",
																title: "حذف المنتج",
																children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { size: 15 })
															})
														]
													})
												})
											]
										}, p.id)), filteredProducts.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tr", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											colSpan: 6,
											className: "text-center py-12 text-zinc-500",
											children: "لا توجد منتجات مطابقة لعملية البحث."
										}) })]
									})]
								})
							})
						})]
					}),
					activeTab === "orders" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-6",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "bg-[#14171f] border border-zinc-800/80 p-4 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex flex-1 items-center gap-3 w-full",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "relative flex-1",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, {
										size: 18,
										className: "absolute right-3.5 top-1/2 -translate-y-1/2 text-zinc-500"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										placeholder: "ابحث برقم الطلب، اسم الزبون، رقم الهاتف أو الولاية...",
										value: orderSearch,
										onChange: (e) => setOrderSearch(e.target.value),
										className: "pr-10 bg-zinc-900 border-zinc-800 h-11 text-sm text-white placeholder:text-zinc-500 focus-visible:ring-emerald-500"
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "shrink-0 flex items-center gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Funnel, {
										size: 16,
										className: "text-zinc-500"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
										value: selectedOrderStatus,
										onChange: (e) => setSelectedOrderStatus(e.target.value),
										className: "bg-zinc-900 border border-zinc-800 rounded-lg h-11 px-3 text-sm text-white focus:outline-none focus:ring-1 focus:ring-emerald-500",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
												value: "الكل",
												children: "كل الحالات"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
												value: "جديد",
												children: "جديد"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
												value: "تم التأكيد",
												children: "تم التأكيد"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
												value: "قيد التوصيل",
												children: "قيد التوصيل"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
												value: "تم التسليم",
												children: "تم التسليم"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
												value: "ملغي",
												children: "ملغي"
											})
										]
									})]
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "text-xs text-zinc-400",
								children: ["إجمالي الطلبات: ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", {
									className: "text-white",
									children: filteredOrders.length
								})]
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-4",
							children: [filteredOrders.map((order) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "bg-[#14171f] border border-zinc-800/80 rounded-2xl p-5 hover:border-zinc-700 transition",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex flex-col lg:flex-row lg:items-center justify-between pb-4 border-b border-zinc-800/60 gap-4",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center gap-3",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-lg font-black text-white",
											children: order.id
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "text-xs text-zinc-500",
											children: [
												new Date(order.createdAt).toLocaleDateString("ar-DZ"),
												" ",
												new Date(order.createdAt).toLocaleTimeString("ar-DZ", {
													hour: "2-digit",
													minute: "2-digit"
												})
											]
										})]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center gap-3 flex-wrap",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-xs text-zinc-400",
												children: "تغيير الحالة:"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
												value: order.status,
												onChange: (e) => updateOrderStatus(order.id, e.target.value),
												className: `text-xs font-bold px-3 py-1.5 rounded-lg border focus:outline-none cursor-pointer ${order.status === "جديد" ? "bg-amber-500/20 text-amber-300 border-amber-500/40" : order.status === "تم التأكيد" ? "bg-blue-500/20 text-blue-300 border-blue-500/40" : order.status === "قيد التوصيل" ? "bg-indigo-500/20 text-indigo-300 border-indigo-500/40" : order.status === "تم التسليم" ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/40" : "bg-rose-500/20 text-rose-300 border-rose-500/40"}`,
												children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
														value: "جديد",
														className: "bg-zinc-900 text-white",
														children: "جديد 🟡"
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
														value: "تم التأكيد",
														className: "bg-zinc-900 text-white",
														children: "تم التأكيد 🔵"
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
														value: "قيد التوصيل",
														className: "bg-zinc-900 text-white",
														children: "قيد التوصيل 🚚"
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
														value: "تم التسليم",
														className: "bg-zinc-900 text-white",
														children: "تم التسليم 🟢"
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
														value: "ملغي",
														className: "bg-zinc-900 text-white",
														children: "ملغي 🔴"
													})
												]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
												onClick: () => {
													if (confirm(`هل أنت متأكد من حذف الطلب "${order.id}"؟`)) deleteOrder(order.id);
												},
												className: "p-1.5 rounded-lg bg-zinc-800 text-zinc-400 hover:text-rose-400 hover:bg-zinc-700 transition",
												title: "حذف الطلب",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { size: 16 })
											})
										]
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "grid grid-cols-1 md:grid-cols-3 gap-6 pt-4",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "space-y-2 bg-zinc-900/50 p-4 rounded-xl border border-zinc-800/40",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "text-xs font-semibold text-zinc-400",
												children: "معلومات الزبون:"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "text-base font-bold text-white",
												children: order.customer.name
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex items-center gap-2 text-sm text-zinc-300",
												children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Phone, {
														size: 14,
														className: "text-emerald-400"
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														dir: "ltr",
														children: order.customer.phone
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
														href: `tel:${order.customer.phone}`,
														className: "text-xs text-emerald-400 hover:underline mr-2",
														children: "اتصال"
													})
												]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex items-start gap-2 text-xs text-zinc-400",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, {
													size: 14,
													className: "text-zinc-500 shrink-0 mt-0.5"
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
													order.customer.wilaya,
													" · ",
													order.customer.commune,
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
													order.customer.address
												] })]
											}),
											order.customer.notes && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "text-xs text-amber-300/90 bg-amber-500/10 p-2 rounded-lg mt-2",
												children: ["ملاحظة الزبون: ", order.customer.notes]
											})
										]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "md:col-span-2 flex flex-col justify-between",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "text-xs font-semibold text-zinc-400 mb-2",
											children: "المنتجات المطلوبة:"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "space-y-2",
											children: order.items.map((item, idx) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex items-center justify-between p-2.5 rounded-lg bg-zinc-900/40 border border-zinc-800/40 text-sm",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "flex items-center gap-3",
													children: [item.image && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
														src: item.image,
														alt: item.name,
														className: "w-10 h-10 object-cover rounded-md border border-zinc-800 bg-zinc-900"
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
														className: "font-semibold text-white",
														children: item.name
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
														className: "text-xs text-zinc-400",
														children: [
															"المقاس: ",
															/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: item.size }),
															" · اللون: ",
															/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: item.color }),
															" · الكمية:",
															" ",
															/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: item.quantity })
														]
													})] })]
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
													className: "font-bold text-zinc-200",
													children: money(item.price * item.quantity)
												})]
											}, idx))
										})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center justify-between pt-3 border-t border-zinc-800/60 mt-3",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-xs text-zinc-400",
												children: "الدفع عند الاستلام (COD)"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "text-lg font-black text-emerald-400",
												children: ["الإجمالي: ", money(order.total)]
											})]
										})]
									})]
								})]
							}, order.id)), filteredOrders.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "text-center py-16 bg-[#14171f] border border-zinc-800/80 rounded-2xl text-zinc-500",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShoppingBag, {
										size: 32,
										className: "mx-auto mb-3 opacity-40"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-base font-semibold text-zinc-400",
										children: "لا توجد طلبات مطابقة"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-xs text-zinc-600 mt-1",
										children: "ستظهر الطلبات الجديدة هنا مباشرة عند قيام الزبائن بالطلب."
									})
								]
							})]
						})]
					}),
					activeTab === "customers" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "space-y-6",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "bg-[#14171f] border border-zinc-800/80 rounded-2xl overflow-hidden",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "overflow-x-auto",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
									className: "w-full text-right text-sm text-zinc-300",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", {
										className: "bg-[#0f1117] text-xs uppercase text-zinc-400 border-b border-zinc-800",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
												className: "py-4 px-6",
												children: "اسم الزبون"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
												className: "py-4 px-6",
												children: "رقم الهاتف"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
												className: "py-4 px-6",
												children: "الولاية"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
												className: "py-4 px-6",
												children: "عدد الطلبات"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
												className: "py-4 px-6",
												children: "إجمالي المشتريات"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
												className: "py-4 px-6 text-center",
												children: "إجراءات"
											})
										] })
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tbody", {
										className: "divide-y divide-zinc-800/60",
										children: [customersList.map((c, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
											className: "hover:bg-zinc-800/30 transition",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
													className: "py-4 px-6 font-bold text-white",
													children: c.name
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
													className: "py-4 px-6 text-zinc-300",
													dir: "ltr",
													children: c.phone
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
													className: "py-4 px-6 text-zinc-400",
													children: c.wilaya
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
													className: "py-4 px-6 font-semibold",
													children: [c.ordersCount, " طلبات"]
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
													className: "py-4 px-6 font-bold text-emerald-400",
													children: money(c.totalSpent)
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
													className: "py-4 px-6 text-center",
													children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
														href: `tel:${c.phone}`,
														className: "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20 text-xs font-semibold",
														children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Phone, { size: 13 }), "اتصال مباشر"]
													})
												})
											]
										}, i)), customersList.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tr", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											colSpan: 6,
											className: "text-center py-12 text-zinc-500",
											children: "لا يوجد زبائن مسجلين بعد."
										}) })]
									})]
								})
							})
						})
					}),
					activeTab === "settings" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "max-w-2xl space-y-6",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "bg-[#14171f] border border-zinc-800/80 p-6 rounded-2xl space-y-5",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center justify-between",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
											className: "text-lg font-bold text-white flex items-center gap-2",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Database, {
												size: 20,
												className: "text-emerald-400"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "ربط قاعدة بيانات سوبابيز (Supabase Cloud Backend)" })]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-xs text-zinc-400 mt-1",
											children: "اربط متجرك بقاعدة بيانات PostgreSQL سحابية حقيقية لحفظ الطلبيات والمنتجات ومزامنتها فورياً."
										})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
											variant: "outline",
											className: `text-xs px-2.5 py-1 ${isSupabaseActive ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/30" : "bg-zinc-800 text-zinc-400 border-zinc-700"}`,
											children: isSupabaseActive ? "🟢 متصل بسوبابيز" : "⚪ تخزين محلي (Offline)"
										})]
									}),
									sbTestResult && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: `p-3.5 rounded-xl text-xs font-semibold flex items-center gap-2 ${sbTestResult.success ? "bg-emerald-500/15 border border-emerald-500/30 text-emerald-400" : "bg-rose-500/15 border border-rose-500/30 text-rose-400"}`,
										children: [sbTestResult.success ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { size: 16 }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleAlert, { size: 16 }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: sbTestResult.message })]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "space-y-4 pt-2",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "space-y-1.5",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Label, {
													className: "text-zinc-300 flex items-center gap-2 text-xs",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Globe, {
														size: 14,
														className: "text-emerald-400"
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "رابط المشروع (Project URL)" })]
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
													placeholder: "https://xyzcompany.supabase.co",
													value: sbConfig.url,
													onChange: (e) => setSbConfig({
														...sbConfig,
														url: e.target.value
													}),
													dir: "ltr",
													className: "bg-zinc-900 border-zinc-800 text-white font-mono text-xs focus-visible:ring-emerald-500"
												})]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "space-y-1.5",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Label, {
													className: "text-zinc-300 flex items-center gap-2 text-xs",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Key, {
														size: 14,
														className: "text-emerald-400"
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "المفتاح العام (anon / public API key)" })]
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
													type: "password",
													placeholder: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
													value: sbConfig.anonKey,
													onChange: (e) => setSbConfig({
														...sbConfig,
														anonKey: e.target.value
													}),
													dir: "ltr",
													className: "bg-zinc-900 border-zinc-800 text-white font-mono text-xs focus-visible:ring-emerald-500"
												})]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex flex-wrap items-center gap-3 pt-2",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
													onClick: async () => {
														if (!sbConfig.url.trim() || !sbConfig.anonKey.trim()) {
															setSbTestResult({
																success: false,
																message: "يرجى إدخال رابط المشروع (Project URL) والمفتاح العام (Anon Key)."
															});
															return;
														}
														setSbTesting(true);
														const res = await testSupabaseConnection(sbConfig.url, sbConfig.anonKey);
														setSbTesting(false);
														setSbTestResult(res);
														if (res.success) {
															saveSupabaseConfig(sbConfig.url, sbConfig.anonKey);
															refreshFromSupabase();
														}
													},
													disabled: sbTesting,
													className: "bg-emerald-500 hover:bg-emerald-400 text-black font-bold h-10 px-5 text-xs shadow-md shadow-emerald-500/20",
													children: sbTesting ? "جاري الاختبار والربط..." : "حفظ واختبار الاتصال ⚡"
												}), isSupabaseActive && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
													variant: "outline",
													onClick: () => refreshFromSupabase(),
													disabled: supabaseLoading,
													className: "border-zinc-700 bg-zinc-900 hover:bg-zinc-800 text-zinc-300 h-10 px-4 text-xs flex items-center gap-2",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefreshCw, {
														size: 14,
														className: supabaseLoading ? "animate-spin" : ""
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "مزامنة البيانات الآن" })]
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
													variant: "outline",
													onClick: () => {
														if (confirm("هل أنت متأكد من قطع الاتصال؟ سيعود المتجر إلى وضع التخزين المحلي.")) {
															clearSupabaseConfig();
															setSbConfig({
																url: "",
																anonKey: ""
															});
															setSbTestResult(null);
														}
													},
													className: "border-rose-900/50 hover:bg-rose-950/30 text-rose-400 h-10 px-4 text-xs",
													children: "قطع الاتصال"
												})] })]
											})
										]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "border-t border-zinc-800/80 pt-4 mt-4",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center justify-between",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
												className: "text-xs font-bold text-zinc-300",
												children: "مخطط قاعدة البيانات (SQL Schema)"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
												className: "text-[11px] text-zinc-500 mt-0.5",
												children: [
													"تم إنشاء ملف ",
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("code", { children: "supabase_schema.sql" }),
													" في مشروعك. يمكنك نسخه بالضغط أدناه ولصقه في SQL Editor داخل Supabase."
												]
											})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex items-center gap-2",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
													variant: "ghost",
													size: "sm",
													onClick: () => setShowSqlCode(!showSqlCode),
													className: "text-xs text-zinc-400 hover:text-white h-8",
													children: showSqlCode ? "إخفاء" : "معاينة"
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
													variant: "outline",
													size: "sm",
													onClick: () => {
														navigator.clipboard.writeText(`-- ROUSSI MODE SCHEMA
CREATE TABLE IF NOT EXISTS public.products (
  id TEXT PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  price NUMERIC NOT NULL,
  old_price NUMERIC,
  discount INTEGER DEFAULT 0,
  images JSONB DEFAULT '[]'::jsonb,
  category TEXT NOT NULL,
  gender TEXT DEFAULT 'شباب',
  age_group TEXT DEFAULT 'شباب',
  sizes JSONB DEFAULT '["S","M","L","XL"]'::jsonb,
  colors JSONB DEFAULT '[{"name":"أسود","token":"black"}]'::jsonb,
  stock INTEGER DEFAULT 15,
  description TEXT,
  is_new BOOLEAN DEFAULT true,
  is_featured BOOLEAN DEFAULT false,
  is_promo BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE TABLE IF NOT EXISTS public.orders (
  id TEXT PRIMARY KEY,
  customer_name TEXT NOT NULL,
  customer_phone TEXT NOT NULL,
  customer_wilaya TEXT NOT NULL,
  customer_commune TEXT NOT NULL,
  customer_address TEXT NOT NULL,
  customer_notes TEXT,
  total NUMERIC NOT NULL,
  status TEXT DEFAULT 'جديد' NOT NULL,
  items JSONB NOT NULL DEFAULT '[]'::jsonb,
  created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Public Read Products" ON public.products;
DROP POLICY IF EXISTS "Allow All on Products" ON public.products;
CREATE POLICY "Allow All on Products" ON public.products FOR ALL USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Public Insert Orders" ON public.orders;
DROP POLICY IF EXISTS "Allow All on Orders" ON public.orders;
CREATE POLICY "Allow All on Orders" ON public.orders FOR ALL USING (true) WITH CHECK (true);

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_publication_tables 
    WHERE pubname = 'supabase_realtime' AND tablename = 'orders'
  ) THEN
    ALTER PUBLICATION supabase_realtime ADD TABLE public.orders;
  END IF;
  
  IF NOT EXISTS (
    SELECT 1 FROM pg_publication_tables 
    WHERE pubname = 'supabase_realtime' AND tablename = 'products'
  ) THEN
    ALTER PUBLICATION supabase_realtime ADD TABLE public.products;
  END IF;
END $$;
`);
														setCopiedSql(true);
														setTimeout(() => setCopiedSql(false), 2e3);
													},
													className: "text-xs border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/10 h-8 flex items-center gap-1.5",
													children: [copiedSql ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { size: 13 }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, { size: 13 }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: copiedSql ? "تم النسخ!" : "نسخ كود SQL" })]
												})]
											})]
										}), showSqlCode && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("pre", {
											dir: "ltr",
											className: "mt-3 p-3.5 rounded-xl bg-black/60 border border-zinc-800 text-[11px] font-mono text-zinc-300 max-h-48 overflow-auto text-left",
											children: `CREATE TABLE public.products (
  id TEXT PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  price NUMERIC NOT NULL,
  ...
);
CREATE TABLE public.orders (
  id TEXT PRIMARY KEY,
  customer_name TEXT NOT NULL,
  total NUMERIC NOT NULL,
  items JSONB NOT NULL,
  ...
);`
										})]
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "bg-[#14171f] border border-zinc-800/80 p-6 rounded-2xl space-y-5",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
										className: "text-lg font-bold text-white",
										children: "إعدادات المتجر العامة"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "space-y-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
											className: "text-zinc-300",
											children: "اسم المتجر"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
											defaultValue: "Roussi Mode",
											className: "bg-zinc-900 border-zinc-800 text-white"
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "space-y-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
											className: "text-zinc-300",
											children: "العملة الافتراضية"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
											defaultValue: "د.ج (الدينار الجزائري)",
											disabled: true,
											className: "bg-zinc-900/60 border-zinc-800 text-zinc-400"
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "space-y-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
											className: "text-zinc-300",
											children: "الدولة المستهدفة"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
											defaultValue: "الجزائر 🇩🇿 (58 ولاية)",
											disabled: true,
											className: "bg-zinc-900/60 border-zinc-800 text-zinc-400"
										})]
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "bg-[#14171f] border border-zinc-800/80 p-6 rounded-2xl space-y-4",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
										className: "text-lg font-bold text-white flex items-center gap-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RotateCcw, {
											size: 18,
											className: "text-amber-400"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "إعادة تعيين البيانات التجريبية (Demo Reset)" })]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-xs text-zinc-400 leading-relaxed",
										children: "إذا قمت بحذف المنتجات أو ترغب في إعادة ضبط المتجر إلى التشكيلة والطلبات التجريبية الأصلية، يمكنك الضغط على الأزرار أدناه."
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center gap-3 pt-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
											variant: "outline",
											onClick: () => {
												if (confirm("هل تريد استرجاع قائمة المنتجات الأصلية؟")) {
													resetProducts();
													alert("تمت استعادة المنتجات الافتراضية بنجاح!");
												}
											},
											className: "border-zinc-700 bg-zinc-900 hover:bg-zinc-800 text-zinc-300",
											children: "استعادة المنتجات الافتراضية"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
											variant: "outline",
											onClick: () => {
												if (confirm("هل تريد استرجاع الطلبات التجريبية الأصلية؟")) {
													resetOrders();
													alert("تمت استعادة الطلبات التجريبية بنجاح!");
												}
											},
											className: "border-zinc-700 bg-zinc-900 hover:bg-zinc-800 text-zinc-300",
											children: "استعادة الطلبات التجريبية"
										})]
									})
								]
							})
						]
					})
				]
			}),
			productModalOpen && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "bg-[#14171f] border border-zinc-800 rounded-2xl w-full max-w-2xl max-h-[90vh] flex flex-col shadow-2xl animate-in fade-in zoom-in-95 duration-200",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "p-6 border-b border-zinc-800 flex items-center justify-between shrink-0",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "text-xl font-bold text-white",
							children: editingProduct ? "تعديل بيانات المنتج" : "إضافة منتج جديد للمتجر"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-zinc-400 mt-1",
							children: "أدخل تفاصيل القطعة ليتم نشرها وتوفيرها للزبائن فوراً في الموقع."
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: () => setProductModalOpen(false),
							className: "w-8 h-8 rounded-lg bg-zinc-800/80 text-zinc-400 hover:text-white flex items-center justify-center",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { size: 18 })
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
						onSubmit: handleSaveProduct,
						className: "p-6 space-y-6 overflow-y-auto flex-1",
						children: [
							formSuccess && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "p-4 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-sm flex items-center gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { size: 18 }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: formSuccess })]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "grid grid-cols-1 sm:grid-cols-2 gap-4",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
										className: "text-zinc-300",
										children: "اسم المنتج *"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										placeholder: "مثال: هودي أوفرسايز بيج 2026",
										value: name,
										onChange: (e) => setName(e.target.value),
										required: true,
										className: "bg-zinc-900 border-zinc-800 text-white focus-visible:ring-emerald-500"
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
										className: "text-zinc-300",
										children: "التصنيف *"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
										value: category,
										onChange: (e) => setCategory(e.target.value),
										className: "w-full bg-zinc-900 border border-zinc-800 rounded-lg h-10 px-3 text-sm text-white focus:outline-none focus:ring-1 focus:ring-emerald-500",
										children: categories.filter((c) => c !== "الكل" && c !== "عروض").map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: c,
											children: c
										}, c))
									})]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "grid grid-cols-1 sm:grid-cols-3 gap-4",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "space-y-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
											className: "text-zinc-300",
											children: "السعر الحالي (د.ج) *"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
											type: "number",
											placeholder: "مثال: 4500",
											value: price,
											onChange: (e) => setPrice(e.target.value === "" ? "" : Number(e.target.value)),
											required: true,
											className: "bg-zinc-900 border-zinc-800 text-white focus-visible:ring-emerald-500"
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "space-y-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
											className: "text-zinc-300",
											children: "السعر قبل التخفيض (اختياري)"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
											type: "number",
											placeholder: "مثال: 5800",
											value: oldPrice,
											onChange: (e) => setOldPrice(e.target.value === "" ? "" : Number(e.target.value)),
											className: "bg-zinc-900 border-zinc-800 text-white focus-visible:ring-emerald-500"
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "space-y-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
											className: "text-zinc-300",
											children: "الكمية في المخزن *"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
											type: "number",
											placeholder: "مثال: 25",
											value: stock,
											onChange: (e) => setStock(e.target.value === "" ? "" : Number(e.target.value)),
											required: true,
											className: "bg-zinc-900 border-zinc-800 text-white focus-visible:ring-emerald-500"
										})]
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-3",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
										className: "text-zinc-300",
										children: "صورة المنتج"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "text-xs text-zinc-400 mb-2",
										children: "اختر من الصور الجاهزة أو ضع رابط صورة خارجي:"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "grid grid-cols-4 sm:grid-cols-8 gap-2",
										children: presetImages.map((preset, idx) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											type: "button",
											onClick: () => {
												setSelectedImage(preset.url);
												setCustomImageUrl("");
											},
											className: `relative aspect-[3/4] rounded-lg overflow-hidden border-2 transition ${selectedImage === preset.url && !customImageUrl ? "border-emerald-500 scale-105 shadow-md shadow-emerald-500/30" : "border-zinc-800 hover:border-zinc-700 opacity-70 hover:opacity-100"}`,
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
												src: preset.url,
												alt: preset.label,
												className: "w-full h-full object-cover"
											})
										}, idx))
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "mt-2",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
											placeholder: "أو أدخل رابط صورة مباشرة (https://...)",
											value: customImageUrl,
											onChange: (e) => setCustomImageUrl(e.target.value),
											className: "bg-zinc-900 border-zinc-800 text-white text-xs h-9 focus-visible:ring-emerald-500"
										})
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
									className: "text-zinc-300",
									children: "المقاسات المتوفرة"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "flex flex-wrap gap-2",
									children: [
										"S",
										"M",
										"L",
										"XL",
										"XXL",
										"38",
										"40",
										"42",
										"44"
									].map((sizeOption) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "button",
										onClick: () => toggleSize(sizeOption),
										className: `px-3 py-1.5 rounded-lg text-xs font-bold transition ${selectedSizes.includes(sizeOption) ? "bg-emerald-500 text-black shadow-sm shadow-emerald-500/20" : "bg-zinc-800 text-zinc-400 hover:bg-zinc-700 hover:text-white"}`,
										children: sizeOption
									}, sizeOption))
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "grid grid-cols-1 sm:grid-cols-2 gap-4",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
										className: "text-zinc-300",
										children: "اسم اللون الأساسي"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										placeholder: "مثال: أسود، بيج، رمادي، زيتي",
										value: selectedColorName,
										onChange: (e) => setSelectedColorName(e.target.value),
										className: "bg-zinc-900 border-zinc-800 text-white focus-visible:ring-emerald-500"
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
										className: "text-zinc-300",
										children: "رمز اللون (لون الدائرة)"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
										value: selectedColorToken,
										onChange: (e) => setSelectedColorToken(e.target.value),
										className: "w-full bg-zinc-900 border border-zinc-800 rounded-lg h-10 px-3 text-sm text-white focus:outline-none focus:ring-1 focus:ring-emerald-500",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
												value: "black",
												children: "أسود (Black)"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
												value: "grey",
												children: "رمادي (Grey)"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
												value: "white",
												children: "أبيض (White)"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
												value: "blue",
												children: "أزرق داكن (Blue)"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
												value: "sage",
												children: "زيتي / خاكي (Sage)"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
												value: "beige",
												children: "بيج (Beige)"
											})
										]
									})]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
									className: "text-zinc-300",
									children: "وصف المنتج"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
									rows: 3,
									placeholder: "أدخل مواصفات المنتج والخامة وطريقة الغسيل...",
									value: description,
									onChange: (e) => setDescription(e.target.value),
									className: "bg-zinc-900 border-zinc-800 text-white focus-visible:ring-emerald-500 text-sm"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "pt-4 border-t border-zinc-800 flex items-center justify-end gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									type: "button",
									variant: "ghost",
									onClick: () => setProductModalOpen(false),
									className: "text-zinc-400 hover:text-white",
									children: "إلغاء"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									type: "submit",
									className: "bg-emerald-500 hover:bg-emerald-400 text-black font-semibold h-11 px-8 rounded-xl shadow-lg shadow-emerald-500/20",
									children: editingProduct ? "حفظ التعديلات ✅" : "نشر المنتج في المتجر 🚀"
								})]
							})
						]
					})]
				})
			})
		]
	});
}
//#endregion
export { Route as n, DashboardPage as t };
