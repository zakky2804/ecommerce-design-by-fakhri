"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";

/**
 * TopProgressBar
 * - Deteksi navigation start via monkey-patch history.pushState / replaceState & click events
 * - End detection via custom 'locationchange' event and usePathname
 */
export default function TopProgressBar() {
  const pathname = usePathname();
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(false);

  const intervalRef = useRef<number | null>(null);
  const hideTimeoutRef = useRef<number | null>(null);

  // helper: mulai progres
  const start = () => {
    // Jika sudah aktif jangan restart
    if (visible) return;

    // clear possible timeout to hide
    if (hideTimeoutRef.current) {
      window.clearTimeout(hideTimeoutRef.current);
      hideTimeoutRef.current = null;
    }

    setVisible(true);
    setProgress(10);

    // naikkan progress perlahan-lahan ke max 80
    intervalRef.current = window.setInterval(() => {
      setProgress((p) => {
        const increment = Math.random() * 7; // variasi natural
        const next = Math.min(80, p + increment);
        return next;
      });
    }, 150);
  };

  // helper: selesai progres
  const finish = () => {
    // stop interval
    if (intervalRef.current) {
      window.clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    // langsung set ke 100%
    setProgress(100);

    // sembunyikan setelah animasi selesai
    // beri sedikit delay agar transisi opacity dan width terlihat smooth
    hideTimeoutRef.current = window.setTimeout(() => {
      setVisible(false);
      // reset progress setelah transisi CSS selesai (biar saat next start mulai dari 0/10)
      setTimeout(() => setProgress(0), 120);
    }, 220);
  };

  useEffect(() => {
    // === Monkey-patch history methods to dispatch navigationstart & locationchange ===
    const origPush = history.pushState;
    const origReplace = history.replaceState;

    const dispatchNavigationStart = () => {
      const ev = new CustomEvent("navigationstart");
      window.dispatchEvent(ev);
    };

    const dispatchLocationChange = () => {
      const ev = new CustomEvent("locationchange");
      window.dispatchEvent(ev);
    };

    history.pushState = function (...args) {
      dispatchNavigationStart();
      const res = origPush.apply(this, args);
      dispatchLocationChange();
      return res;
    };

    history.replaceState = function (...args) {
      dispatchNavigationStart();
      const res = origReplace.apply(this, args);
      dispatchLocationChange();
      return res;
    };

    // popstate (back/forward)
    const onPop = () => {
      dispatchNavigationStart();
      dispatchLocationChange();
    };
    window.addEventListener("popstate", onPop);

    // Optional: handle link clicks that may not use pushState (external / full reload)
    const onClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      // cari anchor terdekat
      const anchor = target.closest("a") as HTMLAnchorElement | null;
      if (!anchor) return;
      if (!anchor.href) return;
      // ignore external links or links with target / download / rel external
      const url = new URL(anchor.href, window.location.href);
      if (url.origin !== window.location.origin) return;
      if (anchor.target && anchor.target !== "_self") return;
      // start progress (pushState override will also fire for Link)
      dispatchNavigationStart();
    };
    document.addEventListener("click", onClick, true);

    // listeners for our custom events
    const onNavStart = () => start();
    const onLocationChange = () => finish();

    window.addEventListener("navigationstart", onNavStart);
    window.addEventListener("locationchange", onLocationChange);

    return () => {
      // restore history
      history.pushState = origPush;
      history.replaceState = origReplace;
      window.removeEventListener("popstate", onPop);
      document.removeEventListener("click", onClick, true);
      window.removeEventListener("navigationstart", onNavStart);
      window.removeEventListener("locationchange", onLocationChange);
      if (intervalRef.current) window.clearInterval(intervalRef.current);
      if (hideTimeoutRef.current) window.clearTimeout(hideTimeoutRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // tambahan: juga finish saat pathname berubah (safety)
  useEffect(() => {
    // Ini dijalankan saat path sudah benar-benar berubah (server/SSR/next/navigation)
    // Menjamin progress selesai tepat waktu.
    finish();
  }, [pathname]);

  // Styling: width berdasarkan progress, opacity berdasarkan visible
  return (
    <div
      aria-hidden
      className="fixed top-0 left-0 h-[3px] z-[9999] pointer-events-none"
      style={{
        width: "100%",
        // container untuk background transparan (untuk smooth fade)
      }}
    >
      <div
        className="origin-left h-full transition-[width,opacity] duration-250 ease-out"
        style={{
          width: `${progress}%`,
          opacity: visible ? 1 : 0,
          background:
            "linear-gradient(90deg, rgba(59,130,246,1) 0%, rgba(234,88,12,1) 60%)",
          boxShadow: visible ? "0 0 8px rgba(59,130,246,0.6)" : "none",
        }}
      />
    </div>
  );
}
