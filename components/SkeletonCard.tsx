import React from 'react';

export const SkeletonCard = () => {
  return (
    <div className="absolute inset-0 bg-black overflow-hidden">
      {/* Background Image Placeholder */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 animate-pulse" />
      <div className="absolute top-[20%] left-[-10%] w-[60%] h-[60%] rounded-full bg-white/5 blur-[100px]" />

      {/* Header area placeholder */}
      <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-black/60 to-transparent" />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent" />

      {/* Bottom content — matches PlaceCard layout */}
      <div className="absolute bottom-0 left-0 right-0 px-6 pb-36 pt-12 flex flex-col">
        {/* Tags */}
        <div className="flex gap-1.5 mb-3">
          <div className="h-5 w-16 bg-white/15 rounded-full animate-pulse" />
          <div className="h-5 w-14 bg-white/15 rounded-full animate-pulse" />
          <div className="h-5 w-12 bg-white/10 rounded-full animate-pulse" />
        </div>

        {/* Title */}
        <div className="h-10 w-3/4 bg-white/20 rounded-xl animate-pulse mb-2" />

        {/* Location */}
        <div className="flex items-center gap-1.5 mb-3">
          <div className="h-3 w-3 bg-white/15 rounded-full animate-pulse" />
          <div className="h-3 w-32 bg-white/15 rounded-full animate-pulse" />
        </div>

        {/* Description */}
        <div className="border-l-2 border-white/20 pl-3 space-y-1.5 mb-6">
          <div className="h-3 w-full bg-white/10 rounded-full animate-pulse" />
          <div className="h-3 w-4/5 bg-white/10 rounded-full animate-pulse" />
        </div>

        {/* Action Buttons — matches GEÇ / KAYDET layout */}
        <div className="flex items-center gap-3 h-14">
          <div className="flex-1 h-full bg-white/10 rounded-2xl border border-white/10 animate-pulse" />
          <div className="flex-1 h-full bg-white/25 rounded-2xl animate-pulse" />
        </div>
      </div>

      {/* Subtle loading indicator */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-3 opacity-30">
        <div className="w-8 h-8 border-2 border-white/40 border-t-white rounded-full animate-spin" />
        <p className="text-[9px] font-mono tracking-[0.25em] uppercase text-white/60">Yükleniyor</p>
      </div>
    </div>
  );
};
