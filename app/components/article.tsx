// Shared article body used by both demo routes. It contains no shifting
// elements itself; each route decides how the late-arriving banner, promo,
// and image reserve (or fail to reserve) space around it.

export function ArticleBody() {
  return (
    <article className="prose prose-zinc max-w-none">
      <h1 className="text-3xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
        The quarterly performance review
      </h1>
      <p className="mt-4 text-lg leading-8 text-zinc-600 dark:text-zinc-400">
        Below the fold sits the content a reader came for. Watch the CLS meter
        in the corner as the page finishes loading. Every pixel this text jumps
        is a layout shift the reader feels.
      </p>
      <p className="mt-4 leading-7 text-zinc-700 dark:text-zinc-300">
        Cumulative Layout Shift measures how much visible content moves
        unexpectedly while a page loads. A late banner, an image with no
        reserved height, or a block inserted above the fold all push the content
        below them to a new position. Those shifts accrue into the score.
      </p>
      <p className="mt-4 leading-7 text-zinc-700 dark:text-zinc-300">
        The fix is always the same idea: reserve the space before the content
        arrives. Give images dimensions, give injected slots a fixed height, and
        keep overlays out of the document flow so they never displace anything.
      </p>
      <p className="mt-4 leading-7 text-zinc-700 dark:text-zinc-300">
        This paragraph exists only to give the page enough height that a shift
        near the top is obvious. When the meter turns green and the text stops
        moving, the route is doing its job.
      </p>
    </article>
  );
}
