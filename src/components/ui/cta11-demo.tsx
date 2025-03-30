
import { Cta11 } from "@/components/ui/cta11";

const demoData = {
  heading: "Redo att förbättra er kundkommunikation?",
  description:
    "Anslut dig till hundratals svenska företag som använder Prata.ai för att automatisera och optimera sin kommunikation med kunder och prospects.",
  buttons: {
    primary: {
      text: "Boka Möte",
      url: "#" // Empty URL as we're using Cal.com integration
    },
    secondary: {
      text: "Mejla Oss",
      url: "https://www.prata.ai/om-oss"
    }
  }
};

function Cta11Demo() {
  return <Cta11 {...demoData} />;
}

export { Cta11Demo };
