"use client";

import React, { useState, useEffect } from "react";
import { Search, Menu, X, Heart, Users, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface NavbarProps {
  onNavigate: (sectionId: string) => void;
  activeSection: string;
}

export default function Navbar({ onNavigate, activeSection }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const navLinks = [
    { label: "Home", id: "home" },
    { label: "About", id: "about" },
    { label: "Leadership", id: "leadership" },
    { label: "Projects", id: "projects" },
    { label: "Services", id: "services" },
    { label: "Events", id: "events" },
    { label: "Gallery", id: "gallery" },
    { label: "Volunteers", id: "volunteer" },
    { label: "Donate", id: "donation" },
    { label: "Contact", id: "contact" }
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLinkClick = (id: string) => {
    setIsMobileMenuOpen(false);
    onNavigate(id);
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
          isScrolled 
            ? "glass-nav py-3 shadow-md" 
            : "bg-transparent py-5 text-white"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div 
              className="flex items-center gap-2 cursor-pointer group"
              onClick={() => handleLinkClick("home")}
            >
              <div className="bg-primary p-2 rounded-lg text-white group-hover:scale-105 transition-transform duration-200 shadow-md">
                <Sparkles className="w-5 h-5 text-accent" />
              </div>
              <div className="flex flex-col">
                <span className={`font-bold text-lg leading-tight tracking-tight ${isScrolled ? "text-primary" : "text-white"}`}>
                  AL-KHIDMAT
                </span>
                <span className={`text-[10px] tracking-widest font-semibold uppercase ${isScrolled ? "text-neutral-light" : "text-gray-200"}`}>
                  Citizens Alliance
                </span>
              </div>
            </div>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => handleLinkClick(link.id)}
                  className={`px-3 py-2 text-sm font-medium rounded-md transition-all duration-200 cursor-pointer ${
                    activeSection === link.id
                      ? isScrolled 
                        ? "text-primary bg-primary/10" 
                        : "text-accent bg-white/10"
                      : isScrolled
                        ? "text-neutral-light hover:text-primary hover:bg-gray-100"
                        : "text-gray-100 hover:text-white hover:bg-white/5"
                  }`}
                >
                  {link.label}
                </button>
              ))}
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
                <Search className="w-5 h-5" />
              </button>

              {/* Become Volunteer */}
              <button
                onClick={() => handleLinkClick("volunteer")}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 border cursor-pointer ${
                  isScrolled
                    ? "border-primary text-primary hover:bg-primary hover:text-white shadow-sm"
                    : "border-white/30 text-white hover:bg-white hover:text-primary"
                }`}
              >
                <Users className="w-4 h-4" />
                <span>Volunteer</span>
              </button>

              {/* Donate Button */}
              <button
                onClick={() => handleLinkClick("donation")}
                className="flex items-center gap-1.5 px-5 py-2 rounded-lg text-sm font-bold text-white bg-accent hover:bg-accent-hover transition-all duration-200 shadow-md cursor-pointer hover:shadow-lg"
              >
                <Heart className="w-4 h-4 fill-current text-white" />
                <span>Donate Now</span>
              </button>
            </div>

            {/* Mobile controls */}
            <div className="flex items-center gap-3 lg:hidden">
              <button
                onClick={() => setIsSearchOpen(true)}
                className={`p-2 rounded-full cursor-pointer ${
                  isScrolled ? "text-neutral-dark" : "text-white"
                }`}
                aria-label="Search"
              >
                <Search className="w-5 h-5" />
              </button>

              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className={`p-2 rounded-lg cursor-pointer ${
                  isScrolled ? "text-neutral-dark" : "text-white"
                }`}
                aria-label="Toggle Menu"
              >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
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
              transition={{ duration: 0.3 }}
              className="lg:hidden bg-white border-t border-gray-100 shadow-inner overflow-hidden"
            >
              <div className="px-4 pt-3 pb-6 space-y-1 sm:px-6">
                {navLinks.map((link) => (
                  <button
                    key={link.id}
                    onClick={() => handleLinkClick(link.id)}
                    className={`block w-full text-left px-4 py-2.5 rounded-lg text-base font-semibold cursor-pointer ${
                      activeSection === link.id
                        ? "text-primary bg-primary/10"
                        : "text-neutral-dark hover:bg-gray-50"
                    }`}
                  >
                    {link.label}
                  </button>
                ))}
                <div className="pt-4 grid grid-cols-2 gap-3 border-t border-gray-100 mt-2">
                  <button
                    onClick={() => handleLinkClick("volunteer")}
                    className="flex items-center justify-center gap-2 w-full py-3 rounded-lg border border-primary text-primary text-sm font-semibold hover:bg-primary hover:text-white cursor-pointer"
                  >
                    <Users className="w-4 h-4" />
                    <span>Volunteer</span>
                  </button>
                  <button
                    onClick={() => handleLinkClick("donation")}
                    className="flex items-center justify-center gap-2 w-full py-3 rounded-lg bg-accent text-white text-sm font-bold hover:bg-accent-hover cursor-pointer"
                  >
                    <Heart className="w-4 h-4 fill-current text-white" />
                    <span>Donate Now</span>
                  </button>
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
                        handleLinkClick("projects");
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
