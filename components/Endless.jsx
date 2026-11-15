"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

// Scroll-scrubbed marquee: two rows travel in opposite directions as you scroll
export default function Endless() {
  const root = useRef(null);

  useGSAP(
    () => {
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduce) return;

      gsap.to(".row-a", {
        xPercent: -28,
        ease: "none",
        scrollTrigger: { trigger: root.current, start: "top bottom", end: "bottom top", scrub: 0.6 },
      });
      gsap.fromTo(
        ".row-b",
        { xPercent: -28 },
        {
          xPercent: 0,
          ease: "none",
          scrollTrigger: { trigger: root.current, start: "top bottom", end: "bottom top", scrub: 0.6 },
        }
      );
      gsap.from(".endless-sub > *", {
        y: 24,
        opacity: 0,
        duration: 1,
        stagger: 0.12,
        ease: "expo.out",
        scrollTrigger: { trigger: ".endless-sub", start: "top 85%" },
      });
    },
    { scope: root }
  );

  const a = "Endless · No limit · ";
  const b = "Creators · Culture · ";
  return (
    <section ref={root} className="endless" data-theme="dark" aria-label="Endless, no limit">
      <div className="row row-a" aria-hidden>
        {Array.from({ length: 4 }).map((_, i) => (
          <span key={i}>
            {a.split(" · ").filter(Boolean).map((w, j) => (
              <em key={j} className={j % 2 ? "serif" : ""}>
                {w}
                <b>✦</b>
              </em>
            ))}
          </span>
        ))}
      </div>
      <div className="row row-b outline" aria-hidden>
        {Array.from({ length: 4 }).map((_, i) => (
          <span key={i}>
            {b.split(" · ").filter(Boolean).map((w, j) => (
              <em key={j}>
                {w}
                <b>✦</b>
              </em>
            ))}
          </span>
        ))}
      </div>
      <h2 className="sr-only">Endless. No limit.</h2>
      <div className="endless-sub">
        <p>Infinite cultural reach for talent with no ceiling.</p>
      </div>
    </section>
  );
}

