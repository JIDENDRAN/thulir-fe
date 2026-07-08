import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { fetchApi } from "@/lib/api";
import { Leaf, User, Phone, MapPin, Map, FileText, CheckCircle2, ChevronRight } from "lucide-react";

export const Route = createFileRoute("/patient-intake")({
  component: PatientIntake,
});

function PatientIntake() {
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    place: "",
    phone: "",
    address: "",
    problem: "",
    remarks: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await fetchApi('/patients', {
        method: 'POST',
        body: JSON.stringify(formData),
      });
      setIsSuccess(true);
    } catch (err) {
      alert("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  if (isSuccess) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center p-6 bg-gradient-to-b from-leaf/5 to-transparent">
        <div className="max-w-md w-full bg-card p-10 rounded-3xl shadow-xl border border-border text-center">
          <div className="w-20 h-20 bg-leaf/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="w-10 h-10 text-leaf" />
          </div>
          <h2 className="text-3xl font-bold text-foreground mb-3 font-serif">Submitted Successfully</h2>
          <p className="text-muted-foreground mb-8">
            Thank you for providing your details. We have received your information securely.
          </p>
          <button
            onClick={() => {
              setFormData({ name: "", age: "", place: "", phone: "", address: "", problem: "", remarks: "" });
              setIsSuccess(false);
            }}
            className="w-full inline-flex justify-center rounded-full bg-leaf px-8 py-4 text-sm font-bold text-white shadow-lg hover:bg-leaf-dark hover:scale-[1.02] transition-all"
          >
            Submit Another Form
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-leaf/5 via-transparent to-transparent py-16 px-6">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-leaf/10 text-leaf text-sm font-bold tracking-widest uppercase mb-4">
            <Leaf className="w-4 h-4" /> Patient Intake
          </span>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground font-serif tracking-tight mb-4">
            Patient Registration
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Please fill out your personal details and health concerns so we can better assist you during your visit.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="bg-card shadow-2xl rounded-3xl p-8 md:p-12 border border-border">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* Name */}
            <div className="space-y-2">
              <label className="text-sm font-bold text-foreground flex items-center gap-2">
                <User className="w-4 h-4 text-leaf" /> Full Name <span className="text-red-500">*</span>
              </label>
              <input
                required
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="e.g. Bob Smith"
                className="w-full rounded-2xl border border-input bg-background px-4 py-3 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 transition-all"
              />
            </div>

            {/* Age */}
            <div className="space-y-2">
              <label className="text-sm font-bold text-foreground flex items-center gap-2">
                <User className="w-4 h-4 text-leaf" /> Age
              </label>
              <input
                name="age"
                type="number"
                value={formData.age}
                onChange={handleChange}
                placeholder="e.g. 35"
                className="w-full rounded-2xl border border-input bg-background px-4 py-3 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 transition-all"
              />
            </div>

            {/* Phone Number */}
            <div className="space-y-2">
              <label className="text-sm font-bold text-foreground flex items-center gap-2">
                <Phone className="w-4 h-4 text-leaf" /> Phone Number <span className="text-red-500">*</span>
              </label>
              <input
                required
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="e.g. 9876543210"
                className="w-full rounded-2xl border border-input bg-background px-4 py-3 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 transition-all"
              />
            </div>

            {/* Place */}
            <div className="space-y-2">
              <label className="text-sm font-bold text-foreground flex items-center gap-2">
                <MapPin className="w-4 h-4 text-leaf" /> City / Place
              </label>
              <input
                name="place"
                value={formData.place}
                onChange={handleChange}
                placeholder="e.g. Chennai"
                className="w-full rounded-2xl border border-input bg-background px-4 py-3 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 transition-all"
              />
            </div>

            {/* Address */}
            <div className="space-y-2 md:col-span-2">
              <label className="text-sm font-bold text-foreground flex items-center gap-2">
                <Map className="w-4 h-4 text-leaf" /> Full Address
              </label>
              <textarea
                name="address"
                value={formData.address}
                onChange={handleChange}
                rows={2}
                placeholder="e.g. 123 Main Street..."
                className="w-full rounded-2xl border border-input bg-background px-4 py-3 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 transition-all resize-none"
              />
            </div>

            {/* Problem */}
            <div className="space-y-2 md:col-span-2">
              <label className="text-sm font-bold text-foreground flex items-center gap-2">
                <FileText className="w-4 h-4 text-leaf" /> Primary Health Problem
              </label>
              <textarea
                name="problem"
                value={formData.problem}
                onChange={handleChange}
                rows={3}
                placeholder="Describe the main reason for your visit or health issue..."
                className="w-full rounded-2xl border border-input bg-background px-4 py-3 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 transition-all resize-none"
              />
            </div>

            {/* Remarks */}
            <div className="space-y-2 md:col-span-2">
              <label className="text-sm font-bold text-foreground flex items-center gap-2">
                <FileText className="w-4 h-4 text-muted-foreground" /> Additional Remarks (Optional)
              </label>
              <textarea
                name="remarks"
                value={formData.remarks}
                onChange={handleChange}
                rows={2}
                placeholder="Any other details you'd like us to know..."
                className="w-full rounded-2xl border border-input bg-background px-4 py-3 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 transition-all resize-none"
              />
            </div>
          </div>

          <div className="mt-10 pt-8 border-t border-border flex justify-end">
            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex items-center gap-2 rounded-full bg-leaf px-8 py-4 text-sm font-bold text-white shadow-lg hover:bg-leaf-dark hover:scale-105 transition-all disabled:opacity-50 disabled:hover:scale-100"
            >
              {isSubmitting ? "Submitting..." : "Submit Patient Data"}
              {!isSubmitting && <ChevronRight className="w-4 h-4" />}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
