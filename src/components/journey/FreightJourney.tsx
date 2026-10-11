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
  { at: .37, label: "مسیر جاده‌ای", detail: "کامیون پس از بارگیری حرکت می‌کند و پیچ جاده را طی می‌کند." },
  { at: .51, label: "بندر و انتقال بار", detail: "جرثقیل کانتینر را از تریلر بلند می‌کند و روی عرشه می‌نشاند." },
  { at: .71, label: "حمل دریایی", detail: "کانتینر روی عرشه همراه کشتی از بندر دور می‌شود." },
  { at: .82, label: "حمل هوایی", detail: "بار در پایانه به هواپیما تحویل می‌شود و پرواز آغاز می‌شود." },
  { at: .95, label: "رسیدن به مقصد", detail: "از مبدأ تا مقصد، یک مسیر روشن و قابل پیگیری." },
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

      ["road", "port", "ocean", "air", "transfer", "truck", "roadTruck", "ship", "shipWake", "deckCargo", "craneRig", "airCargo", "cloudBack", "cloudFront", "flightPath"].forEach(name => set(name, { autoAlpha: 0 }));
      set("warehouse", { autoAlpha: 1 });
      set("forklift", { x: mobile ? 1020 : 930, y: 500, scale: mobile ? .65 : 1 });
      set("truck", { x: mobile ? 1190 : 1200, y: 535, scale: mobile ? .5 : 1 });
      set("cargo", { x: mobile ? 625 : 470, y: 500, scale: mobile ? .52 : 1, autoAlpha: 1 });
      set("gantry", { x: mobile ? 130 : 0 });
      set("ship", { x: mobile ? 765 : 1020, y: 450, scale: .7 });
      set("shipBody", { rotation: 0, transformOrigin: "50% 50%" });
      set("deckCargo", { scale: 1 });
      set("craneRig", { x: mobile ? 635 : 245 });
      set("spreader", { y: 300 });
      set("craneCable", { attr: { y2: 300 } });
      set("plane", { x: mobile ? 625 : 650, y: 430, scale: mobile ? .65 : .72, rotation: 0, autoAlpha: 0, transformOrigin: "50% 50%" });
      set("airCargo", { x: mobile ? 800 : 1050, y: 380, scale: .8 });
      set("caption", { y: 0 });

      // The stacker approaches the grounded container, lifts it, and holds it
      // until the trailer is underneath. The loaded rig then drives out of shot.
      to("forklift", { x: mobile ? 850 : 700, duration: 9, ease: "power1.out" }, 0);
      to("cargo", { y: 390, duration: 6, ease: "power1.inOut" }, 10);
      to("truck", { autoAlpha: 1, x: mobile ? 740 : 590, duration: 5, ease: "power1.out" }, 19);
      to("cargo", { x: mobile ? 635 : 485, duration: 5 }, 16);
      to("cargo", { y: 485, duration: 5, ease: "power1.inOut" }, 19);
      to("forklift", { x: mobile ? 1060 : 1060, autoAlpha: 0, duration: 3 }, 23);
      to("truck", { x: mobile ? 900 : 850, duration: 6, ease: "power1.in" }, 25);
      to("cargo", { x: mobile ? 795 : 745, duration: 6, ease: "power1.in" }, 25);

      to("road", { autoAlpha: 1, duration: 6 }, 32);
      to("warehouse", { autoAlpha: 0, duration: 6 }, 32);
      to("truck", { x: mobile ? 1150 : 1500, scale: mobile ? .4 : .72, duration: 7, ease: "power1.in" }, 31);
      to("cargo", { x: mobile ? 1045 : 1395, scale: mobile ? .4 : .72, duration: 7, ease: "power1.in" }, 31);
      to("truck", { autoAlpha: 0, duration: 1 }, 38);
      to("cargo", { autoAlpha: 0, duration: 1 }, 38);
      to("roadTruck", { autoAlpha: 1, duration: 2 }, 36);
      tl.to(q("roadTruck"), {
        motionPath: { path, align: path, alignOrigin: [.5, .5], autoRotate: 90, start: 0, end: 1 },
        duration: 14,
      }, 37);

      to("port", { autoAlpha: 1, duration: 5 }, 47);
      to("road", { autoAlpha: 0, duration: 5 }, 47);
      to("roadTruck", { autoAlpha: 0, duration: 3 }, 50);
      to("truck", { autoAlpha: 1, x: mobile ? 1120 : 1200, y: 535, scale: mobile ? .5 : 1, duration: 1 }, 50);
      to("cargo", { autoAlpha: 1, x: mobile ? 1015 : 1095, y: 485, scale: mobile ? .52 : 1, duration: 1 }, 50);
      to("truck", { x: mobile ? 740 : 350, duration: 5, ease: "power1.out" }, 51);
      to("cargo", { x: mobile ? 635 : 245, duration: 5, ease: "power1.out" }, 51);
      to("ship", { autoAlpha: 1, duration: 4 }, 57);
      to("shipWake", { autoAlpha: .4, duration: 4 }, 57);
      to("craneRig", { autoAlpha: 1, duration: 2 }, 53);
      to("spreader", { y: 405, duration: 3 }, 53);
      to("craneCable", { attr: { y2: 405 }, duration: 3 }, 53);
      to("cargo", { y: 330, duration: 4, ease: "power1.inOut" }, 56);
      to("spreader", { y: 250, duration: 4, ease: "power1.inOut" }, 56);
      to("craneCable", { attr: { y2: 250 }, duration: 4, ease: "power1.inOut" }, 56);
      to("truck", { x: mobile ? 1250 : 1280, duration: 6, ease: "power1.in" }, 59);
      to("truck", { autoAlpha: 0, duration: 1 }, 65);
      to("craneRig", { x: mobile ? 700 : 890, duration: 5, ease: "power1.inOut" }, 60);
      to("cargo", { x: mobile ? 700 : 890, duration: 5, ease: "power1.inOut" }, 60);
      to("cargo", { y: 380, duration: 4, ease: "power1.inOut" }, 64);
      to("spreader", { y: 300, duration: 4, ease: "power1.inOut" }, 64);
      to("craneCable", { attr: { y2: 300 }, duration: 4, ease: "power1.inOut" }, 64);
      to("deckCargo", { autoAlpha: 1, duration: 2 }, 67);
      to("cargo", { autoAlpha: 0, duration: 2 }, 67);
      to("spreader", { y: 245, duration: 3 }, 68);
      to("craneCable", { attr: { y2: 245 }, duration: 3 }, 68);
      to("craneRig", { autoAlpha: 0, duration: 2 }, 70);

      to("ocean", { autoAlpha: 1, duration: 6 }, 66);
      to("port", { autoAlpha: 0, duration: 6 }, 66);
      to("ship", { x: mobile ? 980 : 730, y: 430, scale: mobile ? .55 : .72, duration: mobile ? 4 : 7, ease: "power1.inOut" }, 69);
      to("shipBody", { rotation: -90, duration: mobile ? 4 : 7, ease: "power1.inOut" }, 69);
      if (mobile) to("caption", { y: 450, duration: 4 }, 69);
      to("ship", { x: mobile ? 1060 : 900, y: mobile ? 220 : 170, scale: mobile ? .3 : .4, duration: 6, ease: "power1.in" }, 76);

      // The deck load stays inside the ship group. At the terminal a compact
      // freight unit is presented at the aircraft's side hatch and disappears
      // beneath the fuselage before the aircraft accelerates.
      to("air", { autoAlpha: 1, duration: 4 }, 77);
      to("transfer", { autoAlpha: 1, duration: 2 }, 79);
      to("airCargo", { autoAlpha: 1, duration: 2 }, 81);
      to("plane", { autoAlpha: 1, duration: 2 }, 81);
      if (mobile) to("caption", { y: 0, duration: 4 }, 79);
      to("ship", { autoAlpha: 0, duration: 4 }, 77);
      to("shipWake", { autoAlpha: 0, duration: 4 }, 77);
      to("ocean", { autoAlpha: 0, duration: 4 }, 77);
      to("airCargo", { x: mobile ? 640 : 665, y: 320, scale: .22, duration: 6, ease: "power1.inOut" }, 80);
      to("airCargo", { autoAlpha: 0, duration: 2 }, 85);
      to("transfer", { autoAlpha: 0, duration: 3 }, 86);
      to("plane", { x: mobile ? 625 : 690, y: 185, rotation: 6, scale: mobile ? .7 : .9, duration: 8, ease: "power1.in" }, 87);
      to("cloudBack", { autoAlpha: 1, duration: 3 }, 87);
      to("cloudFront", { autoAlpha: 1, duration: 3 }, 87);
      to("flightPath", { autoAlpha: 1, duration: 3 }, 87);
      to("cloudBack", { x: mobile ? -80 : -135, duration: 10 }, 85);
      to("cloudFront", { x: mobile ? -140 : -260, duration: 10 }, 85);
      to("plane", { x: mobile ? 790 : 900, y: -550, scale: .5, duration: 5, ease: "power1.in" }, 95);
      to("air", { autoAlpha: .38, duration: 5 }, 95);
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
          stage.dataset.scene = progress < .37 ? "warehouse" : progress < .51 ? "road" : progress < .71 ? "port" : progress < .82 ? "ocean" : progress < .95 ? "air" : "arrival";
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
      <div data-j="caption" className={styles.caption} aria-live="polite"><span>۰{Math.min(beat + 1, 6)} / ۰۶</span><h2 key={beat}>{beats[beat].label}</h2><p>{beats[beat].detail}</p></div>
      <div className={styles.progress}><span /></div>
      <div className={styles.scrollHint}>برای ادامه اسکرول کنید ↓</div>
      {beat === 5 && <Link className={`btn btn-primary ${styles.endCta}`} href="/contact">درخواست مشاوره ↗</Link>}
    </section>
    <section className={styles.storyboard} aria-label="مراحل حمل‌ونقل">{beats.slice(0, 5).map((item, index) => <article key={item.label}><span>۰{index + 1}</span><h2>{item.label}</h2><p>{item.detail}</p></article>)}</section>
    <MotionDebugHUD />
  </>;
}
