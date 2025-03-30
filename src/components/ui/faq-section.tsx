
import { Check, PhoneCall } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";

function FAQ() {
  const faqItems = [
    {
      question: "Hur fungerar en AI-samtalsagent?",
      answer: "Vår AI-samtalsagent använder avancerad taligenkänning och naturligt språk för att förstå och svara på svenska. Den kan hantera allt från enkla frågor till komplexa konversationsflöden och bokar möten, hjälper kunder och kvalificerar leads automatiskt."
    },
    {
      question: "Kan AI-agenten integreras med vårt CRM-system?",
      answer: "Ja, vår lösning har inbyggda integrationer med populära CRM-system som Salesforce, HubSpot och många fler. Vi kan också bygga anpassade integrationer mot ert befintliga system för att säkerställa sömlösa arbetsflöden."
    },
    {
      question: "Hur lång tid tar det att implementera lösningen?",
      answer: "En standardimplementering tar vanligtvis 2-4 veckor från start till lansering. För mer komplexa lösningar med specialanpassade integrationer kan det ta 4-8 veckor. Vi erbjuder alltid en detaljerad tidsplan vid projektstart."
    },
    {
      question: "Hur säker är er AI-lösning?",
      answer: "Säkerhet är vår högsta prioritet. All data lagras inom EU enligt GDPR. Vi använder kryptering i världsklass och genomför regelbundna säkerhetstester. Vi undertecknar också databehandlingsavtal som säkerställer att era data hanteras korrekt."
    },
    {
      question: "Kan AI-agenten hantera olika svenska dialekter?",
      answer: "Ja, vår AI är tränad på ett brett spektrum av svenska dialekter och accenter. Den klarar av att förstå allt från skånska till norrländska med hög precision och kontinuerligt förbättras den genom maskininlärning."
    },
    {
      question: "Hur mäter vi ROI på AI-lösningen?",
      answer: "Vi erbjuder en omfattande analysplattform där ni kan se nyckeltal som samtalslängd, konverteringsgrad, kundnöjdhet och kostnadsbesparing. De flesta kunder ser positiv ROI inom 3-6 månader efter implementering."
    },
    {
      question: "Vad händer när AI-agenten inte kan svara på en fråga?",
      answer: "Vår AI är utformad för att känna igen sina begränsningar. När den inte kan svara på en fråga, kan den antingen eskalera samtalet till en mänsklig agent eller boka ett återuppringningssamtal, beroende på hur ni vill konfigurera systemet."
    },
    {
      question: "Erbjuder ni support efter implementering?",
      answer: "Absolut. Vi erbjuder olika supportnivåer inklusive 24/7-support för kritiska ärenden. Dessutom ingår kontinuerliga uppdateringar och förbättringar av AI-modellen baserat på verkliga samtal och feedback."
    }
  ];

  return (
    <div className="w-full py-20 lg:py-[45px]">
      <div className="w-full md:container md:px-6">
        <div className="grid lg:grid-cols-2 gap-10">
          <div className="flex gap-10 flex-col">
            <div className="flex gap-4 flex-col">
              <div className="flex gap-2 flex-col">
                <h4 className="text-4xl md:text-6xl tracking-tight max-w-xl text-left font-bold">
                  Vanliga frågor
                </h4>
                <p className="text-lg max-w-xl lg:max-w-lg leading-relaxed tracking-tight text-muted-foreground text-left">
                  Nedan hittar du svar på de vanligaste frågorna om våra AI-lösningar. 
                  Har du andra frågor är du välkommen att kontakta oss för mer information.
                </p>
              </div>
              <div className="">
                <Button 
                  className="gap-4" 
                  variant="outline"
                  data-cal-link="prata/20min"
                  data-cal-namespace="20min"
                  data-cal-config='{"layout":"month_view"}'
                >
                  Har du fler frågor? Boka möte <PhoneCall className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
          <Accordion type="single" collapsible className="w-full">
            {faqItems.map((item, index) => (
              <AccordionItem key={index} value={"index-" + index}>
                <AccordionTrigger>
                  {item.question}
                </AccordionTrigger>
                <AccordionContent>
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </div>
  );
}
export { FAQ };
