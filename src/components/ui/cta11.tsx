
import { Button } from "@/components/ui/button";
import { ShootingStars } from "@/components/ui/shooting-stars";
import { PhoneCall } from "lucide-react";
import { cn } from "@/lib/utils";

interface Cta11Props {
  heading: string;
  description: string;
  buttons?: {
    primary?: {
      text: string;
      url: string;
    };
    secondary?: {
      text: string;
      url: string;
    };
  };
}

const Cta11 = ({
  heading = "Ready to Get Started?",
  description = "Join thousands of satisfied customers using our platform to build amazing websites.",
  buttons = {
    primary: {
      text: "Get Started",
      url: "https://www.shadcnblocks.com"
    },
    secondary: {
      text: "Learn More",
      url: "https://www.shadcnblocks.com"
    }
  }
}: Cta11Props) => {
  return <section className="py-[50px]">
      <div className="mobile-container flex items-center justify-center">
        <div className="flex flex-col items-center rounded-lg bg-black p-8 text-center md:rounded-xl lg:p-16 relative overflow-hidden w-full">
          {/* Background with stars */}
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.15)_0%,rgba(0,0,0,0)_80%)]" />
            <div className="stars absolute inset-0" />
          </div>
          
          {/* Multiple shooting star layers with different colors and speeds */}
          <ShootingStars starColor="#9E00FF" trailColor="#2EB9DF" minSpeed={15} maxSpeed={35} minDelay={1000} maxDelay={3000} />
          <ShootingStars starColor="#FF0099" trailColor="#FFB800" minSpeed={10} maxSpeed={25} minDelay={2000} maxDelay={4000} />
          <ShootingStars starColor="#00FF9E" trailColor="#00B8FF" minSpeed={20} maxSpeed={40} minDelay={1500} maxDelay={3500} />
          
          {/* Content with z-index to appear above the background */}
          <h3 className="mb-3 max-w-3xl text-2xl font-semibold md:mb-4 md:text-4xl lg:mb-6 relative z-10 text-white">
            {heading}
          </h3>
          <p className="mb-8 max-w-3xl text-gray-300 lg:text-lg relative z-10">
            {description}
          </p>
          <div className="flex w-full flex-col justify-center gap-2 sm:flex-row relative z-10">
            {buttons.secondary && <Button variant="outline" className="w-full sm:w-auto" asChild>
                <a href={buttons.secondary.url}>{buttons.secondary.text}</a>
              </Button>}
            {buttons.primary && 
              <Button 
                className="w-full sm:w-auto gap-4"
                data-cal-link="prata/20min"
                data-cal-namespace="20min"
                data-cal-config='{"layout":"month_view"}'
              >
                {buttons.primary.text} <PhoneCall className="w-4 h-4" />
              </Button>
            }
          </div>
          
          <style>
            {`
            .stars {
              background-image: 
                radial-gradient(2px 2px at 20px 30px, #eee, rgba(0,0,0,0)),
                radial-gradient(2px 2px at 40px 70px, #fff, rgba(0,0,0,0)),
                radial-gradient(2px 2px at 50px 160px, #ddd, rgba(0,0,0,0)),
                radial-gradient(2px 2px at 90px 40px, #fff, rgba(0,0,0,0)),
                radial-gradient(2px 2px at 130px 80px, #fff, rgba(0,0,0,0)),
                radial-gradient(2px 2px at 160px 120px, #ddd, rgba(0,0,0,0));
              background-repeat: repeat;
              background-size: 200px 200px;
              animation: twinkle 5s ease-in-out infinite;
              opacity: 0.5;
            }

            @keyframes twinkle {
              0% { opacity: 0.5; }
              50% { opacity: 0.8; }
              100% { opacity: 0.5; }
            }
            `}
          </style>
        </div>
      </div>
    </section>;
};
export { Cta11 };
