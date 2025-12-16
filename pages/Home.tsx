import React, { Suspense } from 'react';
import { HeroSection } from '../components/home/HeroSection';
import { PartnerLogosSection } from '../components/home/PartnerLogosSection';

// Dynamically import heavy sections below the fold
const ExtendedSections = React.lazy(() => import('../components/home/ExtendedSections').then(module => ({ default: module.ExtendedSections })));
const VideoReelsSection = React.lazy(() => import('../components/home/VideoReelsSection').then(module => ({ default: module.VideoReelsSection })));
const CTASection = React.lazy(() => import('../components/home/CTASection').then(module => ({ default: module.CTASection })));

export const Home: React.FC = () => {
  return (
    <div className="space-y-0 flex flex-col">
      {/* Eager load Hero and Logos for LCP */}
      <HeroSection />
      <PartnerLogosSection />
      
      {/* Lazy load remaining content */}
      <Suspense fallback={<div className="h-96" />}>
        <ExtendedSections />
        <VideoReelsSection />
        <CTASection />
      </Suspense>
    </div>
  );
};