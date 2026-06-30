import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col gap-10">
      <section>
        <h1 className="text-4xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
          Cumulative Layout Shift, side by side
        </h1>
        <p className="mt-4 max-w-xl text-lg leading-8 text-zinc-600 dark:text-zinc-400">
          Two routes render the same article with the same late-arriving
          elements: a cookie banner, a promo block, and an image. One reserves
          space for them, one does not. Watch the live CLS meter in the bottom
          corner as each page loads.
        </p>
      </section>

      <div className="grid gap-4 sm:grid-cols-2">
        <Link
          href="/janky"
          className="group rounded-2xl border border-black/10 bg-white p-6 transition-colors hover:border-red-400 dark:border-white/15 dark:bg-zinc-900"
        >
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-red-500" />
            <h2 className="text-xl font-semibold">Janky route</h2>
          </div>
          <p className="mt-2 text-sm leading-6 text-zinc-600 dark:text-zinc-400">
            No reserved space. The banner, promo, and image all push content
            down as they arrive. The meter climbs into the red.
          </p>
          <span className="mt-4 inline-block text-sm font-medium text-red-600 group-hover:underline dark:text-red-400">
            Open /janky
          </span>
        </Link>

        <Link
          href="/stable"
          className="group rounded-2xl border border-black/10 bg-white p-6 transition-colors hover:border-emerald-400 dark:border-white/15 dark:bg-zinc-900"
        >
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-500" />
            <h2 className="text-xl font-semibold">Stable route</h2>
          </div>
          <p className="mt-2 text-sm leading-6 text-zinc-600 dark:text-zinc-400">
            Same content, same delays, but every slot reserves its space up
            front. Nothing moves and the meter stays at 0.000.
          </p>
          <span className="mt-4 inline-block text-sm font-medium text-emerald-600 group-hover:underline dark:text-emerald-400">
            Open /stable
          </span>
        </Link>
      </div>

      <section className="rounded-2xl border border-black/10 bg-white p-6 text-sm leading-6 text-zinc-600 dark:border-white/15 dark:bg-zinc-900 dark:text-zinc-400">
        <h2 className="text-base font-semibold text-zinc-900 dark:text-zinc-50">
          How to demo
        </h2>
        <ol className="mt-3 list-decimal space-y-1 pl-5">
          <li>Open Janky and reload. Watch the meter spike as the page settles.</li>
          <li>Open Stable and reload. The same elements arrive, but the number holds at 0.</li>
          <li>
            The meter uses the browser&apos;s Layout Instability API, the same
            signal Vercel Speed Insights reports from real users.
          </li>
        </ol>
      </section>
    </div>
  );
}
