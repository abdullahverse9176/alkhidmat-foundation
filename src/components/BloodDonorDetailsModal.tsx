"use client";

import React from "react";
import { X, Heart } from "lucide-react";

export interface BloodDonor {
  _id: string;
  status: "pending" | "approved" | "rejected";
  data: {
    name: string;
    email: string;
    phone: string;
    cityVillageArea: string;
    bloodGroup: string;
    lastDonated: string;
  };
  createdAt: string;
}

interface BloodDonorDetailsModalProps {
  donor: BloodDonor | null;
  onClose: () => void;
}

export default function BloodDonorDetailsModal({ donor, onClose }: BloodDonorDetailsModalProps) {
  if (!donor) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 transition-all animate-fadeIn">
      <div className="bg-white rounded-3xl border border-gray-150 p-6 sm:p-8 w-full max-w-md shadow-2xl relative animate-in fade-in zoom-in duration-200">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3 border-b border-gray-100 pb-4 mb-5">
          <div className="bg-red-50 text-red-500 p-2.5 rounded-xl border border-red-100">
            <Heart className="w-5 h-5 fill-current" />
          </div>
          <div>
            <h3 className="font-extrabold text-gray-900 text-lg">
              Donor Profile Details
            </h3>
            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">
              Al-Khidmat Save Life Network
            </p>
          </div>
        </div>

        {/* Details list */}
        <div className="space-y-4 text-sm">
          {/* Name */}
          <div className="flex justify-between items-center py-2 border-b border-gray-50">
            <span className="font-bold text-gray-400 uppercase tracking-wide text-xs">Full Name</span>
            <span className="font-bold text-gray-800">{donor.data.name}</span>
          </div>

          {/* Blood Group */}
          <div className="flex justify-between items-center py-2 border-b border-gray-50">
            <span className="font-bold text-gray-400 uppercase tracking-wide text-xs">Blood Group</span>
            <span className="inline-flex items-center justify-center font-extrabold text-sm text-white bg-red-600 w-8 h-8 rounded-full border-2 border-white shadow-sm">
              {donor.data.bloodGroup}
            </span>
          </div>

          {/* Location */}
          <div className="flex justify-between items-center py-2 border-b border-gray-50">
            <span className="font-bold text-gray-400 uppercase tracking-wide text-xs">Location</span>
            <span className="font-bold text-gray-700 bg-gray-100 px-2.5 py-0.5 rounded-lg border border-gray-200/50">
              {donor.data.cityVillageArea}
            </span>
          </div>

          {/* Email */}
          <div className="flex justify-between items-center py-2 border-b border-gray-50">
            <span className="font-bold text-gray-400 uppercase tracking-wide text-xs">Email Address</span>
            <a href={`mailto:${donor.data.email}`} className="font-bold text-primary hover:underline">
              {donor.data.email}
            </a>
          </div>

          {/* Phone */}
          <div className="flex justify-between items-center py-2 border-b border-gray-50">
            <span className="font-bold text-gray-400 uppercase tracking-wide text-xs">Phone Number</span>
            <a href={`tel:${donor.data.phone}`} className="font-bold text-primary hover:underline">
              {donor.data.phone}
            </a>
          </div>

          {/* Last Donation */}
          <div className="flex justify-between items-center py-2 border-b border-gray-50">
            <span className="font-bold text-gray-400 uppercase tracking-wide text-xs">Last Donation</span>
            <span className="font-bold text-gray-700 bg-slate-100 border border-slate-200 px-2.5 py-0.5 rounded-lg">
              {donor.data.lastDonated || "Never"}
            </span>
          </div>

          {/* Registration Date */}
          <div className="flex justify-between items-center py-2 border-b border-gray-50">
            <span className="font-bold text-gray-400 uppercase tracking-wide text-xs">Registered On</span>
            <span className="font-bold text-gray-600">
              {new Date(donor.createdAt).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              })}
            </span>
          </div>

          {/* Status */}
          <div className="flex justify-between items-center py-2">
            <span className="font-bold text-gray-400 uppercase tracking-wide text-xs">Status</span>
            <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider border ${
              donor.status === "approved"
                ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                : donor.status === "rejected"
                ? "bg-rose-50 text-rose-700 border-rose-200"
                : "bg-amber-50 text-amber-700 border-amber-200"
            }`}>
              {donor.status === "approved" ? "Active" : donor.status === "rejected" ? "Hidden" : "Pending"}
            </span>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="mt-8 flex justify-end gap-3 pt-4 border-t border-gray-100">
          <button
            onClick={onClose}
            className="px-5 py-2 text-xs font-bold text-gray-500 hover:text-gray-700 hover:bg-gray-100 bg-gray-50 border border-gray-200 rounded-xl transition-all cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
