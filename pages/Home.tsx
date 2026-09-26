import React, { Suspense } from 'react';
import { HeroSection } from '../components/home/HeroSection';

// Dynamically import heavy sections below the fold
const ExtendedSections = React.lazy(() => import('../components/home/ExtendedSections').then(module => ({ default: module.ExtendedSections })));
const VideoReelsSection = React.lazy(() => import('../components/home/VideoReelsSection').then(module => ({ default: module.VideoReelsSection })));
const CTASection = React.lazy(() => import('../components/home/CTASection').then(module => ({ default: module.CTASection })));

export const Home: React.FC = () => {
  return (
    <div className="space-y-0 flex flex-col">
      {/* Eager load Hero for LCP. The partner logo strip was removed: showing
          supplier brands without written permission risks a cease-and-desist. */}
      <HeroSection />

      {/* Lazy load remaining content */}
      <Suspense fallback={<div className="h-96" />}>
        <ExtendedSections />
        <VideoReelsSection />
        <CTASection />
      </Suspense>
    </div>
  );
};