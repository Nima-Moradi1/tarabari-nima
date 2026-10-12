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

const journeyDuration = 166;

const beats = [
  { at: 0, label: "آماده‌سازی و بارگیری", detail: "کانتینر از محوطه بارگیری به کامیون تحویل داده می‌شود." },
  { at: 37 / journeyDuration, label: "مسیر جاده‌ای", detail: "کامیون پس از بارگیری حرکت می‌کند و پیچ جاده را طی می‌کند." },
  { at: 51 / journeyDuration, label: "بندر و انتقال بار", detail: "جرثقیل کانتینر را از تریلر بلند می‌کند و روی عرشه می‌نشاند." },
  { at: 71 / journeyDuration, label: "حمل دریایی", detail: "کانتینر روی عرشه همراه کشتی از بندر دور می‌شود." },
  { at: 105 / journeyDuration, label: "حمل هوایی", detail: "بار در پایانه به هواپیما تحویل می‌شود و پرواز آغاز می‌شود." },
  { at: 162 / journeyDuration, label: "رسیدن به مقصد", detail: "از مبدأ تا مقصد، یک مسیر روشن و قابل پیگیری." },
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
    const progressBar = stage.querySelector<HTMLElement>('[data-j="progressBar"]');
    if (!progressBar) return;
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
      let lastSeaPaint = 0;
      let seaActive = false;
      const animateSea = (now: number) => {
        if (!seaActive) return;
        seaFrame = requestAnimationFrame(animateSea);
        if (mobile && now - lastSeaPaint < 33) return;
        lastSeaPaint = now;
        const seconds = (now - seaStart) / 1000;
        const wave = (period: number, phase = 0) => Math.sin(seconds * Math.PI * 2 / period + phase);
        swell?.setAttribute("transform", `translate(${2 + 13 * wave(16, -Math.PI / 2)} ${-1 + 9 * wave(13, Math.PI / 2)})`);
        if (!mobile) {
          shimmer?.setAttribute("transform", `translate(${26 * wave(13, Math.PI / 2)} ${15 * wave(10, -Math.PI / 2)})`);
          shimmer?.setAttribute("opacity", String(.77 + .2 * wave(9)));
        }
        glints?.setAttribute("transform", `translate(${22 * wave(10)} ${7 * wave(12, Math.PI / 2)})`);
        glints?.setAttribute("opacity", String(.39 + .16 * wave(7)));
      };

      ["road", "port", "ocean", "air", "truck", "roadTruck", "ship", "shipWake", "deckCargo", "craneRig", "airCargo", "airPayload", "hatch", "planeShadow", "planeDeparture", "cloudBack", "cloudFront", "flightPath"].forEach(name => set(name, { autoAlpha: 0 }));
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
      if (mobile) set("waterShimmer", { autoAlpha: 0 });
      set("deckCargo", { scale: 1 });
      set("craneRig", { x: mobile ? 635 : 245 });
      set("spreader", { y: 300 });
      set("craneCable", { attr: { y2: 300 } });
      set("plane", { x: mobile ? 310 : -180, y: mobile ? 270 : 100, scale: mobile ? .19 : .28, rotation: -7, autoAlpha: 0, transformOrigin: "50% 50%" });
      set("planeDeparture", { x: mobile ? 540 : 580, y: mobile ? 517 : 497, scale: mobile ? .32 : .62, scaleX: mobile ? .08 : .15, rotation: 0, autoAlpha: 0, transformOrigin: "50% 50%" });
      set("airCargo", { x: mobile ? 1050 : 1200, y: mobile ? 535 : 465, scale: .84 });
      set("airPayload", { x: mobile ? 890 : 1020, y: mobile ? 530 : 460, scale: .65 });
      set("hatchDoor", { x: 0 });
      set("planeShadow", { x: mobile ? 390 : 150, y: 490, scale: .45, transformOrigin: "50% 50%" });
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
      if (!mobile) to("waterRipples", { x: 115, y: -42, duration: 37, ease: "none" }, 67);
      to("waterGlint", { x: 105, y: -28, duration: 37, ease: "none" }, 67);
      to("shipWake", { autoAlpha: .9, duration: 5 }, 76);

      // Keep one runway and horizon throughout. The same side-view aircraft
      // travels forward on a shallow glide slope until its wheels meet it.
      to("air", { autoAlpha: 1, duration: 5 }, 101);
      to("ship", { autoAlpha: 0, duration: 5 }, 101);
      to("shipWake", { autoAlpha: 0, duration: 5 }, 101);
      to("ocean", { autoAlpha: 0, duration: 5 }, 101);
      to("plane", { autoAlpha: 1, duration: 1 }, 103);
      to("plane", { x: mobile ? 450 : 320, y: mobile ? 400 : 315, scale: mobile ? .3 : .6, rotation: -4, duration: 8, ease: "power1.inOut" }, 104);
      to("plane", { x: mobile ? 530 : 560, y: mobile ? 515 : 495, scale: mobile ? .37 : .78, rotation: -2, duration: 4, ease: "power1.out" }, 112);
      to("planeShadow", { x: mobile ? 520 : 540, y: 540, autoAlpha: .48, scale: mobile ? .45 : 1, duration: 6, ease: "power1.in" }, 110);
      to("plane", { x: mobile ? 540 : 580, y: mobile ? 517 : 497, rotation: 0, duration: 2, ease: "power2.out" }, 116);
      to("planeShadow", { x: mobile ? 530 : 560, y: 545, duration: 2 }, 116);

      // A raised roller loader meets the forward fuselage hatch. The freight
      // moves along the loader and is occluded by the aircraft at the door.
      to("airCargo", { autoAlpha: 1, duration: 2 }, 117);
      to("hatch", { autoAlpha: 1, duration: 1 }, 117);
      to("airCargo", { x: mobile ? 800 : 940, duration: 5, ease: "power1.out" }, 118);
      to("hatchDoor", { x: -23, duration: 2, ease: "power1.inOut" }, 120);
      to("airPayload", { autoAlpha: 1, duration: 1 }, 121);
      to("airPayload", { x: mobile ? 660 : 825, y: mobile ? 500 : 470, duration: 7, ease: "power1.inOut" }, 122);
      to("airPayload", { autoAlpha: 0, duration: 1 }, 128);
      to("hatchDoor", { x: 0, duration: 2 }, 130);
      to("hatch", { autoAlpha: 0, duration: 1 }, 132);
      to("airCargo", { x: mobile ? 1050 : 1200, duration: 5, ease: "power1.in" }, 131);
      to("airCargo", { autoAlpha: 0, duration: 2 }, 134);

      // Yaw on the ground first, then roll toward the runway's vanishing point.
      // The shadow stays on the asphalt until the wheels leave it.
      to("plane", { scaleX: mobile ? .08 : .15, duration: 4, ease: "power1.inOut" }, 136);
      to("plane", { autoAlpha: 0, duration: .2 }, 139.9);
      to("planeDeparture", { autoAlpha: 1, duration: .2 }, 140);
      to("planeDeparture", { x: mobile ? 550 : 600, scaleX: mobile ? .32 : .62, duration: 3, ease: "power1.inOut" }, 140);
      to("planeDeparture", { x: mobile ? 650 : 840, y: mobile ? 490 : 460, scale: mobile ? .24 : .43, rotation: -3, duration: 9, ease: "power2.in" }, 143);
      to("planeShadow", { x: mobile ? 630 : 820, y: mobile ? 530 : 510, scale: mobile ? .3 : .62, duration: 9, ease: "power2.in" }, 143);
      to("planeDeparture", { x: mobile ? 710 : 990, y: mobile ? 220 : 180, scale: mobile ? .16 : .28, rotation: -9, duration: 7, ease: "power2.in" }, 152);
      to("planeShadow", { x: mobile ? 690 : 950, y: 490, autoAlpha: 0, scale: .2, duration: 7 }, 152);
      to("planeDeparture", { x: mobile ? 780 : 1250, y: -180, scale: .1, duration: 5, ease: "power1.in" }, 159);
      tl.to({}, { duration: 1 }, journeyDuration - 1);

      const trigger = ScrollTrigger.create({
        id: "freight-journey",
        trigger: stage,
        start: "top top",
        end: () => `+=${stage.clientHeight * (mobile ? 8.6 : 11.9)}`,
        pin: true,
        scrub: mobile ? .18 : .8,
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
              lastSeaPaint = 0;
              seaFrame = requestAnimationFrame(animateSea);
            } else {
              cancelAnimationFrame(seaFrame);
            }
          }
          const scene = time < 37 ? "warehouse" : time < 51 ? "road" : time < 71 ? "port" : time < 105 ? "ocean" : time < 162 ? "air" : "arrival";
          const phase = time < 76 ? "port-to-sea" : time < 101 ? "sailing" : time < 117 ? "landing" : time < 136 ? "air-loading" : "takeoff";
          const flightStep = time < 136 ? "approach" : time < 143 ? "turn" : time < 152 ? "roll" : time < 157 ? "lift" : "climb";
          if (stage.dataset.scene !== scene) stage.dataset.scene = scene;
          if (stage.dataset.phase !== phase) stage.dataset.phase = phase;
          if (stage.dataset.flightStep !== flightStep) stage.dataset.flightStep = flightStep;
          const index = beats.reduce((found, item, current) => progress >= item.at ? current : found, 0);
          if (index !== beatIndex.current) { beatIndex.current = index; setBeat(index); }
          progressBar.style.transform = `scaleX(${progress})`;
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
      <div className={styles.progress}><span data-j="progressBar" /></div>
      <div className={styles.scrollHint}>برای ادامه اسکرول کنید ↓</div>
      {beat === 5 && <Link className={`btn btn-primary ${styles.endCta}`} href="/contact">درخواست مشاوره ↗</Link>}
    </section>
    <section className={styles.storyboard} aria-label="مراحل حمل‌ونقل">{beats.slice(0, 5).map((item, index) => <article key={item.label}><span>۰{index + 1}</span><h2>{item.label}</h2><p>{item.detail}</p></article>)}</section>
    <MotionDebugHUD />
  </>;
}
