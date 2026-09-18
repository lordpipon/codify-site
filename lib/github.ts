export const REPO_OWNER = "lordpipon";
export const REPO_NAME = "codify";
export const REPO_LINK = `https://github.com/${REPO_OWNER}/${REPO_NAME}`;
export const REPO_RAW = `https://raw.githubusercontent.com/${REPO_OWNER}/${REPO_NAME}/main`;
export const APP_ICON_URL = `${REPO_RAW}/packaging/icons/hicolor/512.png`;
export const APP_ICON_SMALL = `${REPO_RAW}/packaging/icons/hicolor/128.png`;

export interface RepoInfo {
  description: string;
  stargazers_count: number;
  forks_count: number;
  language: string;
  license: { spdx_id: string } | null;
  html_url: string;
  pushed_at: string;
}

export interface ReleaseAsset {
  name: string;
  size: number;
  download_count: number;
  browser_download_url: string;
  content_type: string;
}

export interface ReleaseInfo {
  tag_name: string;
  name: string;
  published_at: string;
  html_url: string;
  body: string | null;
  prerelease: boolean;
  assets: ReleaseAsset[];
}

export async function fetchRepo(): Promise<RepoInfo | null> {
  try {
    const res = await fetch(`https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}`, {
      next: { revalidate: 3600 },
      headers: { Accept: "application/vnd.github+json" },
    });
    if (!res.ok) return null;
    return (await res.json()) as RepoInfo;
  } catch {
    return null;
  }
}

export async function fetchLatestRelease(): Promise<ReleaseInfo | null> {
  try {
    const res = await fetch(
      `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/releases/latest`,
      { cache: "no-store", headers: { Accept: "application/vnd.github+json" } }
    );
    if (!res.ok) return null;
    return (await res.json()) as ReleaseInfo;
  } catch {
    return null;
  }
}

export type Platform = "windows" | "macos" | "linux" | "source" | "other";

export function classifyPlatform(name: string): Platform {
  const lower = name.toLowerCase();
  if (lower.endsWith(".exe") || lower.endsWith(".msi")) return "windows";
  if (lower.endsWith(".dmg")) return "macos";
  if (lower.includes("source")) return "source";
  if (
    lower.endsWith(".deb") ||
    lower.endsWith(".rpm") ||
    lower.includes("flatpak") ||
    lower.includes("pkg.tar.zst") ||
    lower.includes("linux")
  )
    return "linux";
  return "other";
}

export const PLATFORM_LABELS: Record<Platform, string> = {
  windows: "Windows",
  macos: "macOS",
  linux: "Linux",
  source: "Source",
  other: "Other",
};

export const PLATFORM_ORDER: Platform[] = ["windows", "macos", "linux", "source"];

export const PLATFORM_HINTS: Record<Platform, string> = {
  windows: "Installer for Windows 10 & 11 (x64)",
  macos: "Native app bundle for macOS",
  linux: "Packages for Debian, Fedora, Arch & Flatpak",
  source: "Build it yourself from source",
  other: "Miscellaneous assets",
};

export function formatBytes(bytes: number): string {
  if (bytes <= 0) return "0 B";
  const units = ["B", "KB", "MB", "GB", "TB"];
  const i = Math.min(Math.floor(Math.log(bytes) / Math.log(1024)), units.length - 1);
  const value = bytes / 1024 ** i;
  return `${value.toFixed(value >= 100 || i === 0 ? 0 : 1)} ${units[i]}`;
}

export function formatDate(iso: string): string {
  try {
    return new Date(iso).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  } catch {
    return iso;
  }
}