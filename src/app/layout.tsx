import type { Metadata } from "next";
import { Cormorant_Garamond, Outfit } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-cormorant",
  display: "swap",
});

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-outfit",
  display: "swap",
});

export const metadata: Metadata = {
  title: "The Ambassador | Luxury Apartment in the Heart of Verbier",
  description:
    "The most central location in Verbier. A stunning 4-bedroom luxury apartment steps from Médran, Farinet & Pub Mont Fort. Wake up in the heart of the action.",
  keywords: [
    "Verbier",
    "luxury apartment",
    "ski chalet",
    "Swiss Alps",
    "vacation rental",
    "4 bedroom",
    "central Verbier",
    "Médran",
  ],
  openGraph: {
    title: "The Ambassador | Luxury Apartment in the Heart of Verbier",
    description:
      "The most central location in Verbier. Steps from Médran, Farinet & the best après-ski.",
    type: "website",
    locale: "en_US",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${cormorant.variable} ${outfit.variable}`}>
      <body className="font-sans">{children}</body>
    </html>
  );
}
