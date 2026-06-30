# CLS demo

A small Next.js app that demonstrates Cumulative Layout Shift (CLS) side by side. Two routes render the same article with the same late-arriving elements, but one reserves space for them and one does not. A live meter reads CLS straight from the browser as you watch.

- **Live demo:** https://cls-demo-seven.vercel.app/
- **Companion guide:** Improve Cumulative Layout Shift (CLS) on Vercel

## Routes

- `/` — overview and links to the two demo routes.
- `/janky` — a cookie banner, a promo block, and an image mount after load into the normal flow with no reserved space. Each one pushes the article down, so the meter climbs into the red.
- `/stable` — the same elements on the same schedule, but each sits in a slot that holds its height from first paint. Nothing moves and the meter stays at 0.000.

The only difference between the two routes is whether space is reserved, which is the whole point: reserve the space before the content arrives.

## The live CLS meter

`app/components/cls-meter.tsx` is a client component that reads layout shifts from the browser's [Layout Instability API](https://developer.mozilla.org/en-US/docs/Web/API/Layout_Instability_API) via `PerformanceObserver`. It applies the same session-window math as the field metric (the largest burst of shifts each less than 1s apart, capped at a 5s window) and color-codes the value against the 0.1 and 0.25 thresholds. It resets on each route so every run starts clean.

This is the same signal Vercel Speed Insights reports from real users.

## Speed Insights

`<SpeedInsights />` from [`@vercel/speed-insights`](https://vercel.com/docs/speed-insights) is mounted in the root layout. Locally it runs in debug mode and logs to the console without sending data. To report field CLS to the dashboard:

1. In the Vercel dashboard, open the project, go to **Speed Insights**, and click **Enable**.
2. Deploy. Once real visitors hit `/janky` and `/stable`, CLS shows up per route.

Query it from the CLI once data is flowing:

```bash
vercel metrics vercel.speed_insights.cls -a p75 --group-by route \
  -f "environment eq 'production'" --since 7d --project <your-project> --format json
```

`/janky` reads poor at P75; `/stable` reads good.

## Run locally

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000). To demo: reload `/janky` and watch the meter spike, then reload `/stable` and watch it hold at 0.

```bash
pnpm build   # production build
```

## Stack

Next.js 16 (App Router) · React 19 · Tailwind CSS v4 · `@vercel/speed-insights`.
