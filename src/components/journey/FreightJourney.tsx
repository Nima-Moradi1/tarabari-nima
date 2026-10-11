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

const journeyDuration = 156;

const beats = [
  { at: 0, label: "آماده‌سازی و بارگیری", detail: "کانتینر از محوطه بارگیری به کامیون تحویل داده می‌شود." },
  { at: 37 / journeyDuration, label: "مسیر جاده‌ای", detail: "کامیون پس از بارگیری حرکت می‌کند و پیچ جاده را طی می‌کند." },
  { at: 51 / journeyDuration, label: "بندر و انتقال بار", detail: "جرثقیل کانتینر را از تریلر بلند می‌کند و روی عرشه می‌نشاند." },
  { at: 71 / journeyDuration, label: "حمل دریایی", detail: "کانتینر روی عرشه همراه کشتی از بندر دور می‌شود." },
  { at: 105 / journeyDuration, label: "حمل هوایی", detail: "بار در پایانه به هواپیما تحویل می‌شود و پرواز آغاز می‌شود." },
  { at: 150 / journeyDuration, label: "رسیدن به مقصد", detail: "از مبدأ تا مقصد، یک مسیر روشن و قابل پیگیری." },
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
    const mm = gsap.matchMedia();

    mm.add({
      desktop: "(min-width:768px) and (prefers-reduced-motion:no-preference)",
      mobile: "(max-width:767px) and (prefers-reduced-motion:no-preference)",
    }, context => {
      const mobile = Boolean(context.conditions?.mobile);
      const path = stage.querySelector<SVGPathElement>(mobile ? "#journey-road-path-mobile" : "#journey-road-path-desktop");
      if (!path) return;
      const tl = gsap.timeline({ defaults: { ease: "none" } });
      const set = (name: string, vars: gsap.TweenVars) => gsap.set(q(name), vars);
      const to = (name: string, vars: gsap.TweenVars, at: number) => tl.to(q(name), vars, at);
      // Keep gentle water movement independent of scroll scrub and GSAP's
      // sleeping ticker; only paint frames while the sea is visible.
      const swell = stage.querySelector<SVGGElement>('[data-j="waterSwell"]');
      const shimmer = stage.querySelector<SVGGElement>('[data-j="waterShimmer"]');
      const glints = stage.querySelector<SVGGElement>('[data-j="waterGlintMotion"]');
      let seaFrame = 0;
      let seaStart = 0;
      let seaActive = false;
      const animateSea = (now: number) => {
        if (!seaActive) return;
        const seconds = (now - seaStart) / 1000;
        const wave = (period: number, phase = 0) => Math.sin(seconds * Math.PI * 2 / period + phase);
        swell?.setAttribute("transform", `translate(${2 + 13 * wave(16, -Math.PI / 2)} ${-1 + 9 * wave(13, Math.PI / 2)})`);
        shimmer?.setAttribute("transform", `translate(${26 * wave(13, Math.PI / 2)} ${15 * wave(10, -Math.PI / 2)})`);
        shimmer?.setAttribute("opacity", String(.77 + .2 * wave(9)));
        glints?.setAttribute("transform", `translate(${22 * wave(10)} ${7 * wave(12, Math.PI / 2)})`);
        glints?.setAttribute("opacity", String(.39 + .16 * wave(7)));
        seaFrame = requestAnimationFrame(animateSea);
      };

      ["road", "port", "ocean", "air", "approachField", "transfer", "truck", "roadTruck", "ship", "shipWake", "deckCargo", "craneRig", "airCargo", "airPayload", "hatch", "planeShadow", "cloudBack", "cloudFront", "flightPath"].forEach(name => set(name, { autoAlpha: 0 }));
      set("warehouse", { autoAlpha: 1 });
      set("forklift", { x: mobile ? 1020 : 930, y: 500, scale: mobile ? .65 : 1 });
      set("boom", { attr: { transform: "rotate(-10 100 -50)" } });
      set("truck", { x: mobile ? 1000 : 1200, y: 535, scale: mobile ? .5 : 1, transformOrigin: "50% 50%" });
      set("cargo", { x: mobile ? 625 : 470, y: 390, scale: mobile ? .52 : 1, autoAlpha: 1, transformOrigin: "50% 50%" });
      set("stackerGrip", { autoAlpha: 0 });
      set("roadTruck", { x: mobile ? 690 : 850, y: 555, rotation: 90, scale: mobile ? .65 : .85 });
      set("gantry", { x: mobile ? 130 : 0 });
      set("ship", { x: mobile ? 765 : 1020, y: 450, scale: .7 });
      set("shipBody", { attr: { transform: "rotate(0 0 0)" } });
      set("deckCargo", { scale: 1 });
      set("craneRig", { x: mobile ? 635 : 245 });
      set("spreader", { y: 300 });
      set("craneCable", { attr: { y2: 300 } });
      set("plane", { x: mobile ? 310 : -230, y: mobile ? -260 : -180, scale: .16, rotation: 25, rotationX: 58, autoAlpha: 0, transformOrigin: "50% 50%", transformPerspective: 900 });
      set("airCargo", { x: mobile ? 990 : 1100, y: mobile ? 305 : 295, scale: .8 });
      set("airPayload", { x: 235, y: -190 });
      set("hatchDoor", { y: 0 });
      set("planeShadow", { scale: 1.35, transformOrigin: "50% 50%" });
      set("caption", { y: 0 });

      // Grip the top corner castings before lifting. Keep the gripper attached
      // through the trailer descent, then release it before departure.
      to("forklift", { x: mobile ? 850 : 700, duration: 9, ease: "power1.out" }, 0);
      to("stackerGrip", { autoAlpha: 1, duration: 1 }, 9);
      to("cargo", { y: 330, duration: 5, ease: "power1.inOut" }, 10);
      to("boom", { attr: { transform: "rotate(0 100 -50)" }, duration: 5, ease: "power1.inOut" }, 10);
      to("cargo", { x: mobile ? 520 : 485, duration: 4, ease: "power1.inOut" }, 15);
      if (mobile) to("forklift", { x: 745, duration: 4, ease: "power1.inOut" }, 15);
      to("truck", { autoAlpha: 1, x: mobile ? 600 : 590, duration: 4, ease: "power1.out" }, 18);
      to("cargo", { y: mobile ? 510 : 485, duration: 4, ease: "power1.inOut" }, 22);
      to("boom", { attr: { transform: `rotate(${mobile ? -42 : -30} 100 -50)` }, duration: 4, ease: "power1.inOut" }, 22);
      to("stackerGrip", { autoAlpha: 0, y: -18, duration: 1.5 }, 26);
      to("forklift", { x: 1060, autoAlpha: 0, duration: 3 }, 27);
      to("truck", { x: mobile ? 690 : 850, duration: 5, ease: "power1.in" }, 29);
      to("cargo", { x: mobile ? 610 : 745, duration: 5, ease: "power1.in" }, 29);

      // The camera moves from the side to above at the loaded truck's actual
      // right-side position. Both projections overlap there before it turns.
      to("road", { autoAlpha: 1, duration: 6 }, 34);
      to("warehouse", { autoAlpha: 0, duration: 6 }, 34);
      to("truck", { y: 555, scale: mobile ? .32 : .4, duration: 4, ease: "power1.inOut" }, 36);
      to("cargo", { x: mobile ? 655 : 808, y: 535, scale: mobile ? .22 : .4, duration: 4, ease: "power1.inOut" }, 36);
      to("roadTruck", { autoAlpha: 1, duration: 3 }, 37);
      to("truck", { autoAlpha: 0, duration: 2 }, 38);
      to("cargo", { autoAlpha: 0, duration: 2 }, 38);
      tl.to(q("roadTruck"), {
        motionPath: { path, align: path, alignOrigin: [.5, .5], autoRotate: 90, start: 0, end: 1 },
        duration: 12,
      }, 40);

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
      to("ship", { x: mobile ? 980 : 950, y: 430, scale: mobile ? .55 : .72, duration: mobile ? 4 : 7, ease: "power1.inOut" }, 69);
      to("shipBody", { attr: { transform: "rotate(-90 0 0)" }, duration: mobile ? 4 : 7, ease: "power1.inOut" }, 69);
      // After the turn the loaded ship crosses open water long enough for its
      // motion, surface drift and wake to read before the camera leaves it.
      to("ship", { x: mobile ? 980 : 950, y: mobile ? 335 : 320, scale: mobile ? .52 : .62, duration: 12, ease: "power1.inOut" }, 76);
      to("ship", { x: mobile ? 990 : 980, y: 210, scale: mobile ? .46 : .48, duration: 14, ease: "power1.in" }, 88);
      to("waterSurface", { x: -75, y: 35, duration: 37, ease: "none" }, 67);
      to("waterRipples", { x: 115, y: -42, duration: 37, ease: "none" }, 67);
      to("waterGlint", { x: 105, y: -28, duration: 37, ease: "none" }, 67);
      to("shipWake", { autoAlpha: .9, duration: 5 }, 76);

      // The aircraft enters from outside the shot, descends over a perspective
      // runway and settles while the camera pulls back to the overhead apron.
      to("air", { autoAlpha: 1, duration: 5 }, 101);
      to("approachField", { autoAlpha: 1, duration: 2 }, 101);
      to("ship", { autoAlpha: 0, duration: 5 }, 101);
      to("shipWake", { autoAlpha: 0, duration: 5 }, 101);
      to("ocean", { autoAlpha: 0, duration: 5 }, 101);
      to("plane", { autoAlpha: 1, duration: 1 }, 104);
      to("plane", { x: mobile ? 650 : 540, y: 215, scale: mobile ? .65 : 1.08, rotation: 6, rotationX: 24, duration: 8, ease: "power2.out" }, 104);
      to("plane", { x: mobile ? 625 : 650, y: 430, scale: mobile ? .65 : .72, rotation: 0, rotationX: 0, duration: 7, ease: "power2.inOut" }, 112);
      to("planeShadow", { autoAlpha: .34, scale: 1, duration: 7, ease: "power1.in" }, 110);
      to("transfer", { autoAlpha: 1, duration: 6 }, 111);
      to("approachField", { autoAlpha: 0, duration: 6 }, 111);

      // A raised roller loader meets the forward fuselage hatch. The freight
      // moves along the loader and is occluded by the aircraft at the door.
      to("airCargo", { autoAlpha: 1, duration: 2 }, 117);
      to("hatch", { autoAlpha: 1, duration: 1 }, 117);
      to("airCargo", { x: mobile ? 790 : 790, duration: 5, ease: "power1.out" }, 118);
      to("hatchDoor", { y: -65, duration: 2, ease: "power1.inOut" }, 120);
      to("airPayload", { autoAlpha: 1, duration: 1 }, 121);
      to("airPayload", { x: 17, duration: 7, ease: "power1.inOut" }, 122);
      to("airPayload", { autoAlpha: 0, duration: 1 }, 128);
      to("hatchDoor", { y: 0, duration: 2 }, 130);
      to("hatch", { autoAlpha: 0, duration: 1 }, 132);
      to("airCargo", { x: mobile ? 1100 : 1180, duration: 5, ease: "power1.in" }, 131);
      to("airCargo", { autoAlpha: 0, duration: 2 }, 134);

      // Runway acceleration, rotation and a longer climb into cloud layers.
      to("plane", { x: mobile ? 635 : 670, y: 255, scale: mobile ? .68 : .7, rotationX: 25, duration: 6, ease: "power2.in" }, 136);
      to("planeShadow", { autoAlpha: 0, scale: .5, duration: 6 }, 136);
      to("transfer", { autoAlpha: 0, duration: 8 }, 136);
      to("cloudBack", { autoAlpha: .45, duration: 4 }, 137);
      to("cloudFront", { autoAlpha: .7, duration: 5 }, 140);
      to("cloudBack", { x: mobile ? -80 : -135, duration: 15 }, 140);
      to("cloudFront", { x: mobile ? -140 : -260, duration: 15 }, 140);
      to("skyPhoto", { scale: 1.08, x: -28, y: 20, duration: 19 }, 136);
      to("plane", { x: mobile ? 650 : 760, y: mobile ? 315 : 210, scale: mobile ? .07 : .37, rotation: 8, rotationX: 42, duration: 9, ease: "power1.in" }, 142);
      to("plane", { x: mobile ? 770 : 870, y: -330, scale: mobile ? .05 : .16, duration: 5, ease: "power1.in" }, 151);
      tl.to({}, { duration: 1 }, journeyDuration - 1);

      const trigger = ScrollTrigger.create({
        id: "freight-journey",
        trigger: stage,
        start: "top top",
        end: () => `+=${window.innerHeight * (mobile ? 8.1 : 11.2)}`,
        pin: true,
        scrub: mobile ? .3 : .8,
        animation: tl,
        invalidateOnRefresh: true,
        onUpdate: self => {
          const progress = self.progress;
          const time = progress * journeyDuration;
          const showSea = time >= 66 && time < 106;
          if (showSea !== seaActive) {
            seaActive = showSea;
            if (showSea) {
              seaStart = performance.now();
              seaFrame = requestAnimationFrame(animateSea);
            } else {
              cancelAnimationFrame(seaFrame);
            }
          }
          stage.dataset.scene = time < 37 ? "warehouse" : time < 51 ? "road" : time < 71 ? "port" : time < 105 ? "ocean" : time < 150 ? "air" : "arrival";
          stage.dataset.phase = time < 76 ? "port-to-sea" : time < 101 ? "sailing" : time < 117 ? "landing" : time < 136 ? "air-loading" : "takeoff";
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
      return () => { delete window.__journeyDebug; cancelAnimationFrame(seaFrame); trigger.kill(); tl.kill(); };
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
