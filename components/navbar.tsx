"use client";

import { useState } from "react";
import Link from "next/link";
import { Download, Menu, X } from "lucide-react";
import { GithubIcon } from "@/components/github-icon";
import { APP_ICON_SMALL, REPO_LINK } from "@/lib/github";

export function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-zinc-950/80 backdrop-blur">
      <nav className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link
          href="/"
          className="group flex items-center gap-2.5 rounded-md focus-visible:outline-2 focus-visible:outline-violet-400"
        >
          {/* eslint-disable @next/next/no-img-element */}
          <img
            src={APP_ICON_SMALL}
            alt="Codify logo"
            width={28}
            height={28}
            className="h-7 w-7 rounded-md ring-1 ring-white/10"
          />
          <span className="text-lg font-semibold tracking-tight">Codify</span>
        </Link>

        <div className="hidden items-center gap-1 md:flex">
          <Link
            href="/#features"
            className="rounded-md px-3 py-2 text-sm text-zinc-300 transition-colors hover:bg-white/10 hover:text-white"
          >
            Features
          </Link>
          <a
            href={REPO_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 rounded-md px-3 py-2 text-sm text-zinc-300 transition-colors hover:bg-white/10 hover:text-white"
          >
            <GithubIcon className="h-4 w-4" />
            Source
          </a>
        </div>

        <Link
          href="/download"
          className="hidden h-10 items-center gap-2 rounded-full bg-violet-600 px-5 text-sm font-medium text-white transition-colors hover:bg-violet-500 md:flex"
        >
          <Download className="h-4 w-4" />
          Download
        </Link>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="flex h-9 w-9 items-center justify-center rounded-md text-zinc-300 hover:bg-white/10 md:hidden"
          aria-label="Toggle menu"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      {open && (
        <div className="border-t border-white/10 bg-zinc-950/95 px-4 py-3 md:hidden">
          <div className="flex flex-col gap-1.5">
            <Link
              href="/#features"
              onClick={() => setOpen(false)}
              className="rounded-md px-3 py-2 text-sm text-zinc-300 hover:bg-white/10 hover:text-white"
            >
              Features
            </Link>
            <a
              href={REPO_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 rounded-md px-3 py-2 text-sm text-zinc-300 hover:bg-white/10 hover:text-white"
            >
              <GithubIcon className="h-4 w-4" />
              Source
            </a>
            <Link
              href="/download"
              onClick={() => setOpen(false)}
              className="mt-1 flex h-10 items-center justify-center gap-2 rounded-full bg-violet-600 px-5 text-sm font-medium text-white hover:bg-violet-500"
            >
              <Download className="h-4 w-4" />
              Download
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}