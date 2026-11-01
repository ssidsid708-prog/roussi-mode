import { r as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { i as require_jsx_runtime, r as Slot } from "../_libs/@radix-ui/react-label+[...].mjs";
import { t as createClient } from "../_libs/supabase__supabase-js.mjs";
import { n as clsx, t as cva } from "../_libs/class-variance-authority+clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/button-Drtlfjic.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var categories = [
	"الكل",
	"هوديات",
	"سويت شيرت",
	"جينز",
	"سراويل كارغو",
	"جاكيتات",
	"تيشيرتات",
	"طقم رياضي",
	"إكسسوارات",
	"عروض"
];
var defaultProducts$1 = [];
var presetImages = [];
function getStoredProducts() {
	if (typeof window === "undefined") return defaultProducts$1;
	try {
		const raw = localStorage.getItem("roussi-products");
		if (!raw) {
			localStorage.setItem("roussi-products", JSON.stringify(defaultProducts$1));
			return defaultProducts$1;
		}
		const parsed = JSON.parse(raw);
		return Array.isArray(parsed) && parsed.length > 0 ? parsed : defaultProducts$1;
	} catch {
		return defaultProducts$1;
	}
}
function saveStoredProducts(list) {
	if (typeof window === "undefined") return;
	try {
		localStorage.setItem("roussi-products", JSON.stringify(list));
		window.dispatchEvent(new Event("roussi-products-updated"));
	} catch (e) {
		console.error("Failed to save products", e);
	}
}
var products = typeof window !== "undefined" ? getStoredProducts() : defaultProducts$1;
var money = (value) => `${value.toLocaleString("fr-DZ")} د.ج`;
var findProduct = (slugOrId) => {
	return getStoredProducts().find((p) => p.slug === slugOrId || p.id === slugOrId) || defaultProducts$1.find((p) => p.slug === slugOrId || p.id === slugOrId);
};
var matchesCategory = (p, c) => !c || c === "الكل" || (c === "عروض" ? p.isPromo : p.category === c);
var meta = (title, description) => ({ meta: [
	{ title: `${title} | Roussi Mode` },
	{
		name: "description",
		content: description
	},
	{
		property: "og:title",
		content: `${title} | Roussi Mode`
	},
	{
		property: "og:description",
		content: description
	},
	{
		property: "og:type",
		content: "website"
	},
	{
		name: "twitter:card",
		content: "summary_large_image"
	}
] });
function getSupabaseConfig() {
	const envUrl = "https://fcyrgsiatfdsmtfkbsde.supabase.co";
	const envKey = "sb_publishable_EU4bMmZP0OIYpMNV0ZizwA_gEV7OMFa";
	if (typeof window !== "undefined") {
		const localUrl = localStorage.getItem("roussi_supabase_url");
		const localKey = localStorage.getItem("roussi_supabase_key");
		if (localUrl || localKey) return {
			url: (localUrl || envUrl).trim(),
			anonKey: (localKey || envKey).trim()
		};
	}
	return {
		url: envUrl.trim(),
		anonKey: envKey.trim()
	};
}
function saveSupabaseConfig(url, anonKey) {
	if (typeof window === "undefined") return;
	localStorage.setItem("roussi_supabase_url", url.trim());
	localStorage.setItem("roussi_supabase_key", anonKey.trim());
	window.dispatchEvent(new Event("roussi-supabase-config-changed"));
}
function clearSupabaseConfig() {
	if (typeof window === "undefined") return;
	localStorage.removeItem("roussi_supabase_url");
	localStorage.removeItem("roussi_supabase_key");
	window.dispatchEvent(new Event("roussi-supabase-config-changed"));
}
function isSupabaseConfigured() {
	const cfg = getSupabaseConfig();
	return Boolean(cfg.url && cfg.anonKey && cfg.url.startsWith("https://"));
}
var cachedClient = null;
var lastUsedUrl = "";
var lastUsedKey = "";
function getSupabase() {
	const { url, anonKey } = getSupabaseConfig();
	if (!url || !anonKey || !url.startsWith("https://")) return null;
	if (cachedClient && lastUsedUrl === url && lastUsedKey === anonKey) return cachedClient;
	try {
		cachedClient = createClient(url, anonKey);
		lastUsedUrl = url;
		lastUsedKey = anonKey;
		return cachedClient;
	} catch (err) {
		console.error("Error initializing Supabase client:", err);
		return null;
	}
}
async function fetchProductsSupabase() {
	const client = getSupabase();
	if (!client) return null;
	try {
		const { data, error } = await client.from("products").select("*").order("created_at", { ascending: false });
		if (error) {
			console.warn("Supabase fetchProducts error:", error.message);
			return null;
		}
		if (!data) return [];
		return data.map((row) => ({
			id: String(row.id),
			slug: row.slug,
			name: row.name,
			price: Number(row.price),
			oldPrice: row.old_price ? Number(row.old_price) : void 0,
			discount: row.discount || 0,
			images: Array.isArray(row.images) ? row.images : [row.image || ""],
			category: row.category,
			gender: row.gender || "شباب",
			ageGroup: row.age_group || "شباب",
			sizes: Array.isArray(row.sizes) ? row.sizes : [
				"M",
				"L",
				"XL"
			],
			colors: Array.isArray(row.colors) ? row.colors : [{
				name: "أسود",
				token: "black"
			}],
			stock: Number(row.stock) || 0,
			description: row.description || "",
			isNew: Boolean(row.is_new),
			isFeatured: Boolean(row.is_featured),
			isPromo: Boolean(row.is_promo),
			createdAt: row.created_at ? new Date(row.created_at).toISOString().split("T")[0] : "2026-10-01"
		}));
	} catch (err) {
		console.error("Failed to query products from Supabase:", err);
		return null;
	}
}
async function insertProductSupabase(product) {
	const client = getSupabase();
	if (!client) return false;
	try {
		const { error } = await client.from("products").insert([{
			id: product.id,
			slug: product.slug,
			name: product.name,
			price: product.price,
			old_price: product.oldPrice || null,
			discount: product.discount || 0,
			images: product.images,
			category: product.category,
			gender: product.gender,
			age_group: product.ageGroup,
			sizes: product.sizes,
			colors: product.colors,
			stock: product.stock,
			description: product.description,
			is_new: product.isNew,
			is_featured: product.isFeatured,
			is_promo: product.isPromo
		}]);
		if (error) {
			console.error("Supabase insertProduct error:", error);
			return false;
		}
		return true;
	} catch (err) {
		console.error("Error inserting product in Supabase:", err);
		return false;
	}
}
async function updateProductSupabase(id, patch) {
	const client = getSupabase();
	if (!client) return false;
	try {
		const payload = {};
		if (patch.name !== void 0) payload.name = patch.name;
		if (patch.price !== void 0) payload.price = patch.price;
		if (patch.oldPrice !== void 0) payload.old_price = patch.oldPrice;
		if (patch.discount !== void 0) payload.discount = patch.discount;
		if (patch.stock !== void 0) payload.stock = patch.stock;
		if (patch.images !== void 0) payload.images = patch.images;
		if (patch.category !== void 0) payload.category = patch.category;
		if (patch.sizes !== void 0) payload.sizes = patch.sizes;
		if (patch.colors !== void 0) payload.colors = patch.colors;
		if (patch.description !== void 0) payload.description = patch.description;
		if (patch.isNew !== void 0) payload.is_new = patch.isNew;
		if (patch.isFeatured !== void 0) payload.is_featured = patch.isFeatured;
		if (patch.isPromo !== void 0) payload.is_promo = patch.isPromo;
		const { error } = await client.from("products").update(payload).eq("id", id);
		if (error) {
			console.error("Supabase updateProduct error:", error);
			return false;
		}
		return true;
	} catch (err) {
		console.error("Error updating product in Supabase:", err);
		return false;
	}
}
async function deleteProductSupabase(id) {
	const client = getSupabase();
	if (!client) return false;
	try {
		const { error } = await client.from("products").delete().eq("id", id);
		if (error) {
			console.error("Supabase deleteProduct error:", error);
			return false;
		}
		return true;
	} catch (err) {
		console.error("Error deleting product in Supabase:", err);
		return false;
	}
}
async function fetchOrdersSupabase() {
	const client = getSupabase();
	if (!client) return null;
	try {
		const { data, error } = await client.from("orders").select("*").order("created_at", { ascending: false });
		if (error) {
			console.warn("Supabase fetchOrders error:", error.message);
			return null;
		}
		if (!data) return [];
		return data.map((row) => ({
			id: row.id,
			customer: {
				name: row.customer_name || "",
				phone: row.customer_phone || "",
				wilaya: row.customer_wilaya || "",
				commune: row.customer_commune || "",
				address: row.customer_address || "",
				notes: row.customer_notes || ""
			},
			items: Array.isArray(row.items) ? row.items : [],
			total: Number(row.total) || 0,
			status: row.status || "جديد",
			createdAt: row.created_at || (/* @__PURE__ */ new Date()).toISOString()
		}));
	} catch (err) {
		console.error("Failed to query orders from Supabase:", err);
		return null;
	}
}
async function insertOrderSupabase(order) {
	const client = getSupabase();
	if (!client) return false;
	try {
		const { error } = await client.from("orders").insert([{
			id: order.id,
			customer_name: order.customer.name,
			customer_phone: order.customer.phone,
			customer_wilaya: order.customer.wilaya,
			customer_commune: order.customer.commune,
			customer_address: order.customer.address,
			customer_notes: order.customer.notes || null,
			total: order.total,
			status: order.status,
			items: order.items,
			created_at: order.createdAt
		}]);
		if (error) {
			console.error("Supabase insertOrder error:", error);
			return false;
		}
		return true;
	} catch (err) {
		console.error("Error inserting order in Supabase:", err);
		return false;
	}
}
async function updateOrderStatusSupabase(orderId, status) {
	const client = getSupabase();
	if (!client) return false;
	try {
		const { error } = await client.from("orders").update({ status }).eq("id", orderId);
		if (error) {
			console.error("Supabase updateOrderStatus error:", error);
			return false;
		}
		return true;
	} catch (err) {
		console.error("Error updating order status in Supabase:", err);
		return false;
	}
}
async function deleteOrderSupabase(orderId) {
	const client = getSupabase();
	if (!client) return false;
	try {
		const { error } = await client.from("orders").delete().eq("id", orderId);
		if (error) {
			console.error("Supabase deleteOrder error:", error);
			return false;
		}
		return true;
	} catch (err) {
		console.error("Error deleting order in Supabase:", err);
		return false;
	}
}
async function testSupabaseConnection(url, key) {
	try {
		const { error } = await createClient(url, key).from("products").select("count", {
			count: "exact",
			head: true
		});
		if (error && error.code !== "PGRST116") {
			if (error.code === "PGRST205" || error.code === "42P01" || error.message?.includes("relation \"public.products\" does not exist") || error.message?.includes("schema cache")) return {
				success: true,
				message: "الاتصال بالسيرفر والمفتاح ناجح 100%! 🟢 يتبقى فقط تشغيل كود SQL في Supabase لإنشاء الجداول."
			};
			return {
				success: false,
				message: `خطأ في الاتصال: ${error.message}`
			};
		}
		return {
			success: true,
			message: "تم الاتصال بقاعدة بيانات سوبابيز بنجاح! 🟢"
		};
	} catch (err) {
		return {
			success: false,
			message: `تعذر الاتصال: ${err?.message || err}`
		};
	}
}
var defaultSampleOrders = [];
var Context = (0, import_react.createContext)(null);
function StoreProvider({ children }) {
	const [cart, setCart] = (0, import_react.useState)([]);
	const [ready, setReady] = (0, import_react.useState)(false);
	const [drawer, setDrawer] = (0, import_react.useState)(false);
	const [order, setOrder] = (0, import_react.useState)(null);
	const [productsList, setProductsList] = (0, import_react.useState)([]);
	const [ordersList, setOrdersList] = (0, import_react.useState)([]);
	const [isSupabaseActive, setIsSupabaseActive] = (0, import_react.useState)(false);
	const [supabaseLoading, setSupabaseLoading] = (0, import_react.useState)(false);
	const refreshFromSupabase = async () => {
		if (!isSupabaseConfigured()) return;
		setSupabaseLoading(true);
		try {
			const [spProds, spOrders] = await Promise.all([fetchProductsSupabase(), fetchOrdersSupabase()]);
			if (spProds && spProds.length > 0) {
				setProductsList(spProds);
				saveStoredProducts(spProds);
			}
			if (spOrders) {
				setOrdersList(spOrders);
				localStorage.setItem("roussi-orders", JSON.stringify(spOrders));
			}
		} catch (err) {
			console.warn("Refresh from Supabase error:", err);
		} finally {
			setSupabaseLoading(false);
		}
	};
	(0, import_react.useEffect)(() => {
		try {
			const initialProds = getStoredProducts();
			setProductsList(initialProds);
			const c = JSON.parse(sessionStorage.getItem("roussi-cart") || "[]");
			if (Array.isArray(c)) setCart(c.filter((i) => findProduct(i.productId) && typeof i.size === "string" && typeof i.color === "string" && Number.isInteger(i.quantity) && i.quantity > 0));
			const o = JSON.parse(sessionStorage.getItem("roussi-order") || "null");
			if (o?.id && Array.isArray(o.items)) setOrder(o);
			const savedOrders = localStorage.getItem("roussi-orders");
			if (savedOrders) {
				const parsed = JSON.parse(savedOrders);
				if (Array.isArray(parsed)) setOrdersList(parsed);
				else {
					setOrdersList([]);
					localStorage.setItem("roussi-orders", JSON.stringify([]));
				}
			} else {
				setOrdersList([]);
				localStorage.setItem("roussi-orders", JSON.stringify([]));
			}
			if (isSupabaseConfigured()) {
				setIsSupabaseActive(true);
				refreshFromSupabase();
				const sb = getSupabase();
				if (sb) sb.channel("public:orders").on("postgres_changes", {
					event: "*",
					schema: "public",
					table: "orders"
				}, () => {
					fetchOrdersSupabase().then((latest) => {
						if (latest) {
							setOrdersList(latest);
							localStorage.setItem("roussi-orders", JSON.stringify(latest));
						}
					});
				}).on("postgres_changes", {
					event: "*",
					schema: "public",
					table: "products"
				}, () => {
					fetchProductsSupabase().then((latest) => {
						if (latest && latest.length > 0) {
							setProductsList(latest);
							saveStoredProducts(latest);
						}
					});
				}).subscribe();
			}
		} catch {
			setOrdersList(defaultSampleOrders);
		}
		setReady(true);
	}, []);
	(0, import_react.useEffect)(() => {
		const handleConfigChange = () => {
			if (isSupabaseConfigured()) {
				setIsSupabaseActive(true);
				refreshFromSupabase();
			} else setIsSupabaseActive(false);
		};
		window.addEventListener("roussi-supabase-config-changed", handleConfigChange);
		return () => window.removeEventListener("roussi-supabase-config-changed", handleConfigChange);
	}, []);
	(0, import_react.useEffect)(() => {
		const handleProductsUpdate = () => {
			setProductsList(getStoredProducts());
		};
		const handleOrdersUpdate = () => {
			try {
				const saved = localStorage.getItem("roussi-orders");
				if (saved) {
					const parsed = JSON.parse(saved);
					if (Array.isArray(parsed)) setOrdersList(parsed);
				}
			} catch (e) {
				console.error(e);
			}
		};
		window.addEventListener("roussi-products-updated", handleProductsUpdate);
		window.addEventListener("roussi-orders-updated", handleOrdersUpdate);
		window.addEventListener("storage", handleProductsUpdate);
		window.addEventListener("storage", handleOrdersUpdate);
		return () => {
			window.removeEventListener("roussi-products-updated", handleProductsUpdate);
			window.removeEventListener("roussi-orders-updated", handleOrdersUpdate);
			window.removeEventListener("storage", handleProductsUpdate);
			window.removeEventListener("storage", handleOrdersUpdate);
		};
	}, []);
	(0, import_react.useEffect)(() => {
		if (ready) sessionStorage.setItem("roussi-cart", JSON.stringify(cart));
	}, [cart, ready]);
	const addProduct = (newProdData) => {
		const id = newProdData.id || String(Date.now());
		const slug = newProdData.slug || `prod-${Date.now().toString().slice(-5)}`;
		const product = {
			...newProdData,
			id,
			slug,
			createdAt: (/* @__PURE__ */ new Date()).toISOString().split("T")[0] || "2026-10-11"
		};
		const updated = [product, ...productsList];
		setProductsList(updated);
		saveStoredProducts(updated);
		if (isSupabaseConfigured()) insertProductSupabase(product);
		return product;
	};
	const updateProduct = (id, patch) => {
		const updated = productsList.map((p) => p.id === id ? {
			...p,
			...patch
		} : p);
		setProductsList(updated);
		saveStoredProducts(updated);
		if (isSupabaseConfigured()) updateProductSupabase(id, patch);
	};
	const deleteProduct = (id) => {
		const updated = productsList.filter((p) => p.id !== id);
		setProductsList(updated);
		saveStoredProducts(updated);
		if (isSupabaseConfigured()) deleteProductSupabase(id);
	};
	const resetProducts = () => {
		setProductsList(defaultProducts);
		saveStoredProducts(defaultProducts);
	};
	const updateOrderStatus = (orderId, status) => {
		const updated = ordersList.map((o) => o.id === orderId ? {
			...o,
			status
		} : o);
		setOrdersList(updated);
		localStorage.setItem("roussi-orders", JSON.stringify(updated));
		window.dispatchEvent(new Event("roussi-orders-updated"));
		if (isSupabaseConfigured()) updateOrderStatusSupabase(orderId, status);
	};
	const deleteOrder = (orderId) => {
		const updated = ordersList.filter((o) => o.id !== orderId);
		setOrdersList(updated);
		localStorage.setItem("roussi-orders", JSON.stringify(updated));
		window.dispatchEvent(new Event("roussi-orders-updated"));
		if (isSupabaseConfigured()) deleteOrderSupabase(orderId);
	};
	const resetOrders = () => {
		setOrdersList(defaultSampleOrders);
		localStorage.setItem("roussi-orders", JSON.stringify(defaultSampleOrders));
		window.dispatchEvent(new Event("roussi-orders-updated"));
	};
	const total = cart.reduce((s, i) => s + (findProduct(i.productId)?.price || 0) * i.quantity, 0);
	const add = (p, size, color, quantity) => {
		const existing = cart.find((i) => i.productId === p.id && i.size === size && i.color === color);
		const all = cart.filter((i) => i.productId === p.id).reduce((s, i) => s + i.quantity, 0);
		if (!p.sizes.includes(size) || !p.colors.some((c) => c.name === color) || quantity < 1 || all + quantity > p.stock) return false;
		setCart((v) => existing ? v.map((i) => i === existing ? {
			...i,
			quantity: i.quantity + quantity
		} : i) : [...v, {
			productId: p.id,
			size,
			color,
			quantity
		}]);
		return true;
	};
	const update = (index, quantity) => {
		const item = cart[index];
		if (!item) return;
		const p = findProduct(item.productId);
		const others = cart.filter((i, n) => n !== index && i.productId === item.productId).reduce((s, i) => s + i.quantity, 0);
		if (p && quantity > 0 && quantity + others <= p.stock) setCart((v) => v.map((i, n) => n === index ? {
			...i,
			quantity
		} : i));
	};
	const placeOrder = (customer) => {
		const orderId = `RM-${Date.now().toString().slice(-6)}`;
		const newDashboardOrder = {
			id: orderId,
			items: cart.map((item) => {
				const p = findProduct(item.productId);
				return {
					productId: item.productId,
					name: p?.name || "منتج",
					price: p?.price || 0,
					image: p?.images[0] || "",
					size: item.size,
					color: item.color,
					quantity: item.quantity
				};
			}),
			customer: {
				name: customer["name"] || "",
				phone: customer["phone"] || "",
				wilaya: customer["wilaya"] || "",
				commune: customer["commune"] || "",
				address: customer["address"] || "",
				notes: customer["notes"] || ""
			},
			total,
			status: "جديد",
			createdAt: (/* @__PURE__ */ new Date()).toISOString()
		};
		const updatedOrders = [newDashboardOrder, ...ordersList];
		setOrdersList(updatedOrders);
		localStorage.setItem("roussi-orders", JSON.stringify(updatedOrders));
		window.dispatchEvent(new Event("roussi-orders-updated"));
		if (isSupabaseConfigured()) insertOrderSupabase(newDashboardOrder);
		const nextSessionOrder = {
			id: orderId,
			items: [...cart],
			customer,
			total
		};
		setOrder(nextSessionOrder);
		sessionStorage.setItem("roussi-order", JSON.stringify(nextSessionOrder));
		cart.forEach((item) => {
			const prod = findProduct(item.productId);
			if (prod && prod.stock >= item.quantity) updateProduct(prod.id, { stock: Math.max(0, prod.stock - item.quantity) });
		});
		setCart([]);
	};
	const addDirectOrder = (item, customer) => {
		const p = findProduct(item.productId);
		const orderId = `RM-${Date.now().toString().slice(-6)}`;
		const orderTotal = (p?.price || 0) * item.quantity;
		const newDashboardOrder = {
			id: orderId,
			items: [{
				productId: item.productId,
				name: p?.name || "منتج",
				price: p?.price || 0,
				image: p?.images[0] || "",
				size: item.size,
				color: item.color,
				quantity: item.quantity
			}],
			customer: {
				name: customer["name"] || "",
				phone: customer["phone"] || "",
				wilaya: customer["wilaya"] || "",
				commune: customer["commune"] || "",
				address: customer["address"] || "",
				notes: customer["notes"] || ""
			},
			total: orderTotal,
			status: "جديد",
			createdAt: (/* @__PURE__ */ new Date()).toISOString()
		};
		const updatedOrders = [newDashboardOrder, ...ordersList];
		setOrdersList(updatedOrders);
		localStorage.setItem("roussi-orders", JSON.stringify(updatedOrders));
		window.dispatchEvent(new Event("roussi-orders-updated"));
		if (isSupabaseConfigured()) insertOrderSupabase(newDashboardOrder);
		if (p && p.stock >= item.quantity) updateProduct(p.id, { stock: Math.max(0, p.stock - item.quantity) });
		return newDashboardOrder;
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Context.Provider, {
		value: {
			cart,
			add,
			update,
			remove: (n) => setCart((v) => v.filter((_, i) => i !== n)),
			count: cart.reduce((s, i) => s + i.quantity, 0),
			total,
			drawer,
			setDrawer,
			order,
			placeOrder,
			addDirectOrder,
			products: productsList.length > 0 ? productsList : defaultProducts,
			addProduct,
			updateProduct,
			deleteProduct,
			resetProducts,
			orders: ordersList,
			updateOrderStatus,
			deleteOrder,
			resetOrders,
			isSupabaseActive,
			supabaseLoading,
			refreshFromSupabase
		},
		children
	});
}
function useStore() {
	const c = (0, import_react.useContext)(Context);
	if (!c) throw new Error("Store provider is missing");
	return c;
}
function cn(...inputs) {
	return twMerge(clsx(inputs));
}
var buttonVariants = cva("inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium cursor-pointer transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0", {
	variants: {
		variant: {
			default: "bg-primary text-primary-foreground shadow hover:bg-primary/90",
			destructive: "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
			outline: "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",
			secondary: "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
			ghost: "hover:bg-accent hover:text-accent-foreground",
			link: "text-primary underline-offset-4 hover:underline"
		},
		size: {
			default: "h-9 px-4 py-2",
			sm: "h-8 rounded-md px-3 text-xs",
			lg: "h-10 rounded-md px-8",
			icon: "h-9 w-9"
		}
	},
	defaultVariants: {
		variant: "default",
		size: "default"
	}
});
var Button = import_react.forwardRef(({ className, variant, size, asChild = false, ...props }, ref) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(asChild ? Slot : "button", {
		className: cn(buttonVariants({
			variant,
			size,
			className
		})),
		ref,
		...props
	});
});
Button.displayName = "Button";
//#endregion
export { cn as a, matchesCategory as c, presetImages as d, products as f, useStore as h, clearSupabaseConfig as i, meta as l, testSupabaseConnection as m, StoreProvider as n, findProduct as o, saveSupabaseConfig as p, categories as r, getSupabaseConfig as s, Button as t, money as u };
