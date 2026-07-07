import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Plus, Pencil, Trash2, X, Check, Image as ImageIcon, Leaf, ShieldAlert, Lock, User, LogOut, Package, MessageCircle, Calendar } from "lucide-react";
import { useProducts } from "@/lib/products-context";
import { inr } from "@/lib/cart";
import { fetchApi } from "@/lib/api";
import { useEffect } from "react";

// Import presets for ease of selection
import capsules from "../assets/product-capsules.jpg";
import oil from "../assets/product-oil.jpg";
import hair from "../assets/product-hair.jpg";
import skin from "../assets/product-skin.jpg";
import health from "../assets/product-health.jpg";
import eye from "../assets/product-eye.jpg";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "Admin Portal | Thulir Healthcare" },
      { name: "description", content: "Manage Thulir Healthcare products." },
    ],
  }),
  component: AdminPortal,
});

const IMAGE_PRESETS = [
  { label: "Capsules", value: capsules },
  { label: "Pain Oil", value: oil },
  { label: "Hair Oil", value: hair },
  { label: "Skin Cream", value: skin },
  { label: "Wellness Tonic", value: health },
  { label: "Eye Drops", value: eye },
];

function AdminPortal() {
  const { products, addProduct, updateProduct, deleteProduct } = useProducts();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    if (typeof window !== "undefined") {
      return !!sessionStorage.getItem("thulir_token") || !!localStorage.getItem("thulir_token");
    }
    return false;
  });
  const [loginUsername, setLoginUsername] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [loginError, setLoginError] = useState("");

  const [editingId, setEditingId] = useState<string | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  // Tabs
  const [activeTab, setActiveTab] = useState<"products" | "orders" | "appointments">("products");

  // Orders State
  const [orders, setOrders] = useState<any[]>([]);
  const [isLoadingOrders, setIsLoadingOrders] = useState(false);
  
  // Appointments State
  const [appointments, setAppointments] = useState<any[]>([]);
  const [isLoadingAppointments, setIsLoadingAppointments] = useState(false);

  useEffect(() => {
    if (isAuthenticated) {
      if (activeTab === "orders" && orders.length === 0) {
        const loadOrders = async () => {
          setIsLoadingOrders(true);
          try {
            const data = await fetchApi('/orders');
            setOrders(data);
          } catch (err) {
            console.error("Failed to load orders", err);
          } finally {
            setIsLoadingOrders(false);
          }
        };
        loadOrders();
      }
      
      if (activeTab === "appointments" && appointments.length === 0) {
        const loadAppointments = async () => {
          setIsLoadingAppointments(true);
          try {
            const data = await fetchApi('/appointments');
            setAppointments(data);
          } catch (err) {
            console.error("Failed to load appointments", err);
          } finally {
            setIsLoadingAppointments(false);
          }
        };
        loadAppointments();
      }
    }
  }, [isAuthenticated, activeTab]);

  // Form State
  const [title, setTitle] = useState("");
  const [tag, setTag] = useState("HERBAL");
  const [price, setPrice] = useState("");
  const [mrp, setMrp] = useState("");
  const [desc, setDesc] = useState("");
  const [image, setImage] = useState(capsules);
  const [customImage, setCustomImage] = useState("");

  const resetForm = () => {
    setTitle("");
    setTag("HERBAL");
    setPrice("");
    setMrp("");
    setDesc("");
    setImage(capsules);
    setCustomImage("");
    setEditingId(null);
    setIsAdding(false);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const data = await fetchApi('/auth/login', {
        method: 'POST',
        body: JSON.stringify({ username: loginUsername, password: loginPassword })
      });
      localStorage.setItem("thulir_token", data.token);
      setIsAuthenticated(true);
      setLoginError("");
    } catch (err: any) {
      setLoginError(err.message || "Invalid username or password");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("thulir_token");
    sessionStorage.removeItem("thulir_token");
    setIsAuthenticated(false);
    resetForm();
  };

  const handleEditClick = (p: any) => {
    setEditingId(p.id);
    setTitle(p.title);
    setTag(p.tag);
    setPrice(p.price.toString());
    setMrp(p.mrp ? p.mrp.toString() : "");
    setDesc(p.desc);
    
    // Check if preset image or custom URL
    const isPreset = IMAGE_PRESETS.some(preset => preset.value === p.image);
    if (isPreset) {
      setImage(p.image);
      setCustomImage("");
    } else {
      setImage("");
      setCustomImage(p.image);
    }
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !price || !desc) {
      alert("Please fill in all required fields.");
      return;
    }

    const finalImage = customImage || image || capsules;
    const productData = {
      title,
      tag: tag.toUpperCase(),
      price: parseFloat(price),
      mrp: mrp ? parseFloat(mrp) : undefined,
      desc,
      image: finalImage,
    };

    if (editingId) {
      updateProduct(editingId, productData);
    } else {
      addProduct(productData);
    }
    resetForm();
  };

  const handleDelete = (id: string) => {
    deleteProduct(id);
    setDeletingId(null);
  };

  if (!isAuthenticated) {
    return (
      <div className="bg-earth/10 min-h-screen py-20 px-4 sm:px-6 lg:px-8 flex flex-col justify-center items-center">
        <div className="mx-auto w-full max-w-md">
          {/* Brand Logo/Header */}
          <div className="text-center mb-8">
            <div className="mx-auto h-12 w-12 rounded-full bg-leaf/10 flex items-center justify-center text-leaf mb-3">
              <Leaf className="h-6 w-6" />
            </div>
            <h2 className="text-3xl font-extrabold text-foreground tracking-tight">Thulir Healthcare</h2>
            <p className="text-sm text-muted-foreground mt-2">Admin Portal Login</p>
          </div>

          {/* Login Card */}
          <div className="bg-card border border-border rounded-2xl shadow-xl p-8 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-leaf/40 via-leaf to-leaf/40"></div>
            
            <form onSubmit={handleLogin} className="space-y-6">
              {loginError && (
                <div className="rounded-lg bg-red-500/10 border border-red-500/20 p-3 text-xs text-red-600 font-semibold flex items-center gap-2">
                  <ShieldAlert className="h-4 w-4 shrink-0" />
                  <span>{loginError}</span>
                </div>
              )}

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1.5">
                  Username
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-muted-foreground">
                    <User className="h-4 w-4" />
                  </span>
                  <input
                    type="text"
                    required
                    value={loginUsername}
                    onChange={(e) => setLoginUsername(e.target.value)}
                    className="w-full rounded-lg border border-border bg-background pl-10 pr-3 py-2.5 text-sm text-foreground focus:border-leaf focus:outline-none"
                    placeholder="admin"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1.5">
                  Password
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-muted-foreground">
                    <Lock className="h-4 w-4" />
                  </span>
                  <input
                    type="password"
                    required
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    className="w-full rounded-lg border border-border bg-background pl-10 pr-3 py-2.5 text-sm text-foreground focus:border-leaf focus:outline-none"
                    placeholder="••••••••"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-leaf px-5 py-3 text-sm font-semibold text-leaf-foreground shadow-md transition-transform hover:scale-102 hover:bg-leaf/90 cursor-pointer"
              >
                Sign In
              </button>
            </form>
          </div>
          
          <p className="text-center text-xs text-muted-foreground mt-6">
            Default credentials: <code className="bg-muted px-1.5 py-0.5 rounded font-mono text-[10px]">admin</code> / <code className="bg-muted px-1.5 py-0.5 rounded font-mono text-[10px]">admin123</code>
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-earth/10 min-h-screen py-10 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-border pb-6 mb-8">
          <div>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-leaf/10 px-3 py-1 text-xs font-semibold text-leaf">
              <Leaf className="h-3 w-3" /> Management
            </span>
            <h1 className="text-3xl font-extrabold text-foreground tracking-tight mt-1">Admin Product Portal</h1>
            <p className="text-sm text-muted-foreground mt-1">
              Add, update, or remove products displayed in the store catalog.
            </p>
          </div>
          <div className="flex items-center gap-3">
            {!isAdding && !editingId && (
              <button
                onClick={() => {
                  resetForm();
                  setIsAdding(true);
                }}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-leaf px-5 py-2.5 text-sm font-semibold text-leaf-foreground shadow transition-transform hover:scale-102 hover:bg-leaf/90 cursor-pointer"
              >
                <Plus className="h-4 w-4" /> Add Product
              </button>
            )}
            <button
              onClick={handleLogout}
              className="inline-flex items-center justify-center gap-2 rounded-full border border-border px-5 py-2.5 text-sm font-semibold text-foreground hover:bg-muted transition-transform hover:scale-102 cursor-pointer"
            >
              <LogOut className="h-4 w-4" /> Sign Out
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex items-center gap-4 border-b border-border mb-8">
          <button
            onClick={() => setActiveTab("products")}
            className={`pb-3 px-1 text-sm font-bold border-b-2 transition-colors ${
              activeTab === "products"
                ? "border-leaf text-leaf"
                : "border-transparent text-muted-foreground hover:text-foreground hover:border-border"
            }`}
          >
            Products
          </button>
          <button
            onClick={() => setActiveTab("orders")}
            className={`pb-3 px-1 text-sm font-bold border-b-2 transition-colors ${
              activeTab === "orders"
                ? "border-leaf text-leaf"
                : "border-transparent text-muted-foreground hover:text-foreground hover:border-border"
            }`}
          >
            <span className="flex items-center gap-2">
              Orders
            </span>
          </button>
          <button
            onClick={() => setActiveTab("appointments")}
            className={`pb-3 px-1 text-sm font-bold border-b-2 transition-colors ${
              activeTab === "appointments"
                ? "border-leaf text-leaf"
                : "border-transparent text-muted-foreground hover:text-foreground hover:border-border"
            }`}
          >
            <span className="flex items-center gap-2">
              Appointments
            </span>
          </button>
        </div>

        {/* Tab Content */}
        {activeTab === "products" ? (
          <>
            {/* Add/Edit Form Overlay */}
        {(isAdding || editingId) && (
          <div className="mb-8 rounded-2xl border border-border bg-card p-6 shadow-md max-w-2xl mx-auto">
            <div className="flex items-center justify-between border-b border-border pb-4 mb-4">
              <h2 className="text-xl font-bold text-foreground">
                {editingId ? "Edit Product Details" : "Create New Product"}
              </h2>
              <button onClick={resetForm} className="text-muted-foreground hover:text-foreground">
                <X className="h-5 w-5" />
              </button>
            </div>
            <form onSubmit={handleSave} className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1">
                    Product Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground focus:border-leaf focus:outline-none"
                    placeholder="e.g. Pure Honey Hair Oil"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1">
                    Category Tag
                  </label>
                  <input
                    type="text"
                    value={tag}
                    onChange={(e) => setTag(e.target.value)}
                    className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground focus:border-leaf focus:outline-none"
                    placeholder="e.g. HERBAL, WELLNESS"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1">
                    Sale Price (₹) *
                  </label>
                  <input
                    type="number"
                    required
                    min="0"
                    step="0.01"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground focus:border-leaf focus:outline-none"
                    placeholder="e.g. 299"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1">
                    MRP / Original Price (₹)
                  </label>
                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    value={mrp}
                    onChange={(e) => setMrp(e.target.value)}
                    className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground focus:border-leaf focus:outline-none"
                    placeholder="e.g. 399 (Optional)"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1">
                  Description *
                </label>
                <textarea
                  required
                  rows={3}
                  value={desc}
                  onChange={(e) => setDesc(e.target.value)}
                  className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground focus:border-leaf focus:outline-none"
                  placeholder="Describe the product health benefits..."
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1">
                  Product Image Source
                </label>
                <div className="grid gap-4 sm:grid-cols-2 mt-2">
                  <div>
                    <span className="block text-[11px] text-muted-foreground mb-1 font-semibold">Choose Clinical Preset</span>
                    <select
                      value={image}
                      onChange={(e) => {
                        setImage(e.target.value);
                        setCustomImage("");
                      }}
                      className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground focus:border-leaf focus:outline-none"
                    >
                      {IMAGE_PRESETS.map((preset) => (
                        <option key={preset.value} value={preset.value}>
                          {preset.label}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <span className="block text-[11px] text-muted-foreground mb-1 font-semibold">Or Paste Custom Image URL</span>
                    <input
                      type="text"
                      value={customImage}
                      onChange={(e) => {
                        setCustomImage(e.target.value);
                        setImage("");
                      }}
                      className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground focus:border-leaf focus:outline-none"
                      placeholder="https://images.unsplash.com/..."
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-2 border-t border-border pt-4 mt-6">
                <button
                  type="button"
                  onClick={resetForm}
                  className="rounded-full border border-border px-5 py-2 text-sm font-semibold text-foreground hover:bg-muted"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-full bg-leaf px-5 py-2 text-sm font-semibold text-leaf-foreground hover:bg-leaf/90"
                >
                  Save Product
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Delete Confirmation Alert */}
        {deletingId && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
            <div className="w-full max-w-md rounded-2xl bg-card border border-border p-6 shadow-xl">
              <div className="flex items-center gap-3 text-red-600 mb-3">
                <ShieldAlert className="h-6 w-6" />
                <h3 className="text-lg font-bold text-foreground">Remove Product?</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                Are you sure you want to delete this product? This action cannot be undone.
              </p>
              <div className="flex justify-end gap-2 mt-6">
                <button
                  onClick={() => setDeletingId(null)}
                  className="rounded-full border border-border px-4 py-2 text-xs font-semibold text-foreground hover:bg-muted"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleDelete(deletingId)}
                  className="rounded-full bg-red-600 px-4 py-2 text-xs font-semibold text-white hover:bg-red-700"
                >
                  Delete Product
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Catalog Table */}
        <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
          <div className="p-5 border-b border-border bg-muted/40">
            <h3 className="font-bold text-lg text-foreground">Catalog List ({products.length} Products)</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-left text-sm text-muted-foreground">
              <thead className="bg-muted/20 text-xs font-bold uppercase tracking-wider text-muted-foreground border-b border-border">
                <tr>
                  <th className="px-6 py-4">Product</th>
                  <th className="px-6 py-4">Tag</th>
                  <th className="px-6 py-4">Price</th>
                  <th className="px-6 py-4">MRP</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {products.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-6 py-10 text-center text-muted-foreground font-medium">
                      No products found. Click "Add Product" to create one.
                    </td>
                  </tr>
                ) : (
                  products.map((p) => (
                    <tr key={p.id} className="hover:bg-muted/10 transition-colors">
                      <td className="px-6 py-4 flex items-center gap-3">
                        <div className="h-10 w-10 shrink-0 overflow-hidden rounded-lg border border-border">
                          <img src={p.image} alt={p.title} className="h-full w-full object-cover" />
                        </div>
                        <div>
                          <span className="block font-bold text-foreground">{p.title}</span>
                          <span className="block text-xs line-clamp-1 mt-0.5">{p.desc}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="inline-flex items-center rounded-full bg-leaf/10 px-2 py-0.5 text-xs font-medium text-leaf">
                          {p.tag}
                        </span>
                      </td>
                      <td className="px-6 py-4 font-bold text-foreground">
                        {inr(p.price)}
                      </td>
                      <td className="px-6 py-4">
                        {p.mrp ? <span className="line-through">{inr(p.mrp)}</span> : "-"}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex justify-end gap-2">
                          <button
                            onClick={() => handleEditClick(p)}
                            aria-label="Edit product"
                            className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-border text-foreground hover:bg-leaf/10 hover:text-leaf transition-colors"
                          >
                            <Pencil className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => setDeletingId(p.id)}
                            aria-label="Delete product"
                            className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-border text-red-600 hover:bg-red-50 transition-colors"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
        </>
        ) : activeTab === "orders" ? (
          <OrdersView orders={orders} isLoading={isLoadingOrders} />
        ) : (
          <AppointmentsView appointments={appointments} isLoading={isLoadingAppointments} />
        )}
      </div>
    </div>
  );
}

function OrdersView({ orders, isLoading }: { orders: any[]; isLoading: boolean }) {
  if (isLoading) {
    return <div className="text-center py-20 text-muted-foreground font-medium">Loading orders...</div>;
  }

  const handleWhatsAppConfirm = (order: any) => {
    const orderId = order.id.slice(0, 8).toUpperCase();
    const msg = [
      `Hello ${order.customerName},`,
      ``,
      `Your order *${orderId}* from Thulir Healthcare has been confirmed!`,
      `*Total Amount:* ₹${order.totalAmount}`,
      `*Payment Method:* ${order.paymentMethod.toUpperCase()}`,
      ``,
      `We will dispatch it to your address:`,
      `${order.address}, ${order.city} - ${order.pincode}`,
      ``,
      `Thank you for choosing Thulir Healthcare! 🙏`
    ].join("\\n");
    
    // Attempt to format the phone number
    let phone = order.phone.replace(/\\D/g, '');
    if (phone.length === 10) phone = '91' + phone;
    
    const waUrl = `https://wa.me/${phone}?text=${encodeURIComponent(msg)}`;
    window.open(waUrl, '_blank', 'noopener');
  };

  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
      <div className="p-5 border-b border-border bg-muted/40">
        <h3 className="font-bold text-lg text-foreground">Customer Orders ({orders.length})</h3>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-left text-sm text-muted-foreground">
          <thead className="bg-muted/20 text-xs font-bold uppercase tracking-wider text-muted-foreground border-b border-border">
            <tr>
              <th className="px-6 py-4">Order ID & Date</th>
              <th className="px-6 py-4">Customer</th>
              <th className="px-6 py-4">Address</th>
              <th className="px-6 py-4">Amount & Method</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {orders.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-6 py-10 text-center text-muted-foreground font-medium">
                  No orders found.
                </td>
              </tr>
            ) : (
              orders.map((o) => (
                <tr key={o.id} className="hover:bg-muted/10 transition-colors">
                  <td className="px-6 py-4">
                    <span className="block font-bold text-foreground font-mono">{o.id.slice(0, 8).toUpperCase()}</span>
                    <span className="block text-xs mt-0.5">{new Date(o.createdAt).toLocaleDateString()}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="block font-bold text-foreground">{o.customerName}</span>
                    <span className="block text-xs mt-0.5">{o.phone}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="block text-xs line-clamp-2 max-w-[200px]">{o.address}, {o.city} - {o.pincode}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="block font-bold text-foreground">₹{o.totalAmount}</span>
                    <span className="inline-flex items-center rounded-full bg-leaf/10 px-2 py-0.5 text-[10px] font-bold text-leaf mt-1 uppercase">
                      {o.paymentMethod}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button
                      onClick={() => handleWhatsAppConfirm(o)}
                      className="inline-flex items-center gap-2 rounded-full bg-[#25D366] px-3 py-1.5 text-xs font-bold text-white shadow-sm hover:bg-[#20bd5a] transition-transform hover:scale-105"
                    >
                      <MessageCircle className="h-3 w-3" /> Confirm
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function AppointmentsView({ appointments, isLoading }: { appointments: any[]; isLoading: boolean }) {
  if (isLoading) {
    return <div className="text-center py-20 text-muted-foreground font-medium">Loading appointments...</div>;
  }

  const handleWhatsAppConfirm = (apt: any) => {
    const aptId = apt.id.slice(0, 8).toUpperCase();
    const dateStr = new Date(apt.date).toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
    
    const msg = [
      `Hello ${apt.name},`,
      ``,
      `Your appointment *${aptId}* at Thulir Healthcare is confirmed!`,
      `*Date:* ${dateStr}`,
      `*Time:* ${apt.slot}`,
      `*Treatment:* ${apt.treatment}`,
      ``,
      `Please arrive 5 minutes early. See you soon! 🙏`
    ].join("\\n");
    
    let phone = apt.phone.replace(/\\D/g, '');
    if (phone.length === 10) phone = '91' + phone;
    
    const waUrl = `https://wa.me/${phone}?text=${encodeURIComponent(msg)}`;
    window.open(waUrl, '_blank', 'noopener');
  };

  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
      <div className="p-5 border-b border-border bg-muted/40">
        <h3 className="font-bold text-lg text-foreground">Appointments ({appointments.length})</h3>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-left text-sm text-muted-foreground">
          <thead className="bg-muted/20 text-xs font-bold uppercase tracking-wider text-muted-foreground border-b border-border">
            <tr>
              <th className="px-6 py-4">Apt ID</th>
              <th className="px-6 py-4">Patient</th>
              <th className="px-6 py-4">Date & Slot</th>
              <th className="px-6 py-4">Treatment</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {appointments.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-6 py-10 text-center text-muted-foreground font-medium">
                  No appointments found.
                </td>
              </tr>
            ) : (
              appointments.map((apt) => (
                <tr key={apt.id} className="hover:bg-muted/10 transition-colors">
                  <td className="px-6 py-4">
                    <span className="block font-bold text-foreground font-mono">{apt.id.slice(0, 8).toUpperCase()}</span>
                    <span className="block text-xs mt-0.5">{new Date(apt.createdAt).toLocaleDateString()}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="block font-bold text-foreground">{apt.name}</span>
                    <span className="block text-xs mt-0.5">{apt.phone} {apt.age ? `• ${apt.age} yrs` : ''}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="block font-bold text-foreground">{new Date(apt.date).toLocaleDateString()}</span>
                    <span className="inline-flex items-center rounded-full bg-leaf/10 px-2 py-0.5 text-[10px] font-bold text-leaf mt-1">
                      {apt.slot}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="block font-bold text-foreground">{apt.treatment}</span>
                    {apt.concern && <span className="block text-xs line-clamp-1 mt-0.5 max-w-[200px]">{apt.concern}</span>}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button
                      onClick={() => handleWhatsAppConfirm(apt)}
                      className="inline-flex items-center gap-2 rounded-full bg-[#25D366] px-3 py-1.5 text-xs font-bold text-white shadow-sm hover:bg-[#20bd5a] transition-transform hover:scale-105"
                    >
                      <MessageCircle className="h-3 w-3" /> Confirm
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
