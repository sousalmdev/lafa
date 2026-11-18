import { Bricolage_Grotesque, Instrument_Serif, DM_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

const display = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-display",
  axes: ["opsz", "wdth"],
  display: "swap",
});
const serif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-serif",
  display: "swap",
});
const mono = DM_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata = {
  metadataBase: new URL("https://lafaagency.com"),
  alternates: { canonical: "/" },
  title: "Lafa Agency - Talent and Creators Agency",
  description:
    "Lafa Agency - Talent and Creators Agency. Partnerships, Visibility, Collaborations, Brand Management, Marketing and Consulting for the creators shaping culture.",
  openGraph: {
    url: "https://lafaagency.com",
    siteName: "Lafa Agency",
    title: "Lafa Agency - Talent and Creators Agency",
    description:
      "Partnerships, Visibility, Collaborations, Brand Management, Marketing and Consulting.",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Lafa Agency - Talent and Creators Agency",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Lafa Agency - Talent and Creators Agency",
    description:
      "Partnerships, Visibility, Collaborations, Brand Management, Marketing and Consulting.",
    images: ["/og-image.png"],
  },
  icons: {
    icon: [
      { url: "/shortcut-icon.png", sizes: "512x512", type: "image/png" },
      { url: "/favicon.ico", sizes: "any" },
    ],
    shortcut: "/shortcut-icon.png",
    apple: "/shortcut-icon.png",
  },
};

export const viewport = { themeColor: "#2a0509" };

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${display.variable} ${serif.variable} ${mono.variable}`}>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}

