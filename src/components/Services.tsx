"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { 
  Flame, 
  Apple, 
  Stethoscope, 
  GraduationCap, 
  Droplet, 
  Trees, 
  Sparkles, 
  Briefcase,
  ArrowRight
} from "lucide-react";
import { servicesData, ServiceItem } from "@/data/mockData";

const iconMap = {
  Flame: Flame,
  Apple: Apple,
  Stethoscope: Stethoscope,
  GraduationCap: GraduationCap,
  Droplet: Droplet,
  Trees: Trees,
  Sparkles: Sparkles,
  Briefcase: Briefcase,
};

export interface ServicesProps {
  initialServices?: ServiceItem[];
}

export default function Services({ initialServices }: ServicesProps) {
  const displayServices = initialServices && initialServices.length > 0 
    ? initialServices 
    : servicesData;

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.08,
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
        stiffness: 90,
        damping: 14,
      },
    },
  };

  return (
    <section id="services" className="py-24 bg-gray-50 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold text-primary uppercase tracking-widest px-3 py-1 bg-primary/10 rounded-full">
            Our Care Areas
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-neutral-dark mt-4">
            Compassionate Services For All
          </h2>
          <p className="text-neutral-light mt-4 text-base sm:text-lg">
            We provide structured, transparent welfare operations to lift the community, preserve the environment, and establish strong civic support frameworks.
          </p>
        </div>

        {/* Services Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {displayServices.map((service: any) => {
            const Icon = iconMap[service.iconName as keyof typeof iconMap] || Sparkles;

            return (
              <Link className="bg-white rounded-2xl p-6 border border-gray-100 transition-all duration-300 flex flex-col justify-between group cursor-pointer" href={`/services/${service.slug}`} key={service.id || service._id}
              >
                <div>
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors duration-300 shadow-inner">
                    <Icon className="w-6 h-6" />
                  </div>

                  <h3 className="text-lg font-bold text-neutral-dark mt-5 group-hover:text-primary transition-colors duration-200">
                    {service.title}
                  </h3>

                  <p className="text-xs text-neutral-light mt-2.5 leading-relaxed font-semibold">
                    {service.description}
                  </p>
                </div>

                <div className="pt-4 flex items-center gap-1.5 text-xs font-bold text-primary opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  <span>Learn More</span>
                  <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-0.5 transition-transform" />
                </div>
              </Link>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
