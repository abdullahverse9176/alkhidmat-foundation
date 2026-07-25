"use client";

import React, { useState, useEffect } from "react";
import { 
  Calendar, Clock, MapPin, Plus, Trash2, Edit, Loader2, AlertCircle, Sparkles, Image, ExternalLink
} from "lucide-react";
import { getEventsAction, saveEventAction, deleteEventAction } from "@/app/actions/event-actions";
import { convertToWebP } from "@/lib/imageUtils";
import { uploadImageAction } from "@/app/actions/services";

interface EventItem {
  _id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  image?: string;
  status: "upcoming" | "past";
  featured?: boolean;
  createdAt: string;
}

export default function EventsDashboardPage() {
  const [events, setEvents] = useState<EventItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [actionLoading, setActionLoading] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  // Form State
  const [editingId, setEditingId] = useState<string | null>(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [location, setLocation] = useState("");
  const [image, setImage] = useState("");
  const [featured, setFeatured] = useState(false);
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
      setSuccess("Image uploaded successfully to Cloudinary!");
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Failed to upload image.");
    } finally {
      setUploading(false);
    }
  };

  const fetchEvents = async () => {
    setLoading(true);
    try {
      const data = await getEventsAction();
      setEvents(data);
    } catch (err: any) {
      setError(err.message || "Failed to load events.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !description.trim() || !date || !time.trim() || !location.trim()) {
      setError("Please fill out all required fields.");
      return;
    }

    setSubmitting(true);
    setError(null);
    setSuccess(null);

    try {
      const payload = {
        _id: editingId || undefined,
        title,
        description,
        date,
        time,
        location,
        image: image || undefined,
        featured: Boolean(featured),
      };

      const saved = await saveEventAction(payload);
      setSuccess(editingId ? "Event updated successfully!" : "Event created successfully!");
      
      // Clear form
      handleCancelEdit();
      // Refresh list
      fetchEvents();
    } catch (err: any) {
      setError(err.message || "Failed to save event.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleEdit = (item: EventItem) => {
    setEditingId(item._id);
    setTitle(item.title);
    setDescription(item.description);
    // Format date string to YYYY-MM-DD for date input field
    const dateObj = new Date(item.date);
    const yyyy = dateObj.getFullYear();
    const mm = String(dateObj.getMonth() + 1).padStart(2, "0");
    const dd = String(dateObj.getDate()).padStart(2, "0");
    setDate(`${yyyy}-${mm}-${dd}`);
    setTime(item.time);
    setLocation(item.location);
    setImage(item.image || "");
    setFeatured(item.featured || false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setTitle("");
    setDescription("");
    setDate("");
    setTime("");
    setLocation("");
    setImage("");
    setFeatured(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this event? This will remove it from public events tab.")) return;

    setActionLoading(id);
    setError(null);
    setSuccess(null);

    try {
      await deleteEventAction(id);
      setSuccess("Event deleted successfully!");
      setEvents((prev) => prev.filter((item) => item._id !== id));
    } catch (err: any) {
      setError(err.message || "Failed to delete event.");
    } finally {
      setActionLoading(null);
    }
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Title Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight flex items-center gap-2.5">
            <Calendar className="w-8 h-8 text-primary" />
            <span>Manage Events & Seminars</span>
          </h1>
          <p className="text-sm text-gray-505 font-medium mt-1">
            Create, publish, and modify events and upcoming seminars for the public timeline directory.
          </p>
        </div>
        <div className="text-xs font-semibold bg-primary/10 text-primary border border-primary/20 px-3 py-1.5 rounded-full inline-flex items-center gap-1.5 self-start">
          <Calendar className="w-4 h-4 text-primary" />
          <span>Active Events: {events.length}</span>
        </div>
      </div>

      {/* Main Grid: Form, Event List */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Form: Add/Edit Event */}
        <div className="bg-white border border-gray-100 rounded-2xl shadow-sm p-6 self-start">
          <h3 className="text-base font-bold text-gray-800 mb-5 flex items-center gap-2">
            <Plus className="w-4.5 h-4.5 text-primary" />
            <span>{editingId ? "Edit Event Profile" : "Create New Event"}</span>
          </h3>

          {error && (
            <div className="mb-5 p-4 text-xs font-semibold text-red-800 rounded-xl bg-red-50 border border-red-100 flex items-start gap-2">
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
              <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Event Title *</label>
              <input
                type="text"
                placeholder="e.g. Free Eye Care Camp 2026"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-4 py-2.5 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-gray-800"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Description *</label>
              <textarea
                rows={3}
                placeholder="Write event overview or schedule details..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full px-4 py-2.5 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-gray-800"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Date *</label>
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full px-4 py-2 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-gray-800 cursor-pointer"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Time *</label>
                <input
                  type="text"
                  placeholder="e.g. 10:00 AM - 4:00 PM"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  className="w-full px-4 py-2.5 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-gray-800"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Location / Venue *</label>
              <input
                type="text"
                placeholder="e.g. Al-Khidmat HQ, Chiniot"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full px-4 py-2.5 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-gray-800"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
                Event Banner Image (Cloudinary)
              </label>
              <div className="space-y-3">
                {image ? (
                  <div className="relative w-full h-36 rounded-xl overflow-hidden border border-gray-200 group">
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
                        {uploading ? "Uploading to Cloudinary..." : "Click to upload banner"}
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

            <div className="flex items-center gap-2 py-1">
              <input
                type="checkbox"
                id="featured"
                checked={featured}
                onChange={(e) => setFeatured(e.target.checked)}
                className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary/20 cursor-pointer"
              />
              <label htmlFor="featured" className="text-xs font-bold text-gray-700 cursor-pointer select-none">
                Featured on Homepage (Show in Upcoming Events)
              </label>
            </div>

            <div className="flex gap-2 pt-2">
              {editingId && (
                <button
                  type="button"
                  onClick={handleCancelEdit}
                  className="flex-1 py-3 bg-gray-100 hover:bg-gray-250 text-gray-700 text-xs font-bold rounded-xl transition-all cursor-pointer text-center"
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
                    <span>{editingId ? "Update Event" : "Create Event"}</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>

        {/* Right Section: Event List Table */}
        <div className="lg:col-span-2 bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden">
          <div className="p-6 border-b border-gray-100 bg-gray-50/50">
            <h3 className="text-base font-bold text-gray-800">Event Directory Listing</h3>
          </div>

          {loading ? (
            <div className="flex flex-col items-center justify-center py-20 gap-3">
              <Loader2 className="w-10 h-10 text-primary animate-spin" />
              <span className="text-sm font-bold text-gray-400">Loading events...</span>
            </div>
          ) : events.length === 0 ? (
            <div className="text-center py-20 space-y-4">
              <Calendar className="w-12 h-12 text-gray-300 mx-auto" />
              <h3 className="text-lg font-bold text-gray-700">No Events Scheduled</h3>
              <p className="text-xs text-gray-405 font-medium max-w-sm mx-auto">
                Any events created here will be displayed dynamically in the public timelines page under upcoming/past filters.
              </p>
            </div>
          ) : (
            <div className="divide-y divide-gray-100">
              {events.map((item) => {
                const dateStr = new Date(item.date).toLocaleDateString("en-US", {
                  weekday: "short",
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                });
                return (
                  <div key={item._id} className="p-6 hover:bg-gray-50/20 transition-colors flex flex-col md:flex-row gap-5 items-start">
                    {/* Thumbnail Image */}
                    {item.image ? (
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full md:w-32 h-20 object-cover rounded-xl border border-gray-150 shadow-xs shrink-0"
                      />
                    ) : (
                      <div className="w-full md:w-32 h-20 bg-gray-50 border border-gray-100 rounded-xl flex items-center justify-center text-gray-300 shrink-0">
                        <Image className="w-6 h-6" />
                      </div>
                    )}

                    {/* Details Column */}
                    <div className="flex-1 space-y-2">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h4 className="text-base font-bold text-gray-800 leading-snug">{item.title}</h4>
                        <span className={`px-2 py-0.5 rounded-full text-[9px] font-extrabold uppercase tracking-wider border ${
                          item.status === "upcoming"
                            ? "bg-green-50 text-green-700 border-green-200"
                            : "bg-gray-50 text-gray-500 border-gray-200"
                        }`}>
                          {item.status}
                        </span>
                        {item.featured && (
                          <span className="px-2 py-0.5 rounded-full text-[9px] font-extrabold uppercase tracking-wider border bg-amber-50 text-amber-700 border-amber-200 flex items-center gap-0.5">
                            ★ Featured
                          </span>
                        )}
                      </div>
                      
                      <p className="text-xs font-semibold text-gray-505 line-clamp-2 leading-relaxed">{item.description}</p>
                      
                      <div className="flex flex-wrap items-center gap-4 text-xs font-bold text-gray-400 pt-1">
                        <div className="flex items-center gap-1.5">
                          <Calendar className="w-4 h-4 text-gray-400" />
                          <span>{dateStr}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Clock className="w-4 h-4 text-gray-400" />
                          <span>{item.time}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <MapPin className="w-4 h-4 text-gray-400" />
                          <span>{item.location}</span>
                        </div>
                      </div>

                      {/* Link field removed */}
                    </div>

                    {/* Actions Column */}
                    <div className="flex md:flex-col gap-2 shrink-0 self-center md:self-start w-full md:w-auto justify-end">
                      <button
                        onClick={() => handleEdit(item)}
                        className="flex-1 md:flex-none p-2 text-primary hover:bg-primary/5 rounded-xl border border-gray-200 hover:border-primary/20 transition-all cursor-pointer inline-flex items-center justify-center gap-1 text-xs font-bold shadow-xs"
                      >
                        <Edit className="w-4.5 h-4.5" />
                        <span className="md:hidden">Edit</span>
                      </button>
                      
                      {actionLoading === item._id ? (
                        <Loader2 className="w-4.5 h-4.5 text-red-500 animate-spin self-center" />
                      ) : (
                        <button
                          onClick={() => handleDelete(item._id)}
                          className="flex-1 md:flex-none p-2 text-rose-600 hover:bg-rose-50 rounded-xl border border-gray-250 hover:border-rose-100 transition-all cursor-pointer inline-flex items-center justify-center gap-1 text-xs font-bold shadow-xs"
                        >
                          <Trash2 className="w-4.5 h-4.5" />
                          <span className="md:hidden">Delete</span>
                        </button>
                      )}
                    </div>

                  </div>
                );
              })}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
