"use client";

import React, { useState, useEffect } from "react";
import { 
  Users, Search, Filter, Check, X, Loader2, 
  MapPin, Phone, Mail, Award, Calendar, AlertCircle, Clock
} from "lucide-react";
import { getEventVolunteersAction, updateEventVolunteerStatusAction } from "@/app/actions/event-volunteer-actions";
import { getEventsAction } from "@/app/actions/event-actions";
import EventVolunteerDetailsModal, { EventVolunteer } from "@/components/EventVolunteerDetailsModal";

interface EventItem {
  _id: string;
  title: string;
}

export default function EventVolunteersDashboardPage() {
  const [volunteers, setVolunteers] = useState<EventVolunteer[]>([]);
  const [eventsList, setEventsList] = useState<EventItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [selectedVolunteerForModal, setSelectedVolunteerForModal] = useState<EventVolunteer | null>(null);

  // Filters State
  const [selectedEventId, setSelectedEventId] = useState("all");
  const [cityQuery, setCityQuery] = useState("");
  const [areaQuery, setAreaQuery] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("all");

  // Load events list for filter dropdown
  useEffect(() => {
    async function loadEvents() {
      try {
        const data = await getEventsAction();
        setEventsList(data);
      } catch (err) {
        console.error("Failed to load events for filter dropdown:", err);
      }
    }
    loadEvents();
  }, []);

  // Fetch volunteers on mount and filter changes
  const fetchVolunteers = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getEventVolunteersAction({
        eventId: selectedEventId,
        city: cityQuery,
        area: areaQuery,
        status: selectedStatus
      });
      setVolunteers(data);
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Failed to load event volunteers.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      fetchVolunteers();
    }, 300); // Debounce search inputs

    return () => clearTimeout(delayDebounceFn);
  }, [selectedEventId, cityQuery, areaQuery, selectedStatus]);

  const handleStatusUpdate = async (id: string, newStatus: "approved" | "rejected") => {
    setActionLoading(id);
    try {
      await updateEventVolunteerStatusAction(id, newStatus);
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

  // Dynamic statistics
  const pendingCount = volunteers.filter((v) => v.status === "pending").length;
  const approvedCount = volunteers.filter((v) => v.status === "approved").length;

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Title Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight flex items-center gap-2.5">
            <Users className="w-8 h-8 text-primary" />
            <span>Event Volunteer Directory</span>
          </h1>
          <p className="text-sm text-gray-550 font-medium mt-1">
            Review, coordinate, and approve volunteers signed up for specific scheduled events.
          </p>
        </div>
        
        <div className="flex flex-wrap gap-2">
          <div className="text-xs font-semibold bg-amber-50 text-amber-700 border border-amber-250/50 px-3 py-1.5 rounded-full inline-flex items-center gap-1.5">
            <Clock className="w-4 h-4 text-amber-500" />
            <span>Pending Approvals: {pendingCount}</span>
          </div>
          <div className="text-xs font-semibold bg-primary/10 text-primary border border-primary/20 px-3 py-1.5 rounded-full inline-flex items-center gap-1.5">
            <Award className="w-4 h-4 text-primary" />
            <span>Approved Staff: {approvedCount}</span>
          </div>
        </div>
      </div>

      {/* Filters Bar */}
      <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        
        {/* Event Filter */}
        <div>
          <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
            Filter by Event
          </label>
          <div className="relative">
            <Filter className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <select
              value={selectedEventId}
              onChange={(e) => setSelectedEventId(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-gray-700 cursor-pointer appearance-none"
            >
              <option value="all">All Events</option>
              {eventsList.map((evt) => (
                <option key={evt._id} value={evt._id}>
                  {evt.title}
                </option>
              ))}
            </select>
          </div>
        </div>

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

      {/* Main Content List Table */}
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
            <span className="text-sm font-bold text-gray-400">Loading event volunteers...</span>
          </div>
        ) : volunteers.length === 0 ? (
          <div className="text-center py-20 space-y-4">
            <div className="inline-flex p-4 bg-gray-50 text-gray-400 rounded-full border border-gray-100">
              <Users className="w-12 h-12" />
            </div>
            <h3 className="text-lg font-bold text-gray-700">No Registrations Found</h3>
            <p className="text-xs text-gray-400 font-medium max-w-sm mx-auto">
              No volunteer registrations match your filter settings. Modify settings above to refresh.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50/50 border-b border-gray-100">
                  <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Volunteer Details</th>
                  <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">City</th>
                  <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Area / Muhalla</th>
                  <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Target Event</th>
                  <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {volunteers.map((v) => {
                  return (
                    <tr key={v._id} className="hover:bg-gray-50/30 transition-colors">
                      {/* Name Only */}
                      <td className="px-6 py-5">
                        <div className="font-bold text-gray-800 text-sm">{v.data.name}</div>
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

                      {/* Targeted Event */}
                      <td className="px-6 py-5">
                        <span className="text-xs font-bold text-gray-750 bg-amber-50 border border-amber-100 px-2.5 py-1 rounded-lg inline-block max-w-[200px] truncate" title={v.data.eventName}>
                          {v.data.eventName}
                        </span>
                      </td>

                      {/* Actions */}
                      <td className="px-6 py-5 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => setSelectedVolunteerForModal(v)}
                            className="px-2.5 py-1.5 text-xs font-bold text-gray-600 hover:text-primary hover:bg-primary/5 rounded-xl border border-gray-200 hover:border-primary/30 transition-all cursor-pointer shadow-sm"
                          >
                            More Details
                          </button>
                          
                          {actionLoading === v._id ? (
                            <Loader2 className="w-5 h-5 text-primary animate-spin" />
                          ) : (
                            <>
                              {v.status !== "approved" && (
                                <button
                                  onClick={() => handleStatusUpdate(v._id, "approved")}
                                  className="p-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 hover:text-emerald-800 rounded-lg border border-emerald-100 transition-all cursor-pointer shadow-sm inline-flex"
                                  title="Approve Volunteer"
                                >
                                  <Check className="w-4 h-4" />
                                </button>
                              )}
                              {v.status !== "rejected" && (
                                <button
                                  onClick={() => handleStatusUpdate(v._id, "rejected")}
                                  className="p-1.5 bg-rose-50 hover:bg-rose-100 text-rose-700 hover:text-rose-800 rounded-lg border border-rose-100 transition-all cursor-pointer shadow-sm inline-flex"
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

      {/* Details Modal */}
      <EventVolunteerDetailsModal
        volunteer={selectedVolunteerForModal}
        onClose={() => setSelectedVolunteerForModal(null)}
      />

    </div>
  );
}
