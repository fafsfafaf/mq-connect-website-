import React, { useEffect, useState } from 'react';
import { InfiniteSlider } from "./infinite-slider";
import { cn } from "../../lib/utils";

type Logo = {
  src: string;
  alt: string;
  width?: number;
  height?: number;
};

type LogoCloudProps = React.ComponentProps<"div"> & {
  logos: Logo[];
};

export function LogoCloud({ className, logos, ...props }: LogoCloudProps) {
  const [gap, setGap] = useState<number>(64);

  // Duplicate logos multiple times to ensure the slider always has enough content 
  // to loop seamlessly without empty spaces, even on large screens.
  // We duplicate it 4 times here.
  const repeatedLogos = [...logos, ...logos, ...logos, ...logos];

  useEffect(() => {
    const handleResize = () => {
      // Significantly reduce gap on mobile devices (< 768px)
      setGap(window.innerWidth < 768 ? 24 : 64);
    };

    // Set initial gap
    handleResize();

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div
      {...props}
      className={cn(
        "overflow-hidden py-6 [mask-image:linear-gradient(to_right,transparent,black,transparent)]",
        className
      )}
    >
      {/* Increased duration from 60 to 180 to significantly slow down the slider speed. 
          Increased durationOnHover to 360 to keep the slow-down effect on hover. */}
      <InfiniteSlider gap={gap} reverse duration={180} durationOnHover={360}>
        {repeatedLogos.map((logo, index) => (
          <div key={`logo-${logo.alt}-${index}`} className="flex items-center justify-center h-24 w-auto px-4 md:px-6">
            <img
              alt={logo.alt}
              className="pointer-events-none h-12 md:h-20 w-auto max-w-[140px] md:max-w-[200px] object-contain select-none transition-transform duration-300 hover:scale-110 rounded-xl drop-shadow-sm"
              height={logo.height || "auto"}
              loading="lazy"
              src={logo.src}
              width={logo.width || "auto"}
            />
          </div>
        ))}
      </InfiniteSlider>
    </div>
  );
}