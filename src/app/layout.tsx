import type { Metadata } from "next";
import { Fraunces, Outfit } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/lib/cart";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { CartDrawer } from "@/components/CartDrawer";

const fraunces = Fraunces({
  subsets: ["latin"],
  style: ["normal", "italic"],
  variable: "--font-display",
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://kekki.club"),
  title: {
    default: "Kekki Cakery — More Than Just a Cake | Custom Cakes Singapore",
    template: "%s · Kekki Cakery",
  },
  description:
    "MUIS Halal-certified custom cakery in Singapore. Beautiful, less-sweet cakes for birthdays, weddings and every sweeter moment. Order online in as fast as 4 days.",
  keywords: [
    "custom cakes singapore",
    "halal birthday cake",
    "bento cake",
    "wedding cake singapore",
    "kekki cakery",
  ],
  openGraph: {
    title: "Kekki Cakery — More Than Just a Cake",
    description:
      "Beautiful cakes, thoughtfully made. Custom halal-certified cakes delivered across Singapore.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${fraunces.variable} ${outfit.variable}`}>
      <body className="flex min-h-screen flex-col">
        <CartProvider>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
          <CartDrawer />
        </CartProvider>
      </body>
    </html>
  );
}
