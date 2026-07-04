"use client";

import React, { useState, useEffect } from "react";
import { 
  ArrowUp, 
  Sparkles, 
  MapPin, 
  Phone, 
  Mail 
} from "lucide-react";

// Inline brand SVGs to bypass lucide-react build discrepancies
const FacebookIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
  </svg>
);

const TwitterIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/>
  </svg>
);

const InstagramIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
  </svg>
);

const YoutubeIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"/>
    <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"/>
  </svg>
);

interface FooterProps {
  onNavigate: (sectionId: string) => void;
}

export default function Footer({ onNavigate }: FooterProps) {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const handleScrollTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-neutral-dark text-white pt-20 pb-8 border-t border-white/5 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 border-b border-white/10 pb-16 mb-12">
          
          {/* Col 1: Brand details */}
          <div className="lg:col-span-4 space-y-6">
            <div 
              className="flex items-center gap-2 cursor-pointer group"
              onClick={() => onNavigate("home")}
            >
              <div className="bg-primary p-2 rounded-lg text-white group-hover:scale-105 transition-transform shadow-md">
                <Sparkles className="w-5 h-5 text-accent" />
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-lg leading-tight tracking-tight text-white">
                  AL-KHIDMAT
                </span>
                <span className="text-[10px] tracking-widest font-semibold uppercase text-accent">
                  Citizens Alliance
                </span>
              </div>
            </div>

            <p className="text-xs text-gray-400 leading-relaxed font-semibold">
              Combining progressive governance representation with a robust grassroots welfare network. We work 24/7 to solve challenges, support citizens, and govern transparently.
            </p>

            {/* Social icons */}
            <div className="flex items-center gap-3">
              {[
                { icon: FacebookIcon, href: "https://facebook.com", label: "Facebook" },
                { icon: TwitterIcon, href: "https://twitter.com", label: "Twitter" },
                { icon: InstagramIcon, href: "https://instagram.com", label: "Instagram" },
                { icon: YoutubeIcon, href: "https://youtube.com", label: "YouTube" }
              ].map((social, idx) => {
                const Icon = social.icon;
                return (
                  <a
                    key={idx}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 bg-white/5 hover:bg-primary text-white hover:text-white rounded-xl transition-all shadow-md hover:-translate-y-0.5"
                    aria-label={social.label}
                  >
                    <Icon className="w-4 h-4" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div className="lg:col-span-2.5 space-y-4">
            <h4 className="font-black text-sm uppercase text-white tracking-wider border-l-3 border-primary pl-2.5">
              Quick Links
            </h4>
            <ul className="space-y-2 text-xs text-gray-400 font-semibold">
              {[
                { name: "Home Base", id: "home" },
                { name: "About Alliance", id: "about" },
                { name: "Leadership Message", id: "leadership" },
                { name: "Active Projects", id: "projects" },
                { name: "Campaign News", id: "events" },
                { name: "Audited Donations", id: "donation" }
              ].map((link, idx) => (
                <li key={idx}>
                  <button
                    onClick={() => onNavigate(link.id)}
                    className="hover:text-primary transition-colors cursor-pointer text-left"
                  >
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Services */}
          <div className="lg:col-span-2.5 space-y-4">
            <h4 className="font-black text-sm uppercase text-white tracking-wider border-l-3 border-accent pl-2.5">
              Services
            </h4>
            <ul className="space-y-2 text-xs text-gray-400 font-semibold">
              {[
                { name: "Disaster Relief Operations", id: "services" },
                { name: "Food Ration Distributions", id: "services" },
                { name: "Free Medical Outposts", id: "services" },
                { name: "Scholarships & IT Labs", id: "services" },
                { name: "Nationwide Blood Net", id: "services" },
                { name: "Tree Plantation Initiative", id: "services" }
              ].map((item, idx) => (
                <li key={idx}>
                  <button
                    onClick={() => onNavigate(item.id)}
                    className="hover:text-accent transition-colors cursor-pointer text-left"
                  >
                    {item.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Contact Info */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="font-black text-sm uppercase text-white tracking-wider border-l-3 border-primary pl-2.5">
              Direct Contact
            </h4>
            <ul className="space-y-3.5 text-xs text-gray-400 font-semibold">
              <li className="flex gap-2">
                <MapPin className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                <span>House 24, Block C, Al-Khidmat Avenue, Chiniot, Pakistan</span>
              </li>
              <li className="flex gap-2">
                <Phone className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                <span>+92 (47) 111-25-25-25</span>
              </li>
              <li className="flex gap-2">
                <Mail className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                <span>info@alkhidmatcitizens.org</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Footer Bottom copyright and scroll top */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500 font-bold uppercase tracking-wider">
          <p>© {new Date().getFullYear()} Al-Khidmat Citizens Alliance. All Rights Reserved.</p>
          <p>Audited by NGO transparency index.</p>
        </div>

      </div>

      {/* Floating Back to Top Button */}
      {showScrollTop && (
        <button
          onClick={handleScrollTop}
          className="fixed bottom-6 right-6 z-40 bg-primary hover:bg-primary-hover text-white p-3.5 rounded-2xl shadow-xl transition-all duration-300 hover:-translate-y-1.5 cursor-pointer border border-primary-hover animate-bounce"
          aria-label="Back to Top"
        >
          <ArrowUp className="w-5 h-5" />
        </button>
      )}
    </footer>
  );
}
