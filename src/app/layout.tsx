import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import { Header, Footer } from "@/components/shell";
import "./globals.css";
const font = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
});
export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
  ),
  title: {
    default: "NABD — Un don. Un battement. Une vie.",
    template: "%s · NABD",
  },
  description:
    "La solidarité étudiante au service du don du sang. Découvrez, mobilisez votre équipe et prenez rendez-vous.",
  openGraph: {
    title: "NABD — Ensemble, pour la vie.",
    description: "Chaque don compte. Chaque équipe mobilise.",
    locale: "fr_MA",
    type: "website",
  },
};
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body className={font.variable}>
        <a className="skip-link" href="#main">
          Aller au contenu
        </a>
        <Header />
        <main id="main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
