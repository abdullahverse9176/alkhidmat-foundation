"use client";

import React from "react";
import { motion } from "framer-motion";
import { Heart, Calendar, ArrowRight } from "lucide-react";
import { featuredProjectsData } from "@/data/mockData";
import Link from "next/link";

interface FeaturedProjectsProps {
  projects?: {
    _id?: string;
    slug: string;
    serviceSlug: string;
    title: string;
    shortDescription?: string;
    featuredImage: string;
    raised?: number;
    goal?: number;
  }[];
}

export default function FeaturedProjects({ projects = [] }: FeaturedProjectsProps) {
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring" as const,
        stiffness: 90,
        damping: 15,
      },
    },
  };

  // Build the list of projects to render: prefer database projects, fall back to mock data
  const displayProjects = projects.length > 0 
    ? projects.slice(0, 6).map(p => ({
        id: p._id || p.slug,
        title: p.title,
        description: p.shortDescription || `${p.title} - An active welfare initiative of Alkhidmat Foundation.`,
        category: p.serviceSlug ? p.serviceSlug.replace(/-/g, " ") : "Welfare Initiative",
        imageUrl: p.featuredImage || "https://images.unsplash.com/photo-1541963463532-d68292c34b19?w=600&auto=format&fit=crop",
        raisedAmount: p.raised || 0,
        targetAmount: p.goal || 100000,
        slug: p.slug,
        serviceSlug: p.serviceSlug
      }))
    : featuredProjectsData.map(p => ({
        id: p.id,
        title: p.title,
        description: p.description,
        category: p.category,
        imageUrl: p.imageUrl,
        raisedAmount: p.raisedAmount,
        targetAmount: p.targetAmount,
        slug: "", // default fallback
        serviceSlug: "clean-water-initiative"
      }));

  return (
    <section id="projects" className="py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header containing text and a call to action link */}
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl">
            <span className="text-xs font-bold text-primary uppercase tracking-widest px-3 py-1 bg-primary/10 rounded-full">
              Welfare Initiatives
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-neutral-dark mt-4 tracking-tight">
              Featured Welfare Projects
            </h2>
            <p className="text-neutral-light mt-3 text-base">
              Explore our ongoing developmental and relief programs. Your contributions directly fund resources, tools, and brick-and-mortar rehabilitation centers.
            </p>
          </div>
          
          <Link
            href="/#donation"
            className="flex items-center gap-2 text-sm font-bold text-primary hover:text-primary-hover group transition-colors cursor-pointer border-b border-primary/20 pb-1 align-middle inline-flex"
          >
            <span>View All Campaigns</span>
            <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Project Cards Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {displayProjects.map((project) => {
            const percentage = Math.min(100, Math.round((project.raisedAmount / project.targetAmount) * 100));

            return (
              <motion.div
                key={project.id}
                variants={cardVariants}
                className="bg-white rounded-2xl border border-gray-150 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group"
              >
                {/* Image Container with Zoom effect */}
                <div className="relative h-56 w-full overflow-hidden bg-gray-100">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={project.imageUrl}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-neutral-dark/45 to-transparent" />
                  
                  {/* Category badge */}
                  <span className="absolute top-4 left-4 bg-white/95 text-primary text-[10px] font-extrabold uppercase tracking-widest px-3 py-1.5 rounded-lg shadow-md border border-gray-100">
                    {project.category}
                  </span>
                </div>

                {/* Content */}
                <div className="p-6 flex-grow flex flex-col justify-between space-y-6">
                  <div className="space-y-3">
                    <h3 className="text-lg font-bold text-neutral-dark group-hover:text-primary transition-colors duration-150 leading-snug">
                      {project.title}
                    </h3>
                    <p className="text-xs text-neutral-light leading-relaxed font-semibold">
                      {project.description}
                    </p>
                  </div>

                  {/* Financial indicators and Progress bar */}
                  <div className="space-y-2.5">
                    <div className="w-full bg-gray-100 h-2.5 rounded-full overflow-hidden border border-gray-50">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${percentage}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, ease: "easeOut" }}
                        className="bg-primary h-full rounded-full"
                      />
                    </div>

                    <div className="flex justify-between items-center text-xs font-bold">
                      <div className="flex flex-col">
                        <span className="text-[10px] text-neutral-light uppercase font-semibold">Raised</span>
                        <span className="text-primary font-black">${project.raisedAmount.toLocaleString()}</span>
                      </div>
                      <div className="flex flex-col items-end">
                        <span className="text-[10px] text-neutral-light uppercase font-semibold">Goal</span>
                        <span className="text-neutral-dark font-black">${project.targetAmount.toLocaleString()}</span>
                      </div>
                    </div>

                    <div className="flex justify-between items-center text-[10px] text-neutral-light border-t border-gray-100 pt-3">
                      <span className="font-bold text-accent px-2 py-0.5 bg-accent/10 rounded">{percentage}% Funded</span>
                      <span className="flex items-center gap-1 font-semibold">
                        <Calendar className="w-3.5 h-3.5 text-neutral-light" />
                        <span>Active Campaign</span>
                      </span>
                    </div>
                  </div>

                  {/* Action buttons */}
                  <div className="pt-2 grid grid-cols-2 gap-3">
                    <Link
                      href={project.slug ? `/#donation?project=${project.slug}` : "/#donation"}
                      className="py-2.5 bg-primary hover:bg-primary-hover text-white text-xs font-bold rounded-lg text-center transition-colors cursor-pointer flex items-center justify-center gap-1.5 shadow-sm"
                    >
                      <Heart className="w-3.5 h-3.5 fill-current" />
                      <span>Donate</span>
                    </Link>
                    {project.slug ? (
                      <Link
                        href={`/services/${project.serviceSlug}/${project.slug}`}
                        className="py-2.5 border border-gray-200 hover:border-primary hover:text-primary text-neutral-dark text-xs font-bold rounded-lg text-center transition-all cursor-pointer flex items-center justify-center"
                      >
                        Read More
                      </Link>
                    ) : (
                      <Link
                        href="/#about"
                        className="py-2.5 border border-gray-200 hover:border-primary hover:text-primary text-neutral-dark text-xs font-bold rounded-lg text-center transition-all cursor-pointer flex items-center justify-center"
                      >
                        Read More
                      </Link>
                    )}
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
