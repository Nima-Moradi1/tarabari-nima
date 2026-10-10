"use client";
import { useEffect, useState } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./MotionDebugHUD.module.css";

type Reading={progress:number;scene:string;fps:number;triggers:number;viewport:string;reduced:boolean};
export function MotionDebugHUD(){
  const [enabled,setEnabled]=useState(false),[paused,setPaused]=useState(false);
  const [reading,setReading]=useState<Reading>({progress:0,scene:"warehouse",fps:0,triggers:0,viewport:"",reduced:false});
  useEffect(()=>{if(process.env.NODE_ENV!=="production"&&new URLSearchParams(location.search).get("motionDebug")==="1")setEnabled(true)},[]);
  useEffect(()=>{
    if(!enabled)return;
    let frames=0,fps=0,last=performance.now(),id=0;
    const frame=(now:number)=>{frames++;if(now-last>=1000){fps=Math.round(frames*1000/(now-last));frames=0;last=now}id=requestAnimationFrame(frame)};
    id=requestAnimationFrame(frame);
    const timer=window.setInterval(()=>setReading({progress:window.__journeyDebug?.getProgress()??0,scene:document.querySelector<HTMLElement>("[data-scene]")?.dataset.scene??"unknown",fps,triggers:ScrollTrigger.getAll().length,viewport:window.innerWidth<768?"mobile":"desktop",reduced:matchMedia("(prefers-reduced-motion: reduce)").matches}),120);
    return()=>{cancelAnimationFrame(id);clearInterval(timer)};
  },[enabled]);
  if(!enabled)return null;
  const toggle=()=>{const trigger=ScrollTrigger.getById("freight-journey");if(!trigger)return;if(paused){trigger.enable();setPaused(false)}else{trigger.disable(false);setPaused(true)}};
  return <aside className={styles.hud} aria-label="ابزار بررسی حرکت"><strong>Motion QA</strong><div>p {reading.progress.toFixed(3)} · {reading.scene}</div><div>{reading.viewport} · {reading.fps} fps · {reading.triggers} triggers</div><div>reduced: {reading.reduced?"yes":"no"}</div><div>active: {reading.scene==="road"?"truck,cargo":reading.scene==="port"?"crane,cargo":reading.scene==="ocean"?"ship,cargo":reading.scene==="air"?"plane,clouds":"forklift,cargo"}</div><button onClick={toggle}>{paused?"resume":"pause"}</button></aside>;
}
