import { useCallback, useEffect } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import DestinationCard from "@/components/DestinationCard";
import { useState } from "react";

interface Destination {
  title: string;
  location: string;
  description: string;
  image: string;
  category: string;
  rating: number;
}

interface DestinationCarouselProps {
  destinations: Destination[];
  onViewAR: (title: string) => void;
}

const DestinationCarousel = ({ destinations, onViewAR }: DestinationCarouselProps) => {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);

  const scrollNext = useCallback(() => {
    if (api) {
      api.scrollNext();
    }
  }, [api]);

  useEffect(() => {
    if (!api) {
      return;
    }

    setCurrent(api.selectedScrollSnap());

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });

    // Auto-scroll every 5 seconds
    const autoScroll = setInterval(() => {
      scrollNext();
    }, 5000);

    return () => clearInterval(autoScroll);
  }, [api, scrollNext]);

  return (
    <div className="relative">
      <Carousel
        setApi={setApi}
        className="w-full"
        opts={{
          align: "start",
          loop: true,
        }}
      >
        <CarouselContent className="-ml-4">
          {destinations.map((destination, index) => (
            <CarouselItem key={index} className="pl-4 md:basis-1/2 lg:basis-1/3">
              <DestinationCard
                {...destination}
                onViewAR={() => onViewAR(destination.title)}
              />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="left-4" />
        <CarouselNext className="right-4" />
      </Carousel>

      {/* Dots Indicator */}
      <div className="flex justify-center mt-6 space-x-2">
        {destinations.map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === current
                ? "bg-primary scale-110"
                : "bg-muted-foreground/30 hover:bg-muted-foreground/50"
            }`}
            onClick={() => api?.scrollTo(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default DestinationCarousel;