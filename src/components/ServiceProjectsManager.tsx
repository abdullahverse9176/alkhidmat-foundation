"use client";

import React, { useState } from "react";
import { Plus, Edit2, Trash2, X, Check, Loader2, Sparkles, Upload } from "lucide-react";
import { saveProjectAction, deleteProjectAction, uploadImageAction } from "@/app/actions/services";
import { convertToWebP } from "@/lib/imageUtils";

interface ProjectDetail {
  label: string;
  value: string;
}

interface ProjectItem {
  _id?: string;
  serviceSlug: string;
  title: string;
  slug: string;
  techSpecs?: ProjectDetail[];
  shortDescription?: string;
  longDescription?: string;
  location: string;
  province?: string;
  date?: string;
  status?: string;
  beneficiaries?: string;
  projectHead?: {
    name: string;
    role: string;
    avatarUrl: string;
    message?: string;
  };
  cooperators?: string[];
  costBreakdown?: { label: string; amount: string }[];
  totalCost?: string;
  featuredImage: string;
  gallery?: string[];
}

interface ServiceSummary {
  title: string;
  slug: string;
}

interface ServiceProjectsManagerProps {
  initialProjects: ProjectItem[];
  services: ServiceSummary[];
}

const defaultFormState: ProjectItem = {
  serviceSlug: "",
  title: "",
  slug: "",
  featuredImage: "",
  location: "",
};

export default function ServiceProjectsManager({ initialProjects, services }: ServiceProjectsManagerProps) {
  const [projects, setProjects] = useState<ProjectItem[]>(initialProjects);
  const [isEditing, setIsEditing] = useState(false);
  const [formState, setFormState] = useState<ProjectItem>(defaultFormState);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  const handleEditClick = (project: ProjectItem) => {
    setFormState({ 
      ...project,
      featuredImage: project.featuredImage || "",
      location: project.location || ""
    });
    setIsEditing(true);
  };

  const handleAddNewClick = () => {
    setFormState({
      ...defaultFormState,
      serviceSlug: services[0]?.slug || "",
      featuredImage: "",
      location: ""
    });
    setIsEditing(true);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
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
      setFormState(prev => ({ ...prev, featuredImage: url }));
    } catch (error: any) {
      alert(`Failed to upload image: ${error?.message || error}`);
    } finally {
      setIsUploading(false);
    }
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formState.title || !formState.slug || !formState.serviceSlug || !formState.featuredImage || !formState.location) {
      alert("Please fill in all required fields (Service, Title, Slug, Image, Area/City/Province)");
      return;
    }

    setIsSubmitting(true);
    try {
      // Build the final Mongoose payload with default values for required DB schema fields
      const payload = {
        ...formState,
        shortDescription: formState.shortDescription || `${formState.title} Project`,
        longDescription: formState.longDescription || `${formState.title} Project detailed specification report.`,
        location: formState.location,
        province: formState.location, // Bind same value to province for validation safety
        date: formState.date || new Date().toLocaleDateString("en-US", { year: "numeric", month: "long" }),
        status: formState.status || "Completed",
        beneficiaries: formState.beneficiaries || "500+ Local Residents",
        projectHead: formState.projectHead || {
          name: "Regional Supervisor",
          role: "Project Site Manager",
          avatarUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop",
          message: "Successfully delivered according to specifications."
        },
        cooperators: formState.cooperators || [],
        costBreakdown: formState.costBreakdown || [],
        totalCost: formState.totalCost || "PKR 150,000",
        techSpecs: [], // specs removed from UI
        gallery: formState.gallery || [],
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

  const getServiceTitle = (slug: string) => {
    return services.find(s => s.slug === slug)?.title || slug;
  };

  return (
    <div className="space-y-6">
      
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Service Projects Directory</h2>
          <p className="text-xs text-slate-400 font-semibold mt-1">Manage localized welfare initiatives and their media assets.</p>
        </div>
        {!isEditing && (
          <button 
            onClick={handleAddNewClick}
            className="inline-flex items-center gap-1.5 px-4 py-2 bg-primary text-white text-xs font-bold uppercase tracking-wider rounded-xl hover:bg-primary-hover shadow-sm transition-colors cursor-pointer animate-fadeIn"
          >
            <Plus className="w-4 h-4" />
            <span>Add New Project</span>
          </button>
        )}
      </div>

      {/* Editing Form Panel */}
      {isEditing ? (
        <form onSubmit={handleFormSubmit} className="bg-white p-6 md:p-8 rounded-3xl border border-slate-100 shadow-sm space-y-6 animate-fadeIn">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <h3 className="font-bold text-slate-800 text-lg">
              {formState._id ? "Modify Existing Project" : "Register New Project"}
            </h3>
            <button 
              type="button" 
              onClick={() => setIsEditing(false)}
              className="text-slate-400 hover:text-slate-600 p-1.5 rounded-full hover:bg-slate-50 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Associated Service Sector *</label>
              <select
                name="serviceSlug"
                value={formState.serviceSlug}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm font-semibold text-slate-700 focus:outline-none focus:border-primary bg-slate-50/50"
              >
                <option value="">Select a service...</option>
                {services.map(s => (
                  <option key={s.slug} value={s.slug}>{s.title}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Project Title *</label>
              <input 
                type="text" 
                name="title" 
                value={formState.title} 
                onChange={handleInputChange} 
                required
                placeholder="e.g. Hand Pump Installation - Basti Bhattian"
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
                placeholder="e.g. water-pump-basti-bhattian"
                className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm font-semibold text-slate-700 focus:outline-none focus:border-primary bg-slate-50/50"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Area/City/Province *</label>
              <input 
                type="text" 
                name="location" 
                value={formState.location} 
                onChange={handleInputChange} 
                required
                placeholder="e.g. Chiniot, Punjab"
                className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm font-semibold text-slate-700 focus:outline-none focus:border-primary bg-slate-50/50"
              />
            </div>

            {/* Featured Image upload block */}
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Project Image Banner *</label>
              <div className="flex items-center gap-4">
                <div className="flex-1">
                  <input 
                    type="text" 
                    name="featuredImage" 
                    value={formState.featuredImage} 
                    onChange={handleInputChange} 
                    required
                    placeholder="Cloudinary image URL"
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 text-xs font-semibold text-slate-650 focus:outline-none focus:border-primary bg-slate-50/50"
                  />
                </div>
                
                <label className="px-4 py-3 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-xs font-bold text-slate-750 flex items-center gap-2 cursor-pointer shadow-sm border-dashed">
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
                    disabled={isUploading}
                  />
                </label>
              </div>

              {formState.featuredImage && (
                <div className="relative mt-3 h-32 w-full rounded-xl overflow-hidden border border-slate-100 bg-slate-50 max-w-sm">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img 
                    src={formState.featuredImage} 
                    alt="Featured preview" 
                    className="w-full h-full object-cover" 
                  />
                </div>
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
                  <span>Save Project</span>
                </>
              )}
            </button>
          </div>
        </form>
      ) : (
        /* Projects table listing */
        <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden animate-fadeIn">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-100 bg-slate-50/75">
                  <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Banner</th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Project Info</th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Area/City/Province</th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Service Sector</th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {projects.map(project => (
                  <tr key={project.slug} className="hover:bg-slate-50/30 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="w-12 h-9 rounded bg-slate-50 border border-slate-100 overflow-hidden">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img 
                          src={project.featuredImage} 
                          alt={project.title} 
                          className="w-full h-full object-cover" 
                        />
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="max-w-[250px]">
                        <h4 className="font-bold text-slate-800 text-sm leading-snug">{project.title}</h4>
                        <span className="text-[10px] font-bold font-mono text-slate-400 uppercase tracking-wider mt-1 block">/{project.slug}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-xs font-bold text-slate-700">
                        {project.location || "N/A"}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-3 py-1 bg-emerald-50 text-emerald-700 text-xs font-bold rounded-lg border border-emerald-100">
                        {getServiceTitle(project.serviceSlug)}
                      </span>
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
                    <td colSpan={5} className="text-center py-10 text-slate-400 font-medium italic bg-slate-50/50">
                      No projects registered in this directory.
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
