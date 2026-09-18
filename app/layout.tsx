import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://github.com/lordpipon/codify-site"),
  title: {
    default: "Codify — A fast, minimal IDE built on Rust & GPUI",
    template: "%s · Codify",
  },
  description:
    "Codify is a fast, minimal, native IDE built on Rust & GPUI. No Electron, no web tech. Download the latest build for Windows, macOS and Linux.",
  keywords: [
    "Codify",
    "IDE",
    "code editor",
    "Rust",
    "GPUI",
    "native",
    "open source",
    "lordpipon",
  ],
  openGraph: {
    title: "Codify — A fast, minimal IDE built on Rust & GPUI",
    description:
      "A fast, minimal IDE built on Rust & GPUI. No Electron, no web tech. Made by lordpipon.",
    type: "website",
    images: ["/icon.png"],
  },
  twitter: {
    card: "summary",
    title: "Codify",
    description: "A fast, minimal IDE built on Rust & GPUI. Made by lordpipon.",
    images: ["/icon.png"],
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}