"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Services from "@/components/Services";
import GalleryPreview from "@/components/GalleryPreview";
import ContactPreview from "@/components/ContactPreview";
import Footer from "@/components/Footer";
import VolunteerRegister from "@/components/VolunteerRegister";
import { Sparkles, ArrowLeft } from "lucide-react";

export default function ServicesPage() {
  const router = useRouter();
  const [activeSection, setActiveSection] = useState("services");
  const [isVolunteerOpen, setIsVolunteerOpen] = useState(false);

  // Cross-page navigation handler
  const handleNavigate = (sectionId: string) => {
    if (sectionId === "services" || sectionId === "gallery" || sectionId === "contact") {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    } else if (sectionId === "volunteer") {
      setIsVolunteerOpen(true);
    } else {
      router.push(`/#${sectionId}`);
    }
  };

  // Scroll to hash on load
  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      const targetId = hash.replace("#", "");
      const element = document.getElementById(targetId);
      if (element) {
        const timer = setTimeout(() => {
          element.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 200);
        return () => clearTimeout(timer);
      }
    }
  }, []);

  // Scroll spy to highlight active menu section on Services page
  useEffect(() => {
    const handleScroll = () => {
      const sections = ["services", "gallery", "contact"];
      const scrollPosition = window.scrollY + 200; // Offset

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="relative min-h-screen bg-white">
      {/* Sticky Top Header */}
      <Navbar 
        onNavigate={handleNavigate} 
        activeSection={activeSection} 
      />

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

        {/* 2. Gallery */}
        <GalleryPreview />

        {/* 3. Contact */}
        <ContactPreview />
      </main>

      {/* Footer */}
      <Footer onNavigate={handleNavigate} />

      {/* Floating Volunteer Registration Overlay Modal */}
      <VolunteerRegister 
        isOpen={isVolunteerOpen} 
        onClose={() => setIsVolunteerOpen(false)} 
      />
    </div>
  );
}
