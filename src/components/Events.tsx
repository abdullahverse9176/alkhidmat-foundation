"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Calendar, CheckCircle2, X } from "lucide-react";
import { upcomingEventsData, EventItem } from "@/data/mockData";

export default function Events() {
  const [selectedEvent, setSelectedEvent] = useState<EventItem | null>(null);
  const [isRegistered, setIsRegistered] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const handleRegisterClick = (event: EventItem) => {
    setSelectedEvent(event);
    setIsRegistered(false);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name && email) {
      setIsRegistered(true);
      setTimeout(() => {
        setSelectedEvent(null);
        setName("");
        setEmail("");
        setIsRegistered(false);
      }, 2000);
    }
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {upcomingEventsData.map((event: EventItem) => {
            const dateObj = new Date(event.date);
            const day = dateObj.getDate();
            const month = dateObj.toLocaleString("en-US", { month: "short" });
            const year = dateObj.getFullYear();

            return (
              <motion.div
                key={event.id}
                whileHover={{ y: -6 }}
                className="bg-white rounded-2xl border border-gray-150 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
              >
                {/* Event Image & Float Date */}
                <div className="relative h-48 w-full overflow-hidden bg-gray-100">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={event.imageUrl}
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
                    <h3 className="text-base font-bold text-neutral-dark group-hover:text-primary transition-colors leading-snug line-clamp-2">
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
      </div>

      {/* Interactive Registration Modal */}
      <AnimatePresence>
        {selectedEvent && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-neutral-dark/80 backdrop-blur-md z-50 flex items-center justify-center px-4"
          >
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              className="bg-white rounded-2xl w-full max-w-md p-6 shadow-2xl relative"
            >
              <button
                onClick={() => setSelectedEvent(null)}
                className="absolute top-4 right-4 text-neutral-light hover:text-neutral-dark p-2 hover:bg-gray-100 rounded-full transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              {!isRegistered ? (
                <form onSubmit={handleFormSubmit} className="space-y-4">
                  <h3 className="text-lg font-bold text-neutral-dark">
                    Register for Event
                  </h3>
                  <p className="text-xs text-neutral-light font-semibold">
                    {selectedEvent.title}
                  </p>

                  <div className="space-y-3">
                    <div>
                      <label className="block text-xs font-bold text-neutral-dark mb-1">
                        Full Name
                      </label>
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Dr. Abdullah"
                        className="w-full p-2.5 bg-gray-50 border border-gray-250 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:bg-white text-neutral-dark"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-neutral-dark mb-1">
                        Email Address
                      </label>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="name@domain.com"
                        className="w-full p-2.5 bg-gray-50 border border-gray-250 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:bg-white text-neutral-dark"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 bg-primary hover:bg-primary-hover text-white text-xs font-bold rounded-lg transition-colors cursor-pointer"
                  >
                    Confirm Registration
                  </button>
                </form>
              ) : (
                <div className="text-center py-6 space-y-4">
                  <div className="inline-flex p-3 bg-primary/10 text-primary rounded-full">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>
                  <h4 className="font-extrabold text-neutral-dark text-lg">
                    Registration Confirmed!
                  </h4>
                  <p className="text-xs text-neutral-light leading-relaxed max-w-xs mx-auto">
                    Thank you, {name}. A registration confirmation email has been sent to {email}. We look forward to seeing you at the event!
                  </p>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
