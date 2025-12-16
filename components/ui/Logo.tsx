import React, { useState } from 'react';

interface LogoProps {
  className?: string;
  imgClassName?: string;
}

export const Logo: React.FC<LogoProps> = ({ className = "", imgClassName = "" }) => {
  const [hasError, setHasError] = useState(false);

  const logoPath = "https://ffrthxboliylsnbkxtmj.supabase.co/storage/v1/object/public/Images/mq-logo.png?transform=w_200&format=webp&q=100";

  if (hasError) {
    return (
      <div className={`flex items-center justify-center w-full h-full bg-slate-50 ${className}`}>
        {/* Fallback: Ein Platzhalter Text, falls das Bild technisch nicht lädt */}
        <span className="font-black text-slate-900 text-lg tracking-tighter">MQ</span>
      </div>
    );
  }

  return (
    <img
      src={logoPath}
      alt="MQ Connect Logo"
      className={imgClassName || className}
      onError={() => setHasError(true)}
      loading="eager"
    />
  );
};