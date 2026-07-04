"use client";

import React from "react";
import { motion } from "framer-motion";
import { Users, MapPin, Heart, Flame, Apple, Stethoscope } from "lucide-react";
import { impactStatsData, StatItem } from "@/data/mockData";

const iconMap = {
  Users: Users,
  MapPin: MapPin,
  Heart: Heart,
  Flame: Flame,
  Apple: Apple,
  Stethoscope: Stethoscope,
};

export default function ImpactStats() {
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring" as const,
        stiffness: 100,
        damping: 15,
      },
    },
  };

  return (
    <section className="py-20 bg-gray-50 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold text-primary uppercase tracking-widest px-3 py-1 bg-primary/10 rounded-full">
            Our Transparent Impact
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-neutral-dark mt-4">
            Making a Tangible Difference
          </h2>
          <p className="text-neutral-light mt-4 text-base sm:text-lg">
            We track every volunteer hour and aid delivery to ensure maximum efficiency. Here is a summary of the life-saving impact we have made together.
          </p>
        </div>

        {/* Stats Grid */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {impactStatsData.map((stat: StatItem) => {
            const Icon = iconMap[stat.iconName] || Heart;
            return (
              <motion.div
                key={stat.id}
                variants={cardVariants}
                whileHover={{ y: -6, boxShadow: "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)" }}
                className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 transition-all duration-300 relative group overflow-hidden"
              >
                {/* Background color block accent on hover */}
                <div className="absolute top-0 left-0 w-2 h-full bg-primary transform scale-y-0 group-hover:scale-y-100 transition-transform duration-350 origin-bottom" />
                
                <div className="flex items-center gap-5">
                  <div className="bg-primary/10 text-primary p-4 rounded-xl group-hover:bg-primary group-hover:text-white transition-colors duration-300 shadow-inner">
                    <Icon className="w-7 h-7" />
                  </div>
                  
                  <div>
                    <span className="text-[10px] font-bold text-neutral-light uppercase tracking-wider block">
                      {stat.label}
                    </span>
                    <div className="flex items-baseline gap-0.5 mt-1">
                      <span className="text-3xl font-black text-neutral-dark tracking-tight">
                        {stat.value.toLocaleString()}
                      </span>
                      <span className="text-xl font-bold text-accent">
                        {stat.suffix}
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
