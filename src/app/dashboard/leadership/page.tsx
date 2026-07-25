"use client";

import React, { useState, useEffect } from "react";
import { 
  Award, Plus, Trash2, Edit, Loader2, AlertCircle, Sparkles, Image, ShieldCheck
} from "lucide-react";
import { getLeadersAction, saveLeaderAction, deleteLeaderAction } from "@/app/actions/leader-actions";
import { convertToWebP } from "@/lib/imageUtils";
import { uploadImageAction } from "@/app/actions/services";

const LinkedinIcon = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.25V10.9H6.46M7.86 6.74a1.65 1.65 0 1 0 0 3.3 1.65 1.65 0 0 0 0-3.3z"/>
  </svg>
);

const FacebookIcon = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.99 3.66 9.12 8.44 9.88v-6.99H7.9v-2.89h2.54V9.79c0-2.51 1.49-3.89 3.78-3.89 1.09 0 2.23.19 2.23.19v2.47h-1.26c-1.24 0-1.63.77-1.63 1.56v1.88h2.78l-.45 2.89h-2.33v6.99C18.34 21.12 22 16.99 22 12z"/>
  </svg>
);

const TwitterIcon = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
  </svg>
);

interface LeaderItem {
  _id: string;
  name: string;
  designation: string;
  bio: string;
  image?: string;
  order: number;
  facebook?: string;
  twitter?: string;
  linkedin?: string;
  createdAt: string;
}

export default function LeadershipDashboardPage() {
  const [leaders, setLeaders] = useState<LeaderItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [actionLoading, setActionLoading] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  // Form State
  const [editingId, setEditingId] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [designation, setDesignation] = useState("");
  const [bio, setBio] = useState("");
  const [image, setImage] = useState("");
  const [order, setOrder] = useState<number>(0);
  const [facebook, setFacebook] = useState("");
  const [twitter, setTwitter] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [uploading, setUploading] = useState(false);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      setError("Image file size must not exceed 5MB.");
      return;
    }

    setUploading(true);
    setError(null);
    setSuccess(null);

    try {
      const webpFile = await convertToWebP(file);
      const formData = new FormData();
      formData.append("file", webpFile);

      const secureUrl = await uploadImageAction(formData);
      setImage(secureUrl);
      setSuccess("Leader photo uploaded successfully to Cloudinary!");
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Failed to upload image.");
    } finally {
      setUploading(false);
    }
  };

  const fetchLeaders = async () => {
    setLoading(true);
    try {
      const data = await getLeadersAction();
      setLeaders(data);
    } catch (err: any) {
      setError(err.message || "Failed to load leadership team.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeaders();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !designation.trim() || !bio.trim()) {
      setError("Please fill out Name, Designation, and Bio.");
      return;
    }

    setSubmitting(true);
    setError(null);
    setSuccess(null);

    try {
      const payload = {
        _id: editingId || undefined,
        name,
        designation,
        bio,
        image: image || undefined,
        order: Number(order) || 0,
        facebook: facebook || undefined,
        twitter: twitter || undefined,
        linkedin: linkedin || undefined,
      };

      await saveLeaderAction(payload);
      setSuccess(editingId ? "Leader profile updated successfully!" : "Leader added successfully!");
      
      // Clear form
      handleCancelEdit();
      // Refresh list
      fetchLeaders();
    } catch (err: any) {
      setError(err.message || "Failed to save leader profile.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleEdit = (item: LeaderItem) => {
    setEditingId(item._id);
    setName(item.name);
    setDesignation(item.designation);
    setBio(item.bio);
    setImage(item.image || "");
    setOrder(item.order || 0);
    setFacebook(item.facebook || "");
    setTwitter(item.twitter || "");
    setLinkedin(item.linkedin || "");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setName("");
    setDesignation("");
    setBio("");
    setImage("");
    setOrder(0);
    setFacebook("");
    setTwitter("");
    setLinkedin("");
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this leader profile?")) return;

    setActionLoading(id);
    setError(null);
    setSuccess(null);

    try {
      await deleteLeaderAction(id);
      setSuccess("Leader profile deleted successfully!");
      setLeaders((prev) => prev.filter((item) => item._id !== id));
    } catch (err: any) {
      setError(err.message || "Failed to delete leader profile.");
    } finally {
      setActionLoading(null);
    }
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Title Header */}
      <div>
        <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight flex items-center gap-2.5">
          <Award className="w-8 h-8 text-primary" />
          <span>Manage Foundation Leadership</span>
        </h1>
        <p className="text-sm text-gray-550 font-medium mt-1">
          Add, edit, or reorder executives and leaders displayed on the public leadership page.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Section: Create/Edit Form */}
        <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm h-fit">
          <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
            <Sparkles className="w-4.5 h-4.5 text-primary" />
            <span>{editingId ? "Edit Leader Profile" : "Add New Leader"}</span>
          </h2>

          {error && (
            <div className="mb-5 p-4 text-xs font-semibold text-red-800 rounded-xl bg-red-50 border border-red-100 flex items-start gap-2 animate-fadeIn">
              <AlertCircle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          {success && (
            <div className="mb-5 p-4 text-xs font-semibold text-green-800 rounded-xl bg-green-50 border border-green-100 flex items-start gap-2 animate-fadeIn">
              <Sparkles className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />
              <span>{success}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Full Name *</label>
              <input
                type="text"
                placeholder="e.g. Dr. Hafeez ur Rehman"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-2.5 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-gray-800"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Designation / Role *</label>
              <input
                type="text"
                placeholder="e.g. President Al-Khidmat Foundation"
                value={designation}
                onChange={(e) => setDesignation(e.target.value)}
                className="w-full px-4 py-2.5 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-gray-800"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Short Bio / Quote *</label>
              <textarea
                rows={3}
                placeholder="Brief introduction or leadership vision message..."
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                className="w-full px-4 py-2.5 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-gray-800"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Display Order Number</label>
              <input
                type="number"
                placeholder="0 (Lower numbers appear first)"
                value={order}
                onChange={(e) => setOrder(Number(e.target.value))}
                className="w-full px-4 py-2 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-gray-800"
              />
            </div>

            {/* Cloudinary Image Picker */}
            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
                Leader Portrait (Cloudinary Upload)
              </label>
              <div className="space-y-3">
                {image ? (
                  <div className="relative w-full h-40 rounded-xl overflow-hidden border border-gray-200 group">
                    <img src={image} alt="Preview" className="w-full h-full object-cover" />
                    <button
                      type="button"
                      onClick={() => setImage("")}
                      className="absolute top-2 right-2 px-2 py-1 bg-black/70 hover:bg-black text-white rounded-lg text-[10px] font-bold cursor-pointer transition-colors"
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <label className="flex flex-col items-center justify-center w-full h-36 border-2 border-dashed border-gray-200 hover:border-primary/50 rounded-xl cursor-pointer bg-gray-50/50 hover:bg-gray-50/80 transition-all group">
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      {uploading ? (
                        <Loader2 className="w-8 h-8 text-primary animate-spin mb-2" />
                      ) : (
                        <Image className="w-8 h-8 text-gray-400 group-hover:text-primary transition-colors mb-2" />
                      )}
                      <p className="text-xs font-bold text-gray-500 group-hover:text-gray-700 transition-colors">
                        {uploading ? "Uploading to Cloudinary..." : "Click to upload portrait"}
                      </p>
                      <p className="text-[10px] font-semibold text-gray-400 mt-1">WebP, PNG, JPG up to 5MB</p>
                    </div>
                    <input 
                      type="file" 
                      accept="image/*" 
                      onChange={handleImageUpload} 
                      disabled={uploading} 
                      className="hidden" 
                    />
                  </label>
                )}
                
                <input
                  type="text"
                  placeholder="Or paste direct image URL..."
                  value={image}
                  onChange={(e) => setImage(e.target.value)}
                  className="w-full px-4 py-2 text-xs bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-gray-800"
                />
              </div>
            </div>

            {/* Social Links */}
            <div className="space-y-3 pt-2 border-t border-gray-100">
              <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider">Social Links (Optional)</label>
              
              <input
                type="text"
                placeholder="LinkedIn Profile URL"
                value={linkedin}
                onChange={(e) => setLinkedin(e.target.value)}
                className="w-full px-4 py-2 text-xs bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-gray-800"
              />

              <input
                type="text"
                placeholder="Facebook Profile URL"
                value={facebook}
                onChange={(e) => setFacebook(e.target.value)}
                className="w-full px-4 py-2 text-xs bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-gray-800"
              />

              <input
                type="text"
                placeholder="Twitter / X Profile URL"
                value={twitter}
                onChange={(e) => setTwitter(e.target.value)}
                className="w-full px-4 py-2 text-xs bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-gray-800"
              />
            </div>

            <div className="flex gap-2 pt-2">
              {editingId && (
                <button
                  type="button"
                  onClick={handleCancelEdit}
                  className="flex-1 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-bold rounded-xl transition-all cursor-pointer text-center"
                >
                  Cancel
                </button>
              )}
              <button
                type="submit"
                disabled={submitting}
                className="flex-2 py-3 bg-primary hover:bg-primary-hover text-white text-xs font-bold rounded-xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
              >
                {submitting ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <>
                    <Plus className="w-4 h-4" />
                    <span>{editingId ? "Update Leader" : "Add Leader"}</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>

        {/* Right Section: Leadership Cards Grid List */}
        <div className="lg:col-span-2 space-y-4">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-20 gap-3 bg-white border border-gray-100 rounded-2xl shadow-sm">
              <Loader2 className="w-10 h-10 text-primary animate-spin" />
              <span className="text-sm font-bold text-gray-400">Loading leadership profiles...</span>
            </div>
          ) : leaders.length === 0 ? (
            <div className="bg-white border border-gray-100 rounded-2xl p-12 text-center space-y-3 shadow-sm">
              <Award className="w-12 h-12 text-gray-300 mx-auto" />
              <h3 className="text-lg font-bold text-gray-700">No Leaders Added Yet</h3>
              <p className="text-xs text-gray-400 font-medium max-w-sm mx-auto">
                Use the form on the left to add your first executive or board member to display on the leadership page.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {leaders.map((item) => (
                <div key={item._id} className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm space-y-4 relative flex flex-col justify-between hover:shadow-md transition-shadow">
                  <div className="space-y-3">
                    <div className="flex items-start gap-4">
                      <div className="w-16 h-16 rounded-xl overflow-hidden bg-gray-100 shrink-0 border border-gray-150">
                        {item.image ? (
                          <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-gray-300 font-bold text-xl">
                            {item.name.charAt(0)}
                          </div>
                        )}
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-extrabold uppercase tracking-wider text-primary bg-primary/10 px-2 py-0.5 rounded-md">
                            Order: {item.order}
                          </span>
                        </div>
                        <h4 className="font-bold text-gray-900 text-base truncate mt-1">{item.name}</h4>
                        <p className="text-xs font-semibold text-gray-500 truncate">{item.designation}</p>
                      </div>
                    </div>

                    <p className="text-xs text-gray-600 line-clamp-3 leading-relaxed bg-gray-50 p-3 rounded-xl border border-gray-100">
                      "{item.bio}"
                    </p>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                    <div className="flex gap-2 text-gray-400">
                      {item.linkedin && <LinkedinIcon className="w-4 h-4 text-sky-600" />}
                      {item.facebook && <FacebookIcon className="w-4 h-4 text-blue-600" />}
                      {item.twitter && <TwitterIcon className="w-4 h-4 text-sky-400" />}
                    </div>

                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => handleEdit(item)}
                        className="p-1.5 text-gray-500 hover:text-primary hover:bg-primary/10 rounded-lg transition-all cursor-pointer"
                        title="Edit Leader"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      
                      <button
                        onClick={() => handleDelete(item._id)}
                        disabled={actionLoading === item._id}
                        className="p-1.5 text-gray-500 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-all cursor-pointer"
                        title="Delete Leader"
                      >
                        {actionLoading === item._id ? (
                          <Loader2 className="w-4 h-4 animate-spin text-rose-600" />
                        ) : (
                          <Trash2 className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
