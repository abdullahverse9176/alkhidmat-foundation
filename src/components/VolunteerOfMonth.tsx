"use client";

import React from "react";
import { motion } from "framer-motion";
import { Award, Clock, Briefcase, MapPin, Quote } from "lucide-react";
import { volunteerOfMonthData } from "@/data/mockData";

export default function VolunteerOfMonth() {
  return (
    <section className="py-24 bg-gray-50 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-accent/5 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold text-accent uppercase tracking-widest px-3 py-1 bg-accent/10 border border-accent/20 rounded-full">
            Spotlight & Appreciation
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-neutral-dark mt-4">
            Volunteer of the Month
          </h2>
          <p className="text-neutral-light mt-4 text-base">
            Every month, we honor a volunteer who goes above and beyond to organize logistics, lead local units, and distribute life-saving packages.
          </p>
        </div>

        {/* Premium Spotlight Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="max-w-4xl mx-auto bg-white rounded-3xl border-2 border-accent/20 hover:border-accent/40 shadow-xl overflow-hidden transition-all duration-300"
        >
          <div className="grid grid-cols-1 md:grid-cols-12">
            
            {/* Photo Column */}
            <div className="md:col-span-5 relative h-80 md:h-auto bg-gray-150 min-h-[350px]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={volunteerOfMonthData.photoUrl}
                alt={volunteerOfMonthData.name}
                className="absolute inset-0 w-full h-full object-cover object-center"
              />
              
              {/* Float appreciation badge over photo */}
              <div className="absolute bottom-4 left-4 bg-accent text-neutral-dark text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-lg flex items-center gap-1 shadow-lg border border-accent">
                <Award className="w-3.5 h-3.5 fill-current" />
                <span>{volunteerOfMonthData.badgeText}</span>
              </div>
            </div>

            {/* Details Column */}
            <div className="md:col-span-7 p-8 sm:p-10 flex flex-col justify-between space-y-6">
              
              {/* Header */}
              <div className="space-y-2">
                <div className="flex items-center gap-1.5 text-xs text-neutral-light font-bold">
                  <MapPin className="w-4 h-4 text-primary" />
                  <span>Based in {volunteerOfMonthData.city}</span>
                </div>
                <h3 className="text-2xl font-black text-neutral-dark">
                  {volunteerOfMonthData.name}
                </h3>
              </div>

              {/* Story */}
              <div className="space-y-4">
                <p className="text-xs text-neutral-light leading-relaxed font-semibold">
                  {volunteerOfMonthData.appreciationNote}
                </p>

                <div className="relative pl-7 py-1 text-xs text-neutral-light italic font-medium bg-gray-50 rounded-xl p-3 border-l-4 border-accent">
                  <Quote className="w-5 h-5 text-accent/30 absolute left-2 top-2" />
                  <p>&ldquo;{volunteerOfMonthData.quote}&rdquo;</p>
                </div>
              </div>

              {/* Metrics Grid */}
              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-100">
                <div className="flex items-center gap-3">
                  <div className="bg-primary/10 text-primary p-2.5 rounded-xl">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] text-neutral-light block uppercase font-bold tracking-wider">
                      Hours Served
                    </span>
                    <span className="text-lg font-black text-neutral-dark">
                      {volunteerOfMonthData.hoursServed} Hours
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="bg-accent/10 text-accent p-2.5 rounded-xl">
                    <Briefcase className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] text-neutral-light block uppercase font-bold tracking-wider">
                      Relief Actions
                    </span>
                    <span className="text-lg font-black text-neutral-dark">
                      {volunteerOfMonthData.projectsCompleted} Campaigns
                    </span>
                  </div>
                </div>
              </div>

            </div>

          </div>
        </motion.div>

      </div>
    </section>
  );
}
