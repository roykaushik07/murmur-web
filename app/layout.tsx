import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Murmur - captioned clips from your podcast",
  description: "Turn podcast episodes into shareable captioned clips.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
