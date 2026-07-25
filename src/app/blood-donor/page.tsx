"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Sparkles, ArrowLeft, Heart, CheckCircle2 } from "lucide-react";
import BloodDonorRegister from "@/components/BloodDonorRegister";

export default function BloodDonorPage() {
  const [formData, setFormData] = useState({
    name: "",
    cityVillageArea: "",
  });
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSuccess = (name: string, location: string) => {
    setFormData({ name, cityVillageArea: location });
    setIsSuccess(true);
  };

  return (
    <div className="relative min-h-screen bg-white">
      {/* Page Header / Hero Section */}
      <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden bg-neutral-dark pt-36 pb-24">
        {/* Background Image with Dark & Red Gradient Overlay */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-10000 scale-105"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1615461066841-6116e61058f4?auto=format&fit=crop&q=80&w=1200')`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#1a0505]/95 via-[#0c0202]/90 to-red-950/45" />
        
        {/* Grid Pattern Overlay */}
        <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:24px_24px]" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10 w-full">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-red-950/30 border border-red-500/30 text-red-400 font-semibold text-xs uppercase tracking-wider backdrop-blur-sm mb-4">
            <Sparkles className="w-3.5 h-3.5 text-red-500" />
            <span>Save a Life Today</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
            Register as Blood Donor
          </h1>
          <p className="text-sm sm:text-base text-gray-300 max-w-2xl mx-auto mt-4 font-medium leading-relaxed">
            Your single donation can save up to three lives. Join our regional network of volunteer blood donors.
          </p>

          {/* Breadcrumbs */}
          <div className="flex items-center justify-center gap-2 mt-6 text-xs font-bold text-gray-400 uppercase tracking-wider">
            <Link href="/" className="hover:text-red-500 transition-colors flex items-center gap-1">
              <ArrowLeft className="w-3 h-3" />
              <span>Back to Home</span>
            </Link>
            <span className="text-gray-600">/</span>
            <span className="text-red-500 font-bold">Blood Donor</span>
          </div>
        </div>
      </section>

      {/* Main Content Form Section */}
      <main className="py-20 bg-gray-50/50">
        <div className="max-w-2xl mx-auto px-4 sm:px-6">
          <div className="bg-white border border-gray-150 rounded-3xl p-6 sm:p-10 shadow-sm relative overflow-hidden">
            {!isSuccess ? (
              <BloodDonorRegister onSuccess={() => setIsSuccess(true)} />
            ) : (
              <div className="text-center py-10 space-y-5">
                <div className="inline-flex p-4 bg-red-50 text-red-500 rounded-full animate-bounce border border-red-100">
                  <CheckCircle2 className="w-16 h-16" />
                </div>
                
                <h4 className="font-extrabold text-neutral-dark text-2xl">
                  Registration Successful!
                </h4>

                <p className="text-sm text-neutral-light leading-relaxed max-w-md mx-auto font-semibold">
                  Thank you for registering as a blood donor! Your details have been stored securely in our regional network. Al-Khidmat coordinates will reach out during times of emergency.
                </p>

                <div className="pt-6">
                  <Link
                    href="/"
                    className="px-8 py-3 bg-red-600 hover:bg-red-700 text-white text-xs font-bold rounded-xl transition-colors cursor-pointer inline-flex shadow-sm hover:shadow-md"
                  >
                    Go Back to Home
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
