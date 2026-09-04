import type { Metadata } from "next";
import "./globals.css";
import Link from "next/link";

export const metadata: Metadata = {
  title: "FindMyComic — find your next favorite stand-up comedian",
  description:
    "Tell us a few comedians you already like, and FindMyComic recommends who to watch next based on style, not just genre.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <div className="min-h-screen flex flex-col">
          <header className="border-b border-line">
            <div className="mx-auto max-w-4xl px-6 py-5 flex items-baseline justify-between">
              <Link href="/" className="font-display font-extrabold text-2xl tracking-tight text-paper">
                Find<span className="text-marquee">My</span>Comic
              </Link>
              <span className="text-sm text-muted hidden sm:block">
                find your next favorite stand-up comedian
              </span>
            </div>
          </header>
          <main className="flex-1">{children}</main>
          <footer className="border-t border-line">
            <div className="mx-auto max-w-4xl px-6 py-6 text-sm text-muted flex justify-between">
              <span>FindMyComic</span>
              <span>Built for people bored of scrolling for something funny to watch.</span>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
