import type { Metadata } from "next";
import { Bricolage_Grotesque, Inter } from "next/font/google";
import { GoogleAnalytics } from "@next/third-parties/google";
import "./globals.css";
import { SITE_URL, SITE_NAME } from "@/lib/seo";
import { site } from "@/content/site";

const bricolage = Bricolage_Grotesque({
  variable: "--font-display-raw",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

const inter = Inter({
  variable: "--font-sans-raw",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const gaId = process.env.NEXT_PUBLIC_GA4_ID;
const gscVerification = process.env.NEXT_PUBLIC_GSC_VERIFICATION;

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} — Fitness, Co-Working, Café & Meeting Rooms in One Membership`,
    template: `%s · ${SITE_NAME}`,
  },
  description: site.description,
  ...(gscVerification ? { verification: { google: gscVerification } } : {}),
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-IN" className={`${bricolage.variable} ${inter.variable} h-full antialiased`}>
      <body className="min-h-full">
        {children}
        {gaId && <GoogleAnalytics gaId={gaId} />}
      </body>
    </html>
  );
}
