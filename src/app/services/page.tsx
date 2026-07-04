import React from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Services from "@/components/Services";
import Footer from "@/components/Footer";
import { Sparkles, ArrowLeft } from "lucide-react";

export default function ServicesPage() {
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
            backgroundImage: `url('https://images.unsplash.com/photo-1469571486040-7530613856e1?auto=format&fit=crop&q=80&w=1200')`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a1813]/95 via-[#040a08]/90 to-primary/45" />
        
        {/* Grid Pattern Overlay */}
        <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:24px_24px]" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10 w-full">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/20 border border-primary/30 text-accent font-semibold text-xs uppercase tracking-wider backdrop-blur-sm mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Operational Log & Care Areas</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
            Welfare Services & Gallery
          </h1>
          <p className="text-sm sm:text-base text-gray-300 max-w-2xl mx-auto mt-4 font-medium leading-relaxed">
            Discover our active care programs, operational photo archives, and options to contact our regional secretariats for direct coordination.
          </p>

          {/* Breadcrumbs */}
          <div className="flex items-center justify-center gap-2 mt-6 text-xs font-bold text-gray-400 uppercase tracking-wider">
            <Link href="/" className="hover:text-primary transition-colors flex items-center gap-1">
              <ArrowLeft className="w-3 h-3" />
              <span>Back to Home</span>
            </Link>
            <span className="text-gray-600">/</span>
            <span className="text-accent font-bold">Services & Operations</span>
          </div>
        </div>
      </section>

      {/* Main Sections */}
      <main className="w-full">
        {/* 1. Services */}
        <Services />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
