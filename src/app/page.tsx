"use client";

import React, { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ImpactStats from "@/components/ImpactStats";
import AboutUs from "@/components/AboutUs";
import Services from "@/components/Services";
import FeaturedProjects from "@/components/FeaturedProjects";
import Campaign from "@/components/Campaign";
import ChairmanMessage from "@/components/ChairmanMessage";
import VolunteerOfMonth from "@/components/VolunteerOfMonth";
import Events from "@/components/Events";
import News from "@/components/News";
import Testimonials from "@/components/Testimonials";
import DonationProgress from "@/components/DonationProgress";
import GalleryPreview from "@/components/GalleryPreview";
import CTA from "@/components/CTA";
import Newsletter from "@/components/Newsletter";
import ContactPreview from "@/components/ContactPreview";
import Footer from "@/components/Footer";
import VolunteerRegister from "@/components/VolunteerRegister";

export default function Home() {
  const [activeSection, setActiveSection] = useState("home");
  const [isVolunteerOpen, setIsVolunteerOpen] = useState(false);

  // Smooth scroll handler
  const handleNavigate = (sectionId: string) => {
    if (sectionId === "volunteer") {
      setIsVolunteerOpen(true);
      const element = document.getElementById("volunteer-section");
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    } else {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  };

  // Scroll spy to highlight active menu section
  useEffect(() => {
    const handleScroll = () => {
      const sections = [
        "home",
        "about",
        "leadership",
        "projects",
        "services",
        "events",
        "gallery",
        "volunteer-section",
        "donation",
        "contact"
      ];

      const scrollPosition = window.scrollY + 200; // Offset

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(sectionId === "volunteer-section" ? "volunteer" : sectionId);
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

      {/* Main Sections */}
      <main className="w-full">
        {/* 2. Hero Section */}
        <Hero onNavigate={handleNavigate} />

        {/* 3. Impact Statistics */}
        <ImpactStats />

        {/* 4. About Party */}
        <AboutUs />

        {/* 5. Our Services */}
        <Services />

        {/* 6. Featured Welfare Projects */}
        <FeaturedProjects onNavigate={handleNavigate} />

        {/* 7. Election Campaign Section */}
        <Campaign onNavigate={handleNavigate} />

        {/* 8. Chairman Message */}
        <ChairmanMessage />

        {/* 9. Volunteer of the Month */}
        <div id="volunteer-section">
          <VolunteerOfMonth />
        </div>

        {/* 10. Upcoming Events */}
        <Events />

        {/* 11. Latest News */}
        <News />

        {/* 12. Testimonials */}
        <Testimonials />

        {/* 13. Donation Progress */}
        <DonationProgress />

        {/* 14. Gallery Preview */}
        <GalleryPreview />

        {/* 15. Call to Action */}
        <CTA onNavigate={handleNavigate} />

        {/* 16. Newsletter */}
        <Newsletter />

        {/* 17. Contact Preview */}
        <ContactPreview />
      </main>

      {/* 18. Footer */}
      <Footer onNavigate={handleNavigate} />

      {/* Floating Volunteer Registration Overlay Modal */}
      <VolunteerRegister 
        isOpen={isVolunteerOpen} 
        onClose={() => setIsVolunteerOpen(false)} 
      />
    </div>
  );
}
