import type { Metadata, Viewport } from "next";
import { Manrope, Oswald } from "next/font/google";
import { AppShell } from "@/components/AppShell";
import { ServiceWorker } from "@/components/ServiceWorker";
import { StoreProvider } from "@/lib/store";
import "./globals.css";

const display = Oswald({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["500", "600", "700"],
});

const sans = Manrope({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["400", "500", "600", "700", "800"],
});

const base = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export const metadata: Metadata = {
  title: "Diciplina",
  description: "Retos diarios, hábitos y racha. Disciplina sin culpa.",
  applicationName: "Diciplina",
  manifest: `${base}/manifest.json`,
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Diciplina",
  },
  icons: {
    icon: [{ url: `${base}/icon.svg`, type: "image/svg+xml" }],
    apple: [{ url: `${base}/apple-touch-icon.png` }],
  },
};

export const viewport: Viewport = {
  themeColor: "#070709",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={`${display.variable} ${sans.variable}`}>
      <body className="font-sans antialiased">
        <noscript>
          <div className="px-6 py-10 text-center text-sm text-paper">
            Diciplina necesita JavaScript. Actívalo en el navegador para entrar a la app.
          </div>
        </noscript>
        <StoreProvider>
          <AppShell>{children}</AppShell>
        </StoreProvider>
        <ServiceWorker />
      </body>
    </html>
  );
}
