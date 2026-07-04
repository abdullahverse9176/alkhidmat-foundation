"use client";

import React, { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Sparkles, ArrowLeft, UserCheck, ShieldCheck, CheckCircle2 } from "lucide-react";

export default function VolunteerPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    city: "",
    program: "Disaster Relief",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name && formData.email && formData.phone && formData.city) {
      setIsSubmitting(true);
      setTimeout(() => {
        setIsSubmitting(false);
        setIsSuccess(true);
      }, 1500);
    }
  };

  return (
    <div className="relative min-h-screen bg-white">
      {/* Sticky Top Header */}
      <Navbar />

      {/* Page Header / Hero Section */}
      <section className="relative h-[45vh] flex items-center justify-center overflow-hidden bg-neutral-dark pt-20">
        {/* Background Image with Dark & Primary Gradient Overlay */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-10000 scale-105"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80&w=1200')`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a1813]/95 via-[#040a08]/90 to-primary/45" />
        
        {/* Grid Pattern Overlay */}
        <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:24px_24px]" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10 w-full">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/20 border border-primary/30 text-accent font-semibold text-xs uppercase tracking-wider backdrop-blur-sm mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Join the Alliance Network</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
            Register as Volunteer
          </h1>
          <p className="text-sm sm:text-base text-gray-300 max-w-2xl mx-auto mt-4 font-medium leading-relaxed">
            Over 15,400+ active citizens serving locally in disaster relief, food camps, and medical outposts. Sign up today.
          </p>

          {/* Breadcrumbs */}
          <div className="flex items-center justify-center gap-2 mt-6 text-xs font-bold text-gray-400 uppercase tracking-wider">
            <Link href="/" className="hover:text-primary transition-colors flex items-center gap-1">
              <ArrowLeft className="w-3 h-3" />
              <span>Back to Home</span>
            </Link>
            <span className="text-gray-600">/</span>
            <span className="text-accent font-bold">Volunteer</span>
          </div>
        </div>
      </section>

      {/* Main Content Form Section */}
      <main className="py-24 bg-gray-50/50">
        <div className="max-w-2xl mx-auto px-4 sm:px-6">
          <div className="bg-white border border-gray-150 rounded-3xl p-6 sm:p-10 shadow-sm relative overflow-hidden">
            {!isSuccess ? (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="flex items-center gap-3 border-b border-gray-100 pb-5">
                  <div className="bg-primary/10 text-primary p-3 rounded-2xl shrink-0">
                    <UserCheck className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-black text-neutral-dark">
                      Join Our Volunteer Network
                    </h3>
                    <p className="text-xs text-neutral-light font-semibold uppercase tracking-wider mt-0.5">
                      Enter details to coordinate with local cell heads
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-bold text-neutral-dark mb-1">
                      Full Name
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Muhammad Abdullah"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:bg-white text-neutral-dark font-semibold transition-all"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-xs font-bold text-neutral-dark mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="name@domain.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:bg-white text-neutral-dark font-semibold transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-neutral-dark mb-1">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="e.g. +92 300 1234567"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:bg-white text-neutral-dark font-semibold transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-neutral-dark mb-1">
                      City of Residence
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Chiniot"
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:bg-white text-neutral-dark font-semibold transition-all"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-xs font-bold text-neutral-dark mb-1">
                      Preferred Relief Program
                    </label>
                    <select
                      value={formData.program}
                      onChange={(e) => setFormData({ ...formData, program: e.target.value })}
                      className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:bg-white text-neutral-dark font-semibold transition-all"
                    >
                      {programs.map((prog) => (
                        <option key={prog} value={prog}>
                          {prog}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="flex items-start gap-2.5 pt-4 border-t border-gray-100">
                  <ShieldCheck className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                  <p className="text-[11px] text-neutral-light leading-normal font-semibold">
                    By submitting, you agree to coordinate with local area heads and receive safety brief alerts regarding emergency disaster deployments.
                  </p>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 bg-primary hover:bg-primary-hover text-white text-sm font-bold rounded-xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer mt-2"
                >
                  {isSubmitting ? (
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    "Submit Volunteer Registration"
                  )}
                </button>
              </form>
            ) : (
              <div className="text-center py-10 space-y-5">
                <div className="inline-flex p-4 bg-primary/10 text-primary rounded-full animate-bounce">
                  <CheckCircle2 className="w-16 h-16" />
                </div>
                
                <h4 className="font-extrabold text-neutral-dark text-2xl">
                  Registration Successful!
                </h4>

                <p className="text-sm text-neutral-light leading-relaxed max-w-md mx-auto font-semibold">
                  Welcome to the squad, {formData.name}! A regional cell head from {formData.city} will contact you at {formData.phone} within 48 hours for onboarding.
                </p>

                <div className="pt-6">
                  <Link
                    href="/"
                    className="px-8 py-3 bg-primary hover:bg-primary-hover text-white text-xs font-bold rounded-xl transition-colors cursor-pointer inline-flex shadow-sm hover:shadow-md"
                  >
                    Go Back to Home
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
