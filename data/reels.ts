
export interface Reel {
  id: string;
  src: string;
  poster?: string;
  title: string;
  subtitle: string;
}

// NOTE: These are reliable placeholder video URLs (Mixkit).
// For production, replace 'src' with local paths like '/videos/team.mp4' 
// or host them on a high-performance CDN.

export const REELS_DATA: Reel[] = [
  {
    id: '1',
    // Team meeting / Office vibe - Updated to Milan
    src: 'https://ffrthxboliylsnbkxtmj.supabase.co/storage/v1/object/public/Videos/milan.mp4',
    title: 'Team Spirit',
    subtitle: 'Gemeinsam Ziele erreichen'
  },
  {
    id: '2',
    // Walking / City / Business - Updated to FabianDurek
    src: 'https://ffrthxboliylsnbkxtmj.supabase.co/storage/v1/object/public/Videos/FabianDurek.mp4',
    title: 'Daily Business',
    subtitle: 'Unterwegs für unsere Kunden'
  }
];