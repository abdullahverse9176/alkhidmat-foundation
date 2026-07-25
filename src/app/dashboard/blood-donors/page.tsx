"use client";

import React, { useState, useEffect } from "react";
import { 
  Heart, Search, Filter, Check, X, Loader2, 
  MapPin, Phone, Mail, Award, Calendar, AlertCircle
} from "lucide-react";
import { getBloodDonorsAction, updateDonorStatusAction } from "@/app/actions/blood-donor-actions";
import BloodDonorDetailsModal, { BloodDonor } from "@/components/BloodDonorDetailsModal";

export default function BloodDonorsDashboardPage() {
  const [donors, setDonors] = useState<BloodDonor[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const [selectedDonorForModal, setSelectedDonorForModal] = useState<BloodDonor | null>(null);

  // Filters State
  const [selectedBloodGroup, setSelectedBloodGroup] = useState("all");
  const [cityQuery, setCityQuery] = useState("");
  const [areaQuery, setAreaQuery] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("all");

  const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

  // Fetch donors on filter change
  const fetchDonors = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getBloodDonorsAction({
        bloodGroup: selectedBloodGroup,
        city: cityQuery,
        area: areaQuery,
        status: selectedStatus
      });
      setDonors(data);
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Failed to load blood donors.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      fetchDonors();
    }, 300); // Debounce search query input

    return () => clearTimeout(delayDebounceFn);
  }, [selectedBloodGroup, cityQuery, areaQuery, selectedStatus]);

  const handleStatusUpdate = async (id: string, newStatus: "approved" | "rejected") => {
    setActionLoading(id);
    try {
      await updateDonorStatusAction(id, newStatus);
      // Update local state instantly
      setDonors((prev) =>
        prev.map((d) => (d._id === id ? { ...d, status: newStatus } : d))
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
            <Heart className="w-8 h-8 text-red-500 fill-red-500" />
            <span>Blood Donor Directory</span>
          </h1>
          <p className="text-sm text-gray-505 font-medium mt-1">
            Search, filter, and coordinate with registered blood donors in Chiniot region.
          </p>
        </div>
        <div className="text-xs font-semibold bg-red-50 text-red-700 border border-red-100 px-3 py-1.5 rounded-full inline-flex items-center gap-1.5 self-start">
          <Heart className="w-4 h-4 fill-current text-red-500" />
          <span>Total Donors: {donors.length}</span>
        </div>
      </div>

      {/* Filters Bar */}
      <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
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
              className="w-full pl-10 pr-4 py-2.5 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 transition-all text-gray-800"
            />
          </div>
        </div>

        {/* Area Filter */}
        <div className="relative">
          <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
            Area / Muhalla / Village
          </label>
          <div className="relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search area..."
              value={areaQuery}
              onChange={(e) => setAreaQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 transition-all text-gray-800"
            />
          </div>
        </div>

        {/* Blood Group Filter */}
        <div>
          <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
            Blood Group
          </label>
          <div className="relative">
            <Filter className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <select
              value={selectedBloodGroup}
              onChange={(e) => setSelectedBloodGroup(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 transition-all text-gray-700 cursor-pointer appearance-none"
            >
              <option value="all">All Groups</option>
              {bloodGroups.map((bg) => (
                <option key={bg} value={bg}>
                  {bg} (Group)
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
            className="w-full px-4 py-2.5 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 transition-all text-gray-700 cursor-pointer"
          >
            <option value="all">All Statuses</option>
            <option value="pending">Pending</option>
            <option value="approved">Approved / Available</option>
            <option value="rejected">Unavailable / Hidden</option>
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
            <Loader2 className="w-10 h-10 text-red-500 animate-spin" />
            <span className="text-sm font-bold text-gray-400">Loading blood donors...</span>
          </div>
        ) : donors.length === 0 ? (
          <div className="text-center py-20 space-y-4">
            <div className="inline-flex p-4 bg-gray-50 text-gray-400 rounded-full border border-gray-100">
              <Heart className="w-12 h-12 text-red-300" />
            </div>
            <h3 className="text-lg font-bold text-gray-700">No Blood Donors Found</h3>
            <p className="text-xs text-gray-400 font-medium max-w-sm mx-auto">
              We couldn't find any donors matching your search filters. Try adjusting your parameters.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50/50 border-b border-gray-100">
                  <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Donor Details</th>
                  <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">City</th>
                  <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Area / Muhalla</th>
                  <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider text-center">Blood Group</th>
                  <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {donors.map((d) => {
                  const dateStr = new Date(d.createdAt).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  });
                  return (
                    <tr key={d._id} className="hover:bg-gray-50/30 transition-colors">
                      {/* Name Only */}
                      <td className="px-6 py-5">
                        <div className="font-bold text-gray-800 text-sm">{d.data.name}</div>
                      </td>

                      {/* City */}
                      <td className="px-6 py-5">
                        <span className="inline-flex items-center gap-1 text-xs font-bold text-gray-700 bg-gray-100 px-2.5 py-1 rounded-lg border border-gray-200/50">
                          {d.data.city}
                        </span>
                      </td>

                      {/* Area */}
                      <td className="px-6 py-5">
                        <span className="inline-flex items-center gap-1 text-xs font-semibold text-gray-700 bg-gray-50 px-2.5 py-1 rounded-lg border border-gray-150">
                          <MapPin className="w-3.5 h-3.5 text-red-500 shrink-0" />
                          {d.data.area}
                        </span>
                      </td>

                      {/* Blood Group */}
                      <td className="px-6 py-5 text-center">
                        <span className="inline-flex items-center justify-center font-extrabold text-sm text-white bg-red-600 w-8 h-8 rounded-full border-2 border-white shadow-sm">
                          {d.data.bloodGroup}
                        </span>
                      </td>

                      {/* Actions */}
                      <td className="px-6 py-5 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => setSelectedDonorForModal(d)}
                            className="px-2.5 py-1.5 text-xs font-bold text-gray-600 hover:text-[#00ADF2] hover:bg-[#00ADF2]/5 rounded-xl border border-gray-200 hover:border-[#00ADF2]/30 transition-all cursor-pointer shadow-sm"
                          >
                            More Details
                          </button>
                          {actionLoading === d._id ? (
                            <Loader2 className="w-5 h-5 text-red-500 animate-spin" />
                          ) : (
                            <>
                              {d.status !== "approved" && (
                                <button
                                  onClick={() => handleStatusUpdate(d._id, "approved")}
                                  className="p-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 hover:text-emerald-800 rounded-lg border border-emerald-100 transition-all cursor-pointer shadow-sm"
                                  title="Approve / Show Donor"
                                >
                                  <Check className="w-4 h-4" />
                                </button>
                              )}
                              {d.status !== "rejected" && (
                                <button
                                  onClick={() => handleStatusUpdate(d._id, "rejected")}
                                  className="p-1.5 bg-rose-50 hover:bg-rose-100 text-rose-700 hover:text-rose-800 rounded-lg border border-rose-100 transition-all cursor-pointer shadow-sm"
                                  title="Hide Donor"
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

      {/* Details Modal */}
      <BloodDonorDetailsModal 
        donor={selectedDonorForModal}
        onClose={() => setSelectedDonorForModal(null)}
      />
    </div>
  );
}
