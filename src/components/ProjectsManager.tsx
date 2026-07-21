"use client";

import React, { useState } from "react";
import { 
  Plus, Edit2, Trash2, Upload, Loader2, Sparkles, 
  Check, X, UserCheck, Receipt, Trash
} from "lucide-react";
import { saveProjectAction, deleteProjectAction } from "@/app/actions/services";
import { uploadImageAction } from "@/app/actions/services";
import { convertToWebP } from "@/lib/imageUtils";

interface ProjectItem {
  _id?: string;
  serviceSlug: string;
  title: string;
  slug: string;
  shortDescription: string;
  longDescription: string;
  location: string;
  province: string;
  date: string;
  status: string;
  beneficiaries: string;
  projectHead: {
    name: string;
    role: string;
    avatarUrl: string;
    message?: string;
  };
  cooperators: string[];
  costBreakdown: { label: string; amount: string }[];
  totalCost: string;
  featuredImage: string;
  gallery: string[];
  techSpecs: { label: string; value: string }[];
}

interface ServiceSummary {
  title: string;
  slug: string;
}

interface ProjectsManagerProps {
  initialProjects: ProjectItem[];
  services: ServiceSummary[];
}

const defaultFormState: ProjectItem = {
  serviceSlug: "clean-water-initiative",
  title: "",
  slug: "",
  shortDescription: "",
  longDescription: "",
  location: "",
  province: "Punjab",
  date: "",
  status: "Completed",
  beneficiaries: "",
  projectHead: {
    name: "",
    role: "Project Supervisor",
    avatarUrl: "",
    message: ""
  },
  cooperators: [],
  costBreakdown: [],
  totalCost: "",
  featuredImage: "",
  gallery: [],
  techSpecs: []
};

export default function ProjectsManager({ initialProjects, services }: ProjectsManagerProps) {
  const [projects, setProjects] = useState<ProjectItem[]>(initialProjects);
  const [isEditing, setIsEditing] = useState(false);
  const [formState, setFormState] = useState<ProjectItem>(defaultFormState);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadStates, setUploadStates] = useState<{ [key: string]: boolean }>({});
  
  // Auxiliary list addition states
  const [newCooperator, setNewCooperator] = useState("");
  const [newCostItem, setNewCostItem] = useState({ label: "", amount: "" });
  const [newSpec, setNewSpec] = useState({ label: "", value: "" });

  const handleEditClick = (project: ProjectItem) => {
    setFormState({ ...project });
    setIsEditing(true);
  };

  const handleAddNewClick = () => {
    setFormState({
      ...defaultFormState,
      serviceSlug: services[0]?.slug || "clean-water-initiative"
    });
    setIsEditing(true);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormState(prev => {
      const updated = { ...prev, [name]: value };
      if (name === "title" && !prev._id) {
        updated.slug = value
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/(^-|-$)/g, "");
      }
      return updated;
    });
  };

  const handleProjectHeadChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormState(prev => ({
      ...prev,
      projectHead: {
        ...prev.projectHead,
        [name]: value
      }
    }));
  };

  const triggerUpload = async (file: File, targetField: "featuredImage" | "avatarUrl" | "gallery") => {
    if (file.size > 5 * 1024 * 1024) {
      alert("Image file size must not exceed 5MB.");
      return;
    }

    setUploadStates(prev => ({ ...prev, [targetField]: true }));
    try {
      const webpFile = await convertToWebP(file);
      const formData = new FormData();
      formData.append("file", webpFile);
      const url = await uploadImageAction(formData);

      setFormState(prev => {
        if (targetField === "featuredImage") {
          return { ...prev, featuredImage: url };
        } else if (targetField === "avatarUrl") {
          return {
            ...prev,
            projectHead: {
              ...prev.projectHead,
              avatarUrl: url
            }
          };
        } else {
          return {
            ...prev,
            gallery: [...prev.gallery, url]
          };
        }
      });
    } catch (error: any) {
      alert(`Failed to upload image: ${error?.message || error}`);
    } finally {
      setUploadStates(prev => ({ ...prev, [targetField]: false }));
    }
  };

  const triggerMultipleUploads = async (files: File[]) => {
    // Check sizes
    for (const file of files) {
      if (file.size > 5 * 1024 * 1024) {
        alert(`File "${file.name}" exceeds the 5MB size limit.`);
        return;
      }
    }

    setUploadStates(prev => ({ ...prev, gallery: true }));
    try {
      const uploadPromises = files.map(async (file) => {
        const webpFile = await convertToWebP(file);
        const formData = new FormData();
        formData.append("file", webpFile);
        return uploadImageAction(formData);
      });

      const urls = await Promise.all(uploadPromises);

      setFormState(prev => ({
        ...prev,
        gallery: [...prev.gallery, ...urls]
      }));
    } catch (error: any) {
      alert(`Failed to upload one or more images: ${error?.message || error}`);
    } finally {
      setUploadStates(prev => ({ ...prev, gallery: false }));
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, targetField: "featuredImage" | "avatarUrl" | "gallery") => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    if (targetField === "gallery") {
      triggerMultipleUploads(Array.from(files));
    } else {
      triggerUpload(files[0], targetField);
    }
  };

  // List management helpers
  const addCooperator = () => {
    if (!newCooperator.trim()) return;
    setFormState(prev => ({
      ...prev,
      cooperators: [...prev.cooperators, newCooperator.trim()]
    }));
    setNewCooperator("");
  };

  const removeCooperator = (idx: number) => {
    setFormState(prev => ({
      ...prev,
      cooperators: prev.cooperators.filter((_, i) => i !== idx)
    }));
  };

  const addCostItem = () => {
    if (!newCostItem.label.trim() || !newCostItem.amount.trim()) return;
    setFormState(prev => {
      const list = [...prev.costBreakdown, { label: newCostItem.label.trim(), amount: newCostItem.amount.trim() }];
      
      // Attempt to auto-calc Total Cost if empty or just updating
      let calculatedTotal = prev.totalCost;
      const sum = list.reduce((acc, item) => {
        const val = parseInt(item.amount.replace(/[^0-9]/g, ""), 10);
        return isNaN(val) ? acc : acc + val;
      }, 0);
      if (sum > 0) {
        calculatedTotal = `PKR ${sum.toLocaleString()}`;
      }

      return {
        ...prev,
        costBreakdown: list,
        totalCost: calculatedTotal
      };
    });
    setNewCostItem({ label: "", amount: "" });
  };

  const removeCostItem = (idx: number) => {
    setFormState(prev => ({
      ...prev,
      costBreakdown: prev.costBreakdown.filter((_, i) => i !== idx)
    }));
  };

  const addSpec = () => {
    if (!newSpec.label.trim() || !newSpec.value.trim()) return;
    setFormState(prev => ({
      ...prev,
      techSpecs: [...prev.techSpecs, { label: newSpec.label.trim(), value: newSpec.value.trim() }]
    }));
    setNewSpec({ label: "", value: "" });
  };

  const removeSpec = (idx: number) => {
    setFormState(prev => ({
      ...prev,
      techSpecs: prev.techSpecs.filter((_, i) => i !== idx)
    }));
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formState.title || !formState.slug) {
      alert("Fields (Title, Slug) are required.");
      return;
    }

    setIsSubmitting(true);
    try {
      const payload = {
        ...formState,
        featuredImage: formState.featuredImage || "https://images.unsplash.com/photo-1541963463532-d68292c34b19?w=600&auto=format&fit=crop",
        projectHead: {
          ...formState.projectHead,
          avatarUrl: formState.projectHead.avatarUrl || "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop",
          message: formState.projectHead.message || ""
        }
      };

      const saved = await saveProjectAction(payload);
      if (formState._id) {
        setProjects(prev => prev.map(p => p._id === saved._id ? saved : p));
      } else {
        setProjects(prev => [saved, ...prev]);
      }
      setIsEditing(false);
    } catch (error: any) {
      alert(error.message || "Failed to save project");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteClick = async (project: ProjectItem) => {
    if (!confirm(`Are you sure you want to delete "${project.title}"?`)) return;
    try {
      await deleteProjectAction(project._id || project.slug);
      setProjects(prev => prev.filter(p => p.slug !== project.slug));
    } catch (error: any) {
      alert(error.message || "Failed to delete project");
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Welfare Campaigns & Projects</h2>
          <p className="text-xs text-slate-400 font-semibold mt-1">Manage individual service projects, localized wells, or emergency drives.</p>
        </div>
        {!isEditing && (
          <button 
            onClick={handleAddNewClick}
            className="inline-flex items-center gap-1.5 px-4 py-2 bg-primary text-white text-xs font-bold uppercase tracking-wider rounded-xl hover:bg-primary-hover shadow-sm transition-colors cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Register New Project</span>
          </button>
        )}
      </div>

      {isEditing ? (
        <form onSubmit={handleFormSubmit} className="bg-white p-6 md:p-8 rounded-3xl border border-slate-100 shadow-sm space-y-8 animate-fadeIn">
          
          {/* Header */}
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <h3 className="font-bold text-slate-800 text-lg">
              {formState._id ? "Edit Campaign Details" : "Register New Welfare Project"}
            </h3>
            <button 
              type="button" 
              onClick={() => setIsEditing(false)}
              className="text-slate-400 hover:text-slate-600 p-1.5 rounded-full hover:bg-slate-50 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Form Fields - 2 columns layout: 1 field per column */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Parent Service Core *</label>
              <select
                name="serviceSlug"
                value={formState.serviceSlug}
                onChange={handleInputChange}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm font-semibold text-slate-700 focus:outline-none focus:border-primary bg-slate-50/50"
              >
                {services.map(srv => (
                  <option key={srv.slug} value={srv.slug}>{srv.title}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Project Name *</label>
              <input 
                type="text" 
                name="title" 
                value={formState.title} 
                onChange={handleInputChange} 
                required
                placeholder="e.g. Kashmore Handpump"
                className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm font-semibold text-slate-700 focus:outline-none focus:border-primary bg-slate-50/50"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">URL Slug *</label>
              <input 
                type="text" 
                name="slug" 
                value={formState.slug} 
                onChange={handleInputChange} 
                required
                placeholder="e.g. kashmore-handpump"
                className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm font-semibold text-slate-700 focus:outline-none focus:border-primary bg-slate-50/50"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Location (Tehsil/City) *</label>
              <input 
                type="text" 
                name="location" 
                value={formState.location} 
                onChange={handleInputChange} 
                required
                placeholder="e.g. Tangwani, Kashmore"
                className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm font-semibold text-slate-700 focus:outline-none focus:border-primary bg-slate-50/50"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Province *</label>
              <select
                name="province"
                value={formState.province}
                onChange={handleInputChange}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm font-semibold text-slate-700 focus:outline-none focus:border-primary bg-slate-50/50"
              >
                <option value="Sindh">Sindh</option>
                <option value="Punjab">Punjab</option>
                <option value="KPK">KPK</option>
                <option value="Balochistan">Balochistan</option>
                <option value="Kashmir">Kashmir</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Timeline Date *</label>
              <input 
                type="text" 
                name="date" 
                value={formState.date} 
                onChange={handleInputChange} 
                required
                placeholder="e.g. May 2026"
                className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm font-semibold text-slate-700 focus:outline-none focus:border-primary bg-slate-50/50"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Target Beneficiaries *</label>
              <input 
                type="text" 
                name="beneficiaries" 
                value={formState.beneficiaries} 
                onChange={handleInputChange} 
                required
                placeholder="e.g. 45+ Families"
                className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm font-semibold text-slate-700 focus:outline-none focus:border-primary bg-slate-50/50"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Status *</label>
              <select
                name="status"
                value={formState.status}
                onChange={handleInputChange}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm font-semibold text-slate-700 focus:outline-none focus:border-primary bg-slate-50/50"
              >
                <option value="Completed">Completed</option>
                <option value="In Progress">In Progress</option>
                <option value="Not Yet Started">Not Yet Started</option>
                <option value="Maintenance">Maintenance</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Project Head Full Name</label>
              <input 
                type="text" 
                name="name" 
                value={formState.projectHead.name} 
                onChange={handleProjectHeadChange}
                placeholder="Name of supervisor"
                className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm font-semibold text-slate-700 focus:outline-none focus:border-primary bg-slate-50/50"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Project Head Role / Title</label>
              <input 
                type="text" 
                name="role" 
                value={formState.projectHead.role} 
                onChange={handleProjectHeadChange}
                placeholder="e.g. Field Engineer"
                className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm font-semibold text-slate-700 focus:outline-none focus:border-primary bg-slate-50/50"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Short Description Excerpt *</label>
              <input 
                type="text" 
                name="shortDescription" 
                value={formState.shortDescription} 
                onChange={handleInputChange} 
                required
                placeholder="Short info box shown on cards..."
                className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm font-semibold text-slate-700 focus:outline-none focus:border-primary bg-slate-50/50"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Full Story / Implementation Logs</label>
              <textarea 
                name="longDescription" 
                value={formState.longDescription} 
                onChange={handleInputChange} 
                rows={4}
                placeholder="Explain water crisis, geological boring details, and community impacts..."
                className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm font-semibold text-slate-700 focus:outline-none focus:border-primary bg-slate-50/50"
              />
            </div>

            {/* Technical specs list */}
            <div className="md:col-span-2">
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Technical Specs (Key/Value)</label>
              <div className="grid grid-cols-2 gap-2">
                <input 
                  type="text" 
                  value={newSpec.label} 
                  onChange={(e) => setNewSpec(prev => ({ ...prev, label: e.target.value }))} 
                  placeholder="Spec Label (e.g. Drilling Depth)"
                  className="px-4 py-3 rounded-xl border border-slate-200 text-xs font-semibold text-slate-750 bg-slate-50/50"
                />
                <div className="flex gap-2">
                  <input 
                    type="text" 
                    value={newSpec.value} 
                    onChange={(e) => setNewSpec(prev => ({ ...prev, value: e.target.value }))} 
                    placeholder="Spec Value (e.g. 250 Feet)"
                    className="flex-1 px-4 py-3 rounded-xl border border-slate-200 text-xs font-semibold text-slate-750 bg-slate-50/50"
                  />
                  <button type="button" onClick={addSpec} className="px-4 py-3 bg-slate-800 text-white text-xs font-bold rounded-xl cursor-pointer">Add</button>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2 mt-3">
                {formState.techSpecs.map((spec, i) => (
                  <div key={i} className="flex justify-between items-center p-2.5 bg-slate-50 border border-slate-100 rounded-xl">
                    <div>
                      <span className="block text-[9px] uppercase font-bold text-slate-450">{spec.label}</span>
                      <span className="text-xs font-bold text-slate-700">{spec.value}</span>
                    </div>
                    <button type="button" onClick={() => removeSpec(i)} className="text-slate-400 hover:text-red-500 p-1 rounded-full"><X className="w-3.5 h-3.5" /></button>
                  </div>
                ))}
              </div>
            </div>

            {/* Cost breakdown & Total Cost */}
            <div className="md:col-span-2 p-5 border border-slate-100 rounded-2xl bg-slate-50/30 space-y-4">
              <h4 className="font-bold text-slate-750 text-xs uppercase tracking-wider flex items-center gap-1.5">
                <Receipt className="w-4 h-4 text-emerald-600" />
                <span>Itemized Cost Log & Budget</span>
              </h4>
              
              <div className="grid grid-cols-2 gap-2">
                <input 
                  type="text" 
                  value={newCostItem.label} 
                  onChange={(e) => setNewCostItem(prev => ({ ...prev, label: e.target.value }))} 
                  placeholder="Expense item (e.g. Boring)"
                  className="px-3.5 py-3 rounded-xl border border-slate-200 text-xs font-semibold text-slate-700 bg-white"
                />
                <div className="flex gap-2">
                  <input 
                    type="text" 
                    value={newCostItem.amount} 
                    onChange={(e) => setNewCostItem(prev => ({ ...prev, amount: e.target.value }))} 
                    placeholder="Amount (e.g. PKR 60,000)"
                    className="flex-1 px-3.5 py-3 rounded-xl border border-slate-200 text-xs font-semibold text-slate-700 bg-white"
                  />
                  <button type="button" onClick={addCostItem} className="px-3 py-3 bg-slate-800 text-white text-xs font-bold rounded-xl cursor-pointer">Add</button>
                </div>
              </div>

              <div className="space-y-2 mt-3 max-h-36 overflow-y-auto">
                {formState.costBreakdown.map((item, i) => (
                  <div key={i} className="flex justify-between items-center text-xs py-1.5 border-b border-slate-200/60">
                    <span className="text-slate-500 font-semibold">{item.label}</span>
                    <div className="flex items-center gap-1.5">
                      <span className="font-bold text-slate-750">{item.amount}</span>
                      <button type="button" onClick={() => removeCostItem(i)} className="text-slate-400 hover:text-red-500"><X className="w-3.5 h-3.5" /></button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-2 border-t border-slate-200 flex justify-between items-center">
                <span className="text-xs font-bold text-slate-500 uppercase">Total Project Cost</span>
                <input 
                  type="text" 
                  name="totalCost" 
                  value={formState.totalCost} 
                  onChange={handleInputChange} 
                  placeholder="e.g. PKR 150,000"
                  className="px-3.5 py-2 max-w-[150px] text-right rounded-xl border border-slate-200 text-xs font-extrabold text-slate-750 bg-white"
                />
              </div>
            </div>

            {/* Cooperators roll list */}
            <div className="md:col-span-2">
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Honor Roll Cooperators / Donors</label>
              <div className="flex gap-2">
                <input 
                  type="text" 
                  value={newCooperator} 
                  onChange={(e) => setNewCooperator(e.target.value)} 
                  placeholder="Donor / Foundation name"
                  className="flex-1 px-4 py-3 rounded-xl border border-slate-200 text-xs font-semibold text-slate-700 bg-slate-50/50"
                />
                <button type="button" onClick={addCooperator} className="px-4 py-3 bg-slate-800 text-white text-xs font-bold rounded-xl cursor-pointer">Add</button>
              </div>
              <div className="flex flex-wrap gap-1.5 mt-3">
                {formState.cooperators.map((cop, i) => (
                  <span key={i} className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-slate-100 border border-slate-200 text-slate-700 text-xs font-semibold">
                    <span>{cop}</span>
                    <button type="button" onClick={() => removeCooperator(i)} className="text-slate-400 hover:text-slate-650"><X className="w-3.5 h-3.5" /></button>
                  </span>
                ))}
              </div>
            </div>

            {/* Project Site Gallery */}
            <div className="md:col-span-2">
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Project Site Photos Gallery</label>
              <div className="flex items-center gap-4">
                <span className="text-xs text-slate-450 font-semibold">Upload photos from building or delivery phases:</span>
                <label className="px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-xs font-bold text-slate-750 flex items-center gap-1.5 cursor-pointer border-dashed ml-auto">
                  {uploadStates.gallery ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Upload className="w-3.5 h-3.5 text-slate-450" />}
                  <span>Add Photo</span>
                  <input type="file" accept="image/*" multiple onChange={(e) => handleFileChange(e, "gallery")} className="hidden" />
                </label>
              </div>

              <div className="grid grid-cols-4 gap-2.5 mt-3.5">
                {formState.gallery.map((img, i) => (
                  <div key={i} className="relative h-16 rounded-xl overflow-hidden bg-slate-50 border border-slate-100 group">
                    <img src={img} alt="Gallery Preview" className="w-full h-full object-cover" />
                    <button 
                      type="button" 
                      onClick={() => setFormState(prev => ({ ...prev, gallery: prev.gallery.filter((_, idx) => idx !== i) }))}
                      className="absolute inset-0 bg-red-600/80 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <Trash className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Form Actions footer */}
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
              disabled={isSubmitting}
              className="px-6 py-3 bg-primary text-white hover:bg-primary-hover rounded-xl text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer flex items-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4.5 h-4.5 animate-spin" />
                  <span>Saving...</span>
                </>
              ) : (
                <>
                  <Check className="w-4.5 h-4.5" />
                  <span>Save Project Details</span>
                </>
              )}
            </button>
          </div>

        </form>
      ) : (
        /* Listing table */
        <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden animate-fadeIn">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-100 bg-slate-50/75">
                  <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Featured image</th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Project Name / Slug</th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Sector</th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Location / Province</th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Total Cost</th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Photos</th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {projects.map(project => (
                  <tr key={project.slug} className="hover:bg-slate-50/30 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="w-14 h-10 rounded-lg bg-slate-150 border border-slate-100 overflow-hidden shrink-0">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={project.featuredImage} alt={project.title} className="w-full h-full object-cover" />
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div>
                        <h4 className="font-bold text-slate-800 text-sm leading-snug">{project.title}</h4>
                        <span className="text-[10px] font-bold font-mono text-slate-400 mt-1 block">/{project.slug}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider bg-slate-100 text-slate-600 border border-slate-200">
                        {project.serviceSlug.replace(/-/g, " ")}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <span className="text-xs font-bold text-slate-700">{project.location}</span>
                        <span className="block text-[10px] text-slate-400 font-semibold">{project.province}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 py-1 rounded bg-amber-50 border border-amber-100 text-xs font-extrabold text-amber-700">
                        {project.totalCost}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-xs font-bold text-slate-450">
                      {project.gallery.length} photos
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-xs">
                      <div className="flex items-center justify-end gap-1.5">
                        <button 
                          onClick={() => handleEditClick(project)}
                          className="p-2 border border-slate-200 hover:border-primary text-slate-500 hover:text-primary hover:bg-emerald-50/30 rounded-lg transition-colors cursor-pointer"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button 
                          onClick={() => handleDeleteClick(project)}
                          className="p-2 border border-slate-200 hover:border-red-200 text-slate-500 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {projects.length === 0 && (
                  <tr>
                    <td colSpan={7} className="text-center py-12 text-slate-400 font-medium italic bg-slate-50/50">
                      No welfare campaigns registered in the database.
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
