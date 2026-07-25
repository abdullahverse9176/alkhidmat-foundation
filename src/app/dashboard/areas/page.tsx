"use client";

import React, { useState, useEffect } from "react";
import { 
  MapPin, Plus, Trash2, Loader2, AlertCircle, Sparkles, Map 
} from "lucide-react";
import { getAreasAction, saveAreaAction, deleteAreaAction } from "@/app/actions/area-actions";

interface AreaItem {
  _id: string;
  name: string;
  city: string;
  createdAt: string;
}

export default function AreasDashboardPage() {
  const [areas, setAreas] = useState<AreaItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [actionLoading, setActionLoading] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  // Form State
  const [name, setName] = useState("");
  const [city, setCity] = useState("");

  const fetchAreas = async () => {
    setLoading(true);
    try {
      const data = await getAreasAction();
      setAreas(data);
    } catch (err: any) {
      setError(err.message || "Failed to load areas.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAreas();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !city.trim()) {
      setError("Please fill out both fields.");
      return;
    }

    setSubmitting(true);
    setError(null);
    setSuccess(null);

    try {
      const saved = await saveAreaAction({ name, city });
      setSuccess("Area created successfully!");
      setName("");
      setCity("");
      // Refresh list
      setAreas((prev) => [...prev, saved].sort((a, b) => a.city.localeCompare(b.city) || a.name.localeCompare(b.name)));
    } catch (err: any) {
      setError(err.message || "Failed to create area.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this area? It will remove it from donor signup suggestions.")) return;

    setActionLoading(id);
    setError(null);
    setSuccess(null);

    try {
      await deleteAreaAction(id);
      setSuccess("Area deleted successfully!");
      setAreas((prev) => prev.filter((a) => a._id !== id));
    } catch (err: any) {
      setError(err.message || "Failed to delete area.");
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
            <Map className="w-8 h-8 text-primary" />
            <span>Manage Areas & Locations</span>
          </h1>
          <p className="text-sm text-gray-505 font-medium mt-1">
            Configure Muhalla, Society, Village, and City names that appear in Blood Donor registration autocomplete suggestions.
          </p>
        </div>
        <div className="text-xs font-semibold bg-primary/10 text-primary border border-primary/20 px-3 py-1.5 rounded-full inline-flex items-center gap-1.5 self-start">
          <MapPin className="w-4 h-4 text-primary" />
          <span>Active Areas: {areas.length}</span>
        </div>
      </div>

      {/* Main Grid: Left Side Form, Right Side list */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Side: Create Area Card */}
        <div className="bg-white border border-gray-100 rounded-2xl shadow-sm p-6 self-start">
          <h3 className="text-base font-bold text-gray-800 mb-5 flex items-center gap-2">
            <Plus className="w-4.5 h-4.5 text-primary" />
            <span>Create New Location</span>
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
              <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
                Muhalla, Society or Village
              </label>
              <input
                type="text"
                placeholder="e.g. Bukharian, Model Town"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-2.5 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-gray-800"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
                City Name
              </label>
              <input
                type="text"
                placeholder="e.g. Chiniot, Lalian"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="w-full px-4 py-2.5 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-gray-800"
              />
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full py-3 bg-primary hover:bg-primary-hover text-white text-xs font-bold rounded-xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer mt-2"
            >
              {submitting ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <>
                  <Plus className="w-4 h-4" />
                  <span>Create Location</span>
                </>
              )}
            </button>
          </form>
        </div>

        {/* Right Side: Area List Table */}
        <div className="lg:col-span-2 bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden">
          <div className="p-6 border-b border-gray-100 bg-gray-50/50">
            <h3 className="text-base font-bold text-gray-800">Existing Locations</h3>
          </div>

          {loading ? (
            <div className="flex flex-col items-center justify-center py-20 gap-3">
              <Loader2 className="w-10 h-10 text-primary animate-spin" />
              <span className="text-sm font-bold text-gray-400">Loading locations...</span>
            </div>
          ) : areas.length === 0 ? (
            <div className="text-center py-20 space-y-4">
              <MapPin className="w-12 h-12 text-gray-300 mx-auto" />
              <h3 className="text-lg font-bold text-gray-700">No Locations Configured</h3>
              <p className="text-xs text-gray-405 font-medium max-w-sm mx-auto">
                Locations added here will be auto-suggested on the blood donor registration screen.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-50/30 border-b border-gray-100">
                    <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Muhalla / Society / Village</th>
                    <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">City</th>
                    <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {areas.map((a) => (
                    <tr key={a._id} className="hover:bg-gray-50/30 transition-colors">
                      <td className="px-6 py-4 text-sm font-bold text-gray-800">{a.name}</td>
                      <td className="px-6 py-4">
                        <span className="inline-flex items-center gap-1 text-xs font-bold text-primary bg-primary/5 px-2.5 py-1 rounded-lg border border-primary/10">
                          {a.city}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        {actionLoading === a._id ? (
                          <Loader2 className="w-4.5 h-4.5 text-red-500 animate-spin inline-block" />
                        ) : (
                          <button
                            onClick={() => handleDelete(a._id)}
                            className="p-1.5 text-rose-600 hover:text-rose-800 hover:bg-rose-50 rounded-lg border border-transparent hover:border-rose-100 transition-all cursor-pointer inline-flex shadow-xs"
                            title="Delete Location"
                          >
                            <Trash2 className="w-4.5 h-4.5" />
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
