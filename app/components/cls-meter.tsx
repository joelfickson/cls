"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

// A live Cumulative Layout Shift readout. It mirrors how the field metric is
// computed: CLS is the largest "session window" of layout shifts, where a
// window is a run of shifts each less than 1s apart, capped at 5s total.
// See the Layout Instability API and web.dev's CLS definition.

type LayoutShift = PerformanceEntry & {
  value: number;
  hadRecentInput: boolean;
};

function rating(cls: number): { label: string; className: string } {
  if (cls <= 0.1) return { label: "Good", className: "bg-emerald-500" };
  if (cls <= 0.25) return { label: "Needs improvement", className: "bg-amber-500" };
  return { label: "Poor", className: "bg-red-500" };
}

export function ClsMeter() {
  const pathname = usePathname();
  const [cls, setCls] = useState(0);

  // Session-window accumulators, reset whenever the route changes so each
  // demo page starts from a clean slate.
  const sessionValue = useRef(0);
  const firstTs = useRef(0);
  const lastTs = useRef(0);

  useEffect(() => {
    setCls(0);
    sessionValue.current = 0;
    firstTs.current = 0;
    lastTs.current = 0;

    if (typeof PerformanceObserver === "undefined") return;

    let max = 0;
    const observer = new PerformanceObserver((list) => {
      for (const entry of list.getEntries() as LayoutShift[]) {
        if (entry.hadRecentInput) continue; // expected shift, ignored

        const ts = entry.startTime;
        if (
          sessionValue.current &&
          ts - lastTs.current < 1000 &&
          ts - firstTs.current < 5000
        ) {
          sessionValue.current += entry.value;
          lastTs.current = ts;
        } else {
          sessionValue.current = entry.value;
          firstTs.current = ts;
          lastTs.current = ts;
        }

        if (sessionValue.current > max) {
          max = sessionValue.current;
          setCls(max);
        }
      }
    });

    try {
      observer.observe({ type: "layout-shift", buffered: true });
    } catch {
      // layout-shift not supported in this browser
    }

    return () => observer.disconnect();
  }, [pathname]);

  const r = rating(cls);

  return (
    <div className="fixed bottom-4 right-4 z-50 select-none">
      <div className="flex items-center gap-3 rounded-xl border border-black/10 bg-white/90 px-4 py-3 shadow-lg backdrop-blur dark:border-white/15 dark:bg-zinc-900/90">
        <span className={`h-3 w-3 shrink-0 rounded-full ${r.className}`} />
        <div className="flex flex-col leading-tight">
          <span className="font-mono text-xl font-semibold tabular-nums text-zinc-900 dark:text-zinc-50">
            {cls.toFixed(3)}
          </span>
          <span className="text-xs text-zinc-500 dark:text-zinc-400">
            live CLS · {r.label}
          </span>
        </div>
      </div>
    </div>
  );
}
