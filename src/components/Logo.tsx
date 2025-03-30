
import React from "react";
import { Link } from "react-router-dom";
import { useIsMobile } from "@/hooks/use-mobile";

export function Logo() {
  const isMobile = useIsMobile();
  
  return (
    <div className={isMobile ? "ml-0" : ""}>
      <Link to="/">
        <img 
          src="/lovable-uploads/5222d3c5-2a90-4059-a880-5fccddc59b96.png" 
          alt="Logo" 
          className="h-10 w-auto"
        />
      </Link>
    </div>
  );
}
