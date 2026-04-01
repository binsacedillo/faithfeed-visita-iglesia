import "~/styles/globals.css";

import { type Metadata, type Viewport } from "next";
import { TRPCReactProvider } from "~/trpc/react";

export const metadata: Metadata = {
  title: "Faith Feed | Holy Week 2026",
  description: "A digital sanctuary for Gen Z. Reflections, Scripture, and Stations for the Triduum.",
  manifest: "/manifest.webmanifest",
  icons: [
    { rel: "icon", url: "/icons/icon-192x192.png" },
    { rel: "apple-touch-icon", url: "/icons/icon-192x192.png" }
  ],
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Faith Feed",
  },
};

export const viewport: Viewport = {
  themeColor: "#0d0216",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <head>
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      </head>
      <body>
        <TRPCReactProvider>{children}</TRPCReactProvider>
      </body>
    </html>
  );
}
