"use client";

import { useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import LafaLogo from "./LafaLogo";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const LINKS = [
  ["About", "#about"],
  ["Services", "#services"],
  ["Contact", "#contact"],
];

export default function Header() {
  const root = useRef(null);
  const [open, setOpen] = useState(false);

  useGSAP(
    () => {
      const el = root.current;

      // colour follows the section underneath
      gsap.utils.toArray("[data-theme='light']").forEach((sec) => {
        ScrollTrigger.create({
          trigger: sec,
          start: "top 40px",
          end: "bottom 40px",
          onToggle: (self) => el.setAttribute("data-on", self.isActive ? "light" : "dark"),
        });
      });

      // hide on scroll down, show on scroll up (animates only when direction changes)
      const hide = gsap.quickTo(el, "yPercent", { duration: 0.5, ease: "power3.out" });
      let hidden = false;
      ScrollTrigger.create({
        start: 0,
        end: "max",
        onUpdate: (self) => {
          const shouldHide = self.direction === 1 && self.scroll() > 160;
          if (shouldHide !== hidden) {
            hidden = shouldHide;
            hide(shouldHide ? -120 : 0);
          }
        },
      });

      // entrance once the preloader opens
      const enter = () => {
        gsap.fromTo(
          el,
          { yPercent: -100, autoAlpha: 0 },
          { yPercent: 0, autoAlpha: 1, duration: 1.1, ease: "expo.out", delay: 0.15 }
        );
      };
      if (window.__lafaReady) enter();
      else window.addEventListener("lafa:ready", enter, { once: true });
    },
    { scope: root }
  );

  const toggle = () => {
    const next = !open;
    setOpen(next);
    next ? window.__lenis?.stop() : window.__lenis?.start();
  };

  return (
    <>
      <header ref={root} className="header" data-on="dark">
        <a href="#top" className="header-logo" aria-label="Lafa Agency, back to top">
          <LafaLogo fill="currentColor" />
        </a>

        <nav className="header-nav" aria-label="Primary">
          {LINKS.map(([label, href]) => (
            <a key={href} href={href} className="link-roll">
              <span data-text={label}>{label}</span>
            </a>
          ))}
        </nav>

        <a href="#contact" className="header-cta">
          <span>Start a project</span>
          <i aria-hidden>↗</i>
        </a>

        <button
          className="header-burger"
          onClick={toggle}
          aria-expanded={open}
          aria-controls="drawer"
          aria-label={open ? "Close menu" : "Open menu"}
        >
          <span />
          <span />
        </button>
      </header>

      <div id="drawer" className={`drawer ${open ? "is-open" : ""}`} onClick={() => open && toggle()}>
        {LINKS.map(([label, href], i) => (
          <a key={href} href={href} style={{ transitionDelay: `${open ? 0.1 + i * 0.06 : 0}s` }}>
            {label}
          </a>
        ))}
      </div>
    </>
  );
}
