import type Lenis from "lenis";

declare global {
  interface Window {
    __lenis?: Lenis;
  }
}

export function scrollToId(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  if (window.__lenis) {
    window.__lenis.scrollTo(el, { duration: 1.6 });
  } else {
    el.scrollIntoView({ behavior: "smooth" });
  }
}

export function scrollToTop() {
  if (window.__lenis) window.__lenis.scrollTo(0, { duration: 1.8 });
  else window.scrollTo({ top: 0, behavior: "smooth" });
}

/** Lock / unlock page scrolling (menus, lightbox, video modal). */
export function lockScroll(lock: boolean) {
  if (lock) {
    window.__lenis?.stop();
    document.documentElement.style.overflow = "hidden";
  } else {
    window.__lenis?.start();
    document.documentElement.style.overflow = "";
  }
}
