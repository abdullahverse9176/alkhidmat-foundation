"use client";

import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { 
  Search, Menu, X, Heart, Users, Sparkles, ChevronDown,
  Info, Award, Image, Activity, Briefcase, Calendar, UserPlus,
  LogOut, LayoutDashboard
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useSession, signOut } from "next-auth/react";

export default function Navbar() {
  const { data: session, status } = useSession();
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  
  // Track hovered dropdown in desktop view
  const [hoveredDropdown, setHoveredDropdown] = useState<string | null>(null);
  
  // Track expanded dropdown in mobile view
  const [mobileExpandedDropdown, setMobileExpandedDropdown] = useState<string | null>(null);

  // Grouped Navigation Items with icons and descriptions
  const menuItems = [
    { label: "Home", href: "/" },
    {
      label: "About Us",
      dropdownItems: [
        { label: "Who We Are", href: "/#about", description: "Our mission, vision, and core values.", icon: Info },
        { label: "Our Leadership", href: "/#leadership", description: "Meet the team and the Chairman.", icon: Award },
        { label: "Operational Gallery", href: "/gallery", description: "Photos from our active welfare fields.", icon: Image }
      ]
    },
    {
      label: "Programs",
      dropdownItems: [
        { label: "Welfare Services", href: "/services", description: "Healthcare, education, and water campaigns.", icon: Activity },
        { label: "Welfare Projects", href: "/welfare-projects", description: "Active construction and building projects.", icon: Briefcase }
      ]
    },
    {
      label: "Get Involved",
      dropdownItems: [
        { label: "Upcoming Events", href: "/#events", description: "Join our public awareness events.", icon: Calendar },
        { label: "Join as Volunteer", href: "/volunteer", description: "Register as a volunteer and help out.", icon: UserPlus }
      ]
    },
    { label: "Contact", href: "/contact" }
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isCategoryActive = (label: string) => {
    if (label === "Home" && pathname === "/") return true;
    if (label === "About Us" && (pathname === "/gallery" || pathname.startsWith("/about"))) return true;
    if (label === "Programs" && (pathname === "/services" || pathname === "/welfare-projects")) return true;
    if (label === "Get Involved" && (pathname === "/volunteer" || pathname === "/events")) return true;
    if (label === "Contact" && pathname === "/contact") return true;
    return false;
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
          isScrolled 
            ? "glass-nav py-2.5 shadow-sm" 
            : "bg-transparent py-4 text-white"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link 
              href="/"
              className="flex items-center gap-2 cursor-pointer group"
              onClick={() => {
                setIsMobileMenuOpen(false);
                setHoveredDropdown(null);
                setMobileExpandedDropdown(null);
              }}
            >
              <div className="bg-primary p-2 rounded-lg text-white group-hover:scale-105 transition-transform duration-250 shadow-md">
                <Sparkles className="w-5 h-5 text-accent animate-pulse" />
              </div>
              <div className="flex flex-col">
                <span className={`font-black text-base leading-tight tracking-tight uppercase ${isScrolled ? "text-primary" : "text-white"}`}>
                  AL-KHIDMAT
                </span>
                <span className={`text-[9px] tracking-widest font-bold uppercase ${isScrolled ? "text-neutral-light" : "text-gray-200"}`}>
                  Citizens Alliance
                </span>
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-1.5 xl:gap-2">
              {menuItems.map((item) => {
                const hasDropdown = !!item.dropdownItems;
                const isActive = isCategoryActive(item.label);
                
                return (
                  <div
                    key={item.label}
                    className="relative py-2"
                    onMouseEnter={() => hasDropdown && setHoveredDropdown(item.label)}
                    onMouseLeave={() => hasDropdown && setHoveredDropdown(null)}
                  >
                    {hasDropdown ? (
                      <button
                        className={`flex items-center gap-1 px-3 py-2 text-xs font-bold uppercase tracking-wider rounded-lg transition-all duration-200 cursor-pointer ${
                          isActive
                            ? isScrolled 
                              ? "text-primary bg-primary/5" 
                              : "text-accent bg-white/10"
                            : isScrolled
                              ? "text-neutral-light hover:text-primary hover:bg-gray-50"
                              : "text-gray-100 hover:text-white hover:bg-white/5"
                        }`}
                      >
                        <span>{item.label}</span>
                        <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-250 ${
                          hoveredDropdown === item.label ? "transform rotate-180" : ""
                        }`} />
                      </button>
                    ) : (
                      <Link
                        href={item.href || "/"}
                        className={`px-3 py-2 text-xs font-bold uppercase tracking-wider rounded-lg transition-all duration-200 cursor-pointer ${
                          isActive
                            ? isScrolled 
                              ? "text-primary bg-primary/5" 
                              : "text-accent bg-white/10"
                            : isScrolled
                              ? "text-neutral-light hover:text-primary hover:bg-gray-50"
                              : "text-gray-100 hover:text-white hover:bg-white/5"
                        }`}
                      >
                        {item.label}
                      </Link>
                    )}

                    {/* Desktop Dropdown Panel */}
                    {hasDropdown && (
                      <AnimatePresence>
                        {hoveredDropdown === item.label && (
                          <motion.div
                            initial={{ opacity: 0, y: 12, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 12, scale: 0.95 }}
                            transition={{ duration: 0.15, ease: "easeOut" }}
                            className="absolute left-1/2 -translate-x-1/2 top-full mt-1.5 w-76 bg-white border border-gray-100 rounded-2xl shadow-xl p-3 z-50 flex flex-col gap-1"
                          >
                            {item.dropdownItems?.map((subItem) => {
                              const IconComponent = subItem.icon;
                              const isSubActive = pathname === subItem.href;
                              
                              return (
                                <Link
                                  key={subItem.label}
                                  href={subItem.href}
                                  onClick={() => {
                                    setIsMobileMenuOpen(false);
                                    setHoveredDropdown(null);
                                  }}
                                  className={`flex gap-3 items-start p-2.5 rounded-xl transition-all duration-200 text-left w-full cursor-pointer hover:bg-primary/5 group ${
                                    isSubActive ? "bg-primary/[0.03]" : ""
                                  }`}
                                >
                                  <div className={`p-2 rounded-lg transition-colors duration-200 ${
                                    isSubActive ? "bg-primary text-white" : "bg-gray-50 text-neutral-light group-hover:bg-primary/10 group-hover:text-primary"
                                  }`}>
                                    <IconComponent className="w-4 h-4" />
                                  </div>
                                  <div className="flex flex-col">
                                    <span className={`text-xs font-bold transition-colors duration-200 ${
                                      isSubActive ? "text-primary" : "text-neutral-dark group-hover:text-primary"
                                    }`}>
                                      {subItem.label}
                                    </span>
                                    <span className="text-[10px] text-neutral-light font-medium mt-0.5 leading-tight">
                                      {subItem.description}
                                    </span>
                                  </div>
                                </Link>
                              );
                            })}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    )}
                  </div>
                );
              })}
            </nav>

            {/* Right side buttons */}
            <div className="hidden lg:flex items-center gap-3">
              {/* Search Toggle */}
              <button
                onClick={() => setIsSearchOpen(true)}
                className={`p-2 rounded-full transition-colors cursor-pointer ${
                  isScrolled 
                    ? "text-neutral-dark hover:bg-gray-100" 
                    : "text-white hover:bg-white/10"
                }`}
                aria-label="Search"
              >
                <Search className="w-4.5 h-4.5" />
              </button>

              {/* Become Volunteer */}
              <Link
                href="/volunteer"
                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all duration-200 border cursor-pointer ${
                  isScrolled
                    ? "border-primary text-primary hover:bg-primary hover:text-white shadow-sm"
                    : "border-white/30 text-white hover:bg-white hover:text-primary"
                }`}
              >
                <Users className="w-3.5 h-3.5" />
                <span>Volunteer</span>
              </Link>

              {/* Donate Button */}
              <Link
                href="/#donation"
                className="flex items-center gap-1.5 px-4.5 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider text-white bg-accent hover:bg-accent-hover transition-all duration-200 shadow-md cursor-pointer hover:shadow-lg"
              >
                <Heart className="w-3.5 h-3.5 fill-current text-white" />
                <span>Donate</span>
              </Link>

              {/* STEP 10.1: Login/Dashboard state for desktop Navbar */}
              {status === "authenticated" ? (
                <>
                  <Link
                    href="/dashboard"
                    className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all duration-250 border cursor-pointer ${
                      isScrolled
                        ? "border-primary text-primary hover:bg-primary hover:text-white"
                        : "border-white/30 text-white hover:bg-white hover:text-primary"
                    }`}
                  >
                    <LayoutDashboard className="w-3.5 h-3.5" />
                    <span>Dashboard</span>
                  </Link>
                  <button
                    onClick={() => signOut({ callbackUrl: "/" })}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all duration-250 cursor-pointer ${
                      isScrolled
                        ? "text-neutral-light hover:text-red-650"
                        : "text-gray-200 hover:text-white"
                    }`}
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    <span>Logout</span>
                  </button>
                </>
              ) : (
                <Link
                  href="/login"
                  className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all duration-250 border border-transparent cursor-pointer ${
                    isScrolled
                      ? "text-neutral-light hover:text-primary hover:bg-primary/5"
                      : "text-gray-200 hover:text-white hover:bg-white/5"
                  }`}
                >
                  <span>Login</span>
                </Link>
              )}
            </div>

            {/* Mobile controls */}
            <div className="flex items-center gap-2 lg:hidden">
              <button
                onClick={() => setIsSearchOpen(true)}
                className={`p-2 rounded-full cursor-pointer ${
                  isScrolled ? "text-neutral-dark hover:bg-gray-150" : "text-white hover:bg-white/10"
                }`}
                aria-label="Search"
              >
                <Search className="w-4.5 h-4.5" />
              </button>

              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className={`p-2 rounded-lg cursor-pointer transition-colors ${
                  isScrolled ? "text-neutral-dark hover:bg-gray-150" : "text-white hover:bg-white/10"
                }`}
                aria-label="Toggle Menu"
              >
                {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25, ease: "easeInOut" }}
              className="lg:hidden bg-white border-t border-gray-100 shadow-inner overflow-hidden max-h-[85vh] overflow-y-auto"
            >
              <div className="px-4 py-3 space-y-1.5 sm:px-6">
                {menuItems.map((item) => {
                  const hasDropdown = !!item.dropdownItems;
                  const isActive = isCategoryActive(item.label);
                  const isExpanded = mobileExpandedDropdown === item.label;

                  return (
                    <div key={item.label} className="border-b border-gray-50 pb-1.5 last:border-b-0 last:pb-0">
                      {hasDropdown ? (
                        <>
                          <button
                            onClick={() => item.label && setMobileExpandedDropdown(isExpanded ? null : item.label)}
                            className={`flex items-center justify-between w-full px-4 py-2.5 rounded-lg text-sm font-bold uppercase tracking-wider cursor-pointer ${
                              isActive
                                ? "text-primary bg-primary/5"
                                : "text-neutral-dark hover:bg-gray-50"
                            }`}
                          >
                            <span>{item.label}</span>
                            <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isExpanded ? "transform rotate-180" : ""}`} />
                          </button>
                          
                          {/* Mobile Accordion Content */}
                          <AnimatePresence>
                            {isExpanded && (
                              <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: "auto" }}
                                exit={{ opacity: 0, height: 0 }}
                                transition={{ duration: 0.2 }}
                                className="pl-4 pr-2 mt-1 space-y-1 overflow-hidden"
                              >
                                {item.dropdownItems?.map((subItem) => {
                                  const SubIcon = subItem.icon;
                                  return (
                                    <Link
                                      key={subItem.label}
                                      href={subItem.href}
                                      onClick={() => {
                                        setIsMobileMenuOpen(false);
                                        setMobileExpandedDropdown(null);
                                      }}
                                      className="flex items-center gap-3 w-full px-4 py-2.5 rounded-lg text-left cursor-pointer hover:bg-gray-50 text-neutral-light hover:text-primary transition-colors"
                                    >
                                      <SubIcon className="w-4 h-4 shrink-0 text-neutral-light" />
                                      <div className="flex flex-col">
                                        <span className="text-xs font-bold">{subItem.label}</span>
                                        <span className="text-[10px] text-neutral-light leading-none mt-0.5">{subItem.description}</span>
                                      </div>
                                    </Link>
                                  );
                                })}
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </>
                      ) : (
                        <Link
                          href={item.href || "/"}
                          onClick={() => setIsMobileMenuOpen(false)}
                          className={`block w-full text-left px-4 py-2.5 rounded-lg text-sm font-bold uppercase tracking-wider cursor-pointer ${
                            isActive
                              ? "text-primary bg-primary/5"
                              : "text-neutral-dark hover:bg-gray-50"
                          }`}
                        >
                          {item.label}
                        </Link>
                      )}
                    </div>
                  );
                })}

                {/* Mobile CTAs */}
                <div className="pt-4 space-y-2.5 border-t border-gray-100 mt-2 pb-3">
                  <div className="grid grid-cols-2 gap-3">
                    <Link
                      href="/volunteer"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="flex items-center justify-center gap-1.5 w-full py-2.5 rounded-lg border border-primary text-primary text-xs font-bold uppercase tracking-wider hover:bg-primary hover:text-white cursor-pointer transition-colors text-center"
                    >
                      <Users className="w-3.5 h-3.5" />
                      <span>Volunteer</span>
                    </Link>
                    <Link
                      href="/#donation"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="flex items-center justify-center gap-1.5 w-full py-2.5 rounded-lg bg-accent text-white text-xs font-bold uppercase tracking-wider hover:bg-accent-hover cursor-pointer transition-colors text-center"
                    >
                      <Heart className="w-3.5 h-3.5 fill-current text-white" />
                      <span>Donate</span>
                    </Link>
                  </div>

                  {/* STEP 10.2: Login/Dashboard state for mobile menu */}
                  {status === "authenticated" ? (
                    <div className="grid grid-cols-2 gap-3 pt-1">
                      <Link
                        href="/dashboard"
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="flex items-center justify-center gap-1.5 w-full py-2.5 rounded-lg bg-primary text-white text-xs font-bold uppercase tracking-wider hover:bg-primary-hover cursor-pointer transition-colors text-center"
                      >
                        <LayoutDashboard className="w-3.5 h-3.5 text-white" />
                        <span>Dashboard</span>
                      </Link>
                      <button
                        onClick={() => {
                          setIsMobileMenuOpen(false);
                          signOut({ callbackUrl: "/" });
                        }}
                        className="flex items-center justify-center gap-1.5 w-full py-2.5 rounded-lg border border-gray-200 text-neutral-dark text-xs font-bold uppercase tracking-wider hover:bg-gray-50 cursor-pointer transition-colors text-center"
                      >
                        <LogOut className="w-3.5 h-3.5" />
                        <span>Logout</span>
                      </button>
                    </div>
                  ) : (
                    <div className="pt-1">
                      <Link
                        href="/login"
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="flex items-center justify-center gap-1.5 w-full py-2.5 rounded-lg border border-primary/20 text-neutral-dark hover:border-primary text-xs font-bold uppercase tracking-wider cursor-pointer transition-colors text-center"
                      >
                        <span>Login Member Portal</span>
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Global Search Overlay Modal */}
      <AnimatePresence>
        {isSearchOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-neutral-dark/80 backdrop-blur-md z-50 flex items-center justify-center px-4"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-white rounded-2xl w-full max-w-2xl p-6 shadow-2xl relative overflow-hidden"
            >
              <button
                onClick={() => {
                  setIsSearchOpen(false);
                  setSearchQuery("");
                }}
                className="absolute top-4 right-4 text-neutral-light hover:text-neutral-dark p-2 hover:bg-gray-100 rounded-full transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <h3 className="text-xl font-bold text-neutral-dark mb-4 pr-10">
                Search ACA Campaigns & Welfare Actions
              </h3>

              <div className="relative">
                <input
                  type="text"
                  placeholder="Type to search (e.g. disaster relief, volunteer sign-up, clean water)..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:bg-white text-neutral-dark transition-all duration-200"
                  autoFocus
                />
                <Search className="w-5 h-5 text-neutral-light absolute left-4 top-1/2 -translate-y-1/2" />
              </div>

              <div className="mt-6 flex flex-wrap gap-2 items-center">
                <span className="text-xs font-semibold text-neutral-light uppercase tracking-wider">
                  Popular Queries:
                </span>
                {["Flood Relief", "Donate Blood", "Chiniot Hospital", "Volunteer Join"].map((tag) => (
                  <button
                    key={tag}
                    onClick={() => setSearchQuery(tag)}
                    className="text-xs font-medium px-3 py-1.5 bg-gray-100 hover:bg-primary/10 hover:text-primary rounded-full transition-all duration-150 cursor-pointer"
                  >
                    {tag}
                  </button>
                ))}
              </div>

              {searchQuery && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-6 border-t border-gray-100 pt-5"
                >
                  <p className="text-sm text-neutral-light italic">
                    Showing mock matches for &ldquo;{searchQuery}&rdquo;:
                  </p>
                  <div className="mt-3 space-y-2 max-h-48 overflow-y-auto pr-2">
                    <div 
                      onClick={() => {
                        setIsSearchOpen(false);
                      }}
                      className="p-3 bg-gray-50 hover:bg-primary/5 hover:border-primary/20 border border-transparent rounded-lg cursor-pointer transition-colors"
                    >
                      <h4 className="font-semibold text-neutral-dark text-sm">
                        Matching Action: {searchQuery} Initiative
                      </h4>
                      <p className="text-xs text-neutral-light mt-0.5">
                        Discover projects related to &ldquo;{searchQuery}&rdquo; and see how you can make an impact.
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
