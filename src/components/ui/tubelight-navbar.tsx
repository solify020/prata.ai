
"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";

interface NavItem {
  name: string;
  url: string;
  icon: LucideIcon;
}

interface NavBarProps {
  items: NavItem[];
  className?: string;
}

export function NavBar({
  items,
  className
}: NavBarProps) {
  const [activeTab, setActiveTab] = useState(items[0].name);
  const isMobile = useIsMobile();

  useEffect(() => {
    // Handle scroll events to update active section
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      
      // Get all section elements we want to track
      const sections = [
        document.getElementById("hem"),
        document.getElementById("tjanster"),
        document.getElementById("kundcase"),
        document.getElementById("kontakt"),
        document.getElementById("fragor")
      ];
      
      // Find the current active section based on scroll position
      const currentSection = sections
        .filter(section => section !== null)
        .reduce((closest, section) => {
          if (!section) return closest;
          
          const sectionTop = section.offsetTop;
          const sectionHeight = section.offsetHeight;
          
          // Is this section currently in the viewport?
          if (
            scrollPosition >= sectionTop - 200 && 
            scrollPosition < sectionTop + sectionHeight - 200
          ) {
            return section;
          }
          
          return closest;
        }, null);
      
      // Update active tab if a section is found
      if (currentSection) {
        const currentId = currentSection.id;
        const correspondingItem = items.find(item => item.url === `#${currentId}`);
        
        if (correspondingItem && correspondingItem.name !== activeTab) {
          setActiveTab(correspondingItem.name);
        }
      }
    };
    
    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Initial check
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [items, activeTab]);

  // Mobile drawer layout
  if (isMobile) {
    return (
      <div className={cn("w-full", className)}>
        <div className="flex flex-col gap-3">
          {items.map(item => {
            const Icon = item.icon;
            const isActive = activeTab === item.name;
            return (
              <a 
                key={item.name} 
                href={item.url} 
                onClick={(e) => {
                  e.preventDefault();
                  setActiveTab(item.name);
                  const targetId = item.url.substring(1); // Remove the # from the url
                  const targetElement = document.getElementById(targetId);
                  if (targetElement) {
                    window.scrollTo({
                      top: targetElement.offsetTop - 100, // Offset to account for navbar
                      behavior: "smooth"
                    });
                  }
                }} 
                className={cn(
                  "flex items-center gap-2 w-full px-4 py-3 rounded-md transition-colors", 
                  "text-zinc-400 hover:text-white", 
                  isActive && "bg-zinc-800 text-white"
                )}
              >
                <Icon size={20} strokeWidth={2.5} />
                <span>{item.name}</span>
              </a>
            );
          })}
        </div>
      </div>
    );
  }

  // Desktop layout - unchanged
  return (
    <div className={cn("fixed top-0 left-1/2 -translate-x-1/2 z-50 mt-6", className)}>
      <div className="flex items-center gap-3 border border-zinc-800 backdrop-blur-lg py-1 px-1 rounded-full shadow-lg bg-[09090b] bg-zinc-950">
        {items.map(item => {
          const Icon = item.icon;
          const isActive = activeTab === item.name;
          return (
            <a 
              key={item.name} 
              href={item.url} 
              onClick={(e) => {
                e.preventDefault();
                setActiveTab(item.name);
                const targetId = item.url.substring(1); // Remove the # from the url
                const targetElement = document.getElementById(targetId);
                if (targetElement) {
                  window.scrollTo({
                    top: targetElement.offsetTop - 100, // Offset to account for navbar
                    behavior: "smooth"
                  });
                }
              }} 
              className={cn(
                "relative cursor-pointer text-sm font-semibold px-6 py-2 rounded-full transition-colors", 
                "text-zinc-400 hover:text-white", 
                isActive && "bg-zinc-800 text-white"
              )}
            >
              <span className="hidden md:inline">{item.name}</span>
              <span className="md:hidden">
                <Icon size={18} strokeWidth={2.5} />
              </span>
              {isActive && (
                <motion.div 
                  layoutId="lamp" 
                  className="absolute inset-0 w-full bg-white/5 rounded-full -z-10"
                  initial={false} 
                  transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 30
                  }}
                >
                  <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-8 h-1 bg-white rounded-t-full">
                    <div className="absolute w-12 h-6 bg-white/20 rounded-full blur-md -top-2 -left-2" />
                    <div className="absolute w-8 h-6 bg-white/20 rounded-full blur-md -top-1" />
                    <div className="absolute w-4 h-4 bg-white/20 rounded-full blur-sm top-0 left-2" />
                  </div>
                </motion.div>
              )}
            </a>
          );
        })}
      </div>
    </div>
  );
}
