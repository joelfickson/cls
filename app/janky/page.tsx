"use client";

import { useEffect, useState } from "react";
import { ArticleBody } from "../components/article";

// Janky route: the banner, promo, and image are inserted into the normal flow
// after load with no space reserved for them. Each arrival pushes the content
// below it down, and the shifts accrue on the CLS meter.

export default function JankyPage() {
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
        Reload and watch the meter. Nothing reserves space, so each late element
        shoves the article down.
      </p>

      {/* In-flow banner inserted at the top: pushes everything below it down. */}
      {showBanner && (
        <div className="rounded-xl border border-amber-300 bg-amber-50 px-4 py-3 text-sm text-amber-900 dark:border-amber-500/40 dark:bg-amber-500/10 dark:text-amber-200">
          We use cookies to improve your experience. By staying you agree to our
          policy.
        </div>
      )}

      {/* Promo block inserted above the article. */}
      {showPromo && (
        <div className="rounded-xl bg-zinc-900 px-5 py-4 text-sm text-zinc-50 dark:bg-white dark:text-zinc-900">
          Limited offer: upgrade this quarter and save 20%.
        </div>
      )}

      {/* Image with no reserved height: 0px until it "loads", then 240px. */}
      <div>
        {showImage && (
          <div className="h-60 w-full rounded-xl bg-gradient-to-br from-sky-400 to-indigo-500" />
        )}
      </div>

      <ArticleBody />
    </div>
  );
}
