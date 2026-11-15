"use client";

import { useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import LafaLogo from "./LafaLogo";
import Words from "./Words";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function Contact() {
  const root = useRef(null);
  const [status, setStatus] = useState("");

  useGSAP(
    () => {
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduce) return;

      gsap.from(".ct-head .wi", {
        yPercent: 115,
        rotate: 3,
        duration: 1.3,
        stagger: 0.07,
        ease: "expo.out",
        scrollTrigger: { trigger: ".ct-head", start: "top 80%" },
      });
      gsap.from(".ct-form > *", {
        y: 30,
        opacity: 0,
        duration: 1,
        stagger: 0.08,
        ease: "expo.out",
        scrollTrigger: { trigger: ".ct-form", start: "top 85%" },
      });

      // closing wordmark draws itself, then floods with ink
      const paths = gsap.utils.toArray(".ct-logo .lafa-path");
      paths.forEach((p) => {
        const l = p.getTotalLength();
        gsap.set(p, { strokeDasharray: l, strokeDashoffset: l, fill: "rgba(182,42,67,0)" });
      });
      gsap
        .timeline({ scrollTrigger: { trigger: ".ct-logo", start: "top 90%" } })
        .to(paths, { strokeDashoffset: 0, duration: 1.8, stagger: 0.2, ease: "power2.inOut" })
        .to(paths, { fill: "#B62A43", duration: 0.9, stagger: 0.08 }, 1.1)
        .to(paths, { strokeOpacity: 0, duration: 0.6 }, 1.5);
    },
    { scope: root }
  );

  const submit = (e) => {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    if (!f.get("name") || !f.get("email")) return setStatus("Please add your name and email.");
    setStatus(`Thanks, ${f.get("name")}, we’ll be in touch about ${f.get("service")}.`);
    e.currentTarget.reset();
  };

  return (
    <footer id="contact" ref={root} className="contact" data-theme="dark">
      <div className="wrap">
        <div className="ct-grid">
          <div>
            <h2 className="ct-head">
              <Words text="Ready to" as="span" className="line" />
              <Words text="make *noise?*" as="span" className="line" />
            </h2>
          </div>

          <form className="ct-form" onSubmit={submit} noValidate>
            <label>
              <span className="mono">Name / Brand</span>
              <input name="name" type="text" placeholder="Your name or company" autoComplete="name" />
            </label>
            <label>
              <span className="mono">Email</span>
              <input name="email" type="email" placeholder="you@company.com" autoComplete="email" />
            </label>
            <label>
              <span className="mono">Interested in</span>
              <select name="service" defaultValue="Partnerships">
                <option>Partnerships</option>
                <option>Visibility</option>
                <option>Collaborations</option>
                <option>Brand Management</option>
                <option>Marketing</option>
                <option>Consulting</option>
              </select>
            </label>
            <label>
              <span className="mono">Brief</span>
              <textarea name="message" rows={3} placeholder="Tell us about the talent or project…" />
            </label>
            <button type="submit" className="btn btn-light" data-magnetic>
              <span>Send inquiry</span>
              <span className="btn-arrow" aria-hidden>↗</span>
            </button>
            <p className="ct-status mono" role="status" aria-live="polite">
              {status}
            </p>
          </form>
        </div>

        <LafaLogo className="ct-logo" fill="none" stroke="#EAE3D5" strokeWidth={12} aria-hidden />

        <div className="ct-bottom mono">
          <span>© {new Date().getFullYear()} Lafa Agency - Talent and Creators Agency</span>
          <a href="#top" className="link-roll">
            <span data-text="Back to top ↑">Back to top ↑</span>
          </a>
        </div>
      </div>
    </footer>
  );
}

