"use client";

import React from "react";
import { motion } from "framer-motion";
import { Calendar, ArrowRight } from "lucide-react";
import { latestNewsData, NewsItem } from "@/data/mockData";

export default function News() {
  return (
    <section className="py-24 bg-gray-50 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold text-primary uppercase tracking-widest px-3 py-1 bg-primary/10 rounded-full">
            Press & Media
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-neutral-dark mt-4">
            Latest News & Announcements
          </h2>
          <p className="text-neutral-light mt-4 text-base">
            Stay updated with our recent campaigns, project launches, administrative statements, and stories from the field.
          </p>
        </div>

        {/* Blog Deck Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {latestNewsData.map((news: NewsItem) => {
            return (
              <motion.article
                key={news.id}
                whileHover={{ y: -6 }}
                className="bg-white rounded-2xl border border-gray-150 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
              >
                {/* Image & tag */}
                <div className="relative h-52 w-full overflow-hidden bg-gray-100">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={news.imageUrl}
                    alt={news.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-neutral-dark/35 to-transparent" />
                  
                  {/* Category tag */}
                  <span className="absolute top-4 left-4 bg-primary text-white text-[9px] font-extrabold uppercase tracking-widest px-2.5 py-1.5 rounded-lg shadow-md">
                    {news.category}
                  </span>
                </div>

                {/* Details */}
                <div className="p-6 space-y-4 flex-grow flex flex-col justify-between">
                  <div className="space-y-3">
                    <div className="flex items-center gap-1 text-[10px] text-neutral-light font-bold">
                      <Calendar className="w-3.5 h-3.5 text-primary" />
                      <span>{news.date}</span>
                    </div>

                    <h3 className="text-base font-extrabold text-neutral-dark group-hover:text-primary transition-colors leading-snug line-clamp-2">
                      {news.title}
                    </h3>

                    <p className="text-xs text-neutral-light leading-relaxed font-semibold line-clamp-3">
                      {news.excerpt}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-gray-100">
                    <button className="flex items-center gap-1.5 text-xs font-bold text-primary hover:text-primary-hover group/btn transition-colors cursor-pointer">
                      <span>Read Full Article</span>
                      <ArrowRight className="w-3.5 h-3.5 transform group-hover/btn:translate-x-0.5 transition-transform" />
                    </button>
                  </div>
                </div>

              </motion.article>
            );
          })}
        </div>

      </div>
    </section>
  );
}
