import type { Metadata } from "next";
import { Fraunces, Outfit } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://wafficontentstudio.com"),
  title: {
    default: "WAFFI Content Studio",
    template: "%s · WAFFI Content Studio",
  },
  description:
    "Premium multi-set content studio with traditional, maternity, white, rose, makeup, podcast, kitchen, and more creative spaces — plus shoot rentals.",
  openGraph: {
    title: "WAFFI Content Studio",
    description: "Book beautiful content sets and rent shoot essentials.",
    images: ["/brand/hero.jpg"],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning className={`${outfit.variable} ${fraunces.variable} h-full`}>
      <body className="flex min-h-full flex-col antialiased">
        <ThemeProvider>
          <SiteHeader />
          <main className="flex-1">{children}</main>
          <SiteFooter />
        </ThemeProvider>
      </body>
    </html>
  );
}
