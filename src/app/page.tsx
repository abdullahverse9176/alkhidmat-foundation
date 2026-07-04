import React from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ImpactStats from "@/components/ImpactStats";
import AboutUs from "@/components/AboutUs";
import FeaturedProjects from "@/components/FeaturedProjects";
import Campaign from "@/components/Campaign";
import ChairmanMessage from "@/components/ChairmanMessage";
import VolunteerOfMonth from "@/components/VolunteerOfMonth";
import Events from "@/components/Events";
import News from "@/components/News";
import Testimonials from "@/components/Testimonials";
import DonationProgress from "@/components/DonationProgress";
import CTA from "@/components/CTA";
import Newsletter from "@/components/Newsletter";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="relative min-h-screen bg-white">
      {/* Sticky Top Header */}
      <Navbar />

      {/* Main Sections */}
      <main className="w-full">
        {/* 2. Hero Section */}
        <Hero />

        {/* 3. Impact Statistics */}
        <ImpactStats />

        {/* 4. About Party */}
        <AboutUs />

        {/* 6. Featured Welfare Projects */}
        <FeaturedProjects />

        {/* 7. Election Campaign Section */}
        <Campaign />

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

        {/* 15. Call to Action */}
        <CTA />

        {/* 16. Newsletter */}
        <Newsletter />
      </main>

      {/* 18. Footer */}
      <Footer />
    </div>
  );
}
