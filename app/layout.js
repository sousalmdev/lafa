import { Bricolage_Grotesque, Instrument_Serif, DM_Mono } from "next/font/google";
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
  },
  icons: { icon: "/Lafa.svg" },
};

export const viewport = { themeColor: "#2a0509" };

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${display.variable} ${serif.variable} ${mono.variable}`}>
      <body>{children}</body>
    </html>
  );
}

