import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/providers";
import { Sidebar } from "@/components/Sidebar";
import { MobileNav } from "@/components/MobileNav";
import { Player } from "@/features/player/Player";
import { CommandPalette } from "@/components/CommandPalette";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Geet - Premium Music Player",
  description: "Personal ad-free Spotify-like music player",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased dark`}
    >
      <body className="min-h-full flex flex-col overflow-hidden bg-background text-foreground selection:bg-primary/30">
        <Providers>
          <div className="flex h-[calc(100vh-6rem-4rem)] md:h-[calc(100vh-6rem)]">
            <Sidebar />
            <main className="flex-1 overflow-y-auto bg-gradient-to-b from-background to-black">
              {children}
            </main>
          </div>
          <MobileNav />
          <Player />
          <CommandPalette />
        </Providers>
      </body>
    </html>
  );
}
