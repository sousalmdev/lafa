"use client";

import { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Words from "./Words";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const TEAM = [
  {
    name: "DJ Bandz",
    role: "CEO",
    src: "/dj-bandz.jpg",
    alt: "DJ Bandz, CEO of Lafa Agency, smiling in a red bandana",
    pos: "50% 30%",
  },
  {
    name: "Zach Schoolcraft",
    role: "President",
    src: "/zach-schoolcraft.jpg",
    alt: "Zach Schoolcraft, President of Lafa Agency, smiling behind the wheel",
    pos: "70% 20%",
  },
];

export default function Team() {
  const root = useRef(null);

  useGSAP(
    () => {
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduce) return;

      gsap.from(".tm-head .wi", {
        yPercent: 115,
        rotate: 3,
        duration: 1.2,
        stagger: 0.07,
        ease: "expo.out",
        scrollTrigger: { trigger: ".tm-head", start: "top 82%" },
      });

      gsap.utils.toArray(".tm-card").forEach((card, i) => {
        const frame = card.querySelector(".tm-frame");
        const img = card.querySelector("img");

        // photo unmasks upward, then drifts slightly as you scroll
        gsap.fromTo(
          frame,
          { clipPath: "inset(100% 0% 0% 0%)" },
          {
            clipPath: "inset(0% 0% 0% 0%)",
            duration: 1.5,
            ease: "expo.inOut",
            scrollTrigger: { trigger: card, start: "top 82%" },
          }
        );
        gsap.fromTo(
          img,
          { scale: 1.3 },
          {
            scale: 1.08,
            duration: 1.8,
            ease: "expo.out",
            scrollTrigger: { trigger: card, start: "top 82%" },
          }
        );
        gsap.fromTo(
          img,
          { yPercent: -5 },
          {
            yPercent: 5,
            ease: "none",
            scrollTrigger: { trigger: card, start: "top bottom", end: "bottom top", scrub: true },
          }
        );
        gsap.from(card.querySelectorAll(".tm-info > *"), {
          y: 30,
          opacity: 0,
          duration: 1,
          stagger: 0.1,
          delay: 0.35,
          ease: "expo.out",
          scrollTrigger: { trigger: card, start: "top 78%" },
        });
      });
    },
    { scope: root }
  );

  return (
    <section id="team" ref={root} className="team" data-theme="light">
      <div className="wrap">
        <h2 className="tm-head">
          <Words text="The people" as="span" className="line" />
          <Words text="behind *Lafa.*" as="span" className="line" />
        </h2>

        <div className="tm-grid">
          {TEAM.map((p) => (
            <article key={p.name} className="tm-card">
              <div className="tm-frame">
                <Image
                  src={p.src}
                  alt={p.alt}
                  fill
                  sizes="(max-width: 860px) 92vw, 45vw"
                  style={{ objectFit: "cover", objectPosition: p.pos }}
                />
              </div>
              <div className="tm-info">
                <h3 className="tm-name">{p.name}</h3>
                <span className="tm-role">{p.role}</span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

