"use client";

import { useDotButton } from "@/hooks/useDotButton";
import Autoplay from "embla-carousel-autoplay";
import Fade from "embla-carousel-fade";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import React, { useCallback } from "react";

interface CarouselProps {
  children: React.ReactNode;
  childrenQuantity?: number;
  setArrows?: boolean;
  setDots?: boolean;
  setLoop?: boolean;
  setAutoPlay?: boolean;
}

export function Carousel({
  children,
  setArrows = true,
  setDots = false,
  setLoop = true,
  setAutoPlay = false,
}: CarouselProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop: setLoop,
      align: "start",
      skipSnaps: false,
    },
    [
      Autoplay({
        playOnInit: setAutoPlay,
        delay: 4000,
        stopOnInteraction: false,
      }),
      Fade(),
    ],
  );

  const { selectedIndex, scrollSnaps, onDotButtonClick } =
    useDotButton(emblaApi);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  return (
    <div className="relative">
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex">{children}</div>
      </div>
      {setDots && (
        <div className="flex flex-row items-center justify-center gap-2">
          {scrollSnaps.map((_, index) => (
            <button
              key={index}
              onClick={() => onDotButtonClick(index)}
              className={`h-2 w-6 rounded-full duration-200 ${selectedIndex === index ? "bg-primary-500-main" : "bg-grayscale-200 hover:bg-primary-100"}`}
            />
          ))}
        </div>
      )}
      {setArrows && (
        <>
          <button
            className="absolute left-0 top-1/2 -translate-y-1/2 rounded-full bg-grayscale-200 p-2 text-grayscale-1000 hover:bg-grayscale-300"
            onClick={scrollPrev}
          >
            <ChevronLeft />
          </button>
          <button
            className="absolute right-0 top-1/2 -translate-y-1/2 rounded-full bg-grayscale-200 p-2 text-grayscale-1000 hover:bg-grayscale-300"
            onClick={scrollNext}
          >
            <ChevronRight />
          </button>
        </>
      )}
    </div>
  );
}
