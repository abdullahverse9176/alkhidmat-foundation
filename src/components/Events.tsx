"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Calendar } from "lucide-react";
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
}

export default function Events({ events = [] }: { events?: EventItem[] }) {
  const [selectedEvent, setSelectedEvent] = useState<EventItem | null>(null);

  const handleRegisterClick = (event: EventItem) => {
    setSelectedEvent(event);
  };

  return (
    <section id="events" className="py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold text-primary uppercase tracking-widest px-3 py-1 bg-primary/10 rounded-full">
            Get Involved
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-neutral-dark mt-4">
            Upcoming Events & Seminars
          </h2>
          <p className="text-neutral-light mt-4 text-base">
            Participate in our conventions, tree-planting drives, and medical seminars to directly volunteer and educate the public on community development.
          </p>
        </div>

        {/* Events Grid */}
        {events.length === 0 ? (
          <div className="text-center py-12 bg-gray-50/50 rounded-3xl border border-gray-150 p-8 max-w-md mx-auto shadow-xs">
            <Calendar className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <h3 className="text-sm font-bold text-gray-700">No Featured Seminars Scheduled</h3>
            <p className="text-xs text-gray-400 font-semibold mt-1">
              Check back soon for new upcoming volunteer events and active community welfare programs.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {events.map((event: EventItem) => {
              const dateObj = new Date(event.date);
              const day = dateObj.getDate();
              const month = dateObj.toLocaleString("en-US", { month: "short" });
              const year = dateObj.getFullYear();
              const displayImage = event.image || "https://images.unsplash.com/photo-1541872703-74c5e44368f9?auto=format&fit=crop&q=80&w=600";

              return (
                <motion.div
                  key={event._id}
                  whileHover={{ y: -6 }}
                  className="bg-white rounded-2xl border border-gray-150 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
                >
                  {/* Event Image & Float Date */}
                  <div className="relative h-48 w-full overflow-hidden bg-gray-100">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={displayImage}
                      alt={event.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-neutral-dark/40 to-transparent" />
                    
                    {/* Calendar badge */}
                    <div className="absolute top-4 left-4 bg-white rounded-xl p-2.5 text-center min-w-[55px] shadow-lg border border-gray-100">
                      <span className="block text-lg font-black text-primary leading-none">{day}</span>
                      <span className="block text-[9px] uppercase font-extrabold text-accent mt-0.5 tracking-wider">{month}</span>
                      <span className="block text-[8px] font-bold text-neutral-light leading-none">{year}</span>
                    </div>
                  </div>

                  {/* Details */}
                  <div className="p-6 space-y-4 flex-grow flex flex-col justify-between">
                    <div className="space-y-2">
                      <h3 className="text-base font-bold text-neutral-dark group-hover:text-primary transition-colors leading-snug line-clamp-2" title={event.title}>
                        {event.title}
                      </h3>

                      <div className="flex items-center gap-1.5 text-xs text-neutral-light font-semibold">
                        <MapPin className="w-3.5 h-3.5 text-primary shrink-0" />
                        <span className="line-clamp-1">{event.location}</span>
                      </div>
                    </div>

                    <button
                      onClick={() => handleRegisterClick(event)}
                      className="w-full py-2.5 border border-primary text-primary hover:bg-primary hover:text-white text-xs font-bold rounded-lg transition-all text-center cursor-pointer flex items-center justify-center gap-1.5"
                    >
                      <Calendar className="w-3.5 h-3.5" />
                      <span>Register Seat</span>
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>

      {/* Dynamic Event Volunteer Registration Modal */}
      <EventVolunteerModal 
        event={selectedEvent} 
        onClose={() => setSelectedEvent(null)} 
      />
    </section>
  );
}
