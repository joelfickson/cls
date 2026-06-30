"use client";

import { useEffect, useState } from "react";
import { ArticleBody } from "../components/article";

// Stable route: identical content arriving on the identical schedule, but every
// slot reserves its space before the content lands. The boxes never change
// size, so nothing below them moves and CLS stays at 0.

export default function StablePage() {
  const [showPromo, setShowPromo] = useState(false);
  const [showImage, setShowImage] = useState(false);
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    const timers = [
      setTimeout(() => setShowPromo(true), 500),
      setTimeout(() => setShowImage(true), 900),
      setTimeout(() => setShowBanner(true), 1300),
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <div className="flex flex-col gap-8">
      <p className="text-sm text-zinc-500 dark:text-zinc-400">
        Same elements, same delays. Each slot holds its height from first paint,
        so the content fills in without moving anything.
      </p>

      {/* Banner slot: fixed height reserved up front, content fades in. */}
      <div className="h-[52px]">
        {showBanner && (
          <div className="flex h-full items-center rounded-xl border border-amber-300 bg-amber-50 px-4 text-sm text-amber-900 dark:border-amber-500/40 dark:bg-amber-500/10 dark:text-amber-200">
            We use cookies to improve your experience. By staying you agree to
            our policy.
          </div>
        )}
      </div>

      {/* Promo slot: reserved height, content fades in. */}
      <div className="h-[56px]">
        {showPromo && (
          <div className="flex h-full items-center rounded-xl bg-zinc-900 px-5 text-sm text-zinc-50 dark:bg-white dark:text-zinc-900">
            Limited offer: upgrade this quarter and save 20%.
          </div>
        )}
      </div>

      {/* Image slot: reserved aspect ratio, image fades in to fill it. */}
      <div className="relative h-60 w-full overflow-hidden rounded-xl bg-zinc-200 dark:bg-zinc-800">
        {showImage && (
          <div className="absolute inset-0 bg-gradient-to-br from-sky-400 to-indigo-500" />
        )}
      </div>

      <ArticleBody />
    </div>
  );
}
