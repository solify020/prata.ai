
import { Testimonials } from "@/components/ui/testimonials"

const testimonials = [
  {
    image: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=1780&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    text: 'Prata.ai har revolutionerat vår kundtjänst. Deras AI-agenter hanterar 70% av våra inkommande samtal perfekt.',
    name: 'Anna Lindberg',
    username: '@TeliaSverige',
    social: 'https://twitter.com'
  },
  {
    image: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?q=80&w=1780&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    text: 'Implementeringen av Prata.ai har drastiskt ökat vår försäljningsteams effektivitet. Konverteringsgraden har ökat med 35%.',
    name: 'Erik Johansson',
    username: '@VolvoGroup',
    social: 'https://twitter.com'
  },
  {
    image: 'https://i.imgur.com/kaDy9hV.jpeg',
    text: 'Deras AI-lösning för rekryteringsscreening har sparat oss hundratals timmar och förbättrat kvaliteten på våra kandidater.',
    name: 'Lina Berglund',
    username: '@IkeaSverige',
    social: 'https://twitter.com'
  },
  {
    image: 'https://i.imgur.com/cRwFxtE.png',
    text: 'Integrationen med vårt befintliga CRM-system var sömlös. Otroligt professionellt team och fantastisk produkt.',
    name: 'Johan Ericsson',
    username: '@SpotifySE',
    social: 'https://twitter.com'
  },
  {
    image: 'https://i.imgur.com/TQIqsob.png',
    text: 'Prata.ai:s chatbot har ökat vår kundnöjdhet med 40%. Bästa investeringen vi gjort för vår digitala närvaro.',
    name: 'Sofia Ekström',
    username: '@SEB_Bank',
    social: 'https://twitter.com'
  },
  {
    image: 'https://i.imgur.com/3ROmJ0S.png',
    text: 'Den svenska rösten i deras AI låter helt naturlig. Våra kunder kan knappt märka skillnad från en mänsklig agent.',
    name: 'Magnus Karlsson',
    username: '@SKF_Group',
    social: 'https://twitter.com'
  },
  {
    image: 'https://i.imgur.com/6fKCuVC.png',
    text: 'Supporten från Prata.ai har varit exceptionell. De anpassade AI-agenten perfekt efter våra specifika branschbehov.',
    name: 'Astrid Nilsson',
    username: '@ScaniaSverige',
    social: 'https://twitter.com'
  },
  {
    image: 'https://i.imgur.com/Jjqe7St.png',
    text: 'Vi har ökat våra bokningar med 45% sedan vi implementerade Prata.ai:s samtalsagent för vår tidbokning.',
    name: 'Peter Lundgren',
    username: '@SASAirlines',
    social: 'https://twitter.com'
  },
  {
    image: 'https://i.imgur.com/bG88vHI.png',
    text: 'Att kunna hantera kundtjänst 24/7 med Prata.ai har lett till en dramatisk förbättring av vår kundnöjdhet.',
    name: 'Malin Andersson',
    username: '@Electrolux',
    social: 'https://twitter.com'
  },
  {
    image: 'https://i.imgur.com/tjmS77j.png',
    text: 'Den inbyggda analysfunktionen ger oss värdefulla insikter om kundernas behov som vi aldrig tidigare haft tillgång till.',
    name: 'Oscar Svensson',
    username: '@H&M_Sverige',
    social: 'https://twitter.com'
  },
  {
    image: 'https://i.imgur.com/yTsomza.png',
    text: 'Prata.ai:s förmåga att hantera svenska dialekter är imponerande. Fungerar utmärkt för kunder från hela landet.',
    name: 'Emma Bergström',
    username: '@PostNord',
    social: 'https://twitter.com'
  },
  {
    image: 'https://i.imgur.com/pnsLqpq.png',
    text: 'ROI på Prata.ai:s lösning översteg våra förväntningar redan efter 3 månader. Rekommenderas varmt!',
    name: 'Lars Wikström',
    username: '@EricsssonAB',
    social: 'https://twitter.com'
  }
];

export function TestimonialsDemo() {
  return (
    <div className="mobile-container mx-auto py-10">
      <Testimonials 
        testimonials={testimonials} 
        title="Vad våra kunder säger"
        description="Läs vad svenska företag tycker om våra AI-lösningar"
      />
    </div>
  )
}
