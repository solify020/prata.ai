
import { NavBarDemo } from "@/components/NavBarDemo";
import { ContactUsButton } from "@/components/ContactUsButton";
import { Logo } from "@/components/Logo";

const Resume = () => {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-background">
      <Logo />
      <NavBarDemo />
      <ContactUsButton />
      <div className="animate-fade-in">
        <h1 className="text-4xl font-bold mb-4">Resume</h1>
        <p className="text-xl text-foreground/70">Resume page content will go here</p>
      </div>
    </div>
  );
};

export default Resume;
