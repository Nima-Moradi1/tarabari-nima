"use client";
import { Canvas, useFrame } from "@react-three/fiber";
import { useEffect, useMemo, useRef, useState } from "react";
import { AdditiveBlending, BufferAttribute, BufferGeometry, Color, Group, Line, LineBasicMaterial, Vector3 } from "three";
import landPoints from "@/content/globe-points.json";
import { globeCities } from "@/content/cities";
import styles from "./GlobeScene.module.css";

function vector(lat:number,lon:number,r:number){const a=lat*Math.PI/180,b=lon*Math.PI/180;return new Vector3(r*Math.cos(a)*Math.cos(b),r*Math.sin(a),r*Math.cos(a)*Math.sin(b))}
function DottedEarth(){
  const points=useMemo(()=>{
    const coords:number[]=[];const mobile=typeof window!=="undefined"&&window.innerWidth<768;
    landPoints.forEach(([lat,lon],index)=>{if(mobile&&index%2) return;const p=vector(lat,lon,2);coords.push(p.x,p.y,p.z)});
    const geometry=new BufferGeometry();geometry.setAttribute("position",new BufferAttribute(new Float32Array(coords),3));return geometry;
  },[]);
  useEffect(()=>()=>points.dispose(),[points]);
  return <points geometry={points}><pointsMaterial size={0.027} sizeAttenuation color="#a8c9ef" transparent opacity={0.88} depthWrite={false}/></points>
}
function TradeArc({to,index}:{to:{lat:number;lon:number};index:number}){
  const geometry=useMemo(()=>{const a=vector(35.6892,51.389,2.02),b=vector(to.lat,to.lon,2.02),coords:number[]=[];for(let i=0;i<=64;i++){const t=i/64;const p=a.clone().lerp(b,t).normalize().multiplyScalar(2.03+Math.sin(t*Math.PI)*(0.18+index*.04));coords.push(p.x,p.y,p.z)}const g=new BufferGeometry();g.setAttribute("position",new BufferAttribute(new Float32Array(coords),3));return g},[to,index]);
  const line=useMemo(()=>new Line(geometry,new LineBasicMaterial({color:index===0?"#ad6647":"#6896fa",transparent:true,opacity:.7,blending:AdditiveBlending})),[geometry,index]);
  useEffect(()=>()=>{geometry.dispose();(line.material as LineBasicMaterial).dispose()},[geometry,line]);return <primitive object={line}/>;
}
function GlobeObject(){const root=useRef<Group>(null);const active=useRef(true);const pointer=useRef({x:0,y:0});const angle=useRef(0);useEffect(()=>{const visibility=()=>active.current=!document.hidden;const move=(event:PointerEvent)=>{if(event.pointerType==="touch")return;pointer.current.x=(event.clientX/window.innerWidth-.5)*.1;pointer.current.y=(event.clientY/window.innerHeight-.5)*.08};document.addEventListener("visibilitychange",visibility);window.addEventListener("pointermove",move,{passive:true});return()=>{document.removeEventListener("visibilitychange",visibility);window.removeEventListener("pointermove",move)}},[]);useFrame((_,delta)=>{if(!root.current||!active.current)return;angle.current+=Math.min(delta,.05)*.055;root.current.rotation.y=angle.current+pointer.current.x;root.current.rotation.x=.16+pointer.current.y});return <group ref={root} rotation={[.16,-.1,-.1]}><mesh><sphereGeometry args={[1.96,48,32]}/><meshBasicMaterial color={new Color("#061d5e")} transparent opacity={.62}/></mesh><mesh><sphereGeometry args={[2.08,48,32]}/><meshBasicMaterial color="#28589e" transparent opacity={.09} blending={AdditiveBlending} depthWrite={false}/></mesh><DottedEarth/>{globeCities.slice(1).map((city,i)=><TradeArc key={city.name} to={city} index={i}/>)}</group>}
export function GlobeScene(){const [supported,setSupported]=useState(false);useEffect(()=>{try{const c=document.createElement("canvas");setSupported(Boolean(c.getContext("webgl2")||c.getContext("webgl")))}catch{setSupported(false)}},[]);if(!supported)return <GlobeFallback/>;return <div className={styles.wrap} aria-label="کره سه‌بعدی نمایشی با مسیرهای تهران، بندرعباس، رشت و نوشهر" role="img"><Canvas camera={{position:[0,0,5.9],fov:50}} dpr={[1,1.75]} gl={{alpha:true,antialias:false,powerPreference:"low-power"}} onCreated={({gl})=>{gl.domElement.addEventListener("webglcontextlost",()=>setSupported(false),{once:true})}}><ambientLight intensity={.7}/><GlobeObject/></Canvas><div className={styles.labels}><span>تهران <i/></span><span>بندرعباس <i/></span><span>رشت <i/></span></div></div>}
export function GlobeFallback(){return <div className={`${styles.wrap} ${styles.fallback}`} role="img" aria-label="تصویر جایگزین کره زمین و مسیرهای حمل"><div className={styles.fallbackOrb}/><div className={styles.labels}><span>تهران <i/></span><span>بندرعباس <i/></span><span>رشت <i/></span></div></div>}
