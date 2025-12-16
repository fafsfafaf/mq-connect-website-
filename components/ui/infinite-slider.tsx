'use client';
import { cn } from '../../lib/utils';
import { useMotionValue, animate, motion } from 'framer-motion';
import React, { useState, useEffect, useRef } from 'react';

type InfiniteSliderProps = {
  children?: React.ReactNode;
  gap?: number;
  duration?: number;
  durationOnHover?: number;
  direction?: 'horizontal' | 'vertical';
  reverse?: boolean;
  className?: string;
};

export function InfiniteSlider({
  children,
  gap = 16,
  duration = 25,
  durationOnHover,
  direction = 'horizontal',
  reverse = false,
  className,
}: InfiniteSliderProps) {
  const [currentDuration, setCurrentDuration] = useState(duration);
  const containerRef = useRef<HTMLDivElement>(null);
  
  // State for measured dimensions
  const [size, setSize] = useState({ width: 0, height: 0 });

  // Manual ResizeObserver implementation to avoid "Loop completed with undelivered notifications"
  useEffect(() => {
    if (!containerRef.current) return;

    const observer = new ResizeObserver((entries) => {
      // Wrap in requestAnimationFrame to decouple from current paint cycle
      window.requestAnimationFrame(() => {
        if (!entries[0]) return;
        
        // Round values to integers to prevent sub-pixel layout thrashing loops
        const newWidth = Math.round(entries[0].contentRect.width);
        const newHeight = Math.round(entries[0].contentRect.height);

        setSize((prev) => {
          // Only update state if values actually changed
          if (prev.width === newWidth && prev.height === newHeight) return prev;
          return { width: newWidth, height: newHeight };
        });
      });
    });

    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  const translation = useMotionValue(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [key, setKey] = useState(0);

  const { width, height } = size;

  useEffect(() => {
    let controls: any;
    const sizeDimension = direction === 'horizontal' ? width : height;
    
    // Don't animate if size is 0
    if (sizeDimension === 0) return;

    const contentSize = sizeDimension + gap;
    const from = reverse ? -contentSize / 2 : 0;
    const to = reverse ? 0 : -contentSize / 2;

    if (isTransitioning) {
      controls = animate(translation, [translation.get(), to], {
        ease: 'linear',
        duration:
          currentDuration * Math.abs((translation.get() - to) / contentSize),
        onComplete: () => {
          setIsTransitioning(false);
          setKey((prevKey) => prevKey + 1);
        },
      });
    } else {
      controls = animate(translation, [from, to], {
        ease: 'linear',
        duration: currentDuration,
        repeat: Infinity,
        repeatType: 'loop',
        repeatDelay: 0,
        onRepeat: () => {
          translation.set(from);
        },
      });
    }

    return controls?.stop;
  }, [
    key,
    translation,
    currentDuration,
    width,
    height,
    gap,
    isTransitioning,
    direction,
    reverse,
  ]);

  const hoverProps = durationOnHover
    ? {
        onHoverStart: () => {
          setIsTransitioning(true);
          setCurrentDuration(durationOnHover);
        },
        onHoverEnd: () => {
          setIsTransitioning(true);
          setCurrentDuration(duration);
        },
      }
    : {};

  return (
    <div className={cn('overflow-hidden', className)}>
      <motion.div
        className='flex w-max'
        style={{
          ...(direction === 'horizontal'
            ? { x: translation }
            : { y: translation }),
          gap: `${gap}px`,
          flexDirection: direction === 'horizontal' ? 'row' : 'column',
          // SAFARI FIX: Promote to layer to prevent stutter during transform
          transform: 'translateZ(0)',
          willChange: 'transform' 
        }}
        ref={containerRef}
        {...hoverProps}
      >
        {children}
        {children}
      </motion.div>
    </div>
  );
}