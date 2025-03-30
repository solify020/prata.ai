
import { Home, Phone, Users, FileText, HelpCircle } from 'lucide-react'
import { NavBar } from "@/components/ui/tubelight-navbar"
import { useIsMobile } from "@/hooks/use-mobile"

export function NavBarDemo() {
  const navItems = [
    { name: 'Hem', url: '#hem', icon: Home },
    { name: 'Tjänster', url: '#tjanster', icon: FileText },
    { name: 'Kundcase', url: '#kundcase', icon: Users },
    { name: 'Kontakt', url: '#kontakt', icon: Phone },
    { name: 'Frågor', url: '#fragor', icon: HelpCircle }
  ]

  const isMobile = useIsMobile();

  return (
    <NavBar 
      items={navItems} 
      className={isMobile ? "w-full" : ""}
    />
  )
}
