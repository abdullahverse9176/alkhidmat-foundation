"use client";

import React, { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Sparkles, ArrowLeft, UserCheck, ShieldCheck, CheckCircle2 } from "lucide-react";
import VolunteerRegister from "@/components/VolunteerRegister";

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
              <VolunteerRegister />
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

    </div>
  );
}
