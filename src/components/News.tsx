"use client";

import React, { useRef, useState } from "react";
import { Calendar, ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { latestNewsData, NewsItem } from "@/data/mockData";

export default function News() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollIndex, setScrollIndex] = useState(0);

  const handleScroll = () => {
    if (containerRef.current) {
      const container = containerRef.current;
      const cardWidth = container.querySelector(".news-card")?.clientWidth || (container.clientWidth * 0.85);
      const gap = 24; // gap-6 is 24px
      const index = Math.round(container.scrollLeft / (cardWidth + gap));
      setScrollIndex(index);
    }
  };

  const scrollToCard = (index: number) => {
    if (containerRef.current) {
      const container = containerRef.current;
      const cardWidth = container.querySelector(".news-card")?.clientWidth || (container.clientWidth * 0.85);
      const gap = 24;
      container.scrollTo({
        left: index * (cardWidth + gap),
        behavior: "smooth"
      });
      setScrollIndex(index);
    }
  };

  const scrollNext = () => {
    const nextIndex = Math.min(scrollIndex + 1, latestNewsData.length - 1);
    scrollToCard(nextIndex);
  };

  const scrollPrev = () => {
    const prevIndex = Math.max(scrollIndex - 1, 0);
    scrollToCard(prevIndex);
  };

  return (
    <section className="py-10 sm:py-12 md:py-16 bg-gray-50 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Heading */}
        <div className="text-center max-w-3xl mx-auto mb-10 md:mb-12">
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

        {/* Carousel / Blog Deck Grid Container */}
        <div className="relative">
          {/* Scroll container */}
          <div
            ref={containerRef}
            onScroll={handleScroll}
            className="flex overflow-x-auto snap-x snap-mandatory gap-6 pb-8 md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-8 no-scrollbar scroll-smooth w-full"
          >
            {latestNewsData.map((news: NewsItem) => {
              return (
                <div
                  key={news.id}
                  className="news-card snap-start shrink-0 w-[86%] sm:w-[65%] md:w-auto bg-white rounded-2xl border border-gray-150 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
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

                    <div className="pt-4 border-t border-gray-100">
                      <button className="flex items-center gap-1.5 text-xs font-bold text-primary hover:text-primary-hover group/btn transition-colors cursor-pointer">
                        <span>Read Full Article</span>
                        <ArrowRight className="w-3.5 h-3.5 transform group-hover/btn:translate-x-0.5 transition-transform" />
                      </button>
                    </div>
                  </div>

                </div>
              );
            })}
          </div>

          {/* Swipe indicator dots and arrow buttons for mobile scroll control */}
          <div className="flex items-center justify-between mt-4 md:hidden">
            <div className="flex gap-2">
              {latestNewsData.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => scrollToCard(idx)}
                  className={`w-2 h-2 rounded-full transition-all duration-200 ${
                    scrollIndex === idx ? "bg-primary w-5" : "bg-gray-300"
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>
            
            <div className="flex items-center gap-2">
              <button
                onClick={scrollPrev}
                disabled={scrollIndex === 0}
                className="p-2 bg-white border border-gray-200 text-neutral-dark rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed hover:bg-primary hover:text-white flex items-center justify-center cursor-pointer"
                aria-label="Previous Article"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={scrollNext}
                disabled={scrollIndex >= latestNewsData.length - 1}
                className="p-2 bg-white border border-gray-200 text-neutral-dark rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed hover:bg-primary hover:text-white flex items-center justify-center cursor-pointer"
                aria-label="Next Article"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
