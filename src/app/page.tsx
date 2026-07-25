import React from "react";
import Hero from "@/components/Hero";
import ImpactStats from "@/components/ImpactStats";
import AboutUs from "@/components/AboutUs";
import ChairmanMessage from "@/components/ChairmanMessage";
import Events from "@/components/Events";
import News from "@/components/News";
import Newsletter from "@/components/Newsletter";
import { getFeaturedEventsAction } from "@/app/actions/event-actions";

export default async function Home() {
  const featuredEvents = await getFeaturedEventsAction();

  return (
    <div className="relative min-h-screen bg-white">

      {/* Main Sections */}
      <main className="w-full">
        {/* Hero Section */}
        <Hero />

        {/* Impact Statistics */}
        <ImpactStats />

        {/* About Us Overview */}
        <AboutUs />

        {/* Chairman Leadership Message */}
        <ChairmanMessage />

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
