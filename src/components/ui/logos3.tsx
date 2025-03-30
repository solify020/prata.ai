"use client";

import AutoScroll from "embla-carousel-auto-scroll";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
interface Logo {
  id: string;
  description: string;
  image: string;
  className?: string;
}
interface Logos3Props {
  heading?: string;
  logos?: Logo[];
  className?: string;
}
const Logos3 = ({
  heading = "Våra Stolta Kunder",
  logos = [{
    id: "logo-1",
    description: "History Channel",
    image: "/lovable-uploads/155caaf2-38d6-4e35-ae04-fdbc1c523138.png",
    className: "h-10 w-auto"
  }, {
    id: "logo-2",
    description: "Playmobil",
    image: "/lovable-uploads/f972065f-0cdb-43c3-a75d-28219e8c7d80.png",
    className: "h-12 w-auto"
  }, {
    id: "logo-3",
    description: "SanDisk",
    image: "/lovable-uploads/ff2013f0-3ce5-43ff-8d4a-fd379a316538.png",
    className: "h-8 w-auto"
  }, {
    id: "logo-4",
    description: "H&M",
    image: "/lovable-uploads/613e6c7f-aad6-4218-a722-1581c40d459a.png",
    className: "h-10 w-auto"
  }, {
    id: "logo-5",
    description: "Uniqlo",
    image: "/lovable-uploads/660b1973-ee7b-493a-85df-e6fce274f5b7.png",
    className: "h-10 w-auto"
  }, {
    id: "logo-6",
    description: "Samsung",
    image: "/lovable-uploads/f9580fd2-28aa-4afb-8ef9-2f2dcfa95d61.png",
    className: "h-8 w-auto"
  }, {
    id: "logo-7",
    description: "Head & Shoulders",
    image: "/lovable-uploads/647196e5-a18f-4082-b4a6-97a362e8e017.png",
    className: "h-10 w-auto"
  }, {
    id: "logo-8",
    description: "Iron Maiden",
    image: "/lovable-uploads/3144598e-90c1-48d2-9f28-34efca992d58.png",
    className: "h-8 w-auto"
  }]
}: Logos3Props) => {
  return <section className="py-0">
      <div className="container flex flex-col items-center text-center">
        <h2 className="text-4xl font-bold text-center mb-8 py-[50px]">
          {heading}
        </h2>
      </div>
      <div className="pt-10 md:pt-16 lg:pt-20 py-[15px]">
        <div className="relative mx-auto flex items-center justify-center lg:max-w-5xl">
          <Carousel opts={{
          loop: true
        }} plugins={[AutoScroll({
          playOnInit: true,
          speed: 0.75 // Reduced speed by 25% (from default of 1.0)
        })]}>
            <CarouselContent className="ml-0">
              {logos.map(logo => <CarouselItem key={logo.id} className="flex basis-1/3 justify-center pl-0 sm:basis-1/4 md:basis-1/5 lg:basis-1/6">
                  <div className="mx-10 flex shrink-0 items-center justify-center">
                    <div>
                      <img src={logo.image} alt={logo.description} className={logo.className} />
                    </div>
                  </div>
                </CarouselItem>)}
            </CarouselContent>
          </Carousel>
          <div className="absolute inset-y-0 left-0 w-12 bg-gradient-to-r from-background to-transparent"></div>
          <div className="absolute inset-y-0 right-0 w-12 bg-gradient-to-l from-background to-transparent"></div>
        </div>
      </div>
    </section>;
};
export { Logos3 };