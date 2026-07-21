"use client";

import React, { useState } from "react";
import { 
  Plus, Edit2, Trash2, Upload, Loader2, Sparkles, 
  Check, X, Flame, Apple, Stethoscope, GraduationCap, 
  Droplet, Trees, Briefcase
} from "lucide-react";
import { saveServiceAction, deleteServiceAction } from "@/app/actions/services";
import { uploadImageAction } from "@/app/actions/services";
import { convertToWebP } from "@/lib/imageUtils";

interface ServiceItem {
  _id?: string;
  title: string;
  slug: string;
  description: string;
  longDescription: string;
  iconName: string;
  image: string;
  features: string[];
  stats: { label: string; value: string }[];
  packages?: { name: string; cost: string; description: string }[];
  gallery?: string[];
}

interface ServicesManagerProps {
  initialServices: ServiceItem[];
}

const iconOptions = ["Flame", "Apple", "Stethoscope", "GraduationCap", "Droplet", "Trees", "Sparkles", "Briefcase"];

const defaultFormState: ServiceItem = {
  title: "",
  slug: "",
  description: "",
  longDescription: "",
  iconName: "Sparkles",
  image: "",
  features: [],
  stats: [],
  packages: [],
  gallery: []
};

export default function ServicesManager({ initialServices }: ServicesManagerProps) {
  const [services, setServices] = useState<ServiceItem[]>(initialServices);
  const [isEditing, setIsEditing] = useState(false);
  const [formState, setFormState] = useState<ServiceItem>(defaultFormState);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [newFeature, setNewFeature] = useState("");
  const [newStat, setNewStat] = useState({ label: "", value: "" });
  
  // Custom packages and gallery state hook variables
  const [newPackage, setNewPackage] = useState({ name: "", cost: "", description: "" });
  const [isUploadingGallery, setIsUploadingGallery] = useState(false);

  const handleEditClick = (service: ServiceItem) => {
    setFormState({ 
      ...service,
      packages: service.packages || [],
      gallery: service.gallery || []
    });
    setIsEditing(true);
  };

  const handleAddNewClick = () => {
    setFormState(defaultFormState);
    setIsEditing(true);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormState(prev => {
      const updated = { ...prev, [name]: value };
      // Auto-generate slug if title changes
      if (name === "title" && !prev._id) {
        updated.slug = value
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/(^-|-$)/g, "");
      }
      return updated;
    });
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      alert("Image file size must not exceed 5MB.");
      return;
    }

    setIsUploading(true);
    try {
      const webpFile = await convertToWebP(file);
      const formData = new FormData();
      formData.append("file", webpFile);
      const url = await uploadImageAction(formData);
      setFormState(prev => ({ ...prev, image: url }));
    } catch (error: any) {
      alert(`Failed to upload image: ${error?.message || error}`);
    } finally {
      setIsUploading(false);
    }
  };

  const handleAddFeature = () => {
    if (!newFeature.trim()) return;
    setFormState(prev => ({
      ...prev,
      features: [...prev.features, newFeature.trim()]
    }));
    setNewFeature("");
  };

  const handleRemoveFeature = (idx: number) => {
    setFormState(prev => ({
      ...prev,
      features: prev.features.filter((_, i) => i !== idx)
    }));
  };

  const handleAddStat = () => {
    if (!newStat.label.trim() || !newStat.value.trim()) return;
    setFormState(prev => ({
      ...prev,
      stats: [...prev.stats, { label: newStat.label.trim(), value: newStat.value.trim() }]
    }));
    setNewStat({ label: "", value: "" });
  };

  const handleRemoveStat = (idx: number) => {
    setFormState(prev => ({
      ...prev,
      stats: prev.stats.filter((_, i) => i !== idx)
    }));
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formState.title || !formState.slug || !formState.image) {
      alert("Please fill in all required fields (Title, Slug, Image)");
      return;
    }

    setIsSubmitting(true);
    try {
      const saved = await saveServiceAction(formState);
      if (formState._id) {
        setServices(prev => prev.map(s => s._id === saved._id ? saved : s));
      } else {
        setServices(prev => [saved, ...prev]);
      }
      setIsEditing(false);
    } catch (error: any) {
      alert(error.message || "Failed to save service");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteClick = async (service: ServiceItem) => {
    if (!confirm(`Are you sure you want to delete "${service.title}"?`)) return;

    try {
      await deleteServiceAction(service._id || service.slug);
      setServices(prev => prev.filter(s => s.slug !== service.slug));
    } catch (error: any) {
      alert(error.message || "Failed to delete service");
    }
  };

  const handleAddPackage = () => {
    if (!newPackage.name.trim() || !newPackage.cost.trim()) return;
    setFormState(prev => ({
      ...prev,
      packages: [...(prev.packages || []), { 
        name: newPackage.name.trim(), 
        cost: newPackage.cost.trim(), 
        description: newPackage.description.trim() || "Sponsorship Level Package"
      }]
    }));
    setNewPackage({ name: "", cost: "", description: "" });
  };

  const handleRemovePackage = (idx: number) => {
    setFormState(prev => ({
      ...prev,
      packages: (prev.packages || []).filter((_, i) => i !== idx)
    }));
  };

  const handleGalleryUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const filesArray = Array.from(files);
    
    // Check sizes for all files
    for (const file of filesArray) {
      if (file.size > 5 * 1024 * 1024) {
        alert(`File "${file.name}" exceeds the 5MB size limit.`);
        return;
      }
    }

    setIsUploadingGallery(true);
    try {
      const uploadPromises = filesArray.map(async (file) => {
        const webpFile = await convertToWebP(file);
        const formData = new FormData();
        formData.append("file", webpFile);
        return uploadImageAction(formData);
      });

      const urls = await Promise.all(uploadPromises);

      setFormState(prev => ({
        ...prev,
        gallery: [...(prev.gallery || []), ...urls]
      }));
    } catch (err: any) {
      alert(`Failed to upload one or more images: ${err?.message || err}`);
    } finally {
      setIsUploadingGallery(false);
    }
  };

  const handleRemoveGalleryImage = (idx: number) => {
    setFormState(prev => ({
      ...prev,
      gallery: (prev.gallery || []).filter((_, i) => i !== idx)
    }));
  };

  return (
    <div className="space-y-6">
      
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Welfare Services Directory</h2>
          <p className="text-xs text-slate-400 font-semibold mt-1">Manage the primary operational care categories of the foundation.</p>
        </div>
        {!isEditing && (
          <button 
            onClick={handleAddNewClick}
            className="inline-flex items-center gap-1.5 px-4 py-2 bg-primary text-white text-xs font-bold uppercase tracking-wider rounded-xl hover:bg-primary-hover shadow-sm transition-colors cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Add New Service</span>
          </button>
        )}
      </div>

      {/* Editing Form Panel */}
      {isEditing ? (
        <form onSubmit={handleFormSubmit} className="bg-white p-6 md:p-8 rounded-3xl border border-slate-100 shadow-sm space-y-6 animate-fadeIn">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <h3 className="font-bold text-slate-800 text-lg">
              {formState._id ? "Modify Existing Service" : "Register New Service"}
            </h3>
            <button 
              type="button" 
              onClick={() => setIsEditing(false)}
              className="text-slate-400 hover:text-slate-600 p-1.5 rounded-full hover:bg-slate-50 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Left side */}
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Service Title *</label>
                <input 
                  type="text" 
                  name="title" 
                  value={formState.title} 
                  onChange={handleInputChange} 
                  required
                  placeholder="e.g. Disaster Relief"
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm font-semibold text-slate-700 focus:outline-none focus:border-primary bg-slate-50/50"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Slug (URL link) *</label>
                <input 
                  type="text" 
                  name="slug" 
                  value={formState.slug} 
                  onChange={handleInputChange} 
                  required
                  placeholder="e.g. disaster-relief"
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm font-semibold text-slate-700 focus:outline-none focus:border-primary bg-slate-50/50"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Category Icon *</label>
                <select
                  name="iconName"
                  value={formState.iconName}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm font-semibold text-slate-700 focus:outline-none focus:border-primary bg-slate-50/50"
                >
                  {iconOptions.map(icon => (
                    <option key={icon} value={icon}>{icon}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Short Excerpt / Intro *</label>
                <input 
                  type="text" 
                  name="description" 
                  value={formState.description} 
                  onChange={handleInputChange} 
                  required
                  placeholder="e.g. Rescue operations, shelter construction..."
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm font-semibold text-slate-700 focus:outline-none focus:border-primary bg-slate-50/50"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Detailed Narrative Description</label>
                <textarea 
                  name="longDescription" 
                  value={formState.longDescription} 
                  onChange={handleInputChange} 
                  rows={4}
                  placeholder="Provide in-depth stories, execution timeline, and target scope of the welfare service..."
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm font-semibold text-slate-700 focus:outline-none focus:border-primary bg-slate-50/50"
                />
              </div>
            </div>

            {/* Right side */}
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Featured Banner Image *</label>
                <div className="flex items-center gap-4">
                  <div className="flex-1">
                    <input 
                      type="text" 
                      name="image" 
                      value={formState.image} 
                      onChange={handleInputChange} 
                      required
                      placeholder="Cloudinary image URL"
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 text-xs font-semibold text-slate-600 focus:outline-none focus:border-primary bg-slate-50/50"
                    />
                  </div>
                  
                  <label className="px-4 py-3 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-xs font-bold text-slate-700 flex items-center gap-2 cursor-pointer shadow-sm border-dashed">
                    {isUploading ? (
                      <Loader2 className="w-4 h-4 animate-spin text-primary" />
                    ) : (
                      <Upload className="w-4 h-4 text-slate-400" />
                    )}
                    <span>{isUploading ? "Uploading..." : "Upload File"}</span>
                    <input 
                      type="file" 
                      accept="image/*" 
                      onChange={handleImageUpload} 
                      className="hidden" 
                    />
                  </label>
                </div>

                {formState.image && (
                  <div className="relative mt-3 h-32 w-full rounded-xl overflow-hidden border border-slate-100 bg-slate-50">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img 
                      src={formState.image} 
                      alt="Featured banner preview"
                      className="w-full h-full object-cover" 
                    />
                  </div>
                )}
              </div>

              {/* Service Features list */}
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Key Service Operations</label>
                <div className="flex gap-2">
                  <input 
                    type="text" 
                    value={newFeature} 
                    onChange={(e) => setNewFeature(e.target.value)} 
                    placeholder="e.g. Free Ration Packs Distribution"
                    className="flex-1 px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-700 focus:outline-none focus:border-primary bg-slate-50/50"
                  />
                  <button 
                    type="button" 
                    onClick={handleAddFeature}
                    className="px-4 py-2.5 bg-slate-800 text-white hover:bg-slate-950 text-xs font-bold rounded-xl cursor-pointer"
                  >
                    Add
                  </button>
                </div>
                <div className="flex flex-wrap gap-1.5 mt-3">
                  {formState.features.map((feat, i) => (
                    <span key={i} className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-slate-700 text-xs font-semibold">
                      <span>{feat}</span>
                      <button type="button" onClick={() => handleRemoveFeature(i)} className="text-slate-400 hover:text-slate-600 rounded-full">
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
                  {formState.features.length === 0 && (
                    <span className="text-xs text-slate-400 font-medium italic">No operations added yet.</span>
                  )}
                </div>
              </div>

              {/* Stats list */}
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Key Impact Metrics</label>
                <div className="grid grid-cols-2 gap-2">
                  <input 
                    type="text" 
                    value={newStat.label} 
                    onChange={(e) => setNewStat(prev => ({ ...prev, label: e.target.value }))} 
                    placeholder="Metric Label (e.g. Volunteers)"
                    className="px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-700 focus:outline-none focus:border-primary bg-slate-50/50"
                  />
                  <div className="flex gap-2">
                    <input 
                      type="text" 
                      value={newStat.value} 
                      onChange={(e) => setNewStat(prev => ({ ...prev, value: e.target.value }))} 
                      placeholder="Value (e.g. 5,000+)"
                      className="flex-1 px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-700 focus:outline-none focus:border-primary bg-slate-50/50"
                    />
                    <button 
                      type="button" 
                      onClick={handleAddStat}
                      className="px-4 py-2.5 bg-slate-800 text-white hover:bg-slate-950 text-xs font-bold rounded-xl cursor-pointer"
                    >
                      Add
                    </button>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2 mt-3">
                  {formState.stats.map((st, i) => (
                    <div key={i} className="flex justify-between items-center p-2.5 bg-slate-50 border border-slate-100 rounded-xl">
                      <div className="truncate">
                        <span className="block text-[10px] uppercase font-bold text-slate-400">{st.label}</span>
                        <span className="text-xs font-bold text-slate-700">{st.value}</span>
                      </div>
                      <button type="button" onClick={() => handleRemoveStat(i)} className="text-slate-400 hover:text-red-500 p-1 hover:bg-red-50 rounded-full transition-colors">
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                  {formState.stats.length === 0 && (
                    <div className="col-span-2 text-xs text-slate-400 font-medium italic">No metrics added yet.</div>
                  )}
                </div>
              </div>
            </div>
          </div>

          <hr className="border-slate-100 my-6" />

          {/* Dynamic Sponsorship Packages */}
          <div className="space-y-4">
            <h4 className="font-bold text-slate-700 text-sm uppercase tracking-wider flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-amber-500" />
              <span>Sponsorship & Price Tiers</span>
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <input 
                type="text" 
                value={newPackage.name} 
                onChange={(e) => setNewPackage(prev => ({ ...prev, name: e.target.value }))} 
                placeholder="Package Name (e.g. Standard Hand Pump)"
                className="px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-700 bg-slate-50/50"
              />
              <input 
                type="text" 
                value={newPackage.cost} 
                onChange={(e) => setNewPackage(prev => ({ ...prev, cost: e.target.value }))} 
                placeholder="Cost (e.g. PKR 150,000)"
                className="px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-700 bg-slate-50/50"
              />
              <div className="flex gap-2">
                <input 
                  type="text" 
                  value={newPackage.description} 
                  onChange={(e) => setNewPackage(prev => ({ ...prev, description: e.target.value }))} 
                  placeholder="Short explanation (e.g. Ideal for shallow water)"
                  className="flex-1 px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-700 bg-slate-50/50"
                />
                <button 
                  type="button" 
                  onClick={handleAddPackage}
                  className="px-4 py-2.5 bg-slate-800 text-white hover:bg-slate-950 text-xs font-bold rounded-xl cursor-pointer"
                >
                  Add
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 mt-3">
              {(formState.packages || []).map((pkg, i) => (
                <div key={i} className="p-4 bg-slate-50 border border-slate-100 rounded-xl relative group">
                  <div className="pr-6">
                    <span className="block text-xs font-bold text-slate-800">{pkg.name}</span>
                    <span className="block text-[11px] font-extrabold text-emerald-600 mt-1">{pkg.cost}</span>
                    <span className="block text-[10px] text-slate-400 font-medium mt-1 leading-relaxed">{pkg.description}</span>
                  </div>
                  <button 
                    type="button" 
                    onClick={() => handleRemovePackage(i)} 
                    className="absolute top-3 right-3 text-slate-400 hover:text-red-500 p-1 hover:bg-red-50 rounded-full transition-colors"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
              {(formState.packages || []).length === 0 && (
                <div className="col-span-full text-xs text-slate-400 font-medium italic">No sponsorship packages created.</div>
              )}
            </div>
          </div>

          <hr className="border-slate-100 my-6" />

          {/* Service Photo Gallery */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="font-bold text-slate-700 text-sm uppercase tracking-wider flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-emerald-500" />
                <span>Sector Activity Photo Gallery</span>
              </h4>
              <label className="px-4 py-2 bg-white hover:bg-slate-50 border border-slate-200 text-xs font-bold text-slate-700 flex items-center gap-1.5 cursor-pointer rounded-xl border-dashed shadow-sm">
                {isUploadingGallery ? (
                  <Loader2 className="w-3.5 h-3.5 animate-spin text-primary" />
                ) : (
                  <Upload className="w-3.5 h-3.5 text-slate-400" />
                )}
                <span>{isUploadingGallery ? "Uploading..." : "Add Gallery Image"}</span>
                <input 
                  type="file" 
                  accept="image/*" 
                  multiple
                  onChange={handleGalleryUpload} 
                  className="hidden" 
                  disabled={isUploadingGallery}
                />
              </label>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-3 mt-3">
              {(formState.gallery || []).map((img, i) => (
                <div key={i} className="relative h-20 rounded-xl overflow-hidden bg-slate-50 border border-slate-100 group shadow-2xs">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={img} alt="Gallery Preview" className="w-full h-full object-cover" />
                  <button 
                    type="button" 
                    onClick={() => handleRemoveGalleryImage(i)}
                    className="absolute inset-0 bg-red-600/80 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <Trash2 className="w-4.5 h-4.5" />
                  </button>
                </div>
              ))}
              {(formState.gallery || []).length === 0 && (
                <div className="col-span-full text-xs text-slate-400 font-medium italic">No gallery images uploaded.</div>
              )}
            </div>
          </div>

          <div className="flex items-center justify-end gap-3 pt-6 border-t border-slate-100">
            <button 
              type="button" 
              onClick={() => setIsEditing(false)}
              className="px-6 py-3 border border-slate-200 text-slate-700 hover:bg-slate-50 rounded-xl text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button 
              type="submit" 
              disabled={isSubmitting || isUploading}
              className="px-6 py-3 bg-primary text-white hover:bg-primary-hover rounded-xl text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer flex items-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Saving...</span>
                </>
              ) : (
                <>
                  <Check className="w-4 h-4" />
                  <span>Save Service</span>
                </>
              )}
            </button>
          </div>
        </form>
      ) : (
        /* Services table listing */
        <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-100 bg-slate-50/75">
                  <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Icon / Image</th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Service Info</th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Description Excerpt</th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Metrics</th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {services.map(service => (
                  <tr key={service.slug} className="hover:bg-slate-50/30 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-100 overflow-hidden shrink-0">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img src={service.image} alt={service.title} className="w-full h-full object-cover" />
                        </div>
                        <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                          <Sparkles className="w-4 h-4" />
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="max-w-[200px]">
                        <h4 className="font-bold text-slate-800 text-sm leading-snug">{service.title}</h4>
                        <span className="text-[10px] font-bold font-mono text-slate-400 uppercase tracking-wider mt-1 block">/{service.slug}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-xs font-semibold text-slate-500 line-clamp-2 leading-relaxed max-w-sm">
                        {service.description}
                      </p>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex gap-2">
                        {service.stats.slice(0, 2).map((st, i) => (
                          <span key={i} className="px-2 py-1 rounded bg-slate-50 border border-slate-100 text-[10px] font-bold text-slate-500">
                            {st.value} {st.label}
                          </span>
                        ))}
                        {service.stats.length > 2 && (
                          <span className="text-[10px] text-slate-400 font-bold">+{service.stats.length - 2} more</span>
                        )}
                        {service.stats.length === 0 && (
                          <span className="text-[10px] text-slate-400 font-medium italic">None</span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-xs">
                      <div className="flex items-center justify-end gap-1.5">
                        <button 
                          onClick={() => handleEditClick(service)}
                          className="p-2 border border-slate-200 hover:border-primary text-slate-500 hover:text-primary hover:bg-emerald-50/30 rounded-lg transition-colors cursor-pointer"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        
                        {/* Protect core static services from deletion if preferred */}
                        <button 
                          onClick={() => handleDeleteClick(service)}
                          className="p-2 border border-slate-200 hover:border-red-200 text-slate-500 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {services.length === 0 && (
                  <tr>
                    <td colSpan={5} className="text-center py-10 text-slate-400 font-medium italic bg-slate-50/50">
                      No services registered in the database directory.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
