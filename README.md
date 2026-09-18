# Codify Site

The official website for [Codify](https://github.com/lordpipon/codify) — a fast, minimal IDE built on Rust & GPUI. Built with Next.js, Tailwind CSS and lucide icons.

## Features

- **Landing page** — live repo stats (stars, downloads, latest version, language), fetched from the GitHub API, with the Codify app icon pulled straight from the repo's `packaging/icons`.
- **`/download`** — lists every installer from the latest GitHub release, grouped by platform (Windows, macOS, Linux, Source), with file sizes, download counts, a changelog, and an OS-detection banner that highlights the right installer for you.
- **Source link** to [github.com/lordpipon/codify](https://github.com/lordpipon/codify) in the navbar, hero, CTA and footer.
- Made by **lordpipon**.

## Tech

- [Next.js 16](https://nextjs.org) (App Router, TypeScript, Turbopack)
- [Tailwind CSS](https://tailwindcss.com) v4
- [lucide-react](https://lucide.dev) icons

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Production

```bash
npm run build
npm start
```

## Data sources

- Repo info + stats: `GET https://api.github.com/repos/lordpipon/codify`
- Latest release (fresh every request): `GET https://api.github.com/repos/lordpipon/codify/releases/latest`
- App icon: `https://raw.githubusercontent.com/lordpipon/codify/main/packaging/icons/hicolor/512.png`

## License

MIT