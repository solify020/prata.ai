
import { TopNavBackdrop } from "@/components/TopNavBackdrop";
import { Hero } from "@/components/ui/hero-with-image-text-and-two-buttons";
import { Logos3 } from "@/components/ui/logos3";
import { FeaturesSectionWithHoverEffects } from "@/components/ui/feature-section-with-hover-effects";
import { AnimatedBeamDemo } from "@/components/ui/animated-beam-demo";
import { IconCloudDemo } from "@/components/ui/icon-cloud-demo";
import { TestimonialsDemo } from "@/components/ui/testimonials-demo";
import { ContactSectionDemo } from "@/components/ui/contact-section-demo";
import { FAQDemo } from "@/components/ui/faq-demo";
import { Cta11Demo } from "@/components/ui/cta11-demo";
import { FooterDemo } from "@/components/ui/footer-demo";
import PathwaysSVG from "@/components/PathwaysSVG";
const Index = () => {
  return (
    <div className="min-h-screen w-full bg-background overflow-x-hidden">
      <TopNavBackdrop />
      <section id="hem">
        <Hero />
      </section>
      <Logos3 />
      <section id="tjanster">
        <div className="mobile-container mx-auto mt-8 my-[50px]">
          <h2 className="text-4xl font-bold text-center mb-8 py-[50px]">Våra Specialiteter</h2>
          <FeaturesSectionWithHoverEffects />
        </div>
      </section>
      <section id="pathways">
        <div className="mx-auto mt-16 mb-16 absolute left-0 w-[100vw]">
          <PathwaysSVG />
        </div>
      </section>
      <div className="mobile-container mx-auto mb-16" style={{ marginTop: window.innerWidth >= 480 ? '50vw' : '300vw' }}>
        <h2 className="text-4xl font-bold text-center mb-12">Sömlösa Integrationer</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="w-full h-full">
            <AnimatedBeamDemo />
          </div>
          <div className="w-full h-full">
            <IconCloudDemo />
          </div>
        </div>
      </div>
      <section id="kundcase">
        <TestimonialsDemo />
      </section>
      <section id="kontakt">
        <div className="w-full">
          <ContactSectionDemo />
        </div>
      </section>
      <section id="fragor">
        <div className="w-full">
          <FAQDemo />
        </div>
      </section>
      <Cta11Demo />
      <FooterDemo />
    </div>
  );
}

export default Index;
