import React from "react";
import Hero from "@/components/Hero";
import ImpactStats from "@/components/ImpactStats";
import AboutUs from "@/components/AboutUs";
import ChairmanMessage from "@/components/ChairmanMessage";
import Events from "@/components/Events";
import News from "@/components/News";
import Newsletter from "@/components/Newsletter";
import Services from "@/components/Services";
import FeaturedProjects from "@/components/FeaturedProjects";
import Testimonials from "@/components/Testimonials";
import { getFeaturedEventsAction } from "@/app/actions/event-actions";
import { getServicesAction, getProjectsAction } from "@/app/actions/services";

export default async function Home() {
  const [featuredEvents, services, projects] = await Promise.all([
    getFeaturedEventsAction(),
    getServicesAction(),
    getProjectsAction()
  ]);

  return (
    <div className="relative min-h-screen bg-white">

      {/* Main Sections */}
      <main className="w-full">
        {/* Hero Section Carousel */}
        <Hero />

        {/* Impact Statistics */}
        <ImpactStats />

        {/* Services & Care Areas Swipeable Carousel */}
        <Services initialServices={services} />

        {/* Featured Welfare Projects Swipeable Carousel */}
        <FeaturedProjects projects={projects} />

        {/* About Us Overview */}
        <AboutUs />

        {/* Chairman Leadership Message */}
        <ChairmanMessage />

        {/* Testimonials Review Slider */}
        <Testimonials />

        {/* Upcoming Events */}
        {featuredEvents && featuredEvents.length > 0 && (
          <Events events={featuredEvents} />
        )}

        {/* Latest News & Articles */}
        <News />

        {/* Newsletter Subscription */}
        <Newsletter />
      </main>

    </div>
  );
}
