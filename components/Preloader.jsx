"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import LafaLogo from "./LafaLogo";

gsap.registerPlugin(useGSAP);

export const READY_EVENT = "lafa:ready";

export default function Preloader() {
  const root = useRef(null);
  const counter = useRef(null);

  useGSAP(
    () => {
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const release = () => {
        window.__lafaReady = true;
        window.dispatchEvent(new Event(READY_EVENT));
        window.__lenis?.start();
        document.documentElement.classList.remove("is-loading");
      };

      if (reduce) {
        gsap.set(root.current, { display: "none" });
        release();
        return;
      }

      const paths = gsap.utils.toArray(".pl-path");
      paths.forEach((p) => {
        const len = p.getTotalLength();
        gsap.set(p, { strokeDasharray: len, strokeDashoffset: len });
      });

      const state = { v: 0 };
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.from(".pl-meta > *", { y: 16, opacity: 0, duration: 0.7, stagger: 0.08 }, 0.1)
        // 1. each glyph is drawn as a continuous line, in the order it is written: L a f a
        .to(
          paths,
          { strokeDashoffset: 0, duration: 1.7, stagger: 0.28, ease: "power2.inOut" },
          0.25
        )
        .to(state, {
          v: 100,
          duration: 2.7,
          ease: "power2.inOut",
          onUpdate: () => {
            if (counter.current)
              counter.current.textContent = String(Math.round(state.v)).padStart(3, "0");
          },
        }, 0.2)
        // 2. ink floods in, outline dissolves
        .to(paths, { fill: "#B62A43", duration: 0.8, stagger: 0.1, ease: "power2.out" }, 1.9)
        .to(paths, { strokeOpacity: 0, duration: 0.6 }, 2.2)
        .fromTo(
          ".pl-glow",
          { opacity: 0, scale: 0.7 },
          { opacity: 1, scale: 1, duration: 1.1 },
          1.9
        )
        // 3. hold, then logo lifts away and the curtain opens
        .to(".pl-meta", { opacity: 0, y: -10, duration: 0.4 }, 3.0)
        .to(".pl-logo", { scale: 1.12, duration: 0.8, ease: "power2.in" }, 3.0)
        .add(release, 3.45)
        .to(".pl-logo-wrap", { yPercent: -35, opacity: 0, duration: 0.9, ease: "power3.in" }, 3.45)
        .to(root.current, { yPercent: -100, duration: 1.15, ease: "expo.inOut" }, 3.5)
        .set(root.current, { display: "none" });
    },
    { scope: root }
  );

  return (
    <div ref={root} className="preloader" aria-hidden="true">
      <div className="pl-glow" />
      <div className="pl-logo-wrap">
        <LafaLogo
          className="pl-logo"
          pathClass="pl-path"
          fill="rgba(182,42,67,0)"
          stroke="#EAE3D5"
          strokeWidth={15}
        />
      </div>
      <div className="pl-meta">
        <span className="mono">Talent &amp; Creators Agency</span>
        <span className="mono pl-count">
          <span ref={counter}>000</span>
        </span>
      </div>
    </div>
  );
}

