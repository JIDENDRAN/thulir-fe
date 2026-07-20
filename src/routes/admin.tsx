import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { Plus, Pencil, Trash2, X, Check, Image as ImageIcon, Leaf, ShieldAlert, Lock, User, LogOut, Package, MessageCircle, Calendar, Settings, Smartphone, RefreshCw, Upload } from "lucide-react";
import { useProducts } from "@/lib/products-context";
import { fetchApi } from "@/lib/api";
import { inr } from "@/lib/cart";
import QRCode from "react-qr-code";

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
  const [activeTab, setActiveTab] = useState<"products" | "treatments" | "gallery" | "orders" | "appointments" | "patients" | "settings">("products");

  // Orders State
  const [orders, setOrders] = useState<any[]>([]);
  const [isLoadingOrders, setIsLoadingOrders] = useState(false);
  
  // Appointments State
  const [appointments, setAppointments] = useState<any[]>([]);
  const [isLoadingAppointments, setIsLoadingAppointments] = useState(false);

  // Patients State
  const [patients, setPatients] = useState<any[]>([]);
  const [isLoadingPatients, setIsLoadingPatients] = useState(false);

  // WhatsApp State
  const [whatsappSettings, setWhatsappSettings] = useState<{connected: boolean, qrCode: string | null}>({ connected: false, qrCode: null });

  // Gallery State
  const [galleryImages, setGalleryImages] = useState<string[]>([]);
  const [showGalleryModal, setShowGalleryModal] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  // Treatments State
  const [treatmentItems, setTreatmentItems] = useState<any[]>([]);
  const [isLoadingTreatments, setIsLoadingTreatments] = useState(false);
  const [isAddingTreatment, setIsAddingTreatment] = useState(false);
  const [editingTreatmentId, setEditingTreatmentId] = useState<string | null>(null);
  const [treatmentTitle, setTreatmentTitle] = useState("");
  const [treatmentDesc, setTreatmentDesc] = useState("");
  const [treatmentImage, setTreatmentImage] = useState("");
  const [treatmentCategory, setTreatmentCategory] = useState("SIDDHA");

  const resetTreatmentForm = () => {
    setTreatmentTitle("");
    setTreatmentDesc("");
    setTreatmentImage("");
    setTreatmentCategory("SIDDHA");
    setEditingTreatmentId(null);
    setIsAddingTreatment(false);
  };

  const loadGallery = async () => {
    try {
      const urls = await fetchApi('/gallery');
      setGalleryImages(urls);
    } catch (e) {
      console.error("Failed to load gallery", e);
    }
  };

  const handleFileUpload = async (file: File) => {
    setIsUploading(true);
    try {
      const formData = new FormData();
      formData.append('image', file);
      const data = await fetchApi('/upload', {
        method: 'POST',
        body: formData,
      });
      return data.url;
    } catch (e) {
      alert("Failed to upload image");
      throw e;
    } finally {
      setIsUploading(false);
    }
  };

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
      
      if (activeTab === "patients" && patients.length === 0) {
        const loadPatients = async () => {
          setIsLoadingPatients(true);
          try {
            const data = await fetchApi('/patients');
            setPatients(data);
          } catch (err: any) {
            console.error("Failed to load patients", err);
            alert("Error fetching patients: " + err.message);
          } finally {
            setIsLoadingPatients(false);
          }
        };
        loadPatients();
      }

      if (activeTab === "treatments" && treatmentItems.length === 0) {
        const loadTreatments = async () => {
          setIsLoadingTreatments(true);
          try {
            const data = await fetchApi('/treatment-items');
            setTreatmentItems(data);
          } catch (err) {
            console.error("Failed to load treatments", err);
          } finally {
            setIsLoadingTreatments(false);
          }
        };
        loadTreatments();
      }

      if (activeTab === "gallery") {
        loadGallery();
      }

      if (activeTab === "settings") {
        const loadSettings = async () => {
          try {
            const data = await fetchApi('/whatsapp/settings');
            setWhatsappSettings(data);
          } catch (err) {
            console.error(err);
          }
        };
        loadSettings();
        
        // Poll for QR code updates every 5 seconds if not connected
        const interval = setInterval(() => {
          loadSettings();
        }, 5000);
        return () => clearInterval(interval);
      }
    }
  }, [isAuthenticated, activeTab]);

  const disconnectWhatsapp = async () => {
    if (!confirm("Are you sure you want to disconnect WhatsApp?")) return;
    try {
      await fetchApi('/whatsapp/disconnect', { method: 'POST' });
      setWhatsappSettings({ connected: false, qrCode: null });
    } catch (e) {
      console.error(e);
    }
  };

  // Form State
  const [title, setTitle] = useState("");
  const [tag, setTag] = useState("HERBAL");
  const [price, setPrice] = useState("");
  const [mrp, setMrp] = useState("");
  const [desc, setDesc] = useState("");
  const [specifications, setSpecifications] = useState<{key: string, value: string}[]>([]);
  const [image, setImage] = useState(capsules);
  const [customImage, setCustomImage] = useState("");

  const resetForm = () => {
    setTitle("");
    setTag("HERBAL");
    setPrice("");
    setMrp("");
    setDesc("");
    setSpecifications([]);
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
    resetTreatmentForm();
  };

  const handleEditTreatment = (t: any) => {
    setEditingTreatmentId(t.id);
    setTreatmentTitle(t.title);
    setTreatmentDesc(t.desc);
    setTreatmentImage(t.image);
    setTreatmentCategory(t.category);
  };

  const handleSaveTreatment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!treatmentTitle || !treatmentDesc || !treatmentImage) {
      alert("Please fill in all required fields and upload an image.");
      return;
    }
    
    try {
      const payload = {
        title: treatmentTitle,
        desc: treatmentDesc,
        image: treatmentImage,
        category: treatmentCategory
      };

      if (editingTreatmentId) {
        await fetchApi(`/treatment-items/${editingTreatmentId}`, {
          method: 'PUT',
          body: JSON.stringify(payload)
        });
      } else {
        await fetchApi('/treatment-items', {
          method: 'POST',
          body: JSON.stringify(payload)
        });
      }
      
      const data = await fetchApi('/treatment-items');
      setTreatmentItems(data);
      resetTreatmentForm();
    } catch (err: any) {
      alert("Error saving treatment: " + err.message);
    }
  };

  const handleDeleteTreatment = async (id: string) => {
    if (!confirm("Are you sure you want to delete this treatment?")) return;
    try {
      await fetchApi(`/treatment-items/${id}`, { method: 'DELETE' });
      setTreatmentItems(treatmentItems.filter(t => t.id !== id));
    } catch (err: any) {
      alert("Error deleting treatment: " + err.message);
    }
  };

  const handleEditClick = (p: any) => {
    setEditingId(p.id);
    setTitle(p.title);
    setTag(p.tag);
    setPrice(p.price.toString());
    setMrp(p.mrp ? p.mrp.toString() : "");
    setDesc(p.desc);
    
    if (p.specifications) {
      setSpecifications(Object.entries(p.specifications).map(([key, value]) => ({ key, value: value as string })));
    } else {
      setSpecifications([]);
    }
    
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
    const specsObj = specifications.reduce((acc, curr) => {
      if (curr.key.trim() && curr.value.trim()) {
        acc[curr.key.trim()] = curr.value.trim();
      }
      return acc;
    }, {} as Record<string, string>);

    const productData = {
      title,
      tag: tag.toUpperCase(),
      price: parseFloat(price),
      mrp: mrp ? parseFloat(mrp) : undefined,
      desc,
      image: finalImage,
      specifications: specsObj,
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
          <div className="text-center mb-8">
            <img src="/logo.png" alt="Thulir Healthcare Logo" className="mx-auto h-16 w-16 object-contain mb-3" />
            <h2 className="text-3xl font-extrabold text-foreground tracking-tight">Thulir Healthcare</h2>
            <p className="text-sm text-muted-foreground mt-2">Admin Portal Login</p>
          </div>

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
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-border pb-6 mb-8">
          <div>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-leaf/10 px-3 py-1 text-xs font-semibold text-leaf">
              <Leaf className="h-3 w-3" /> Management
            </span>
            <h1 className="text-3xl font-extrabold text-foreground tracking-tight mt-1">Admin Portal</h1>
            <p className="text-sm text-muted-foreground mt-1">
              Manage your products, orders, appointments, and system settings.
            </p>
          </div>
          <button
            onClick={handleLogout}
            className="inline-flex items-center justify-center gap-2 rounded-full border border-border px-5 py-2.5 text-sm font-semibold text-foreground hover:bg-muted transition-transform hover:scale-102 cursor-pointer"
          >
            <LogOut className="h-4 w-4" /> Sign Out
          </button>
        </div>

        {/* Tabs */}
        <div className="flex items-center gap-4 border-b border-border mb-8 overflow-x-auto">
          {["products", "treatments", "gallery", "orders", "appointments", "patients", "settings"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab as any)}
              className={`pb-3 px-1 text-sm font-bold border-b-2 transition-colors capitalize ${
                activeTab === tab
                  ? "border-leaf text-leaf"
                  : "border-transparent text-muted-foreground hover:text-foreground hover:border-border"
              }`}
            >
              {tab}
            </button>
          ))}
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
                  Specifications
                </label>
                <div className="space-y-2">
                  {specifications.map((spec, index) => (
                    <div key={index} className="flex gap-2">
                      <input 
                        type="text" 
                        placeholder="Key (e.g. Fragrance)" 
                        value={spec.key} 
                        onChange={(e) => {
                          const newSpecs = [...specifications];
                          newSpecs[index].key = e.target.value;
                          setSpecifications(newSpecs);
                        }}
                        className="w-1/3 rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground focus:border-leaf focus:outline-none"
                      />
                      <input 
                        type="text" 
                        placeholder="Value (e.g. Turmeric)" 
                        value={spec.value} 
                        onChange={(e) => {
                          const newSpecs = [...specifications];
                          newSpecs[index].value = e.target.value;
                          setSpecifications(newSpecs);
                        }}
                        className="flex-1 rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground focus:border-leaf focus:outline-none"
                      />
                      <button 
                        type="button" 
                        onClick={() => setSpecifications(specifications.filter((_, i) => i !== index))}
                        className="rounded-lg border border-border p-2 text-red-500 hover:bg-red-50 transition-colors"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                  <button 
                    type="button" 
                    onClick={() => setSpecifications([...specifications, {key: "", value: ""}])}
                    className="inline-flex items-center gap-1 text-sm font-semibold text-leaf hover:underline mt-2"
                  >
                    <Plus className="h-4 w-4" /> Add Specification
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1">
                  Product Image Source
                </label>
                <div className="flex flex-wrap items-center gap-3 mt-2">
                  <label className="cursor-pointer inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-sm font-semibold hover:bg-muted transition-colors">
                    {isUploading ? <RefreshCw className="h-4 w-4 animate-spin" /> : <Upload className="h-4 w-4" />}
                    {isUploading ? "Uploading..." : "Upload New Image"}
                    <input 
                      type="file" 
                      accept="image/*" 
                      className="hidden" 
                      disabled={isUploading}
                      onChange={async (e) => {
                        if (e.target.files && e.target.files[0]) {
                          try {
                            const url = await handleFileUpload(e.target.files[0]);
                            setCustomImage(url);
                            setImage("");
                            loadGallery(); // Refresh gallery in background
                          } catch(err) {
                            // Handled in helper
                          }
                        }
                      }}
                    />
                  </label>
                  
                  <button 
                    type="button" 
                    onClick={() => {
                      loadGallery();
                      setShowGalleryModal(true);
                    }}
                    className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-sm font-semibold hover:bg-muted transition-colors"
                  >
                    <ImageIcon className="h-4 w-4" />
                    Select from Gallery
                  </button>
                </div>
                
                {/* Preview */}
                {(customImage || image) && (
                  <div className="mt-4">
                    <span className="block text-[11px] text-muted-foreground mb-1 font-semibold">Image Preview</span>
                    <img src={customImage || image} className="h-24 w-24 object-cover rounded-lg border border-border shadow-sm" alt="Preview" />
                  </div>
                )}
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

        {/* Gallery Selection Modal */}
        {showGalleryModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
            <div className="w-full max-w-4xl max-h-[80vh] flex flex-col rounded-2xl bg-card border border-border shadow-xl">
              <div className="flex items-center justify-between border-b border-border p-5">
                <h3 className="font-bold text-lg text-foreground">Select Image from Gallery</h3>
                <button onClick={() => setShowGalleryModal(false)} className="text-muted-foreground hover:text-foreground">
                  <X className="h-5 w-5" />
                </button>
              </div>
              <div className="p-5 overflow-y-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 bg-muted/20">
                {galleryImages.length === 0 ? (
                  <p className="col-span-full text-center text-muted-foreground py-10 font-medium">No images in gallery yet.</p>
                ) : (
                  galleryImages.map((url, i) => (
                    <div 
                      key={i} 
                      onClick={() => {
                        setCustomImage(url);
                        setImage("");
                        setShowGalleryModal(false);
                      }}
                      className="aspect-square rounded-xl border-2 border-transparent hover:border-leaf overflow-hidden cursor-pointer transition-all hover:scale-105 shadow-sm bg-background"
                    >
                      <img src={url} className="w-full h-full object-cover" alt="Gallery item" />
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        )}

        {/* Catalog Table */}
        <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
          <div className="p-5 border-b border-border bg-muted/40 flex items-center justify-between">
            <h3 className="font-bold text-lg text-foreground">Catalog List ({products.length} Products)</h3>
            <button
              onClick={() => {
                resetForm();
                setIsAdding(true);
              }}
              className="inline-flex items-center gap-2 rounded-full bg-leaf px-4 py-2 text-xs font-bold text-leaf-foreground shadow-sm hover:bg-leaf/90 transition-transform hover:scale-105"
            >
              <Plus className="h-4 w-4" /> Add Product
            </button>
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
        ) : activeTab === "treatments" ? (
          <>
            {/* Add/Edit Treatment Form Overlay */}
            {(isAddingTreatment || editingTreatmentId) && (
              <div className="mb-8 rounded-2xl border border-border bg-card p-6 shadow-md max-w-2xl mx-auto">
                <div className="flex items-center justify-between border-b border-border pb-4 mb-4">
                  <h2 className="text-xl font-bold text-foreground">
                    {editingTreatmentId ? "Edit Treatment" : "Create New Treatment"}
                  </h2>
                  <button onClick={resetTreatmentForm} className="text-muted-foreground hover:text-foreground">
                    <X className="h-5 w-5" />
                  </button>
                </div>
                <form onSubmit={handleSaveTreatment} className="space-y-4">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1">
                        Treatment Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={treatmentTitle}
                        onChange={(e) => setTreatmentTitle(e.target.value)}
                        className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground focus:border-leaf focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1">
                        Category *
                      </label>
                      <select
                        value={treatmentCategory}
                        onChange={(e) => setTreatmentCategory(e.target.value)}
                        className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground focus:border-leaf focus:outline-none"
                      >
                        <option value="SIDDHA">Siddha</option>
                        <option value="ACUPUNCTURE">Acupuncture</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1">
                      Description *
                    </label>
                    <textarea
                      required
                      value={treatmentDesc}
                      onChange={(e) => setTreatmentDesc(e.target.value)}
                      rows={3}
                      className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground focus:border-leaf focus:outline-none"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1">
                      Treatment Image *
                    </label>
                    <div className="flex gap-2 mb-2">
                      <input
                        type="file"
                        id="treatmentImageUpload"
                        className="hidden"
                        accept="image/*"
                        onChange={async (e) => {
                          if (e.target.files && e.target.files[0]) {
                            try {
                              const url = await handleFileUpload(e.target.files[0]);
                              setTreatmentImage(url);
                            } catch(err) {
                              // error handled in handleFileUpload
                            }
                          }
                        }}
                      />
                      <label 
                        htmlFor="treatmentImageUpload"
                        className="inline-flex cursor-pointer items-center justify-center rounded-lg border border-border bg-muted/30 px-3 py-2 text-sm font-medium hover:bg-muted"
                      >
                        {isUploading ? "Uploading..." : "Upload Image"}
                      </label>
                    </div>
                    
                    <div className="flex flex-wrap gap-2">
                      {treatmentImage && (
                        <div
                          className="group relative h-16 w-16 cursor-pointer overflow-hidden rounded-lg border-2 border-leaf"
                        >
                          <img src={treatmentImage} alt="Custom" className="h-full w-full object-cover" />
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex justify-end gap-2 pt-4">
                    <button
                      type="button"
                      onClick={resetTreatmentForm}
                      className="rounded-full border border-border px-5 py-2 text-sm font-semibold text-foreground hover:bg-muted"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="rounded-full bg-leaf px-5 py-2 text-sm font-semibold text-leaf-foreground hover:bg-leaf/90"
                    >
                      Save Treatment
                    </button>
                  </div>
                </form>
              </div>
            )}

            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-extrabold text-foreground tracking-tight">Treatment Management</h2>
              <button
                onClick={() => setIsAddingTreatment(true)}
                className="inline-flex items-center justify-center gap-1.5 rounded-full bg-leaf px-4 py-2 text-sm font-semibold text-leaf-foreground shadow transition-transform hover:scale-102 hover:bg-leaf/90 cursor-pointer"
              >
                <Plus className="h-4 w-4" /> Add Treatment
              </button>
            </div>

            <div className="overflow-hidden rounded-xl border border-border bg-card shadow-sm">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm text-muted-foreground">
                  <thead className="bg-muted/50 text-xs uppercase text-foreground">
                    <tr>
                      <th className="px-6 py-4">Treatment</th>
                      <th className="px-6 py-4">Category</th>
                      <th className="px-6 py-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {isLoadingTreatments ? (
                      <tr>
                        <td colSpan={3} className="px-6 py-10 text-center text-muted-foreground">Loading...</td>
                      </tr>
                    ) : treatmentItems.length === 0 ? (
                      <tr>
                        <td colSpan={3} className="px-6 py-10 text-center text-muted-foreground font-medium">
                          No treatments found. Click "Add Treatment" to create one.
                        </td>
                      </tr>
                    ) : (
                      treatmentItems.map((t) => (
                        <tr key={t.id} className="hover:bg-muted/10 transition-colors">
                          <td className="px-6 py-4 flex items-center gap-3">
                            <div className="h-10 w-10 shrink-0 overflow-hidden rounded-lg border border-border">
                              <img src={t.image} alt={t.title} className="h-full w-full object-cover" />
                            </div>
                            <div>
                              <span className="block font-bold text-foreground">{t.title}</span>
                              <span className="block text-xs line-clamp-1 mt-0.5">{t.desc}</span>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${t.category === 'SIDDHA' ? 'bg-leaf/10 text-leaf' : 'bg-earth/10 text-earth'}`}>
                              {t.category}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-right">
                            <div className="flex justify-end gap-2">
                              <button
                                onClick={() => handleEditTreatment(t)}
                                aria-label="Edit treatment"
                                className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-border text-foreground hover:bg-leaf/10 hover:text-leaf transition-colors"
                              >
                                <Pencil className="h-4 w-4" />
                              </button>
                              <button
                                onClick={() => handleDeleteTreatment(t.id)}
                                aria-label="Delete treatment"
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
        ) : activeTab === "gallery" ? (
          <GalleryView 
            images={galleryImages} 
            onUpload={async (e) => {
              if (e.target.files && e.target.files[0]) {
                await handleFileUpload(e.target.files[0]);
                loadGallery();
              }
            }}
            onDelete={async (url) => {
              const filename = url.split('/').pop();
              if (!filename) return;
              try {
                await fetchApi(`/gallery/${filename}`, { method: 'DELETE' });
                loadGallery();
              } catch (err) {
                alert("Failed to delete image.");
              }
            }}
            isUploading={isUploading}
          />
        ) : activeTab === "orders" ? (
          <OrdersView orders={orders} isLoading={isLoadingOrders} />
        ) : activeTab === "appointments" ? (
          <AppointmentsView appointments={appointments} isLoading={isLoadingAppointments} />
        ) : activeTab === "patients" ? (
          <PatientsView patients={patients} isLoading={isLoadingPatients} />
        ) : (
          <SettingsView whatsappSettings={whatsappSettings} disconnectWhatsapp={disconnectWhatsapp} />
        )}
      </div>
    </div>
  );
}

function GalleryView({ images, onUpload, onDelete, isUploading }: { images: string[], onUpload: (e: any) => void, onDelete: (url: string) => void, isUploading: boolean }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
      <div className="p-5 border-b border-border bg-muted/40 flex items-center justify-between">
        <h3 className="font-bold text-lg text-foreground">Image Gallery</h3>
        <label className="cursor-pointer inline-flex items-center gap-2 rounded-full bg-leaf px-4 py-2 text-xs font-bold text-leaf-foreground shadow-sm hover:bg-leaf/90 transition-transform hover:scale-105">
          {isUploading ? <RefreshCw className="h-4 w-4 animate-spin" /> : <Upload className="h-4 w-4" />}
          {isUploading ? "Uploading..." : "Upload New Image"}
          <input 
            type="file" 
            accept="image/*" 
            className="hidden" 
            disabled={isUploading}
            onChange={onUpload}
          />
        </label>
      </div>
      <div className="p-6">
        {images.length === 0 ? (
          <div className="text-center py-20 text-muted-foreground font-medium">
            <ImageIcon className="h-12 w-12 mx-auto mb-3 opacity-20" />
            No images uploaded yet.
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {images.map((url, i) => (
              <div key={i} className="group relative aspect-square overflow-hidden rounded-xl border border-border bg-muted shadow-sm">
                <img src={url} alt="Gallery" className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110" />
                <button
                  type="button"
                  onClick={() => {
                    if (confirm("Are you sure you want to delete this image?")) {
                      onDelete(url);
                    }
                  }}
                  className="absolute top-2 right-2 flex h-8 w-8 items-center justify-center rounded-full bg-red-600/90 text-white shadow-md transition-all hover:bg-red-600"
                  aria-label="Delete image"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
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

function PatientsView({ patients, isLoading }: { patients: any[]; isLoading: boolean }) {
  if (isLoading) {
    return <div className="text-center py-20 text-muted-foreground font-medium">Loading patients...</div>;
  }

  const handleWhatsAppConfirm = (patient: any) => {
    const msg = [
      `Hello ${patient.name},`,
      ``,
      `Thank you for registering with Thulir Healthcare.`,
      `We have received your details and will get back to you shortly regarding your health concerns.`,
      ``,
      `Stay healthy! 🙏`
    ].join("\\n");
    
    let phone = patient.phone.replace(/\\D/g, '');
    if (phone.length === 10) phone = '91' + phone;
    
    const waUrl = `https://wa.me/${phone}?text=${encodeURIComponent(msg)}`;
    window.open(waUrl, '_blank', 'noopener');
  };

  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
      <div className="p-5 border-b border-border bg-muted/40">
        <h3 className="font-bold text-lg text-foreground">Patients ({patients.length})</h3>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-left text-sm text-muted-foreground">
          <thead className="bg-muted/20 text-xs font-bold uppercase tracking-wider text-muted-foreground border-b border-border">
            <tr>
              <th className="px-6 py-4">Reg Date</th>
              <th className="px-6 py-4">Patient Details</th>
              <th className="px-6 py-4">Location</th>
              <th className="px-6 py-4">Health Problem</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {patients.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-6 py-10 text-center text-muted-foreground font-medium">
                  No patient data found.
                </td>
              </tr>
            ) : (
              patients.map((p) => (
                <tr key={p.id} className="hover:bg-muted/10 transition-colors">
                  <td className="px-6 py-4">
                    <span className="block font-bold text-foreground font-mono">{new Date(p.createdAt).toLocaleDateString()}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="block font-bold text-foreground">{p.name}</span>
                    <span className="block text-xs mt-0.5">{p.phone} {p.age ? `• ${p.age} yrs` : ''}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="block font-bold text-foreground">{p.place || "-"}</span>
                    {p.address && <span className="block text-xs line-clamp-1 mt-0.5 max-w-[200px]">{p.address}</span>}
                  </td>
                  <td className="px-6 py-4">
                    {p.problem ? <span className="block font-bold text-foreground line-clamp-2 max-w-[250px]">{p.problem}</span> : "-"}
                    {p.remarks && <span className="block text-xs line-clamp-1 mt-0.5 max-w-[250px]">{p.remarks}</span>}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button
                      onClick={() => handleWhatsAppConfirm(p)}
                      className="inline-flex items-center gap-2 rounded-full bg-[#25D366] px-3 py-1.5 text-xs font-bold text-white shadow-sm hover:bg-[#20bd5a] transition-transform hover:scale-105"
                    >
                      <MessageCircle className="h-3 w-3" /> Contact
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

function SettingsView({ whatsappSettings, disconnectWhatsapp }: { whatsappSettings: any; disconnectWhatsapp: () => void }) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground">Settings</h2>
        <p className="text-muted-foreground mt-1">Configure your admin dashboard preferences and integrations.</p>
      </div>
      
      <div className="rounded-xl border border-border bg-card p-6 shadow-sm max-w-2xl">
        <div className="flex items-center gap-3 mb-6">
          <div className="bg-green-100 p-3 rounded-full text-green-600">
            <Smartphone className="h-6 w-6" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-foreground">WhatsApp Notifications</h3>
            <p className="text-sm text-muted-foreground">Receive instant alerts for new bookings and orders</p>
          </div>
        </div>

        {whatsappSettings.connected ? (
          <div className="bg-green-50 border border-green-200 rounded-lg p-5 flex flex-col items-center justify-center text-center">
            <div className="h-16 w-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
              <Check className="h-8 w-8 text-green-600" />
            </div>
            <h4 className="text-lg font-bold text-green-900 mb-1">WhatsApp is Connected!</h4>
            <p className="text-green-700 text-sm mb-6 max-w-md">Your bot is active and will send notifications to the admin phone number whenever an order is placed or an appointment is booked.</p>
            <button 
              onClick={disconnectWhatsapp}
              className="px-4 py-2 border border-red-200 text-red-600 font-medium rounded-lg hover:bg-red-50 transition-colors"
            >
              Disconnect Device
            </button>
          </div>
        ) : (
          <div className="bg-muted/30 border border-border rounded-lg p-6 flex flex-col items-center text-center">
            <h4 className="text-lg font-bold text-foreground mb-2">Link Your WhatsApp</h4>
            <p className="text-muted-foreground text-sm mb-6 max-w-md">
              Open WhatsApp on your phone, go to <strong>Linked Devices</strong>, and scan this QR code to enable automatic notifications.
            </p>
            
            <div className="bg-white p-4 rounded-xl shadow-sm border border-border mb-4 min-h-[256px] flex items-center justify-center">
              {whatsappSettings.qrCode ? (
                <QRCode value={whatsappSettings.qrCode} size={220} />
              ) : (
                <div className="flex flex-col items-center gap-3 text-muted-foreground">
                  <RefreshCw className="h-8 w-8 animate-spin opacity-50" />
                  <p className="text-sm">Generating QR Code...</p>
                  <p className="text-xs opacity-70">(Make sure the backend server is running)</p>
                </div>
              )}
            </div>
            
            <p className="text-xs text-muted-foreground flex items-center gap-2">
              <RefreshCw className="h-3 w-3 animate-spin" /> QR code updates automatically
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
