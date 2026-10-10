"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import { useGSAP } from "@gsap/react";
import { FreightArt } from "./FreightArt";
import { MotionDebugHUD } from "./MotionDebugHUD";
import styles from "./FreightJourney.module.css";

gsap.registerPlugin(ScrollTrigger, MotionPathPlugin, useGSAP);

const beats = [
  { at: 0, label: "آماده‌سازی و بارگیری", detail: "کانتینر از محوطه بارگیری به کامیون تحویل داده می‌شود." },
  { at: .31, label: "مسیر جاده‌ای", detail: "کامیون با بار روی مسیر زمینی حرکت می‌کند و پیچ جاده را طی می‌کند." },
  { at: .53, label: "بندر و انتقال بار", detail: "جرثقیل کانتینر را از کامیون تحویل می‌گیرد." },
  { at: .76, label: "حمل دریایی و هوایی", detail: "بار از کشتی به مسیر هوایی می‌رسد." },
  { at: .94, label: "رسیدن به مقصد", detail: "از مبدأ تا مقصد، یک مسیر روشن و قابل پیگیری." },
] as const;

declare global {
  interface Window {
    __journeyDebug?: { setProgress: (progress: number) => void; getProgress: () => number };
  }
}

export function FreightJourney() {
  const root = useRef<HTMLElement>(null);
  const [beat, setBeat] = useState(0);
  const beatIndex = useRef(0);

  useGSAP(() => {
    const stage = root.current;
    if (!stage) return;
    const q = (name: string) => stage.querySelectorAll(`[data-j="${name}"]`);
    const path = stage.querySelector<SVGPathElement>("#journey-road-path");
    if (!path) return;
    const mm = gsap.matchMedia();

    mm.add({
      desktop: "(min-width:768px) and (prefers-reduced-motion:no-preference)",
      mobile: "(max-width:767px) and (prefers-reduced-motion:no-preference)",
    }, context => {
      const mobile = Boolean(context.conditions?.mobile);
      const tl = gsap.timeline({ defaults: { ease: "none" } });
      const set = (name: string, vars: gsap.TweenVars) => gsap.set(q(name), vars);
      const to = (name: string, vars: gsap.TweenVars, at: number) => tl.to(q(name), vars, at);

      ["road", "port", "ocean", "air", "transfer", "truck", "roadTruck", "topCargo"].forEach(name => set(name, { autoAlpha: 0 }));
      set("warehouse", { autoAlpha: 1 });
      set("forklift", { x: mobile ? 890 : 830, y: 500, scale: mobile ? .65 : 1 });
      set("truck", { x: mobile ? 730 : 590, y: 535, scale: mobile ? .55 : 1 });
      set("cargo", { x: mobile ? 610 : 390, y: 460, scale: mobile ? .58 : 1, autoAlpha: 1 });
      set("gantry", { x: mobile ? 130 : 0 });
      set("topCargo", { x: 615, y: 440, scale: 1 });
      set("ship", { x: 0 });
      set("plane", { x: 600, y: 780, scale: 1, rotation: 0, transformOrigin: "50% 50%" });

      to("forklift", { x: mobile ? 830 : 690, duration: 11 }, 0);
      to("cargo", { x: mobile ? 625 : 470, y: 390, duration: 7 }, 11);
      to("forklift", { x: mobile ? 910 : 750, duration: 10 }, 12);
      to("truck", { autoAlpha: 1, duration: 5 }, 14);
      to("cargo", { x: mobile ? 700 : 485, y: 485, duration: 8 }, 17);
      to("forklift", { autoAlpha: 0, x: mobile ? 1050 : 900, duration: 7 }, 20);

      to("warehouse", { autoAlpha: 0, duration: 5 }, 30);
      to("road", { autoAlpha: 1, duration: 5 }, 30);
      to("truck", { autoAlpha: 0, duration: 5 }, 30);
      to("cargo", { autoAlpha: 0, duration: 5 }, 30);
      to("roadTruck", { autoAlpha: 1, duration: 5 }, 30);
      tl.to(q("roadTruck"), {
        motionPath: { path, align: path, alignOrigin: [.5, .5], autoRotate: 90, start: 0, end: 1 },
        duration: 21,
      }, 31);

      to("road", { autoAlpha: 0, duration: 5 }, 49);
      to("port", { autoAlpha: 1, duration: 5 }, 49);
      to("roadTruck", { autoAlpha: 0, duration: 4 }, 50);
      to("truck", { autoAlpha: 1, x: mobile ? 700 : 590, y: 535, duration: 4 }, 50);
      to("cargo", { autoAlpha: 1, x: mobile ? 650 : 485, y: 485, duration: 4 }, 50);
      to("cargo", { y: 460, duration: 10 }, 58);
      to("truck", { autoAlpha: 0, x: mobile ? 870 : 850, duration: 7 }, 62);

      to("port", { autoAlpha: 0, duration: 6 }, 68);
      to("ocean", { autoAlpha: 1, duration: 6 }, 68);
      to("cargo", { x: mobile ? 680 : 615, y: 435, scale: .58, duration: 5 }, 68);
      to("cargo", { autoAlpha: 0, duration: 4 }, 70);
      to("topCargo", { autoAlpha: 1, duration: 4 }, 70);
      to("ship", { x: mobile ? -45 : -105, duration: 8 }, 72);
      to("topCargo", { x: 540, y: 580, scale: .65, duration: 9 }, 76);

      to("ocean", { autoAlpha: 0, duration: 6 }, 76);
      to("air", { autoAlpha: 1, duration: 6 }, 76);
      to("transfer", { autoAlpha: 1, duration: 4 }, 76);
      to("plane", { y: 390, duration: 10 }, 76);
      to("topCargo", { autoAlpha: 0, duration: 3 }, 83);
      to("transfer", { autoAlpha: 0, duration: 5 }, 84);
      to("plane", { x: mobile ? 630 : 690, y: 185, rotation: 6, scale: .9, duration: 10 }, 85);
      to("cloudBack", { x: mobile ? -80 : -135, duration: 10 }, 85);
      to("cloudFront", { x: mobile ? -140 : -260, duration: 10 }, 85);
      to("plane", { x: mobile ? 790 : 900, y: -290, scale: .58, duration: 8 }, 94);
      to("air", { autoAlpha: .38, duration: 6 }, 94);
      tl.to({}, { duration: 1 }, 99);

      const trigger = ScrollTrigger.create({
        id: "freight-journey",
        trigger: stage,
        start: "top top",
        end: () => `+=${window.innerHeight * (mobile ? 5.2 : 7.2)}`,
        pin: true,
        scrub: mobile ? .3 : .8,
        animation: tl,
        invalidateOnRefresh: true,
        onUpdate: self => {
          const progress = self.progress;
          stage.dataset.scene = progress < .31 ? "warehouse" : progress < .53 ? "road" : progress < .68 ? "port" : progress < .76 ? "ocean" : progress < .94 ? "air" : "arrival";
          const index = beats.reduce((found, item, current) => progress >= item.at ? current : found, 0);
          if (index !== beatIndex.current) { beatIndex.current = index; setBeat(index); }
          stage.style.setProperty("--progress", String(progress));
        },
      });

      if (process.env.NODE_ENV !== "production") {
        window.__journeyDebug = {
          setProgress: progress => window.scrollTo({ top: trigger.start + (trigger.end - trigger.start) * Math.max(0, Math.min(1, progress)), behavior: "instant" }),
          getProgress: () => trigger.progress,
        };
      }
      return () => { delete window.__journeyDebug; trigger.kill(); tl.kill(); };
    });
    return () => mm.revert();
  }, { scope: root });

  return <>
    <section ref={root} className={styles.stage} aria-label="سفر محموله از انبار تا مقصد" data-scene="warehouse">
      <FreightArt />
      <div className={styles.top}><span>سفر یک محموله</span><span dir="ltr">NIMA / FREIGHT JOURNEY</span></div>
      <div className={styles.caption} aria-live="polite"><span>۰{Math.min(beat + 1, 5)} / ۰۵</span><h2 key={beat}>{beats[beat].label}</h2><p>{beats[beat].detail}</p></div>
      <div className={styles.progress}><span /></div>
      <div className={styles.scrollHint}>برای ادامه اسکرول کنید ↓</div>
      {beat === 4 && <Link className={`btn btn-primary ${styles.endCta}`} href="/contact">درخواست مشاوره ↗</Link>}
    </section>
    <section className={styles.storyboard} aria-label="مراحل حمل‌ونقل">{beats.slice(0, 4).map((item, index) => <article key={item.label}><span>۰{index + 1}</span><h2>{item.label}</h2><p>{item.detail}</p></article>)}</section>
    <MotionDebugHUD />
  </>;
}
