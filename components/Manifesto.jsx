"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const COPY =
  "We believe *talent* is the new studio. Lafa Agency builds careers, not campaigns, pairing creators with the *brands*, stages and strategy that turn attention into *lasting* cultural value.";

export default function Manifesto() {
  const root = useRef(null);

  useGSAP(
    () => {
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const words = gsap.utils.toArray(".mf-word");
      if (reduce) {
        gsap.set(words, { opacity: 1 });
        return;
      }
      gsap.fromTo(
        words,
        { opacity: 0.14 },
        {
          opacity: 1,
          stagger: 0.12,
          ease: "none",
          scrollTrigger: { trigger: ".mf-text", start: "top 78%", end: "bottom 45%", scrub: 0.5 },
        }
      );
      gsap.from(".mf-rule", {
        scaleX: 0,
        transformOrigin: "left center",
        duration: 1.6,
        ease: "expo.inOut",
        scrollTrigger: { trigger: ".mf-rule", start: "top 90%" },
      });
    },
    { scope: root }
  );

  return (
    <section id="about" ref={root} className="manifesto" data-theme="light">
      <div className="wrap">
        <p className="mf-text">
          {COPY.split(" ").map((w, i) => {
            const accent = w.startsWith("*") || /^\*/.test(w);
            const clean = w.replace(/\*/g, "");
            return (
              <span key={i} className={`mf-word ${accent ? "accent" : ""}`}>
                {clean}{" "}
              </span>
            );
          })}
        </p>
        <div className="mf-rule" />
        <div className="mf-meta mono">
          <span>Talent</span>
          <span>Creators</span>
          <span>Culture</span>
        </div>
      </div>
    </section>
  );
}

