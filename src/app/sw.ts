import { defaultCache } from "@serwist/next/worker";
import type { PrecacheEntry, SerwistGlobalConfig } from "serwist";
import { Serwist, CacheFirst, ExpirationPlugin } from "serwist";

declare global {
  interface WorkerGlobalScope extends SerwistGlobalConfig {
    __SW_MANIFEST: (PrecacheEntry | string)[] | undefined;
  }
}

declare const self: ServiceWorkerGlobalScope;

const BACKGROUND_IMAGES = [
  "/backgrounds/easter.jpg",
  "/backgrounds/easterheader.jpg",
  "/backgrounds/friday.jpg",
  "/backgrounds/fridayheader.jpg",
  "/backgrounds/guide.jpg",
  "/backgrounds/header.jpeg",
  "/backgrounds/headerthursday.jpeg",
  "/backgrounds/intro.jpg",
  "/backgrounds/outro.jpg",
  "/backgrounds/saturday.jpg",
  "/backgrounds/saturdayheader.jpg",
  "/backgrounds/station1.jpg",
  "/backgrounds/station2.jpg",
  "/backgrounds/station3.jpg",
  "/backgrounds/station4.jpg",
  "/backgrounds/station5.jpg",
  "/backgrounds/station6.jpg",
  "/backgrounds/station7.jpg",
  "/backgrounds/thursday.jpg",
];

const serwist = new Serwist({
  precacheEntries: [
    ...(self.__SW_MANIFEST ?? []),
    ...BACKGROUND_IMAGES.map((url) => ({
      url,
      revision: "2026-v1", // Using a stable revision for these static assets
    })),
  ],
  skipWaiting: true,
  clientsClaim: true,
  navigationPreload: true,
  runtimeCaching: [
    ...defaultCache,
  ],
});

serwist.addEventListeners();
