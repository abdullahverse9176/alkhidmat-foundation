"use client";

import React, { useState, useEffect, useRef } from "react";

interface AutocompleteProps {
  label: string;
  value: string;
  onChange: (val: string) => void;
  suggestions: string[];
  placeholder?: string;
  error?: any;
}

export default function Autocomplete({
  label,
  value,
  onChange,
  suggestions,
  placeholder = "Search or select location...",
  error,
}: AutocompleteProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [filteredSuggestions, setFilteredSuggestions] = useState<string[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  // Close dropdown on click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Filter suggestions
  useEffect(() => {
    if (!isOpen) return;

    if (!value || value.trim() === "") {
      // Show first 5 suggestions when empty
      setFilteredSuggestions(suggestions.slice(0, 5));
    } else {
      // Filter suggestions based on input
      const filtered = suggestions.filter((item) =>
        item.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredSuggestions(filtered);
    }
  }, [value, suggestions, isOpen]);

  const handleSelect = (val: string) => {
    onChange(val);
    setIsOpen(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
    setIsOpen(true);
  };

  return (
    <div className="mb-3 relative" ref={containerRef}>
      <label className="block text-left mb-1 font-semibold text-neutral-dark text-sm">
        {label}
      </label>

      <div className="relative">
        <input
          type="text"
          value={value}
          onChange={handleInputChange}
          onFocus={() => setIsOpen(true)}
          placeholder={placeholder}
          className="w-full p-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary text-neutral-dark font-semibold transition-all"
        />
        
        {/* Dropdown Indicator */}
        <span 
          className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 cursor-pointer pointer-events-none"
        >
          ▾
        </span>
      </div>

      {isOpen && (
        <ul className="absolute z-50 left-0 w-full mt-1 bg-white border border-gray-150 rounded-xl shadow-xl max-h-60 overflow-y-auto divide-y divide-gray-50 animate-scaleUp text-left">
          {filteredSuggestions.length > 0 ? (
            filteredSuggestions.map((suggestion, index) => (
              <li
                key={index}
                onClick={() => handleSelect(suggestion)}
                className="px-4 py-3 text-xs font-semibold text-gray-700 hover:bg-red-50 hover:text-red-600 transition-colors cursor-pointer"
              >
                {suggestion}
              </li>
            ))
          ) : (
            <li className="px-4 py-3 text-xs text-gray-400 font-medium italic">
              No suggestions found. Press enter or continue typing to save custom location.
            </li>
          )}
        </ul>
      )}

      {error && <p className="block text-left text-xs text-red-500 mt-1 font-semibold">{error.message}</p>}
    </div>
  );
}
