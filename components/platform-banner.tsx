"use client";

import { useSyncExternalStore } from "react";
import { MousePointerClick } from "lucide-react";
import type { Platform } from "@/lib/github";
import { PLATFORM_LABELS } from "@/lib/github";

function detectPlatform(): Platform {
  if (typeof navigator === "undefined") return "other";
  const ua = navigator.userAgent;
  if (/Windows/i.test(ua)) return "windows";
  if (/Macintosh|Mac OS X/i.test(ua)) return "macos";
  if (/Linux|X11/i.test(ua)) return "linux";
  return "other";
}

const subscribe = () => () => {};

const getServerSnapshot = (): Platform => "other";

export function PlatformBanner() {
  const platform = useSyncExternalStore(subscribe, detectPlatform, getServerSnapshot);

  if (platform === "other") return null;

  const scrollTo = () => {
    const el = document.getElementById(`platform-${platform}`);
    if (el) {
      history.replaceState(null, "", `#platform-${platform}`);
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="flex flex-col items-start justify-between gap-3 rounded-2xl border border-violet-500/30 bg-violet-500/10 px-5 py-4 sm:flex-row sm:items-center">
      <div className="flex items-center gap-3">
        <MousePointerClick className="h-5 w-5 shrink-0 text-violet-300" />
        <p className="text-sm text-zinc-200">
          It looks like you&apos;re on{" "}
          <span className="font-semibold text-white">{PLATFORM_LABELS[platform]}</span> —
          we&apos;ve highlighted the right installer below.
        </p>
      </div>
      <button
        type="button"
        onClick={scrollTo}
        className="rounded-full border border-violet-400/40 px-4 py-2 text-sm font-medium text-violet-200 transition-colors hover:bg-violet-500/20 hover:text-white"
      >
        Jump to {PLATFORM_LABELS[platform]}
      </button>
    </div>
  );
}