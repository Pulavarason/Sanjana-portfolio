/**
 * INSTAGRAM TILES
 * Instagram images cannot be pulled automatically without an official API
 * integration, so this is a simple list. Save photos into /public/images/instagram/
 * and (optionally) set `href` to the individual post URL.
 */
import { site } from "@/config/site";

export interface InstagramTile {
  src: string;
  alt: string;
  href: string;
}

export const instagramTiles: InstagramTile[] = Array.from({ length: 8 }, (_, i) => ({
  src: `/images/instagram/${String(i + 1).padStart(2, "0")}.jpg`,
  alt: `Instagram photograph ${i + 1}`,
  href: site.instagram.url,
}));
