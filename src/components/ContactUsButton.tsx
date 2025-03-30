
import React from "react"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useIsMobile } from "@/hooks/use-mobile"

export function ContactUsButton() {
  const isMobile = useIsMobile();
  
  return (
    <div>
      <Button 
        className={`group bg-zinc-800 hover:bg-zinc-700 ${isMobile ? 'px-2.5' : ''}`}
        onClick={() => {
          const contactSection = document.getElementById('kontakt');
          if (contactSection) {
            contactSection.scrollIntoView({ behavior: 'smooth' });
          }
        }}
      >
        {isMobile ? "Kontakt" : "Kontakta Oss"}
        {!isMobile && (
          <ArrowRight
            className="-me-1 ms-2 opacity-60 transition-transform group-hover:translate-x-0.5"
            size={16}
            strokeWidth={2}
            aria-hidden="true"
          />
        )}
      </Button>
    </div>
  )
}
