"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { 
  Calendar, Clock, MapPin, Sparkles, ArrowLeft, ArrowRight, Loader2, AlertCircle, CalendarRange
} from "lucide-react";
import { getEventsAction } from "@/app/actions/event-actions";
import EventVolunteerModal from "@/components/EventVolunteerModal";

interface EventItem {
  _id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  image?: string;
  status: "upcoming" | "past";
  createdAt: string;
}

export default function EventsPage() {
  const [events, setEvents] = useState<EventItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"upcoming" | "past">("upcoming");
  const [selectedEventForSignup, setSelectedEventForSignup] = useState<EventItem | null>(null);

  useEffect(() => {
    async function loadEvents() {
      setLoading(true);
      setError(null);
      try {
        const data = await getEventsAction();
        setEvents(data);
      } catch (err: any) {
        console.error(err);
        setError(err.message || "Failed to load events.");
      } finally {
        setLoading(false);
      }
    }
    loadEvents();
  }, []);

  // Filter events based on active tab
  const filteredEvents = events.filter((item) => {
    // If a tab is selected, filter by status
    return item.status === activeTab;
  });

  return (
    <div className="relative min-h-screen bg-white">
      {/* Navbar */}
      <Navbar />

      {/* Page Header / Hero Section */}
      <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden bg-neutral-dark pt-36 pb-24">
        {/* Background Image with Dark & Primary Gradient Overlay */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-10000 scale-105"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&q=80&w=1200')`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a1813]/95 via-[#040a08]/90 to-primary/45" />
        
        {/* Grid Pattern Overlay */}
        <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:24px_24px]" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10 w-full">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/20 border border-primary/30 text-accent font-semibold text-xs uppercase tracking-wider backdrop-blur-sm mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Engage and Participate</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
            Events & Seminars
          </h1>
          <p className="text-sm sm:text-base text-gray-300 max-w-2xl mx-auto mt-4 font-medium leading-relaxed">
            Stay updated with our ongoing campaigns, relief training seminars, health camps, and volunteer meetups. Join hands with us.
          </p>

          {/* Breadcrumbs */}
          <div className="flex items-center justify-center gap-2 mt-6 text-xs font-bold text-gray-400 uppercase tracking-wider">
            <Link href="/" className="hover:text-primary transition-colors flex items-center gap-1">
              <ArrowLeft className="w-3 h-3" />
              <span>Back to Home</span>
            </Link>
            <span className="text-gray-600">/</span>
            <span className="text-accent font-bold">Events</span>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <main className="py-20 bg-gray-50/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Tabs Navigation */}
          <div className="flex justify-center mb-12">
            <div className="bg-white border border-gray-150 p-1.5 rounded-2xl shadow-sm inline-flex gap-1.5">
              <button
                onClick={() => setActiveTab("upcoming")}
                className={`px-6 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  activeTab === "upcoming"
                    ? "bg-primary text-white shadow-sm"
                    : "text-gray-550 hover:text-gray-800 hover:bg-gray-50"
                }`}
              >
                Upcoming Events
              </button>
              <button
                onClick={() => setActiveTab("past")}
                className={`px-6 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  activeTab === "past"
                    ? "bg-primary text-white shadow-sm"
                    : "text-gray-550 hover:text-gray-800 hover:bg-gray-50"
                }`}
              >
                Archive Highlights
              </button>
            </div>
          </div>

          {error && (
            <div className="max-w-md mx-auto p-4 text-sm text-red-800 rounded-2xl bg-red-50 border border-red-100 flex items-start gap-2.5 mb-12">
              <AlertCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          {/* Loader */}
          {loading ? (
            <div className="flex flex-col items-center justify-center py-24 gap-3">
              <Loader2 className="w-12 h-12 text-primary animate-spin" />
              <span className="text-sm font-bold text-gray-450">Fetching events directory...</span>
            </div>
          ) : filteredEvents.length === 0 ? (
            <div className="text-center py-24 space-y-4 max-w-md mx-auto">
              <CalendarRange className="w-16 h-16 text-gray-300 mx-auto" />
              <h3 className="text-xl font-bold text-gray-700">No Events Listed</h3>
              <p className="text-xs text-gray-400 font-semibold leading-relaxed">
                There are currently no events registered under this tab. Check back soon for updates on our local campaigns.
              </p>
            </div>
          ) : (
            /* Events Grid */
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredEvents.map((item) => {
                const dateObj = new Date(item.date);
                const day = dateObj.getDate();
                const month = dateObj.toLocaleDateString("en-US", { month: "short" });
                const fullDateStr = dateObj.toLocaleDateString("en-US", {
                  weekday: "long",
                  month: "long",
                  day: "numeric",
                  year: "numeric"
                });

                return (
                  <article 
                    key={item._id} 
                    className="bg-white border border-gray-150 rounded-3xl shadow-sm overflow-hidden flex flex-col hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group"
                  >
                    {/* Banner Image Container */}
                    <div className="relative h-52 overflow-hidden bg-gray-50 border-b border-gray-100 shrink-0">
                      {item.image ? (
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-300">
                          <CalendarRange className="w-12 h-12 stroke-[1.5]" />
                        </div>
                      )}

                      {/* Date Badge Overlay */}
                      <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-xs rounded-2xl p-2.5 text-center min-w-[55px] border border-gray-200/50 shadow-md">
                        <div className="text-lg font-black text-gray-900 leading-none">{day}</div>
                        <div className="text-[10px] font-extrabold text-primary uppercase tracking-wider mt-0.5">{month}</div>
                      </div>
                    </div>

                    {/* Content Body */}
                    <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                      <div className="space-y-2">
                        <h3 className="text-lg font-black text-gray-900 group-hover:text-primary transition-colors leading-snug">
                          {item.title}
                        </h3>
                        <p className="text-xs font-semibold text-gray-450 leading-relaxed line-clamp-3">
                          {item.description}
                        </p>
                      </div>

                      {/* Info and CTA */}
                      <div className="space-y-4 pt-2 border-t border-gray-50">
                        {/* Event details list */}
                        <div className="space-y-2 text-xs font-bold text-gray-400">
                          <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4 text-gray-400 shrink-0" />
                            <span>{item.time}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <MapPin className="w-4 h-4 text-gray-400 shrink-0" />
                            <span className="line-clamp-1">{item.location}</span>
                          </div>
                        </div>

                        {/* CTA button */}
                        {item.status === "upcoming" ? (
                          <button
                            onClick={() => setSelectedEventForSignup(item)}
                            className="w-full py-3 bg-primary hover:bg-primary-hover text-white text-xs font-bold rounded-xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
                          >
                            <span>Volunteer For Event</span>
                            <ArrowRight className="w-4 h-4" />
                          </button>
                        ) : (
                          <div className="py-2.5 text-center text-xs font-bold bg-gray-50 border border-gray-150 text-gray-400 rounded-xl">
                            Completed Campaign
                          </div>
                        )}
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          )}

        </div>
      </main>

      {/* Event Volunteer Signup Modal */}
      <EventVolunteerModal 
        event={selectedEventForSignup} 
        onClose={() => setSelectedEventForSignup(null)} 
      />

      {/* Footer */}
      <Footer />
    </div>
  );
}
