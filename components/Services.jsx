"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Words from "./Words";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const SERVICES = [
  ["Partnerships", "Long-term commercial alliances between our talent and category-leading brands, structured to last."],
  ["Visibility", "Press, placements and flagship moments that move creators from known to unmistakable."],
  ["Collaborations", "Co-created drops, capsules and cross-creator projects built for cultural impact."],
  ["Brand Management", "Full representation: deal negotiation, IP, positioning and career architecture."],
  ["Marketing", "Creator-led campaign strategy and launch direction that converts attention into growth."],
  ["Consulting", "Strategic advisory for brands and founders entering the creator economy."],
];

export default function Services() {
  const root = useRef(null);

  useGSAP(
    () => {
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduce) return;

      gsap.from(".sv-head .wi", {
        yPercent: 115,
        rotate: 3,
        duration: 1.2,
        stagger: 0.07,
        ease: "expo.out",
        scrollTrigger: { trigger: ".sv-head", start: "top 80%" },
      });
      gsap.from(".sv-intro", {
        y: 24,
        opacity: 0,
        duration: 1,
        ease: "expo.out",
        scrollTrigger: { trigger: ".sv-intro", start: "top 88%" },
      });

      gsap.utils.toArray(".sv-row").forEach((row) => {
        const tl = gsap.timeline({
          scrollTrigger: { trigger: row, start: "top 88%" },
          defaults: { ease: "expo.out" },
        });
        tl.from(row.querySelector(".sv-line"), { scaleX: 0, duration: 1.4, ease: "expo.inOut" }, 0)
          .from(row.querySelectorAll(".sv-in"), { y: 36, opacity: 0, duration: 1.1, stagger: 0.08 }, 0.1);

        // hover: fill sweeps up, title slides, arrow turns
        const fill = row.querySelector(".sv-fill");
        const title = row.querySelector(".sv-title");
        const arrow = row.querySelector(".sv-arrow");
        const enter = () => {
          gsap.to(fill, { scaleY: 1, duration: 0.55, ease: "power3.out", overwrite: "auto" });
          gsap.to(title, { x: 22, duration: 0.55, ease: "power3.out", overwrite: "auto" });
          gsap.to(arrow, { rotate: 45, duration: 0.5, ease: "power3.out", overwrite: "auto" });
          row.classList.add("is-hot");
        };
        const leave = () => {
          gsap.to(fill, { scaleY: 0, duration: 0.5, ease: "power3.inOut", overwrite: "auto" });
          gsap.to(title, { x: 0, duration: 0.5, ease: "power3.out", overwrite: "auto" });
          gsap.to(arrow, { rotate: 0, duration: 0.5, ease: "power3.out", overwrite: "auto" });
          row.classList.remove("is-hot");
        };
        const mm = window.matchMedia("(hover: hover) and (pointer: fine)");
        if (mm.matches) {
          row.addEventListener("mouseenter", enter);
          row.addEventListener("mouseleave", leave);
        }
      });
    },
    { scope: root }
  );

  return (
    <section id="services" ref={root} className="services" data-theme="light">
      <div className="wrap">
        <div className="sv-top">
          <div>
            <h2 className="sv-head">
              <Words text="Six ways we" as="span" className="line" />
              <Words text="grow *talent.*" as="span" className="line" />
            </h2>
          </div>
          <p className="sv-intro">
            Six disciplines, one team. Each one is built to turn a creator into a lasting brand and connect
            ambitious companies with voices their audiences trust.
          </p>
        </div>

        <ul className="sv-list">
          {SERVICES.map(([name, desc], i) => (
            <li key={name} className="sv-row" data-hover>
              <i className="sv-fill" />
              <i className="sv-line" />
              <span className="sv-num mono sv-in">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="sv-title sv-in">{name}</h3>
              <p className="sv-desc sv-in">{desc}</p>
              <span className="sv-arrow sv-in" aria-hidden>
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
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
