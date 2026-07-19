import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProjectGallery from "@/components/ProjectGallery";
import { cleanWaterProjects as defaultProjects } from "@/data/cleanWaterData";
import { servicesData } from "@/data/mockData";
import { dbConnect } from "@/lib/db";
import { Project, Service } from "@/models/Service";
import { 
  ChevronLeft, 
  MapPin, 
  Calendar, 
  Users, 
  CheckCircle, 
  HelpCircle, 
  Clock, 
  Heart, 
  UserCheck, 
  Receipt, 
  Cpu, 
  Info 
} from "lucide-react";

interface PageProps {
  params: Promise<{
    slug: string;
    projectSlug: string;
  }>;
}

export async function generateMetadata({ params }: PageProps) {
  const { slug, projectSlug } = await params;
  let project = null;
  try {
    await dbConnect();
    project = await Project.findOne({ slug: projectSlug }).lean();
  } catch (error) {
    console.error("Database connection failed in generateMetadata, falling back to mock defaultProjects:", error);
  }
  
  if (!project && slug === "clean-water-initiative") {
    project = defaultProjects.find((p) => p.slug === projectSlug) as any;
  }
  
  if (!project) return { title: "Project Not Found" };
  
  return {
    title: `${project.title} - ${slug.split("-").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ")}`,
    description: project.shortDescription,
  };
}

export default async function ProjectDetailsPage({ params }: PageProps) {
  const { slug, projectSlug } = await params;

  let dbProject = null;
  let service = null;
  try {
    await dbConnect();
    dbProject = await Project.findOne({ slug: projectSlug }).lean();
    service = await Service.findOne({ slug }).lean();
  } catch (error) {
    console.error("Database connection failed in ProjectDetailsPage, falling back to mock data:", error);
  }

  if (!dbProject) {
    if (slug === "clean-water-initiative") {
      const mockProject = defaultProjects.find((p) => p.slug === projectSlug);
      if (!mockProject) notFound();
      dbProject = JSON.parse(JSON.stringify(mockProject));
    } else {
      notFound();
    }
  }

  if (!service) {
    const mockService = servicesData.find((s) => s.slug === slug);
    if (mockService) {
      service = JSON.parse(JSON.stringify(mockService));
    }
  }

  const project = JSON.parse(JSON.stringify(dbProject));
  const serviceTitle = service?.title || "Welfare Service";

  return (
    <div className="relative min-h-screen bg-slate-50/50">
      {/* Navigation */}
      <Navbar />

      {/* Hero Section */}
      <section className="relative min-h-[40vh] flex items-end overflow-hidden bg-neutral-dark pt-28 pb-12">
        {/* Background Image with Dark Gradient Overlay */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-50 scale-102"
          style={{
            backgroundImage: `url('${project.featuredImage || "https://images.unsplash.com/photo-1469571486040-7530613856e1?auto=format&fit=crop&q=80&w=1200"}')`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-950/75 to-neutral-dark/45" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10 w-full">
          {/* Breadcrumbs */}
          <nav className="flex items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">
            <Link href="/" className="hover:text-emerald-400 transition-colors">Home</Link>
            <span>/</span>
            <Link href="/services" className="hover:text-emerald-400 transition-colors">Services</Link>
            <span>/</span>
            <Link href={`/services/${slug}`} className="hover:text-emerald-400 transition-colors">{serviceTitle}</Link>
            <span>/</span>
            <span className="text-emerald-400 truncate max-w-[200px] sm:max-w-none">{project.title}</span>
          </nav>

          {/* Project Header Info */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-2 mb-3">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-md border border-emerald-500/20">
                  {project.province} Province
                </span>
                <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-semibold border ${
                  project.status === "Completed" 
                    ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" 
                    : project.status === "In Progress"
                    ? "bg-amber-500/10 text-amber-400 border-amber-500/20"
                    : "bg-blue-500/10 text-blue-400 border-blue-500/20"
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

              <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight">
                {project.title}
              </h1>
            </div>

            {/* Quick Metrics */}
            <div className="flex flex-wrap items-center gap-4 bg-white/5 border border-white/10 p-4 rounded-2xl backdrop-blur-md">
              <div className="px-3 border-r border-white/10">
                <span className="block text-[10px] uppercase font-bold text-slate-400 tracking-wider">Location</span>
                <span className="text-sm font-semibold text-slate-200 flex items-center gap-1 mt-0.5">
                  <MapPin className="w-3.5 h-3.5 text-amber-400" />
                  {project.location}
                </span>
              </div>
              <div className="px-3 border-r border-white/10">
                <span className="block text-[10px] uppercase font-bold text-slate-400 tracking-wider">Beneficiaries</span>
                <span className="text-sm font-semibold text-emerald-400 flex items-center gap-1 mt-0.5">
                  <Users className="w-3.5 h-3.5 text-emerald-400" />
                  {project.beneficiaries}
                </span>
              </div>
              <div className="px-3">
                <span className="block text-[10px] uppercase font-bold text-slate-400 tracking-wider">Delivery Date</span>
                <span className="text-sm font-semibold text-slate-200 flex items-center gap-1 mt-0.5">
                  <Calendar className="w-3.5 h-3.5 text-amber-400" />
                  {project.date}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Detail Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Back Link */}
        <Link 
          href={`/services/${slug}`} 
          className="inline-flex items-center gap-1 text-sm font-bold text-emerald-600 hover:text-emerald-700 transition-colors mb-8 group cursor-pointer"
        >
          <ChevronLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
          <span>Back to All {serviceTitle} Projects</span>
        </Link>

        {/* 2-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          
          {/* Left Column: Details & Gallery (Col span 7) */}
          <div className="lg:col-span-7 space-y-10">
            {/* Story / Description */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-100 shadow-sm space-y-6">
              <h2 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
                <span className="w-1.5 h-6 bg-emerald-600 rounded-full"></span>
                <span>Crisis & Solution Story</span>
              </h2>
              <p className="text-slate-600 leading-relaxed text-base sm:text-[17px]">
                {project.longDescription}
              </p>

              {/* Technical Specifications list */}
              {project.techSpecs && project.techSpecs.length > 0 && (
                <div className="pt-6 border-t border-slate-100">
                  <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2 mb-4">
                    <Cpu className="w-5 h-5 text-emerald-600" />
                    <span>Technical & Operational Specifications</span>
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    {project.techSpecs.map((spec: any, i: number) => (
                      <div key={i} className="p-3 bg-slate-50 rounded-xl border border-slate-100 flex flex-col">
                        <span className="text-xs text-slate-400 font-medium">{spec.label}</span>
                        <span className="text-sm font-bold text-slate-700 mt-1">{spec.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Interactive Gallery */}
            {project.gallery && project.gallery.length > 0 && (
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-100 shadow-sm">
                <ProjectGallery images={project.gallery} title={project.title} />
              </div>
            )}
          </div>

          {/* Right Column: Cost, Leaders & Cooperators (Col span 5) */}
          <div className="lg:col-span-5 space-y-8">
            
            {/* 1. Itemized Cost Breakdown Card */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-100 shadow-sm relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/5 rounded-bl-full" />
              
              <div className="flex items-center gap-2 mb-6">
                <Receipt className="w-5 h-5 text-emerald-600" />
                <h3 className="text-lg font-bold text-slate-800">Itemized Cost Log</h3>
              </div>

              {project.costBreakdown && project.costBreakdown.length > 0 ? (
                <div className="space-y-3.5">
                  {project.costBreakdown.map((item: any, i: number) => (
                    <div key={i} className="flex justify-between items-center text-sm border-b border-slate-100 pb-3">
                      <span className="text-slate-500 font-medium">{item.label}</span>
                      <span className="font-semibold text-slate-700">{item.amount}</span>
                    </div>
                  ))}
                  
                  <div className="flex justify-between items-center pt-4 pb-2">
                    <span className="text-base font-bold text-slate-800">Total Project Cost</span>
                    <span className="px-4 py-1.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-lg font-extrabold text-amber-700">
                      {project.totalCost}
                    </span>
                  </div>
                </div>
              ) : (
                <div className="text-center py-4">
                  <span className="text-sm font-bold text-slate-700">Total Cost: </span>
                  <span className="px-4 py-1.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-lg font-extrabold text-amber-700">
                    {project.totalCost}
                  </span>
                </div>
              )}

              <div className="mt-6 p-4 bg-emerald-50 rounded-2xl border border-emerald-100/50 flex gap-3 text-xs text-emerald-800">
                <Info className="w-4.5 h-4.5 text-emerald-600 flex-shrink-0 mt-0.5" />
                <p className="leading-relaxed">
                  Budget log vetted by regional auditors. Placing a similar project provides long-term welfare relief. Coordinate below.
                </p>
              </div>
            </div>

            {/* 2. Project Head Profile */}
            {project.projectHead && (
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-100 shadow-sm">
                <div className="flex items-center gap-2 mb-6">
                  <UserCheck className="w-5 h-5 text-emerald-600" />
                  <h3 className="text-lg font-bold text-slate-800">Project Leader</h3>
                </div>

                <div className="flex items-start gap-4">
                  {project.projectHead.avatarUrl && (
                    <div className="relative w-16 h-16 rounded-2xl overflow-hidden bg-slate-100 flex-shrink-0 border border-slate-100">
                      <img 
                        src={project.projectHead.avatarUrl} 
                        alt={project.projectHead.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                  <div className="space-y-1">
                    <h4 className="font-bold text-slate-800 text-base">{project.projectHead.name}</h4>
                    <p className="text-xs font-semibold text-emerald-600 uppercase tracking-wider">
                      {project.projectHead.role}
                    </p>
                    <p className="text-xs text-slate-400 font-medium">Al-Khidmat Engineering Board</p>
                  </div>
                </div>

                {project.projectHead.message && (
                  <div className="mt-5 p-4 bg-slate-50 rounded-2xl border border-slate-100 italic text-slate-500 text-xs sm:text-sm leading-relaxed relative">
                    <span className="absolute top-1 left-2 text-2xl text-slate-200 leading-none">“</span>
                    <p className="pl-4 pr-2 font-medium">{project.projectHead.message}</p>
                  </div>
                )}
              </div>
            )}

            {/* 3. Cooperators / Donors Honor Board */}
            {project.cooperators && project.cooperators.length > 0 && (
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-100 shadow-sm relative overflow-hidden">
                <div className="absolute top-0 right-0 w-24 h-24 bg-amber-500/5 rounded-bl-full" />
                
                <div className="flex items-center gap-2 mb-6">
                  <Heart className="w-5 h-5 text-rose-500 fill-rose-500" />
                  <h3 className="text-lg font-bold text-slate-800">Honor Roll (Cooperators)</h3>
                </div>

                <p className="text-slate-400 text-xs font-medium mb-4">
                  Generous donors & regional organizations who cooperated to build this project:
                </p>

                <div className="space-y-2.5">
                  {project.cooperators.map((name: string, i: number) => (
                    <div key={i} className="flex items-center gap-3 p-3 bg-slate-50 hover:bg-emerald-50/30 rounded-xl border border-slate-100/50 hover:border-emerald-100 transition-colors">
                      <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 flex-shrink-0" />
                      <span className="text-sm font-bold text-slate-700">{name}</span>
                    </div>
                  ))}
                </div>

                <p className="text-[10px] text-center text-slate-400 font-semibold uppercase tracking-wider mt-5">
                  May their charity build a legacy
                </p>
              </div>
            )}

            {/* Call to Action Widget */}
            <div className="p-6 rounded-3xl bg-gradient-to-br from-slate-900 to-emerald-950 text-white shadow-xl relative overflow-hidden border border-white/5">
              <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-emerald-500/10 rounded-full blur-2xl" />
              
              {slug === "clean-water-initiative" ? (
                <>
                  <h4 className="text-lg font-bold text-white tracking-tight">Sponsor a hand pump today</h4>
                  <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                    Provide clean drinking water to a whole neighborhood for only PKR 150,000. Receive location coordinate files, audit receipts, and field pictures once completed.
                  </p>
                </>
              ) : (
                <>
                  <h4 className="text-lg font-bold text-white tracking-tight">Sponsor a {serviceTitle.toLowerCase()} project today</h4>
                  <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                    Support our localized operations for {serviceTitle.toLowerCase()} to help families and build stronger communities. Receive project audit reports and field updates once completed.
                  </p>
                </>
              )}
              
              <div className="mt-5 flex flex-col sm:flex-row gap-2.5">
                <Link 
                  href="/contact" 
                  className="flex-1 text-center py-2.5 px-4 rounded-xl bg-primary text-white text-xs font-bold hover:bg-primary-hover transition-colors shadow-md shadow-emerald-950/50"
                >
                  Contact Secretariat
                </Link>
                <Link 
                  href="/donate" 
                  className="flex-1 text-center py-2.5 px-4 rounded-xl bg-white/10 text-white text-xs font-bold hover:bg-white/20 transition-colors border border-white/20"
                >
                  Donate Directly
                </Link>
              </div>
            </div>

          </div>

        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
