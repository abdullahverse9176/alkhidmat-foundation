import React from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { servicesData } from "@/data/mockData";
import { dbConnect } from "@/lib/db";
import { Project, Service } from "@/models/Service";
import { notFound } from "next/navigation";
import { 
  Flame, 
  Apple, 
  Stethoscope, 
  GraduationCap, 
  Droplet, 
  Trees, 
  Sparkles, 
  Briefcase,
  MapPin, 
  Calendar, 
  Users, 
  ArrowRight, 
  CheckCircle,
  HelpCircle,
  Clock,
  ArrowLeft
} from "lucide-react";

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

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  let service = null;
  try {
    await dbConnect();
    service = await Service.findOne({ slug }).lean();
  } catch (error) {
    console.error("Database connection failed in generateMetadata, falling back to mock servicesData:", error);
  }
  
  if (!service) {
    service = servicesData.find((s) => s.slug === slug);
  }
  
  if (!service) return { title: "Service Not Found" };
  
  return {
    title: `${service.title} - Al-Khidmat Citizens Alliance`,
    description: service.description,
  };
}

export const dynamic = "force-dynamic";

export default async function ServiceDetailsPage({ params }: PageProps) {
  const { slug } = await params;

  let service = null;
  let dbProjects: any[] = [];

  try {
    await dbConnect();
    service = await Service.findOne({ slug }).lean();
    
    // Fetch projects for this service
    dbProjects = await Project.find({ serviceSlug: slug }).lean();
  } catch (error) {
    console.error("Database connection failed in ServiceDetailsPage, falling back to mock data:", error);
  }

  // Fallbacks if not in DB
  if (!service) {
    const mockService = servicesData.find((s) => s.slug === slug);
    if (!mockService) notFound();
    service = JSON.parse(JSON.stringify(mockService));
  } else {
    service = JSON.parse(JSON.stringify(service));
  }

  const projects = JSON.parse(JSON.stringify(dbProjects));

  // Split title to highlight the last word beautifully
  const titleParts = service.title.split(" ");
  const lastWord = titleParts.pop() || "";
  const firstPart = titleParts.join(" ");

  const IconComponent = iconMap[service.iconName as keyof typeof iconMap] || Sparkles;

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
            backgroundImage: `url('${service.image.startsWith("/") ? `https://images.unsplash.com/photo-1469571486040-7530613856e1?auto=format&fit=crop&q=80&w=1200` : service.image}')`,
          }}
        />
        
        {/* Deep Green & Dark Blue Elegant Gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-neutral-dark/95 via-neutral-dark/90 to-slate-900/40" />
        
        {/* Wave Pattern overlay */}
        <div className="absolute bottom-0 left-0 right-0 w-full overflow-hidden leading-none z-10 opacity-10">
          <svg className="relative block w-full h-[60px]" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V30.25C1123.7,11.81,1055.75,111.45,985.66,92.83Z" fill="#0F7B3F"></path>
          </svg>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-20 w-full mt-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/20 border border-primary/30 text-accent font-semibold text-xs uppercase tracking-wider backdrop-blur-md mb-6">
            <IconComponent className="w-3.5 h-3.5 text-accent animate-pulse" />
            <span>{service.title} Care Area</span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white tracking-tight leading-tight">
            {firstPart} <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-amber-300">{lastWord}</span>
          </h1>
          <p className="text-base sm:text-lg text-slate-300 max-w-3xl mx-auto mt-6 font-medium leading-relaxed">
            {service.description}
          </p>

          {/* Impact Stats Banner */}
          {service.stats && service.stats.length > 0 && (
            <div className={`grid grid-cols-2 md:grid-cols-${Math.min(service.stats.length, 4)} gap-4 max-w-4xl mx-auto mt-12 p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md`}>
              {service.stats.map((stat: any, index: number) => (
                <div key={index} className={`text-center p-2 ${index > 0 ? "border-l border-white/10" : ""}`}>
                  <div className="text-2xl sm:text-3xl font-bold text-emerald-400">{stat.value}</div>
                  <div className="text-xs sm:text-sm text-slate-400 font-medium mt-1">{stat.label}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Main Section */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        
        {/* Intro section */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl font-bold text-slate-800 tracking-tight">
            Our Active & Completed {service.title} Projects
          </h2>
          <p className="text-slate-600 mt-4 text-base leading-relaxed">
            Browse through our active installations and relief actions. Each card represents a community that gained vital support. Click on any project card to view technical logs, itemized budgets, donors, and field leads.
          </p>
        </div>

        {/* Project Listing Grid */}
        {projects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10 mb-20">
            {projects.map((project: any) => (
              <Link 
                key={project._id || project.id} 
                href={`/services/${slug}/${project.slug}`}
                className="group block relative bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 border border-slate-100"
              >
                {/* Image Container with Hover Scale */}
                <div className="relative h-64 sm:h-72 w-full overflow-hidden bg-slate-100">
                  {/* Overlay gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent z-10 opacity-70 group-hover:opacity-85 transition-opacity" />
                  
                  {/* Image rendering */}
                  <img 
                    src={project.featuredImage || "https://images.unsplash.com/photo-1469571486040-7530613856e1?auto=format&fit=crop&q=80&w=800"} 
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
                      <span className="block text-xs font-medium text-slate-400">Total Cost</span>
                      <span className="text-lg font-bold text-slate-800">{project.totalCost}</span>
                    </div>
                    <span className="inline-flex items-center gap-1.5 font-bold text-sm text-emerald-600 group-hover:text-emerald-800 transition-colors">
                      <span>View Details</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white rounded-3xl border border-slate-100 shadow-sm max-w-2xl mx-auto mb-20 px-6">
            <Sparkles className="w-12 h-12 text-slate-300 mx-auto mb-4 animate-pulse" />
            <h3 className="text-xl font-bold text-slate-700">No active projects logged yet</h3>
            <p className="text-slate-500 text-sm mt-2 leading-relaxed">
              We are currently setting up operations and deploying field teams for {service.title} in the region. Contact our secretariat to coordinate a new deployment or sponsor a launch!
            </p>
          </div>
        )}

        {/* Dynamic Sector Activity Photo Gallery */}
        {service.gallery && service.gallery.length > 0 && (
          <section className="mb-20 space-y-6">
            <div className="text-center max-w-2xl mx-auto mb-10">
              <h2 className="text-3xl font-bold text-slate-800">Field Activity Gallery</h2>
              <p className="text-slate-500 text-sm mt-3">Visual insights from our active field deployments and rehabilitation drives.</p>
            </div>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {service.gallery.map((imgUrl: string, index: number) => (
                <div 
                  key={index}
                  className="relative h-60 rounded-3xl overflow-hidden shadow-sm border border-slate-100 group bg-slate-150"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img 
                    src={imgUrl} 
                    alt={`${service.title} Gallery ${index}`} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                    <span className="text-xs font-bold text-white uppercase tracking-wider">{service.title} Deployments</span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Pricing & Sponsorship Guide */}
        <section className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-slate-900 to-emerald-950 text-white p-8 sm:p-12 lg:p-16 shadow-xl border border-white/5">
          <div className="absolute top-0 right-0 -mt-10 -mr-10 w-48 h-48 bg-emerald-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 -mb-10 -ml-10 w-48 h-48 bg-amber-500/10 rounded-full blur-3xl" />

          <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Texts */}
            <div className="lg:col-span-7">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-amber-400 text-xs font-bold uppercase tracking-wider mb-6">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Sponsorship & Assistance Program</span>
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
                Sponsor a {service.title} Project & Build a Legacy
              </h2>
              <p className="text-slate-300 mt-4 leading-relaxed">
                Provide critical assistance in the name of your family or organization. Al-Khidmat Citizens Alliance manages project logistics, provides transparent auditing, and logs location telemetry once the deployment finishes.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-8">
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center border border-emerald-500/30">
                    <CheckCircle className="w-4 h-4 text-emerald-400" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-white">Full Cost Transparency</h4>
                    <p className="text-xs text-slate-400 mt-1">Every rupee vetted by regional auditors with receipts.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center border border-emerald-500/30">
                    <CheckCircle className="w-4 h-4 text-emerald-400" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-white">Verification Reports</h4>
                    <p className="text-xs text-slate-400 mt-1">Receive pictures, videos, coordinates, and leader updates.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Cost/Feature Cards */}
            <div className="lg:col-span-5 space-y-4">
              {service.packages && service.packages.length > 0 ? (
                <>
                  {service.packages.map((pkg: any, i: number) => (
                    <div key={i} className="p-5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md flex items-center justify-between hover:border-emerald-500/50 transition-colors">
                      <div>
                        <h4 className="font-bold text-white">{pkg.name}</h4>
                        <p className="text-xs text-slate-400 mt-1">{pkg.description}</p>
                      </div>
                      <div className="text-right">
                        <div className="text-xl font-extrabold text-amber-300">{pkg.cost}</div>
                      </div>
                    </div>
                  ))}
                </>
              ) : (
                <>
                  {service.features && service.features.slice(0, 3).map((feature: string, i: number) => (
                    <div key={i} className="p-5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md flex items-center justify-between hover:border-emerald-500/50 transition-colors">
                      <div>
                        <h4 className="font-bold text-white">{feature}</h4>
                        <p className="text-xs text-slate-400 mt-1">Key intervention program.</p>
                      </div>
                      <span className="text-emerald-400 text-xs font-bold uppercase tracking-wider">Active</span>
                    </div>
                  ))}
                </>
              )}

              <div className="pt-4 flex flex-col sm:flex-row gap-3">
                <Link 
                  href="/contact" 
                  className="flex-1 text-center py-3.5 px-6 rounded-xl bg-primary text-white font-bold hover:bg-primary-hover transition-colors shadow-lg shadow-emerald-950/50 text-sm"
                >
                  Coordinate Support
                </Link>
                <Link 
                  href="/volunteer" 
                  className="flex-1 text-center py-3.5 px-6 rounded-xl bg-white/10 text-white font-bold hover:bg-white/20 transition-colors border border-white/20 text-sm"
                >
                  Join Volunteer Group
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