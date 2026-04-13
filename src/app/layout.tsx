import type { Metadata, Viewport } from "next";
import {
  Cormorant_Garamond,
  Gowun_Batang,
  Noto_Sans_KR,
} from "next/font/google";
import "./globals.css";

const displayFont = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-display",
});

const serifFont = Gowun_Batang({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-serif",
});

const sansFont = Noto_Sans_KR({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "모바일 청첩장",
  icons: {
    icon: "/wedding-favicon.svg",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#fff1f2",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body
        className={`${displayFont.variable} ${serifFont.variable} ${sansFont.variable}`}
      >
        {children}
      </body>
    </html>
  );
}
