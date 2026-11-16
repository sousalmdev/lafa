"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function Cursor() {
  const dot = useRef(null);

  useEffect(() => {
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    const el = dot.current;
    gsap.set(el, { xPercent: -50, yPercent: -50, opacity: 0 });
    const xTo = gsap.quickTo(el, "x", { duration: 0.3, ease: "power3" });
    const yTo = gsap.quickTo(el, "y", { duration: 0.3, ease: "power3" });
    let shown = false;

    const move = (e) => {
      if (!shown) {
        shown = true;
        gsap.to(el, { opacity: 1, duration: 0.3 });
      }
      xTo(e.clientX);
      yTo(e.clientY);
    };
    const over = (e) => {
      const t = e.target.closest?.("a, button, input, textarea, select, [data-hover]");
      el.classList.toggle("is-active", !!t);
    };
    const leave = () => {
      shown = false;
      gsap.to(el, { opacity: 0, duration: 0.3 });
    };

    // magnetic buttons via delegation: survives re-renders and Fast Refresh
    let mag = null;
    const reset = (m) =>
      gsap.to(m, { x: 0, y: 0, duration: 0.7, ease: "elastic.out(1,0.45)", overwrite: "auto" });
    const magMove = (e) => {
      const m = e.target.closest?.("[data-magnetic]") || null;
      if (m !== mag) {
        if (mag) reset(mag);
        mag = m;
      }
      if (!m) return;
      const r = m.getBoundingClientRect();
      gsap.to(m, {
        x: (e.clientX - r.left - r.width / 2) * 0.35,
        y: (e.clientY - r.top - r.height / 2) * 0.35,
        duration: 0.4,
        ease: "power3.out",
        overwrite: "auto",
      });
    };
    window.addEventListener("mousemove", move, { passive: true });
    window.addEventListener("mousemove", magMove, { passive: true });
    window.addEventListener("mouseover", over, { passive: true });
    document.documentElement.addEventListener("mouseleave", leave);
    return () => {
      window.removeEventListener("mousemove", magMove);
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", over);
      document.documentElement.removeEventListener("mouseleave", leave);
    };
  }, []);

  return <div ref={dot} className="cursor" aria-hidden="true" />;
}
