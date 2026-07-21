"use client";

import React, { useState } from "react";
import { Plus, Edit2, Trash2, X, Check, Loader2 } from "lucide-react";
import { saveServiceAction, deleteServiceAction } from "@/app/actions/services";

interface ServiceItem {
  _id?: string;
  title: string;
  slug: string;
  description: string;
  longDescription?: string;
  iconName: string;
  image?: string;
  features?: string[];
  stats?: { label: string; value: string }[];
  packages?: { name: string; cost: string; description: string }[];
  gallery?: string[];
}

interface ServicesManagerProps {
  initialServices: ServiceItem[];
}

const defaultFormState: ServiceItem = {
  title: "",
  slug: "",
  description: "",
  iconName: "Sparkles",
};

export default function ServicesManager({ initialServices }: ServicesManagerProps) {
  const [services, setServices] = useState<ServiceItem[]>(initialServices);
  const [isEditing, setIsEditing] = useState(false);
  const [formState, setFormState] = useState<ServiceItem>(defaultFormState);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleEditClick = (service: ServiceItem) => {
    setFormState({ ...service });
    setIsEditing(true);
  };

  const handleAddNewClick = () => {
    setFormState(defaultFormState);
    setIsEditing(true);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formState.title || !formState.slug || !formState.description) {
      alert("Please fill in all fields (Title, Slug, Excerpt)");
      return;
    }

    setIsSubmitting(true);
    try {
      const payload = {
        ...formState,
        // Supply default placeholder values for other required schema fields
        longDescription: formState.description,
        image: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=600&auto=format&fit=crop&q=60",
        features: formState.features || [],
        stats: formState.stats || [],
        packages: formState.packages || [],
        gallery: formState.gallery || [],
      };
      
      const saved = await saveServiceAction(payload);
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
            className="inline-flex items-center gap-1.5 px-4 py-2 bg-primary text-white text-xs font-bold uppercase tracking-wider rounded-xl hover:bg-primary-hover shadow-sm transition-colors cursor-pointer animate-fadeIn"
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
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Icon Name *</label>
              <input 
                type="text" 
                name="iconName" 
                value={formState.iconName} 
                onChange={handleInputChange} 
                required
                placeholder="e.g. Sparkles, Droplet, Stethoscope"
                className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm font-semibold text-slate-700 focus:outline-none focus:border-primary bg-slate-50/50"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Excerpt / Description *</label>
              <textarea 
                name="description" 
                value={formState.description} 
                onChange={handleInputChange} 
                required
                rows={3}
                placeholder="Provide a short description that will act as the service excerpt..."
                className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm font-semibold text-slate-700 focus:outline-none focus:border-primary bg-slate-50/50"
              />
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
              disabled={isSubmitting}
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
        <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden animate-fadeIn">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-100 bg-slate-50/75">
                  <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Icon</th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Service Info</th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Excerpt / Description</th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {services.map(service => (
                  <tr key={service.slug} className="hover:bg-slate-50/30 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-3 py-1.5 rounded-lg bg-emerald-50 text-emerald-600 font-bold text-xs uppercase border border-emerald-100">
                        {service.iconName}
                      </span>
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
                    <td className="px-6 py-4 whitespace-nowrap text-right text-xs">
                      <div className="flex items-center justify-end gap-1.5">
                        <button 
                          onClick={() => handleEditClick(service)}
                          className="p-2 border border-slate-200 hover:border-primary text-slate-500 hover:text-primary hover:bg-emerald-50/30 rounded-lg transition-colors cursor-pointer"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        
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
                    <td colSpan={4} className="text-center py-10 text-slate-400 font-medium italic bg-slate-50/50">
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
