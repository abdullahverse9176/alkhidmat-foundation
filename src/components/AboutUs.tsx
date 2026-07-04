"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, Award, Heart, Shield } from "lucide-react";
import { partyAboutData } from "@/data/mockData";

export default function AboutUs() {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <section id="about" className="py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Image with Decorative Elements */}
          <div className="lg:col-span-6 relative">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
              className="relative rounded-2xl overflow-hidden shadow-2xl"
            >
              {/* Main Image */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={partyAboutData.imageUrl}
                alt="Al-Khidmat Volunteers helping the community"
                className="w-full h-[450px] object-cover transition-transform duration-500 hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/30 to-transparent" />
            </motion.div>

            {/* Float decorative badges */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="absolute -bottom-6 -right-6 hidden sm:flex items-center gap-3 bg-white p-4 rounded-2xl shadow-xl border border-gray-150 z-10"
            >
              <div className="bg-accent/10 p-3 rounded-xl text-accent">
                <Award className="w-6 h-6" />
              </div>
              <div>
                <span className="font-extrabold text-neutral-dark block text-lg">10+ Years</span>
                <span className="text-xs text-neutral-light font-semibold">Community Integrity</span>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="absolute -top-6 -left-6 hidden sm:flex items-center gap-3 bg-primary p-4 rounded-2xl shadow-xl z-10 text-white"
            >
              <div className="bg-white/20 p-2.5 rounded-lg">
                <Shield className="w-5 h-5 text-white" />
              </div>
              <span className="text-sm font-bold tracking-tight">100% Transparent Audits</span>
            </motion.div>
          </div>

          {/* Right Column: About details */}
          <div className="lg:col-span-6 space-y-6">
            <div className="space-y-2">
              <span className="text-xs font-bold text-primary uppercase tracking-widest px-3 py-1 bg-primary/10 rounded-full">
                {partyAboutData.subtitle}
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-neutral-dark tracking-tight">
                {partyAboutData.title}
              </h2>
            </div>

            <p className="text-neutral-light leading-relaxed text-base font-medium">
              {partyAboutData.description1}
            </p>

            <p className="text-neutral-light leading-relaxed text-sm">
              {partyAboutData.description2}
            </p>

            {/* Mission & Vision cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
              <div className="p-5 rounded-xl bg-gray-50 border border-gray-100 hover:border-primary/20 transition-all">
                <div className="flex items-center gap-2 text-primary font-bold mb-2">
                  <CheckCircle2 className="w-5 h-5 text-primary" />
                  <span>Our Mission</span>
                </div>
                <p className="text-xs text-neutral-light leading-relaxed font-semibold">
                  {partyAboutData.mission}
                </p>
              </div>

              <div className="p-5 rounded-xl bg-gray-50 border border-gray-100 hover:border-primary/20 transition-all">
                <div className="flex items-center gap-2 text-accent font-bold mb-2">
                  <Heart className="w-5 h-5 text-accent fill-current" />
                  <span>Our Vision</span>
                </div>
                <p className="text-xs text-neutral-light leading-relaxed font-semibold">
                  {partyAboutData.vision}
                </p>
              </div>
            </div>

            {/* Expandable Read More block */}
            <AnimatePresence>
              {isExpanded && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden bg-gray-50 rounded-xl p-5 border border-primary/10 text-xs text-neutral-light space-y-3 font-medium"
                >
                  <p>
                    Through our organized local hubs, we build direct food distribution pipelines, volunteer squads for immediate medical camp set-ups, and clean water pipelines that are managed locally by community heads. 
                  </p>
                  <p>
                    We actively work to transition successful, cost-effective volunteer-run programs into robust regional legislations. By doing this, we bypass red tape and verify our welfare methods directly on the ground before proposing them at national legislative tables.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="pt-2">
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="px-6 py-3 border border-primary text-primary hover:bg-primary hover:text-white font-bold text-sm rounded-xl transition-all duration-200 cursor-pointer shadow-sm hover:shadow-md"
              >
                {isExpanded ? "Show Less" : "Read More & Explore"}
              </button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
