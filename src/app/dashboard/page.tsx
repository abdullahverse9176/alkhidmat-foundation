import React from "react";
import { auth, signOut } from "@/../auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import { 
  Users, Gift, Heart, Sparkles, LogOut, ArrowLeft, 
  Calendar, CheckCircle, Clock, ShieldCheck 
} from "lucide-react";

// STEP 8: Protected Dashboard Page (Server Component)
// Yeh page sirf authenticated users ke liye visible hai (protected by middleware).
// Hum 'auth()' function ka use kar ke server-side par session detail fetch kar rahe hain.
// Sign-out action bhi server actions ke zariye handled hai (form action).

export default async function DashboardPage() {
  const session = await auth();

  // Agar session nahi hai toh login par bhej do (although middleware has already protected it)
  if (!session) {
    redirect("/login");
  }

  const user = session.user;

  // Mock dashboard cards data
  const stats = [
    { label: "Active Volunteers", value: "15,430+", icon: Users, color: "text-emerald-600 bg-emerald-50" },
    { label: "Welfare Projects", value: "48 Active", icon: Gift, color: "text-amber-600 bg-amber-50" },
    { label: "Total Beneficiaries", value: "85,000+", icon: Heart, color: "text-rose-600 bg-rose-50" },
    { label: "Pending Approvals", value: "12 Applications", icon: Clock, color: "text-blue-600 bg-blue-50" }
  ];

  // Mock volunteer list
  const recentVolunteers = [
    { id: "V-102", name: "Muhammad Ahmed", email: "ahmed@example.com", status: "Approved", date: "July 10, 2026" },
    { id: "V-103", name: "Zainab Fatima", email: "zainab.f@example.com", status: "Pending", date: "July 09, 2026" },
    { id: "V-104", name: "Hamza Ali", email: "hamza@example.com", status: "Approved", date: "July 07, 2026" },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Dashboard Top Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            
            {/* Logo & Homepage link */}
            <div className="flex items-center gap-4">
              <Link href="/" className="flex items-center gap-2 group">
                <div className="bg-[#0F7B3F] p-2 rounded-lg text-white group-hover:scale-105 transition-transform duration-200">
                  <Sparkles className="w-4 h-4 text-[#D4AF37]" />
                </div>
                <span className="font-extrabold text-sm tracking-tight text-gray-800 uppercase">
                  AL-KHIDMAT PORTAL
                </span>
              </Link>
              <div className="h-6 w-px bg-gray-200" />
              <Link 
                href="/" 
                className="flex items-center gap-1 text-xs text-gray-500 hover:text-gray-900 transition-colors font-semibold"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Home Page</span>
              </Link>
            </div>

            {/* Logged in User Profile Info & Logout */}
            <div className="flex items-center gap-4">
              <div className="text-right hidden sm:block">
                <p className="text-xs font-bold text-gray-800">{user?.name}</p>
                <p className="text-[10px] text-gray-500 font-medium">{user?.email}</p>
              </div>
              
              {/* Role badge */}
              <span className="flex items-center gap-1 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200">
                <ShieldCheck className="w-3 h-3 text-emerald-600" />
                {(user as any)?.role || "User"}
              </span>

              {/* Logout Button (Using Server Action) */}
              <form
                action={async () => {
                  "use server";
                  // NextAuth server-side sign out
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
            
          </div>
        </div>
      </header>

      {/* Main Dashboard Panel */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900">
            Assalam-o-Alaikum, {user?.name}!
          </h1>
          <p className="text-sm text-gray-500 mt-1 font-medium">
            Welcome to the Al-Khidmat Foundation Chiniot administrative dashboard.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <div 
                key={idx}
                className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4 hover:shadow-md transition-shadow"
              >
                <div className={`p-3 rounded-xl ${stat.color} shrink-0`}>
                  <Icon className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                    {stat.label}
                  </p>
                  <h3 className="text-xl font-bold text-gray-800 mt-0.5">
                    {stat.value}
                  </h3>
                </div>
              </div>
            );
          })}
        </div>

        {/* Workspace content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Recent Applications Card */}
          <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-base font-bold text-gray-800">
                Recent Volunteer Registrations
              </h3>
              <span className="text-xs font-semibold text-[#0F7B3F] hover:underline cursor-pointer">
                View all
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-gray-100">
                    <th className="pb-3 text-xs font-bold text-gray-400 uppercase tracking-wider">ID</th>
                    <th className="pb-3 text-xs font-bold text-gray-400 uppercase tracking-wider">Name</th>
                    <th className="pb-3 text-xs font-bold text-gray-400 uppercase tracking-wider">Email</th>
                    <th className="pb-3 text-xs font-bold text-gray-400 uppercase tracking-wider">Status</th>
                    <th className="pb-3 text-xs font-bold text-gray-400 uppercase tracking-wider">Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {recentVolunteers.map((v) => (
                    <tr key={v.id} className="hover:bg-gray-50/50">
                      <td className="py-3.5 text-xs font-semibold text-gray-600">{v.id}</td>
                      <td className="py-3.5 text-xs font-bold text-gray-800">{v.name}</td>
                      <td className="py-3.5 text-xs text-gray-500">{v.email}</td>
                      <td className="py-3.5">
                        <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                          v.status === "Approved" 
                            ? "bg-emerald-50 text-emerald-700 border border-emerald-100" 
                            : "bg-amber-50 text-amber-700 border border-amber-100"
                        }`}>
                          {v.status}
                        </span>
                      </td>
                      <td className="py-3.5 text-xs text-gray-400 font-medium">{v.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Quick Actions Panel */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 flex flex-col">
            <h3 className="text-base font-bold text-gray-800 mb-5">
              Quick Actions
            </h3>
            
            <div className="space-y-3 flex-1">
              <button className="w-full text-left p-3.5 rounded-xl border border-gray-100 hover:border-[#0F7B3F] hover:bg-[#0F7B3F]/5 transition-all text-xs font-bold text-gray-700 hover:text-[#0F7B3F] cursor-pointer flex items-center justify-between">
                <span>Create New Welfare Campaign</span>
                <Sparkles className="w-4 h-4 text-[#D4AF37]" />
              </button>
              <button className="w-full text-left p-3.5 rounded-xl border border-gray-100 hover:border-[#0F7B3F] hover:bg-[#0F7B3F]/5 transition-all text-xs font-bold text-gray-700 hover:text-[#0F7B3F] cursor-pointer flex items-center justify-between">
                <span>Manage Donation Progress</span>
                <Gift className="w-4 h-4" />
              </button>
              <button className="w-full text-left p-3.5 rounded-xl border border-gray-100 hover:border-[#0F7B3F] hover:bg-[#0F7B3F]/5 transition-all text-xs font-bold text-gray-700 hover:text-[#0F7B3F] cursor-pointer flex items-center justify-between">
                <span>Schedule Volunteer Meeting</span>
                <Calendar className="w-4 h-4" />
              </button>
            </div>
            
            <div className="mt-6 pt-5 border-t border-gray-100 text-center">
              <p className="text-[10px] text-gray-400 font-medium leading-relaxed">
                Al-Khidmat Foundation Portal version 1.0.0<br />
                Secured via NextAuth.js
              </p>
            </div>
          </div>

        </div>

      </main>
    </div>
  );
}
