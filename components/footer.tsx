import Link from "next/link";
import { Heart } from "lucide-react";
import { GithubIcon } from "@/components/github-icon";
import { APP_ICON_SMALL, REPO_LINK } from "@/lib/github";

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-zinc-950">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-4 py-10 sm:px-6 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-3">
          {/* eslint-disable @next/next/no-img-element */}
          <img
            src={APP_ICON_SMALL}
            alt="Codify logo"
            width={32}
            height={32}
            className="h-8 w-8 rounded-md ring-1 ring-white/10"
          />
          <div>
            <p className="font-semibold">Codify</p>
            <p className="text-sm text-zinc-500">A fast, minimal IDE built on Rust &amp; GPUI</p>
          </div>
        </div>

        <div className="flex flex-col gap-2 text-sm text-zinc-400">
          <a
            href={REPO_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 transition-colors hover:text-white"
          >
            <GithubIcon className="h-4 w-4" />
            github.com/lordpipon/codify
          </a>
          <p className="flex items-center gap-2">
            <Heart className="h-4 w-4 text-violet-400" />
            Made by <Link href="https://github.com/lordpipon" target="_blank" rel="noopener noreferrer" className="font-medium text-zinc-200 hover:text-white">lordpipon</Link>
          </p>
        </div>

        <p className="text-sm text-zinc-600">MIT License · Open source</p>
      </div>
    </footer>
  );
}