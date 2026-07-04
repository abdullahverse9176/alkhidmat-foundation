"use client";

import React from "react";
import { motion } from "framer-motion";
import { Heart, Users, MessageSquare, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function CTA() {
  const cards = [
    {
      title: "Join as a Volunteer",
      description: "Sign up today to join our local regional cells, distribute food rations, or support medical logistics directly on the ground.",
      buttonText: "Register as Volunteer",
      icon: Users,
      actionUrl: "/volunteer",
      bgColor: "bg-primary/5 border-primary/20",
      iconColor: "text-primary bg-primary/10",
      btnClass: "bg-primary hover:bg-primary-hover text-white"
    },
    {
      title: "Donate to Campaigns",
      description: "Support our ongoing relief projects, clean water wells, and child welfare clinics. Your support is fully tax-exempt.",
      buttonText: "Donate Online Now",
      icon: Heart,
      actionUrl: "/#donation",
      bgColor: "bg-accent/5 border-accent/20",
      iconColor: "text-accent bg-accent/10",
      btnClass: "bg-accent hover:bg-accent-hover text-white"
    },
    {
      title: "Inquire & Partner",
      description: "Are you an NGO representative, local leader, or corporate partner? Reach out to collaborate on major regional operations.",
      buttonText: "Get in Touch",
      icon: MessageSquare,
      actionUrl: "/contact",
      bgColor: "bg-neutral-dark/5 border-neutral-dark/10",
      iconColor: "text-neutral-dark bg-neutral-dark/10",
      btnClass: "bg-neutral-dark hover:bg-neutral-dark/90 text-white"
    }
  ];

  return (
    <section className="py-24 bg-white relative overflow-hidden">
      
      {/* Dynamic abstract grid overlay */}
      <div className="absolute inset-0 opacity-5 bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:30px_30px]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {cards.map((card, idx) => {
            const Icon = card.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className={`rounded-3xl border p-6 flex flex-col justify-between h-[360px] group transition-all duration-300 hover:shadow-lg ${card.bgColor}`}
              >
                <div className="space-y-4">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-105 ${card.iconColor}`}>
                    <Icon className="w-6 h-6" />
                  </div>

                  <h3 className="text-xl font-bold text-neutral-dark">
                    {card.title}
                  </h3>

                  <p className="text-xs text-neutral-light leading-relaxed font-semibold">
                    {card.description}
                  </p>
                </div>

                <Link
                  href={card.actionUrl}
                  className={`w-full py-3.5 rounded-xl font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 transition-colors cursor-pointer text-center ${card.btnClass}`}
                >
                  <span>{card.buttonText}</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
