import React from "react";
import Link from "next/link";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { cleanWaterProjects as defaultProjects, CleanWaterProject } from "@/data/cleanWaterData";
import { dbConnect } from "@/lib/db";
import { Project } from "@/models/Service";
import { 
  Droplet, 
  MapPin, 
  Calendar, 
  Users, 
  ArrowRight, 
  Sparkles, 
  CheckCircle,
  HelpCircle,
  Clock,
  Heart
} from "lucide-react";

export const metadata = {
  title: "Clean Water Initiative - Al-Khidmat Citizens Alliance",
  description: "Explore our clean water projects, including hand pump installations, deep water wells, and filtration plants providing safe drinking water.",
};

export const dynamic = "force-dynamic";

export default async function CleanWaterInitiativePage() {
  let dbProjects = [];
  try {
    await dbConnect();
    dbProjects = await Project.find({ serviceSlug: "clean-water-initiative" }).lean();

    if (dbProjects.length === 0) {
      // Seed default projects
      await Project.insertMany(defaultProjects);
      dbProjects = await Project.find({ serviceSlug: "clean-water-initiative" }).lean();
    }
  } catch (error) {
    console.error("Database connection failed in CleanWaterInitiativePage, falling back to mock defaultProjects:", error);
    dbProjects = defaultProjects as any[];
  }

  const projects = JSON.parse(JSON.stringify(dbProjects)) as CleanWaterProject[];
  return (
    <div className="relative min-h-screen bg-slate-50/50">
      {/* Navigation */}
      <Navbar />

      {/* Hero Section */}
      <section className="relative min-h-[50vh] flex items-center justify-center overflow-hidden bg-neutral-dark pt-28 pb-16">
        {/* Background Image with Parallax-like scale and overlay */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-105 opacity-40 transition-transform duration-10000"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1617155093730-a8bf47be792d?auto=format&fit=crop&q=80&w=1200')`,
          }}
        />
        
        {/* Deep Green & Dark Blue Elegant Gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-neutral-dark/95 via-neutral-dark/90 to-slate-900/40" />
        
        {/* Dynamic Water Wave Pattern SVG overlay */}
        <div className="absolute bottom-0 left-0 right-0 w-full overflow-hidden leading-none z-10 opacity-10">
          <svg className="relative block w-full h-[60px]" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V30.25C1123.7,11.81,1055.75,111.45,985.66,92.83Z" fill="#0F7B3F"></path>
          </svg>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-20 w-full mt-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/20 border border-primary/30 text-accent font-semibold text-xs uppercase tracking-wider backdrop-blur-md mb-6 animate-pulse">
            <Droplet className="w-3.5 h-3.5 text-accent animate-bounce" />
            <span>Water is Life</span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white tracking-tight leading-tight">
            Clean Water <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-amber-300">Initiative</span>
          </h1>
          <p className="text-base sm:text-lg text-slate-300 max-w-3xl mx-auto mt-6 font-medium leading-relaxed">
            Combating water scarcity across Pakistan. From hand pump installations in remote villages to high-capacity solar wells and Reverse Osmosis plants.
          </p>

          {/* Impact Stats Banner */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto mt-12 p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md">
            <div className="text-center p-2">
              <div className="text-2xl sm:text-3xl font-bold text-emerald-400">350+</div>
              <div className="text-xs sm:text-sm text-slate-400 font-medium mt-1">Water Projects</div>
            </div>
            <div className="text-center p-2 border-l border-white/10">
              <div className="text-2xl sm:text-3xl font-bold text-amber-400">120+</div>
              <div className="text-xs sm:text-sm text-slate-400 font-medium mt-1">Villages Transformed</div>
            </div>
            <div className="text-center p-2 border-l border-white/10">
              <div className="text-2xl sm:text-3xl font-bold text-emerald-400">10K+</div>
              <div className="text-xs sm:text-sm text-slate-400 font-medium mt-1">Families Served</div>
            </div>
            <div className="text-center p-2 border-l border-white/10">
              <div className="text-2xl sm:text-3xl font-bold text-amber-400">PKR 150K</div>
              <div className="text-xs sm:text-sm text-slate-400 font-medium mt-1">Pump Cost Starts</div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Section */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        
        {/* Intro section */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl font-bold text-slate-800 tracking-tight">
            Our Active & Completed Water Projects
          </h2>
          <p className="text-slate-600 mt-4 text-base leading-relaxed">
            Browse through our active installations. Each card represents a community that gained clean, safe drinking water. Click on any project card to view technical logs, itemized budgets, donors, and field leads.
          </p>
        </div>

        {/* Project Listing Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10 mb-20">
          {projects.map((project) => (
            <Link 
              key={project.id} 
              href={`/services/clean-water-initiative/${project.slug}`}
              className="group block relative bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 border border-slate-100"
            >
              {/* Image Container with Hover Scale */}
              <div className="relative h-64 sm:h-72 w-full overflow-hidden bg-slate-100">
                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent z-10 opacity-70 group-hover:opacity-85 transition-opacity" />
                
                {/* Fallback & Custom image rendering */}
                <img 
                  src={project.featuredImage} 
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />

                {/* Location Badges on Image */}
                <div className="absolute top-4 left-4 z-20 flex flex-wrap gap-2">
                  <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-slate-900/75 text-white text-xs font-semibold backdrop-blur-sm">
                    <MapPin className="w-3.5 h-3.5 text-amber-400" />
                    <span>{project.location}</span>
                  </span>
                  <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold backdrop-blur-sm ${
                    project.status === "Completed" 
                      ? "bg-emerald-500/80 text-white" 
                      : project.status === "In Progress"
                      ? "bg-amber-500/80 text-white"
                      : "bg-blue-500/80 text-white"
                  }`}>
                    {project.status === "Completed" ? (
                      <CheckCircle className="w-3.5 h-3.5" />
                    ) : project.status === "In Progress" ? (
                      <Clock className="w-3.5 h-3.5" />
                    ) : (
                      <HelpCircle className="w-3.5 h-3.5" />
                    )}
                    <span>{project.status}</span>
                  </span>
                </div>

                {/* Beneficiary Badge */}
                <div className="absolute bottom-4 left-4 z-20 flex items-center gap-1 text-white text-xs sm:text-sm font-semibold">
                  <Users className="w-4 h-4 text-emerald-400" />
                  <span>{project.beneficiaries}</span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 sm:p-8">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-md">
                    {project.province}
                  </span>
                  <span className="text-xs font-medium text-slate-400 flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" />
                    {project.date}
                  </span>
                </div>

                <h3 className="text-xl sm:text-2xl font-bold text-slate-800 group-hover:text-emerald-700 transition-colors line-clamp-1">
                  {project.title}
                </h3>
                <p className="text-slate-500 text-sm sm:text-base mt-3 leading-relaxed line-clamp-2">
                  {project.shortDescription}
                </p>

                {/* Card Footer Button */}
                <div className="mt-6 pt-5 border-t border-slate-100 flex items-center justify-between">
                  <div className="text-left">
                    <span className="block text-xs font-medium text-slate-400">Total Project Cost</span>
                    <span className="text-lg font-bold text-slate-800">{project.totalCost}</span>
                  </div>
                  <span className="inline-flex items-center gap-1.5 font-bold text-sm text-emerald-600 group-hover:text-emerald-800 transition-colors">
                    <span>View Project Details</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Pricing & Sponsorship Guide */}
        <section className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-slate-900 to-emerald-950 text-white p-8 sm:p-12 lg:p-16 shadow-xl border border-white/5">
          <div className="absolute top-0 right-0 -mt-10 -mr-10 w-48 h-48 bg-emerald-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 -mb-10 -ml-10 w-48 h-48 bg-amber-500/10 rounded-full blur-3xl" />

          <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Texts */}
            <div className="lg:col-span-7">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-amber-400 text-xs font-bold uppercase tracking-wider mb-6">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Water Sponsorship Programs</span>
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
                Sponsor a Water Project & Gain Sadaqah Jariyah
              </h2>
              <p className="text-slate-300 mt-4 leading-relaxed">
                Provide drinking water in the name of your parents or loved ones. Al-Khidmat Citizens Alliance handles drilling, installation, testing, and places a dedicated plaque at the site. We send you complete operational logs and coordinates once the build is finished.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-8">
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center border border-emerald-500/30">
                    <CheckCircle className="w-4 h-4 text-emerald-400" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-white">Full Cost Transparency</h4>
                    <p className="text-xs text-slate-400 mt-1">Every rupee accounted for with invoices and reports.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center border border-emerald-500/30">
                    <CheckCircle className="w-4 h-4 text-emerald-400" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-white">Dedicated Plaques</h4>
                    <p className="text-xs text-slate-400 mt-1">Dedicate the hand pump or well to your family members.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Cost Cards */}
            <div className="lg:col-span-5 space-y-4">
              <div className="p-5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md flex items-center justify-between hover:border-emerald-500/50 transition-colors">
                <div>
                  <h4 className="font-bold text-white">Standard Hand Pump</h4>
                  <p className="text-xs text-slate-400 mt-1">Ideal for shallow groundwater villages.</p>
                </div>
                <div className="text-right">
                  <div className="text-xl font-extrabold text-amber-300">PKR 150,000</div>
                  <span className="text-[10px] text-slate-400">Approx. $550 USD</span>
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md flex items-center justify-between hover:border-emerald-500/50 transition-colors">
                <div>
                  <h4 className="font-bold text-white">Solar Submersible Well</h4>
                  <p className="text-xs text-slate-400 mt-1">Includes tank, taps & panels.</p>
                </div>
                <div className="text-right">
                  <div className="text-xl font-extrabold text-emerald-300">PKR 850,000</div>
                  <span className="text-[10px] text-slate-400">Approx. $3,050 USD</span>
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md flex items-center justify-between hover:border-emerald-500/50 transition-colors">
                <div>
                  <h4 className="font-bold text-white">Reverse Osmosis Plant</h4>
                  <p className="text-xs text-slate-400 mt-1">Eliminates heavy arsenic/chemicals.</p>
                </div>
                <div className="text-right">
                  <div className="text-xl font-extrabold text-amber-300">PKR 1,100,000</div>
                  <span className="text-[10px] text-slate-400">Approx. $3,950 USD</span>
                </div>
              </div>

              <div className="pt-4 flex flex-col sm:flex-row gap-3">
                <Link 
                  href="/contact" 
                  className="flex-1 text-center py-3.5 px-6 rounded-xl bg-primary text-white font-bold hover:bg-primary-hover transition-colors shadow-lg shadow-emerald-950/50 text-sm"
                >
                  Coordinate Donation
                </Link>
                <Link 
                  href="/volunteer" 
                  className="flex-1 text-center py-3.5 px-6 rounded-xl bg-white/10 text-white font-bold hover:bg-white/20 transition-colors border border-white/20 text-sm"
                >
                  Join Field Volunteer
                </Link>
              </div>
            </div>
          </div>
        </section>

      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
