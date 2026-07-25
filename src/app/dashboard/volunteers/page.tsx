"use client";

import React, { useState, useEffect } from "react";
import { 
  Users, Search, Filter, Check, X, Loader2, 
  MapPin, Phone, Mail, Award, Calendar, AlertCircle
} from "lucide-react";
import { getVolunteersAction, updateVolunteerStatusAction } from "@/app/actions/volunteer-actions";

interface Volunteer {
  _id: string;
  status: "pending" | "approved" | "rejected";
  data: {
    name: string;
    email: string;
    phone: string;
    city: string;
    area: string;
    program: string;
  };
  createdAt: string;
}

export default function VolunteersPage() {
  const [volunteers, setVolunteers] = useState<Volunteer[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Filters State
  const [selectedProgram, setSelectedProgram] = useState("all");
  const [cityQuery, setCityQuery] = useState("");
  const [areaQuery, setAreaQuery] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("all");

  const programs = [
    "Disaster Relief",
    "Food Distribution",
    "Medical Camps",
    "Education Support",
    "Blood Donation Net",
    "Tree Plantation",
    "Women Empowerment",
    "Youth Development"
  ];

  // Fetch volunteers on mount and filter changes
  const fetchVolunteers = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getVolunteersAction({
        program: selectedProgram,
        city: cityQuery,
        area: areaQuery,
        status: selectedStatus
      });
      setVolunteers(data);
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Failed to load volunteers.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      fetchVolunteers();
    }, 300); // Debounce search query changes

    return () => clearTimeout(delayDebounceFn);
  }, [selectedProgram, cityQuery, areaQuery, selectedStatus]);

  const handleStatusUpdate = async (id: string, newStatus: "approved" | "rejected") => {
    setActionLoading(id);
    try {
      await updateVolunteerStatusAction(id, newStatus);
      // Update local state instantly
      setVolunteers((prev) =>
        prev.map((v) => (v._id === id ? { ...v, status: newStatus } : v))
      );
    } catch (err: any) {
      alert(err.message || "Failed to update status.");
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
            <Users className="w-8 h-8 text-primary" />
            <span>Volunteer Registrations</span>
          </h1>
          <p className="text-sm text-gray-500 font-medium mt-1">
            Review, filter, and approve or reject volunteer applications.
          </p>
        </div>
        <div className="text-xs font-semibold bg-primary/10 text-primary border border-primary/20 px-3 py-1.5 rounded-full inline-flex items-center gap-1.5 self-start">
          <Award className="w-4 h-4" />
          <span>Total Applications: {volunteers.length}</span>
        </div>
      </div>

      {/* Filters Bar */}
      <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {/* City Filter */}
        <div className="relative">
          <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
            City
          </label>
          <div className="relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search city..."
              value={cityQuery}
              onChange={(e) => setCityQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-gray-800"
            />
          </div>
        </div>

        {/* Area Filter */}
        <div className="relative">
          <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
            Area / Muhalla
          </label>
          <div className="relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search area..."
              value={areaQuery}
              onChange={(e) => setAreaQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-gray-800"
            />
          </div>
        </div>

        {/* Program Filter */}
        <div>
          <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
            Preferred Program
          </label>
          <div className="relative">
            <Filter className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <select
              value={selectedProgram}
              onChange={(e) => setSelectedProgram(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-gray-700 cursor-pointer appearance-none"
            >
              <option value="all">All Programs</option>
              {programs.map((prog) => (
                <option key={prog} value={prog}>
                  {prog}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Status Filter */}
        <div>
          <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
            Status
          </label>
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="w-full px-4 py-2.5 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-gray-700 cursor-pointer"
          >
            <option value="all">All Statuses</option>
            <option value="pending">Pending</option>
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden">
        {error && (
          <div className="p-6 bg-red-50 text-red-800 flex items-center gap-3 border-b border-red-100">
            <AlertCircle className="w-5 h-5 text-red-600 shrink-0" />
            <span className="text-sm font-semibold">{error}</span>
          </div>
        )}

        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 gap-3">
            <Loader2 className="w-10 h-10 text-primary animate-spin" />
            <span className="text-sm font-bold text-gray-400">Loading registrations...</span>
          </div>
        ) : volunteers.length === 0 ? (
          <div className="text-center py-20 space-y-4">
            <div className="inline-flex p-4 bg-gray-50 text-gray-400 rounded-full border border-gray-100">
              <Users className="w-12 h-12" />
            </div>
            <h3 className="text-lg font-bold text-gray-700">No Volunteer Applications Found</h3>
            <p className="text-xs text-gray-400 font-medium max-w-sm mx-auto">
              We couldn't find any volunteers matching your search query or filters. Try adjusting your parameters.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50/50 border-b border-gray-100">
                  <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Date & Info</th>
                  <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Contact Details</th>
                  <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">City</th>
                  <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Area / Muhalla</th>
                  <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Relief Program</th>
                  <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider text-center">Status</th>
                  <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {volunteers.map((v) => {
                  const dateStr = new Date(v.createdAt).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  });
                  return (
                    <tr key={v._id} className="hover:bg-gray-50/30 transition-colors">
                      {/* Date & Name */}
                      <td className="px-6 py-5">
                        <div className="font-bold text-gray-800 text-sm">{v.data.name}</div>
                        <div className="flex items-center gap-1 text-[11px] text-gray-400 mt-1 font-semibold">
                          <Calendar className="w-3.5 h-3.5 text-gray-400" />
                          <span>Submitted: {dateStr}</span>
                        </div>
                      </td>

                      {/* Contact Info */}
                      <td className="px-6 py-5 space-y-1 text-xs">
                        <div className="flex items-center gap-1.5 text-gray-600">
                          <Mail className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                          <span className="font-medium">{v.data.email}</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-gray-600">
                          <Phone className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                          <span className="font-medium">{v.data.phone}</span>
                        </div>
                      </td>

                      {/* City */}
                      <td className="px-6 py-5">
                        <span className="inline-flex items-center gap-1 text-xs font-bold text-gray-700 bg-gray-100 px-2.5 py-1 rounded-lg border border-gray-200/50">
                          {v.data.city}
                        </span>
                      </td>

                      {/* Area */}
                      <td className="px-6 py-5">
                        <span className="inline-flex items-center gap-1 text-xs font-semibold text-gray-700 bg-gray-50 px-2.5 py-1 rounded-lg border border-gray-150">
                          <MapPin className="w-3.5 h-3.5 text-primary shrink-0" />
                          {v.data.area}
                        </span>
                      </td>

                      {/* Preferred Program */}
                      <td className="px-6 py-5">
                        <span className="text-xs font-semibold text-gray-700 bg-slate-100 border border-slate-200/80 px-2.5 py-1 rounded-lg">
                          {v.data.program}
                        </span>
                      </td>

                      {/* Status */}
                      <td className="px-6 py-5 text-center">
                        <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider border ${
                          v.status === "approved"
                            ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                            : v.status === "rejected"
                            ? "bg-rose-50 text-rose-700 border-rose-200"
                            : "bg-amber-50 text-amber-700 border-amber-200"
                        }`}>
                          {v.status}
                        </span>
                      </td>

                      {/* Action buttons */}
                      <td className="px-6 py-5 text-right">
                        <div className="flex items-center justify-end gap-2">
                          {actionLoading === v._id ? (
                            <Loader2 className="w-5 h-5 text-primary animate-spin" />
                          ) : (
                            <>
                              {v.status !== "approved" && (
                                <button
                                  onClick={() => handleStatusUpdate(v._id, "approved")}
                                  className="p-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 hover:text-emerald-800 rounded-lg border border-emerald-100 transition-all cursor-pointer shadow-sm"
                                  title="Approve Volunteer"
                                >
                                  <Check className="w-4 h-4" />
                                </button>
                              )}
                              {v.status !== "rejected" && (
                                <button
                                  onClick={() => handleStatusUpdate(v._id, "rejected")}
                                  className="p-1.5 bg-rose-50 hover:bg-rose-100 text-rose-700 hover:text-rose-800 rounded-lg border border-rose-100 transition-all cursor-pointer shadow-sm"
                                  title="Reject Volunteer"
                                >
                                  <X className="w-4 h-4" />
                                </button>
                              )}
                            </>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
