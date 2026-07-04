"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Phone, Mail, Clock, ShieldCheck, CheckCircle2, Send } from "lucide-react";

export default function ContactPreview() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [isSent, setIsSent] = useState(false);
  const [isSending, setIsSending] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name && formData.email && formData.message) {
      setIsSending(true);
      setTimeout(() => {
        setIsSending(false);
        setIsSent(true);
        setFormData({ name: "", email: "", message: "" });
      }, 1500);
    }
  };

  const contactDetails = [
    {
      icon: MapPin,
      title: "Alliance Headquarters",
      detail: "House 24, Block C, Al-Khidmat Avenue, Chiniot, Punjab, Pakistan",
    },
    {
      icon: Phone,
      title: "Hotline Support",
      detail: "+92 (47) 111-25-25-25 / +92 (300) 849-2048",
    },
    {
      icon: Mail,
      title: "Email Correspondence",
      detail: "info@alkhidmatcitizens.org / join@alkhidmatcitizens.org",
    },
    {
      icon: Clock,
      title: "Office Hours",
      detail: "Monday - Saturday: 08:00 AM - 06:00 PM (PKT)",
    }
  ];

  return (
    <section id="contact" className="py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold text-primary uppercase tracking-widest px-3 py-1 bg-primary/10 rounded-full">
            Contact Information
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-neutral-dark mt-4">
            Visit Our Headquarters or Write Us
          </h2>
          <p className="text-neutral-light mt-4 text-base">
            Have questions about volunteer recruitment, donation audits, or election tickets? Drop by our regional secretariat.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
          
          {/* Contact Details Grid */}
          <div className="lg:col-span-5 space-y-6 flex flex-col justify-between">
            <div className="space-y-6">
              {contactDetails.map((item, idx) => {
                const Icon = item.icon;
                return (
                  <div key={idx} className="flex gap-4 p-5 bg-gray-50 border border-gray-100 rounded-2xl hover:border-primary/20 transition-all duration-200">
                    <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center text-primary shrink-0">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-extrabold text-neutral-dark text-sm">
                        {item.title}
                      </h4>
                      <p className="text-xs text-neutral-light leading-relaxed font-semibold mt-1">
                        {item.detail}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Quick trust reassurance badge */}
            <div className="flex items-center gap-3 bg-primary/5 border border-primary/20 rounded-2xl p-5">
              <ShieldCheck className="w-8 h-8 text-primary shrink-0" />
              <div>
                <span className="text-xs font-extrabold text-neutral-dark block">Verified Location</span>
                <span className="text-[10px] text-neutral-light leading-none">Registered with the Election Commission & NGO regulator.</span>
              </div>
            </div>
          </div>

          {/* Contact/Write Us Form Column */}
          <div className="lg:col-span-7 bg-gray-50 border border-gray-150 rounded-3xl p-8 sm:p-10 flex flex-col justify-between shadow-sm">
            <AnimatePresence mode="wait">
              {!isSent ? (
                <motion.form
                  key="contact-form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleSubmit}
                  className="space-y-5 flex-grow flex flex-col justify-between"
                >
                  <h3 className="font-extrabold text-neutral-dark text-lg mb-2">
                    Send a Direct Message
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-neutral-dark mb-1">
                        Your Name
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. Abdullah"
                        className="w-full p-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary text-neutral-dark font-semibold"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-neutral-dark mb-1">
                        Email Address
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="name@domain.com"
                        className="w-full p-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary text-neutral-dark font-semibold"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-neutral-dark mb-1">
                      Message
                    </label>
                    <textarea
                      required
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Write your suggestions, queries or volunteer application details..."
                      className="w-full p-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary text-neutral-dark font-semibold resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSending}
                    className="w-full py-3.5 bg-primary hover:bg-primary-hover text-white text-xs font-bold rounded-xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer mt-2"
                  >
                    {isSending ? (
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Send Message</span>
                      </>
                    )}
                  </button>
                </motion.form>
              ) : (
                <motion.div
                  key="contact-success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-12 space-y-4 flex flex-col items-center justify-center h-full"
                >
                  <div className="p-4 bg-primary/10 text-primary rounded-full">
                    <CheckCircle2 className="w-12 h-12" />
                  </div>
                  <h4 className="font-extrabold text-neutral-dark text-lg">
                    Message Sent Successfully!
                  </h4>
                  <p className="text-xs text-neutral-light leading-relaxed max-w-sm font-semibold">
                    Thank you for writing. Our Secretariat office team will review your ticket and correspond back within 24 working hours.
                  </p>
                  <button
                    onClick={() => setIsSent(false)}
                    className="text-xs font-bold text-primary hover:underline cursor-pointer"
                  >
                    Send another query
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </div>

        {/* Styled Vector Google Map Placeholder Box */}
        <div className="mt-12 rounded-3xl overflow-hidden border border-gray-150 shadow-md relative h-96 w-full group">
          <div 
            className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
            style={{
              backgroundImage: `url('https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&q=80&w=1200')`,
            }}
          />
          <div className="absolute inset-0 bg-neutral-dark/45 group-hover:bg-neutral-dark/40 transition-colors duration-300" />
          
          <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center text-white z-10 space-y-4">
            <div className="p-4 bg-primary/90 text-white rounded-2xl shadow-xl flex items-center justify-center animate-bounce">
              <MapPin className="w-8 h-8 text-accent" />
            </div>
            
            <div className="space-y-1">
              <h4 className="font-black text-xl tracking-tight text-white drop-shadow-md">
                Interactive Secretariat Map
              </h4>
              <p className="text-xs text-gray-200 max-w-md mx-auto drop-shadow-sm font-medium">
                Al-Khidmat Citizens Secretariat is located on Al-Khidmat Avenue, near the Chenab River bridge. Click below to redirect to mapping systems.
              </p>
            </div>

            <a
              href="https://maps.google.com"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-2.5 bg-accent hover:bg-accent-hover text-neutral-dark font-black text-xs uppercase tracking-wider rounded-xl transition-all shadow-lg hover:shadow-xl"
            >
              Get Live Directions on Google Maps
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}
