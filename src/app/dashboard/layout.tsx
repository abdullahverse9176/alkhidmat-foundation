import React from "react";
import { auth, signOut } from "@/../auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import { 
  Users, 
  Gift, 
  Sparkles, 
  LogOut, 
  ArrowLeft, 
  ShieldCheck,
  Layers,
  Droplet
} from "lucide-react";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  // Protect the dashboard layout
  if (!session) {
    redirect("/login");
  }

  const user = session.user;

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row">
      {/* 1. Sidebar Panel (Left on Desktop, Top on Mobile) */}
      <aside className="w-full md:w-64 bg-slate-900 text-slate-100 flex-shrink-0 flex flex-col border-b md:border-b-0 md:border-r border-slate-800">
        
        {/* Brand Header */}
        <div className="h-16 px-6 flex items-center justify-between border-b border-slate-800 bg-slate-950/40">
          <Link href="/dashboard" className="flex items-center gap-2.5 group">
            <div className="bg-[#0F7B3F] p-1.5 rounded-lg text-white group-hover:scale-105 transition-transform duration-200">
              <Sparkles className="w-4 h-4 text-[#D4AF37]" />
            </div>
            <span className="font-extrabold text-sm tracking-wider uppercase text-white">
              AL-KHIDMAT ADMIN
            </span>
          </Link>
        </div>

        {/* Sidebar Nav Links */}
        <nav className="flex-1 px-4 py-6 space-y-1.5 overflow-y-auto">
          <Link 
            href="/dashboard" 
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold text-slate-300 hover:text-white hover:bg-slate-800/60 transition-all group"
          >
            <Layers className="w-4.5 h-4.5 text-slate-400 group-hover:text-emerald-400 transition-colors" />
            <span>Overview Dashboard</span>
          </Link>

          <Link 
            href="/dashboard/services" 
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold text-slate-300 hover:text-white hover:bg-slate-800/60 transition-all group"
          >
            <Sparkles className="w-4.5 h-4.5 text-slate-400 group-hover:text-emerald-400 transition-colors" />
            <span>Manage Services</span>
          </Link>

          <Link 
            href="/dashboard/projects" 
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold text-slate-300 hover:text-white hover:bg-slate-800/60 transition-all group"
          >
            <Droplet className="w-4.5 h-4.5 text-slate-400 group-hover:text-emerald-400 transition-colors" />
            <span>Welfare Projects</span>
          </Link>

          <div className="h-px bg-slate-800/80 my-4" />

          <Link 
            href="/" 
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold text-slate-400 hover:text-white hover:bg-slate-800/30 transition-all group"
          >
            <ArrowLeft className="w-4.5 h-4.5 text-slate-500 group-hover:text-amber-400 transition-colors" />
            <span>Back to Website</span>
          </Link>
        </nav>

        {/* Sidebar Version Footer */}
        <div className="p-4 border-t border-slate-800/80 bg-slate-950/20 text-center">
          <p className="text-[10px] text-slate-500 font-medium">
            Al-Khidmat Portal v1.0.0
          </p>
        </div>
      </aside>

      {/* 2. Main Workspace (Right) */}
      <div className="flex-1 flex flex-col min-w-0">
        
        {/* Top Header navbar */}
        <header className="h-16 bg-white border-b border-gray-200 sticky top-0 z-30 flex items-center justify-between px-6 shadow-sm">
          <div>
            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest block">ADMIN PANEL</span>
            <span className="text-sm font-bold text-slate-700 hidden sm:inline">Chiniot Regional Secretariat</span>
          </div>

          {/* Profile & Logout wrapper */}
          <div className="flex items-center gap-4">
            <div className="text-right hidden sm:block">
              <p className="text-xs font-bold text-gray-800">{user?.name}</p>
              <p className="text-[10px] text-gray-500 font-medium">{user?.email}</p>
            </div>
            
            {/* Role badge */}
            <span className="flex items-center gap-1 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200/80">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              {(user as any)?.role || "Admin"}
            </span>

            {/* Logout button form */}
            <form
              action={async () => {
                "use server";
                await signOut({ redirectTo: "/" });
              }}
            >
              <button
                type="submit"
                className="flex items-center gap-1.5 px-3 py-1.5 border border-gray-200 hover:border-red-200 rounded-lg text-xs font-bold text-gray-600 hover:text-red-600 hover:bg-red-50 transition-all cursor-pointer shadow-sm"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span className="hidden md:inline">Sign Out</span>
              </button>
            </form>
          </div>
        </header>

        {/* Page Inner Content Container */}
        <main className="flex-1 overflow-y-auto p-6 md:p-8">
          <div className="max-w-7xl mx-auto w-full">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
