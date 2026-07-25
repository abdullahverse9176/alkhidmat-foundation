"use client";

import React from "react";
import { X, Sparkles, Calendar } from "lucide-react";

export interface EventVolunteer {
  _id: string;
  status: "pending" | "approved" | "rejected";
  data: {
    name: string;
    email: string;
    phone: string;
    city: string;
    area: string;
    eventId: string;
    eventName: string;
  };
  createdAt: string;
}

interface EventVolunteerDetailsModalProps {
  volunteer: EventVolunteer | null;
  onClose: () => void;
}

export default function EventVolunteerDetailsModal({ volunteer, onClose }: EventVolunteerDetailsModalProps) {
  if (!volunteer) return null;

  const dateStr = new Date(volunteer.createdAt).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 transition-all animate-fadeIn">
      <div className="bg-white rounded-3xl border border-gray-150 p-6 sm:p-8 w-full max-w-md shadow-2xl relative animate-in fade-in zoom-in duration-200">
        
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-650 cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3 border-b border-gray-100 pb-4 mb-5">
          <div className="bg-primary/10 text-primary p-2.5 rounded-xl">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-extrabold text-gray-900 text-lg">
              Volunteer Profile Details
            </h3>
            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">
              Event Volunteer Directory
            </p>
          </div>
        </div>

        {/* Details list */}
        <div className="space-y-4 text-sm">
          {/* Name */}
          <div className="flex justify-between items-center py-2 border-b border-gray-50 text-left">
            <span className="font-bold text-gray-400 uppercase tracking-wide text-xs">Full Name</span>
            <span className="font-bold text-gray-800">{volunteer.data.name}</span>
          </div>

          {/* Target Event */}
          <div className="flex justify-between items-center py-2 border-b border-gray-50 text-left">
            <span className="font-bold text-gray-400 uppercase tracking-wide text-xs">Target Event</span>
            <span className="font-bold text-primary bg-primary/5 px-2.5 py-0.5 rounded-lg border border-primary/10">
              {volunteer.data.eventName}
            </span>
          </div>

          {/* City */}
          <div className="flex justify-between items-center py-2 border-b border-gray-50 text-left">
            <span className="font-bold text-gray-400 uppercase tracking-wide text-xs">City</span>
            <span className="font-bold text-gray-700 bg-gray-100 px-2.5 py-0.5 rounded-lg border border-gray-200/50">
              {volunteer.data.city}
            </span>
          </div>

          {/* Area */}
          <div className="flex justify-between items-center py-2 border-b border-gray-50 text-left">
            <span className="font-bold text-gray-400 uppercase tracking-wide text-xs">Area / Muhalla</span>
            <span className="font-bold text-gray-800">
              {volunteer.data.area}
            </span>
          </div>

          {/* Email */}
          <div className="flex justify-between items-center py-2 border-b border-gray-50 text-left">
            <span className="font-bold text-gray-400 uppercase tracking-wide text-xs">Email Address</span>
            <a href={`mailto:${volunteer.data.email}`} className="font-bold text-primary hover:underline">
              {volunteer.data.email}
            </a>
          </div>

          {/* Phone */}
          <div className="flex justify-between items-center py-2 border-b border-gray-50 text-left">
            <span className="font-bold text-gray-400 uppercase tracking-wide text-xs">Phone Number</span>
            <a href={`tel:${volunteer.data.phone}`} className="font-bold text-primary hover:underline">
              {volunteer.data.phone}
            </a>
          </div>

          {/* Signup Date */}
          <div className="flex justify-between items-center py-2 border-b border-gray-50 text-left">
            <span className="font-bold text-gray-400 uppercase tracking-wide text-xs">Signup Date</span>
            <span className="font-bold text-gray-600 flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-gray-400" />
              {dateStr}
            </span>
          </div>

          {/* Status */}
          <div className="flex justify-between items-center py-2 border-b border-gray-50 text-left">
            <span className="font-bold text-gray-400 uppercase tracking-wide text-xs">Application Status</span>
            <span className={`inline-flex items-center px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider border ${
              volunteer.status === "approved"
                ? "bg-green-50 text-green-700 border-green-200"
                : volunteer.status === "rejected"
                ? "bg-rose-50 text-rose-700 border-rose-155"
                : "bg-amber-50 text-amber-700 border-amber-205"
            }`}>
              {volunteer.status}
            </span>
          </div>
        </div>

      </div>
    </div>
  );
}
