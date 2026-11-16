"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import LafaLogo from "./LafaLogo";
import Words from "./Words";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function Hero() {
  const root = useRef(null);

  useGSAP(
    () => {
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduce) return;

      gsap.utils.toArray(".hero-bg-logo .lafa-path").forEach((p) => {
        p.style.strokeDasharray = p.getTotalLength();
      });

      const intro = gsap.timeline({ paused: true, defaults: { ease: "expo.out" } });
      intro
        .from(".hero-title .wi", { yPercent: 115, rotate: 4, duration: 1.4, stagger: 0.07 }, 0.15)
        .from(".hero-cta", { y: 30, opacity: 0, duration: 1.1 }, 0.8)
        .from(".hero-scroll", { opacity: 0, duration: 1 }, 1.4);

      // endless loop: the outline draws itself, holds, erases, and starts again
      const len = (i, t) => t.getTotalLength();
      const loop = gsap.timeline({ paused: true, repeat: -1 });
      loop
        .fromTo(
          ".hero-bg-logo .lafa-path",
          { strokeDashoffset: len },
          { strokeDashoffset: 0, duration: 2.6, stagger: 0.25, ease: "power2.inOut" }
        )
        .to(
          ".hero-bg-logo .lafa-path",
          { strokeDashoffset: (i, t) => -t.getTotalLength(), duration: 2, stagger: 0.2, ease: "power2.inOut" },
          "+=1.4"
        );
      gsap.set(".hero-bg-logo .lafa-path", { strokeDashoffset: len });

      const play = () => {
        intro.play();
        loop.play();
      };
      if (window.__lafaReady) play();
      else window.addEventListener("lafa:ready", play, { once: true });

      // parallax + fade on scroll
      gsap.to(".hero-bg-logo", {
        yPercent: 22,
        scale: 1.08,
        ease: "none",
        scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: true },
      });
      gsap.to(".hero-content", {
        yPercent: -14,
        opacity: 0.2,
        ease: "none",
        scrollTrigger: { trigger: root.current, start: "20% top", end: "bottom top", scrub: true },
      });
      gsap.to(".blob-a", { xPercent: 18, yPercent: -12, duration: 14, repeat: -1, yoyo: true, ease: "sine.inOut" });
      gsap.to(".blob-b", { xPercent: -16, yPercent: 14, duration: 17, repeat: -1, yoyo: true, ease: "sine.inOut" });
    },
    { scope: root }
  );

  return (
    <section id="top" ref={root} className="hero" data-theme="dark">
      <div className="hero-aurora" aria-hidden>
        <i className="blob blob-a" />
        <i className="blob blob-b" />
      </div>
      <LafaLogo
        className="hero-bg-logo"
        fill="none"
        stroke="rgba(234,227,213,0.16)"
        strokeWidth={6}
        aria-hidden
      />

      <div className="hero-content">
        <h1 className="hero-title">
          <Words text="The biggest home" as="span" className="line" />
          <Words text="*for* *the* *biggest* *talents.*" as="span" className="line" />
        </h1>
        <p className="sr-only">Lafa Agency - Talent and Creators Agency</p>

        <div className="hero-cta">
          <a href="#contact" className="btn" data-magnetic>
            <span>Work with us</span>
            <span className="btn-arrow" aria-hidden>
              <svg viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M7 17L17 7M9 7h8v8" />
              </svg>
            </span>
          </a>
          <a href="#services" className="btn btn-alt" data-magnetic>
            <span>See our services</span>
          </a>
        </div>
      </div>

      <div className="hero-scroll mono" aria-hidden>
        <span>Scroll</span>
        <i />
      </div>
    </section>
  );
}
