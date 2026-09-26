
export const HERO_DATA = {
  rotatingWords: ["STARTE", "MEISTERE", "VERGRÖSSERE"],
  staticHeadline: "DEINEN ERFOLG",
  subheadline: "Bestandssicherung und Ausbau von Neukundengewinnung durch D2D & Direktvertrieb",
  primaryButtonText: "PROJEKTANFRAGE PRODUKTGEBER",
  secondaryButtonText: "WERDE TEIL DES TEAMS",
  // High quality office building background
  backgroundImageUrl: "/images/hero-bg-door-v2.jpg",
  // Restored original person image
  // Restored original person image with optimization params
  personImageUrl: "/images/team/milan-portrait.png",
  trustBadges: {
    googleRating: "4.8",
    googleStars: 5,
    // Using the uploaded file name as requested
    topCompanyBadgeUrl: "/Download.png",
    // Placeholders for other badge images. 
    kununuUrl: "/images/partners/kununu-badge.png",
    ihkUrl: "/images/partners/ihk-seal.png",
    provenExpertUrl: "https://www.provenexpert.com/img/pe-logo-black.svg"
  }
};

// Supplier brands (E.ON, Vattenfall, O2, Lekker …) were removed on purpose:
// no written permission to use their names/logos. The strip is currently not
// rendered on the homepage (see pages/Home.tsx).
export const PARTNER_LOGOS = [
  {
    src: "/images/partners/shrs-logo.png",
    alt: "SHRS D2D Akademie",
    width: 140
  }
];
