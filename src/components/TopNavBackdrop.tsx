
import React from "react";
import { Logo } from "./Logo";
import { NavBarDemo } from "./NavBarDemo";
import { ContactUsButton } from "./ContactUsButton";
import { Menu } from "lucide-react";
import { Button } from "./ui/button";
import { Drawer, DrawerContent, DrawerTrigger } from "./ui/drawer";
import { useIsMobile } from "@/hooks/use-mobile";

export function TopNavBackdrop() {
  const isMobile = useIsMobile();

  return (
    <div className="fixed top-0 left-0 w-full z-40 bg-background/95 backdrop-blur-sm">
      <div className={`flex items-center justify-between py-4 ${isMobile ? 'px-4' : 'container mx-auto'}`}>
        {isMobile ? (
          <>
            <Logo />
            <div className="flex items-center gap-3">
              <ContactUsButton />
              <Drawer direction="top">
                <DrawerTrigger asChild>
                  <Button variant="ghost" size="icon" className="md:hidden">
                    <Menu size={24} />
                  </Button>
                </DrawerTrigger>
                <DrawerContent className="pt-0 pb-0">
                  <div className="flex justify-center w-full py-2">
                    <img 
                      src="/lovable-uploads/9b106f97-1f14-407e-91d8-a62656eec160.png" 
                      alt="Prata.ai Logo" 
                      className="h-16 w-auto max-w-[70%]"
                    />
                  </div>
                  <div className="p-4">
                    <NavBarDemo />
                  </div>
                </DrawerContent>
              </Drawer>
            </div>
          </>
        ) : (
          <>
            <Logo />
            <div className="flex-1 flex justify-center">
              <NavBarDemo />
            </div>
            <ContactUsButton />
          </>
        )}
      </div>
    </div>
  );
}
