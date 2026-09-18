/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import {
  Download,
  ArrowRight,
  FolderTree,
  Sparkles,
  Puzzle,
  SquareTerminal,
  Palette,
  Zap,
  Star,
  HardDriveDownload,
  Tag,
  Cpu,
} from "lucide-react";
import { GithubIcon } from "@/components/github-icon";
import {
  APP_ICON_URL,
  REPO_LINK,
  fetchRepo,
  fetchLatestRelease,
} from "@/lib/github";

const FEATURES = [
  {
    icon: FolderTree,
    title: "File explorer",
    description:
      "Browse and open any directory with expand/collapse folders, project name and the current git branch in the header.",
  },
  {
    icon: Sparkles,
    title: "Syntax highlighting",
    description:
      "First-class highlighting for 25+ languages — Rust, Python, TS/JS, C, Go, Java, Ruby, SQL, HTML, Markdown and more.",
  },
  {
    icon: SquareTerminal,
    title: "Integrated terminal",
    description:
      "A real PTY terminal with new / split / zoom pane controls, auto-detecting your shell on every platform.",
  },
  {
    icon: Puzzle,
    title: "Extension store",
    description:
      "A Zed-style extension panel with one-click install/uninstall. Extensions plug straight into the tokenizer.",
  },
  {
    icon: Palette,
    title: "Themes & accents",
    description:
      "System / Light / Dark themes plus 10 accent colours (mauve, blue, green, red, orange, pink and more).",
  },
  {
    icon: Zap,
    title: "Native & blazing fast",
    description:
      "No Electron, no web tech. Rendered on the GPU with GPUI — the same engine that powers Zed.",
  },
];

export default async function Home() {
  const [repo, release] = await Promise.all([fetchRepo(), fetchLatestRelease()]);

  const totalDownloads = release
    ? release.assets.reduce((sum, asset) => sum + asset.download_count, 0)
    : null;

  const stats = [
    {
      icon: Star,
      label: "GitHub stars",
      value: repo ? String(repo.stargazers_count) : null,
    },
    {
      icon: HardDriveDownload,
      label: "Downloads",
      value: totalDownloads !== null ? String(totalDownloads) : null,
    },
    {
      icon: Tag,
      label: "Latest release",
      value: release ? release.tag_name.replace(/^v/, "") : null,
    },
    {
      icon: Cpu,
      label: "Built with",
      value: repo?.language ?? "Rust",
    },
  ];

  return (
    <div className="relative overflow-hidden">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[600px] bg-[radial-gradient(ellipse_at_top,rgba(124,58,237,0.18),transparent_60%)]"
      />

      <section className="mx-auto flex w-full max-w-6xl flex-col items-center px-4 pb-16 pt-20 text-center sm:px-6 sm:pt-28">
        {release && (
          <Link
            href="/download"
            className="mb-8 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs text-zinc-300 transition-colors hover:border-violet-400/40 hover:text-white"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-violet-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-violet-400" />
            </span>
            {release.tag_name} — latest release
            <ArrowRight className="h-3 w-3" />
          </Link>
        )}

        <img
          src={APP_ICON_URL}
          alt="Codify app icon"
          width={144}
          height={144}
          className="mb-10 h-36 w-36 rounded-3xl shadow-2xl shadow-violet-500/20 ring-1 ring-white/10"
        />

        <h1 className="text-5xl font-bold tracking-tight sm:text-7xl">
          <span className="bg-gradient-to-r from-violet-400 via-fuchsia-400 to-violet-400 bg-clip-text text-transparent">
            Codify
          </span>
        </h1>
        <p className="mt-5 max-w-2xl text-lg text-zinc-400 sm:text-xl">
          A fast, minimal IDE built on{" "}
          <span className="font-medium text-zinc-200">Rust &amp; GPUI</span> — the same
          GPU-accelerated UI engine that powers Zed. No Electron, no web tech. It&apos;s
          native, and it&apos;s yours.
        </p>

        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <Link
            href="/download"
            className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-violet-600 px-7 text-base font-medium text-white shadow-lg shadow-violet-600/25 transition-colors hover:bg-violet-500"
          >
            <Download className="h-5 w-5" />
            Download for free
          </Link>
          <a
            href={REPO_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-12 items-center justify-center gap-2 rounded-full border border-white/10 bg-white/5 px-7 text-base font-medium text-zinc-200 transition-colors hover:bg-white/10 hover:text-white"
          >
            <GithubIcon className="h-5 w-5" />
            View source on GitHub
          </a>
        </div>

        <p className="mt-6 text-sm text-zinc-500">
          Built by{" "}
          <Link
            href="https://github.com/lordpipon"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-zinc-300 hover:text-white"
          >
            lordpipon
          </Link>{" "}
          · Released under the MIT license
        </p>

        <div className="mt-16 grid w-full max-w-3xl grid-cols-2 gap-4 sm:grid-cols-4">
          {stats.map(({ icon: Icon, label, value }) => (
            <div
              key={label}
              className="group rounded-2xl border border-white/10 bg-white/5 p-4"
            >
              <Icon className="mb-2 h-4 w-4 text-violet-400" />
              <p className="text-xl font-semibold">{value ?? "—"}</p>
              <p className="text-xs text-zinc-500">{label}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="features" className="mx-auto w-full max-w-6xl scroll-mt-24 px-4 py-20 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Everything a modern IDE needs
          </h2>
          <p className="mt-3 text-zinc-400">
            File explorer, tabs, a real code editor, terminal, extensions and themes — all
            in one native window.
          </p>
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map(({ icon: Icon, title, description }) => (
            <div
              key={title}
              className="group rounded-2xl border border-white/10 bg-white/5 p-6 transition-colors hover:border-violet-400/40 hover:bg-white/[0.07]"
            >
              <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-violet-500/15 text-violet-300 transition-colors group-hover:bg-violet-500/25">
                <Icon className="h-5 w-5" />
              </div>
              <h3 className="text-lg font-semibold">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-zinc-400">{description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-4 pb-24 sm:px-6">
        <div className="flex flex-col items-center gap-6 rounded-3xl border border-white/10 bg-gradient-to-br from-violet-500/15 to-transparent px-6 py-16 text-center">
          <img
            src={APP_ICON_URL}
            alt=""
            width={64}
            height={64}
            className="h-16 w-16 rounded-2xl ring-1 ring-white/10"
          />
          <h2 className="max-w-xl text-3xl font-bold tracking-tight sm:text-4xl">
            {release ? `Ready to try Codify ${release.tag_name.replace(/^v/, "")}?` : "Ready to try Codify?"}
          </h2>
          <p className="max-w-md text-zinc-400">
            Grab the latest build for Windows, macOS or Linux — or build it yourself from
            source.
          </p>
          <div className="mt-2 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/download"
              className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-violet-600 px-7 text-base font-medium text-white shadow-lg shadow-violet-600/25 transition-colors hover:bg-violet-500"
            >
              <Download className="h-5 w-5" />
              Go to downloads
            </Link>
            <a
              href={REPO_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-12 items-center justify-center gap-2 rounded-full border border-white/10 bg-white/5 px-7 text-base font-medium text-zinc-200 transition-colors hover:bg-white/10 hover:text-white"
            >
              <GithubIcon className="h-5 w-5" />
              GitHub
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}