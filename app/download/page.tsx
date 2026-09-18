/* eslint-disable @next/next/no-img-element */
import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";
import {
  Download,
  Monitor,
  Apple,
  Terminal,
  Package,
  Box,
  Star,
  HardDriveDownload,
  Tag,
  CalendarDays,
  FileDown,
  ExternalLink,
} from "lucide-react";
import { GithubIcon } from "@/components/github-icon";
import { PlatformBanner } from "@/components/platform-banner";
import {
  APP_ICON_URL,
  REPO_LINK,
  fetchLatestRelease,
  formatBytes,
  formatDate,
  classifyPlatform,
  PLATFORM_LABELS,
  PLATFORM_ORDER,
  PLATFORM_HINTS,
  type Platform,
  type ReleaseAsset,
} from "@/lib/github";

export const metadata: Metadata = {
  title: "Download",
  description:
    "Download the latest Codify build for Windows, macOS and Linux from GitHub Releases — made by lordpipon.",
};

const PLATFORM_ICONS: Record<Platform, typeof Monitor> = {
  windows: Monitor,
  macos: Apple,
  linux: Terminal,
  source: Package,
  other: Box,
};

function Changelog({ body }: { body: string }) {
  const lines = body.split("\n");
  const blocks: ReactNode[] = [];
  let list: string[] = [];

  const flushList = (key: string) => {
    if (list.length > 0) {
      blocks.push(
        <ul key={key} className="space-y-1.5">
          {list.map((item, i) => (
            <li key={i} className="flex gap-2 text-sm text-zinc-400">
              <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-violet-400" />
              <span>{item.replace(/`/g, "")}</span>
            </li>
          ))}
        </ul>
      );
      list = [];
    }
  };

  lines.forEach((line, i) => {
    const trimmed = line.trim();
    if (trimmed.startsWith("##")) {
      flushList(`h-${i}`);
      blocks.push(
        <h3 key={i} className="pt-4 text-sm font-semibold uppercase tracking-wide text-zinc-200">
          {trimmed.replace(/^#+\s*/, "")}
        </h3>
      );
    } else if (trimmed.startsWith("-")) {
      list.push(trimmed.replace(/^-\s*/, ""));
    } else if (trimmed.length === 0) {
      flushList(`gap-${i}`);
    }
  });
  flushList("final");

  return <div className="space-y-3">{blocks.length ? blocks : <p className="text-sm text-zinc-500">No changelog provided for this release.</p>}</div>;
}

function AssetRow({ asset }: { asset: ReleaseAsset }) {
  const platform = classifyPlatform(asset.name);
  const Icon = PLATFORM_ICONS[platform];
  return (
    <div className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/5 p-4 transition-colors hover:border-white/20">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-violet-500/15 text-violet-300">
        <Icon className="h-5 w-5" />
      </div>
      <div className="min-w-0 flex-1">
        <p className="truncate font-mono text-sm text-zinc-100">{asset.name}</p>
        <p className="mt-0.5 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-zinc-500">
          <span>{formatBytes(asset.size)}</span>
          <span className="inline-flex items-center gap-1">
            <HardDriveDownload className="h-3 w-3" />
            {asset.download_count.toLocaleString()} downloads
          </span>
        </p>
      </div>
      <a
        href={asset.browser_download_url}
        className="inline-flex h-10 shrink-0 items-center gap-2 rounded-full bg-zinc-100 px-4 text-sm font-medium text-zinc-900 transition-colors hover:bg-white"
      >
        <Download className="h-4 w-4" />
        <span className="hidden sm:inline">Download</span>
      </a>
    </div>
  );
}

export default async function DownloadPage() {
  const release = await fetchLatestRelease();

  if (!release) {
    return (
      <section className="mx-auto flex w-full max-w-2xl flex-col items-center px-4 py-28 text-center sm:px-6">
        <img src={APP_ICON_URL} alt="Codify app icon" width={96} height={96} className="mb-8 h-24 w-24 rounded-2xl ring-1 ring-white/10" />
        <h1 className="text-3xl font-bold tracking-tight">No releases yet</h1>
        <p className="mt-3 text-zinc-400">
          Couldn&apos;t fetch the latest release from GitHub right now. Head straight to
          the releases page to grab a build.
        </p>
        <a
          href={`${REPO_LINK}/releases`}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-8 inline-flex h-12 items-center gap-2 rounded-full bg-violet-600 px-7 font-medium text-white transition-colors hover:bg-violet-500"
        >
          <GithubIcon className="h-5 w-5" />
          View releases on GitHub
        </a>
      </section>
    );
  }

  const totalDownloads = release.assets.reduce((sum, a) => sum + a.download_count, 0);
  const byPlatform: Record<Platform, ReleaseAsset[]> = {
    windows: [],
    macos: [],
    linux: [],
    source: [],
    other: [],
  };
  for (const asset of release.assets) {
    byPlatform[classifyPlatform(asset.name)].push(asset);
  }

  return (
    <div className="relative overflow-hidden">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[500px] bg-[radial-gradient(ellipse_at_top,rgba(124,58,237,0.18),transparent_60%)]"
      />

      <section className="mx-auto w-full max-w-6xl px-4 pb-16 pt-16 sm:px-6">
        <div className="flex flex-col items-center gap-6 text-center">
          <img
            src={APP_ICON_URL}
            alt="Codify app icon"
            width={96}
            height={96}
            className="h-24 w-24 rounded-3xl shadow-2xl shadow-violet-500/20 ring-1 ring-white/10"
          />
          <div>
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">Download Codify</h1>
            <p className="mx-auto mt-3 max-w-xl text-zinc-400">
              Latest release <span className="font-medium text-zinc-200">{release.name}</span>
              {release.prerelease && (
                <span className="ml-2 rounded-full border border-amber-400/30 bg-amber-400/10 px-2 py-0.5 text-xs text-amber-300">
                  prerelease
                </span>
              )}{" "}
              — published {formatDate(release.published_at)}. Built by{" "}
              <Link
                href="https://github.com/lordpipon"
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-zinc-300 underline decoration-zinc-600 underline-offset-2 hover:text-white"
              >
                lordpipon
              </Link>
              .
            </p>
          </div>

          <div className="grid w-full max-w-2xl grid-cols-3 gap-3">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <Tag className="mx-auto mb-1 h-4 w-4 text-violet-400" />
              <p className="text-sm font-semibold">{release.tag_name.replace(/^v/, "")}</p>
              <p className="text-xs text-zinc-500">Version</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <CalendarDays className="mx-auto mb-1 h-4 w-4 text-violet-400" />
              <p className="text-sm font-semibold">{formatDate(release.published_at)}</p>
              <p className="text-xs text-zinc-500">Released</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <Star className="mx-auto mb-1 h-4 w-4 text-violet-400" />
              <p className="text-sm font-semibold">{totalDownloads.toLocaleString()}</p>
              <p className="text-xs text-zinc-500">Total downloads</p>
            </div>
          </div>
        </div>

        <div className="mx-auto mt-10 max-w-3xl">
          <PlatformBanner />
        </div>

        <div className="mx-auto mt-12 max-w-3xl space-y-12">
          {PLATFORM_ORDER.map((platform) => {
            const assets = byPlatform[platform];
            if (assets.length === 0) return null;
            const Icon = PLATFORM_ICONS[platform];
            return (
              <div key={platform} id={`platform-${platform}`} className="scroll-mt-24">
                <div className="mb-4 flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-violet-500/15 text-violet-300">
                    <Icon className="h-4 w-4" />
                  </div>
                  <div>
                    <h2 className="text-lg font-semibold">{PLATFORM_LABELS[platform]}</h2>
                    <p className="text-xs text-zinc-500">{PLATFORM_HINTS[platform]}</p>
                  </div>
                </div>
                <div className="space-y-3">
                  {assets.map((asset) => (
                    <AssetRow key={asset.name} asset={asset} />
                  ))}
                </div>
              </div>
            );
          })}

          {byPlatform.other.length > 0 && (
            <div id="platform-other" className="scroll-mt-24">
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-violet-500/15 text-violet-300">
                  <Box className="h-4 w-4" />
                </div>
                <div>
                  <h2 className="text-lg font-semibold">Other</h2>
                  <p className="text-xs text-zinc-500">Miscellaneous assets in this release</p>
                </div>
              </div>
              <div className="space-y-3">
                {byPlatform.other.map((asset) => (
                  <AssetRow key={asset.name} asset={asset} />
                ))}
              </div>
            </div>
          )}
        </div>

        {release.body && (
          <section className="mx-auto mt-16 max-w-3xl">
            <h2 className="mb-6 flex items-center gap-2 text-xl font-semibold">
              <FileDown className="h-5 w-5 text-violet-400" />
              What&apos;s new in {release.tag_name}
            </h2>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
              <Changelog body={release.body} />
            </div>
          </section>
        )}

        <div className="mx-auto mt-16 flex max-w-3xl flex-col items-center gap-4 rounded-3xl border border-white/10 bg-gradient-to-br from-violet-500/15 to-transparent px-6 py-10 text-center">
          <p className="text-zinc-300">
            Looking for an older version or every release in one place?
          </p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <a
              href={`${REPO_LINK}/releases`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-11 items-center justify-center gap-2 rounded-full bg-violet-600 px-6 text-sm font-medium text-white transition-colors hover:bg-violet-500"
            >
              <ExternalLink className="h-4 w-4" />
              All releases on GitHub
            </a>
            <a
              href={REPO_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-11 items-center justify-center gap-2 rounded-full border border-white/10 bg-white/5 px-6 text-sm font-medium text-zinc-200 transition-colors hover:bg-white/10 hover:text-white"
            >
              <GithubIcon className="h-4 w-4" />
              Source code
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}