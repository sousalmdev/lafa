"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import LafaLogo from "./LafaLogo";
import Words from "./Words";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const TAGS = ["Partnerships", "Visibility", "Collaborations", "Brand Management", "Marketing", "Consulting"];

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
        .from(".hero-bg-logo .lafa-path", {
          strokeDashoffset: (i, t) => t.getTotalLength(),
          duration: 2.4,
          stagger: 0.2,
          ease: "power2.inOut",
        }, 0)
        .from(".hero-title .wi", { yPercent: 115, rotate: 4, duration: 1.4, stagger: 0.07 }, 0.15)
        .from(".hero-foot > *", { y: 30, opacity: 0, duration: 1.1, stagger: 0.1 }, 0.7)
        .from(".hero-tags li", { y: 24, opacity: 0, duration: 0.9, stagger: 0.06 }, 0.9)
        .from(".hero-scroll", { opacity: 0, duration: 1 }, 1.4);

      const play = () => intro.play();
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
          <Words text="Talent that" as="span" className="line" />
          <Words text="moves *culture.*" as="span" className="line" />
        </h1>
        <p className="sr-only">Lafa Agency - Talent and Creators Agency</p>

        <div className="hero-foot">
          <p className="hero-lede">
            We represent the creators, voices and personalities shaping what the world watches, and build
            the partnerships that keep them there.
          </p>
          <a href="#contact" className="btn" data-magnetic>
  <span>Work with us</span>
  <span className="btn-arrow" aria-hidden>
    <svg
      viewBox="0 0 24 24"
      width="1em"
      height="1em"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M7 17L17 7M9 7h8v8" />
    </svg>
  </span>
</a>
        </div>

        <ul className="hero-tags mono">
          {TAGS.map((t) => (
            <li key={t}>{t}</li>
          ))}
        </ul>
      </div>

      <div className="hero-scroll mono" aria-hidden>
        <span>Scroll</span>
        <i />
      </div>
    </section>
  );
}
