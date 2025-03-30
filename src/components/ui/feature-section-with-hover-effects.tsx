
import { cn } from "@/lib/utils";
import { 
  IconPhone, 
  IconMessage, 
  IconUsers, 
  IconCloud, 
  IconSettings, 
  IconHeadset, 
  IconBriefcase, 
  IconBulb 
} from "@tabler/icons-react";

export function FeaturesSectionWithHoverEffects() {
  const features = [{
    title: "AI-samtalsagenter",
    description: "Svenskbyggda röstassistenter som hanterar försäljning, kundtjänst och tidsbokningar automatiskt.",
    icon: <IconPhone className="text-slate-50" />
  }, {
    title: "Avancerade chatbots",
    description: "Förbättra kundupplevelsen på din webbplats med intelligenta chatbots på svenska.",
    icon: <IconMessage className="text-slate-50" />
  }, {
    title: "Automatiserad rekrytering",
    description: "Låt vår AI hantera första screening-samtalen och frigör tid för HR-teamet.",
    icon: <IconUsers className="text-slate-50" />
  }, {
    title: "Molnbaserade lösningar",
    description: "99,9% upptid garanterad med våra säkra och pålitliga molntjänster.",
    icon: <IconCloud className="text-slate-50" />
  }, {
    title: "Sömlös integration",
    description: "Enkel koppling mot dina befintliga system som CRM, ERP och bokningssystem.",
    icon: <IconSettings className="text-slate-50" />
  }, {
    title: "24/7 Kundservice",
    description: "Vår AI hanterar kundtjänstsamtal dygnet runt, året om - utan raster.",
    icon: <IconHeadset className="text-slate-50" />
  }, {
    title: "B2B-expertis",
    description: "Byggd av entreprenörer för entreprenörer med fokus på affärsnytta.",
    icon: <IconBriefcase className="text-slate-50" />
  }, {
    title: "Skräddarsydda lösningar",
    description: "Vi anpassar AI-tekniken efter just ditt företags unika behov och utmaningar.",
    icon: <IconBulb className="text-slate-50" />
  }];
  return <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 relative z-10 py-10 max-w-7xl mx-auto">
      {features.map((feature, index) => <Feature key={feature.title} {...feature} index={index} />)}
    </div>;
}

const Feature = ({
  title,
  description,
  icon,
  index
}: {
  title: string;
  description: string;
  icon: React.ReactNode;
  index: number;
}) => {
  return <div className={cn("flex flex-col lg:border-r py-10 relative group/feature dark:border-neutral-800", (index === 0 || index === 4) && "lg:border-l dark:border-neutral-800", index < 4 && "lg:border-b dark:border-neutral-800")}>
      {index < 4 && <div className="opacity-0 group-hover/feature:opacity-100 transition duration-200 absolute inset-0 h-full w-full bg-gradient-to-t from-[#09090b] to-[#252525] pointer-events-none" />}
      {index >= 4 && <div className="opacity-0 group-hover/feature:opacity-100 transition duration-200 absolute inset-0 h-full w-full bg-gradient-to-b from-[#252525] to-[#09090b] pointer-events-none" />}
      <div className="mb-4 relative z-10 px-10 text-slate-50">
        {icon}
      </div>
      <div className="text-lg font-bold mb-2 relative z-10 px-10">
        <div className="absolute left-0 inset-y-0 h-6 group-hover/feature:h-8 w-1 rounded-tr-full rounded-br-full bg-neutral-300 dark:bg-neutral-700 group-hover/feature:bg-blue-500 transition-all duration-200 origin-center" />
        <span className="group-hover/feature:translate-x-2 transition duration-200 inline-block text-slate-50">
          {title}
        </span>
      </div>
      <p className="text-sm max-w-xs relative z-10 px-10 text-slate-50">
        {description}
      </p>
    </div>;
};
