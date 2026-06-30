"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/", label: "Overview" },
  { href: "/janky", label: "Janky" },
  { href: "/stable", label: "Stable" },
];

export function SiteNav() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40 border-b border-black/10 bg-white/80 backdrop-blur dark:border-white/15 dark:bg-black/70">
      <nav className="mx-auto flex max-w-3xl items-center justify-between px-6 py-4">
        <Link href="/" className="font-mono text-sm font-semibold tracking-tight">
          CLS demo
        </Link>
        <div className="flex items-center gap-1">
          {links.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`rounded-full px-3 py-1.5 text-sm transition-colors ${
                  active
                    ? "bg-zinc-900 text-white dark:bg-white dark:text-black"
                    : "text-zinc-600 hover:bg-black/5 dark:text-zinc-300 dark:hover:bg-white/10"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </div>
      </nav>
    </header>
  );
}
