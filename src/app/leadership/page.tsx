"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { 
  Award, Sparkles, ArrowLeft, Loader2, AlertCircle, ShieldCheck, Quote
} from "lucide-react";
import { getLeadersAction } from "@/app/actions/leader-actions";

const LinkedinIcon = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.25V10.9H6.46M7.86 6.74a1.65 1.65 0 1 0 0 3.3 1.65 1.65 0 0 0 0-3.3z"/>
  </svg>
);

const FacebookIcon = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.99 3.66 9.12 8.44 9.88v-6.99H7.9v-2.89h2.54V9.79c0-2.51 1.49-3.89 3.78-3.89 1.09 0 2.23.19 2.23.19v2.47h-1.26c-1.24 0-1.63.77-1.63 1.56v1.88h2.78l-.45 2.89h-2.33v6.99C18.34 21.12 22 16.99 22 12z"/>
  </svg>
);

const TwitterIcon = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
  </svg>
);

interface LeaderItem {
  _id: string;
  name: string;
  designation: string;
  bio: string;
  image?: string;
  order: number;
  facebook?: string;
  twitter?: string;
  linkedin?: string;
}

export default function PublicLeadershipPage() {
  const [leaders, setLeaders] = useState<LeaderItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadLeaders() {
      setLoading(true);
      setError(null);
      try {
        const data = await getLeadersAction();
        setLeaders(data);
      } catch (err: any) {
        console.error(err);
        setError(err.message || "Failed to load leadership team.");
      } finally {
        setLoading(false);
      }
    }
    loadLeaders();
  }, []);

  return (
    <div className="relative min-h-screen bg-white">
      {/* Navbar */}
      <Navbar />

      {/* Hero Header Section */}
      <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden bg-neutral-dark pt-36 pb-24">
        {/* Background Image Overlay */}
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-25 scale-105"
          style={{ backgroundImage: `url('https://images.unsplash.com/photo-1541872703-74c5e44368f9?auto=format&fit=crop&q=80&w=1600')` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-dark via-neutral-dark/80 to-transparent" />

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-sky-300 text-xs font-bold uppercase tracking-wider">
            <Award className="w-4 h-4 text-sky-400" />
            <span>Executive Board & Governance</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
            Our Visionary Leadership
          </h1>

          <p className="text-sm sm:text-base text-gray-300 max-w-2xl mx-auto font-medium leading-relaxed">
            Guiding Al-Khidmat Foundation with integrity, passion, and dedicated humanitarian service across Pakistan and beyond.
          </p>

          <div className="pt-2">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-xs font-bold text-gray-300 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Home</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Main Content: Leadership Grid */}
      <main className="py-16 sm:py-24 bg-gray-50/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="text-center space-y-3 max-w-xl mx-auto">
            <span className="text-xs font-extrabold text-primary uppercase tracking-widest bg-primary/10 px-3 py-1 rounded-full">
              Leadership Board
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
              Meet Our Board Members
            </h2>
            <p className="text-xs sm:text-sm text-gray-500 font-semibold">
              Selfless leaders committed to organizing welfare projects and empowering vulnerable communities.
            </p>
          </div>

          {error && (
            <div className="max-w-md mx-auto p-4 bg-red-50 text-red-800 rounded-2xl border border-red-100 flex items-center gap-3">
              <AlertCircle className="w-5 h-5 text-red-600 shrink-0" />
              <span className="text-xs font-semibold">{error}</span>
            </div>
          )}

          {loading ? (
            <div className="flex flex-col items-center justify-center py-20 gap-3">
              <Loader2 className="w-10 h-10 text-primary animate-spin" />
              <span className="text-sm font-bold text-gray-400">Loading leadership profiles...</span>
            </div>
          ) : leaders.length === 0 ? (
            <div className="text-center py-16 bg-white border border-gray-150 rounded-3xl p-8 max-w-lg mx-auto shadow-xs">
              <Award className="w-12 h-12 text-gray-300 mx-auto mb-3" />
              <h3 className="text-base font-bold text-gray-700">No Leadership Members Listed</h3>
              <p className="text-xs text-gray-400 font-medium mt-1">
                Leadership profiles will be updated shortly by the administration team.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {leaders.map((leader) => (
                <div 
                  key={leader._id}
                  className="bg-white rounded-3xl border border-gray-150 p-6 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
                >
                  <div className="space-y-4">
                    {/* Portrait Avatar */}
                    <div className="relative w-full h-64 rounded-2xl overflow-hidden bg-gray-100 border border-gray-100">
                      {leader.image ? (
                        <img 
                          src={leader.image} 
                          alt={leader.name} 
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gray-100 text-gray-400 font-extrabold text-4xl">
                          {leader.name.charAt(0)}
                        </div>
                      )}
                      
                      <div className="absolute bottom-3 left-3 right-3 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/50 text-center shadow-xs">
                        <span className="text-xs font-extrabold text-primary tracking-wide">
                          {leader.designation}
                        </span>
                      </div>
                    </div>

                    {/* Info Header */}
                    <div className="text-center space-y-1">
                      <h3 className="text-xl font-bold text-gray-900 group-hover:text-primary transition-colors">
                        {leader.name}
                      </h3>
                    </div>

                    {/* Quote / Bio */}
                    <div className="relative bg-gray-50/80 rounded-2xl p-4 border border-gray-100">
                      <Quote className="w-5 h-5 text-primary/20 absolute top-3 left-3 -scale-x-100" />
                      <p className="text-xs text-gray-600 font-medium leading-relaxed relative z-10 pl-2">
                        {leader.bio}
                      </p>
                    </div>
                  </div>

                  {/* Social Links Footer */}
                  <div className="pt-4 mt-6 border-t border-gray-100 flex items-center justify-between">
                    <div className="flex items-center gap-1.5 text-xs text-gray-400 font-bold">
                      <ShieldCheck className="w-4 h-4 text-primary" />
                      <span>Verified Official</span>
                    </div>

                    <div className="flex items-center gap-2">
                      {leader.linkedin && (
                        <a 
                          href={leader.linkedin} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="p-2 text-gray-400 hover:text-sky-600 hover:bg-sky-50 rounded-xl transition-all"
                        >
                          <LinkedinIcon className="w-4 h-4" />
                        </a>
                      )}
                      {leader.facebook && (
                        <a 
                          href={leader.facebook} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all"
                        >
                          <FacebookIcon className="w-4 h-4" />
                        </a>
                      )}
                      {leader.twitter && (
                        <a 
                          href={leader.twitter} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="p-2 text-gray-400 hover:text-sky-400 hover:bg-sky-50 rounded-xl transition-all"
                        >
                          <TwitterIcon className="w-4 h-4" />
                        </a>
                      )}
                    </div>
                  </div>

                </div>
              ))}
            </div>
          )}

        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
