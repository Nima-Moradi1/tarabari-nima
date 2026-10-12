"use client";
import { Canvas, useFrame } from "@react-three/fiber";
import { useEffect, useMemo, useRef, useState, type RefObject } from "react";
import { AdditiveBlending, BufferAttribute, BufferGeometry, CatmullRomCurve3, Group, Mesh, TubeGeometry, Vector3 } from "three";
import landPoints from "@/content/globe-points.json";
import { globeCities } from "@/content/cities";
import styles from "./GlobeScene.module.css";
const LABEL_OFFSETS=[[-30,-26],[42,30],[-52,-40],[52,28]] as const;
const routes=[globeCities[1],globeCities[4],globeCities[6],globeCities[7]];
const labels=[globeCities[0],globeCities[1],globeCities[4],globeCities[6]];
function distanceKm(a:{lat:number;lon:number},b:{lat:number;lon:number}){
  const lat1=a.lat*Math.PI/180,lat2=b.lat*Math.PI/180,dLat=lat2-lat1,dLon=(b.lon-a.lon)*Math.PI/180;
  const h=Math.sin(dLat/2)**2+Math.cos(lat1)*Math.cos(lat2)*Math.sin(dLon/2)**2;
  return Math.round(6371*2*Math.atan2(Math.sqrt(h),Math.sqrt(1-h)));
}

function vector(lat:number,lon:number,r:number){
  const a=lat*Math.PI/180,b=lon*Math.PI/180;
  return new Vector3(r*Math.cos(a)*Math.cos(b),r*Math.sin(a),r*Math.cos(a)*Math.sin(b));
}
function DottedEarth(){
  const geometry=useMemo(()=>{
    const coords:number[]=[];
    const mobile=window.innerWidth<768;
    landPoints.forEach(([lat,lon],index)=>{if(mobile&&index%2)return;const point=vector(lat,lon,2);coords.push(point.x,point.y,point.z)});
    const result=new BufferGeometry();result.setAttribute("position",new BufferAttribute(new Float32Array(coords),3));return result;
  },[]);
  useEffect(()=>()=>geometry.dispose(),[geometry]);
  return <points geometry={geometry}><pointsMaterial size={.027} sizeAttenuation color="#a8c9ef" transparent opacity={.88} depthWrite={false}/></points>;
}
function TradeArc({to,index}:{to:{lat:number;lon:number};index:number}){
  const pulse=useRef<Mesh>(null);
  const curve=useMemo(()=>{
    const from=vector(globeCities[0].lat,globeCities[0].lon,2.02),end=vector(to.lat,to.lon,2.02);
    const points=Array.from({length:33},(_,i)=>{const t=i/32;return from.clone().lerp(end,t).normalize().multiplyScalar(2.07+Math.sin(t*Math.PI)*(.15+index*.06))});
    return new CatmullRomCurve3(points);
  },[to,index]);
  const geometry=useMemo(()=>new TubeGeometry(curve,72,.011,5,false),[curve]);
  useEffect(()=>()=>geometry.dispose(),[geometry]);
  useFrame(({clock})=>{if(pulse.current)pulse.current.position.copy(curve.getPointAt((clock.elapsedTime*.13+index*.21)%1))});
  return <>
    <mesh geometry={geometry}><meshBasicMaterial color="#e9864d" transparent opacity={.77} blending={AdditiveBlending} depthWrite={false}/></mesh>
    <mesh ref={pulse}><sphereGeometry args={[.045,10,10]}/><meshBasicMaterial color="#ffb17a" blending={AdditiveBlending}/></mesh>
  </>;
}
function GlobeObject({labelRefs}:{labelRefs:RefObject<(HTMLSpanElement|null)[]>}){
  const root=useRef<Group>(null),active=useRef(true),pointer=useRef({x:0,y:0}),angle=useRef(-.7);
  const mobile=window.innerWidth<768;
  const labelPoints=useMemo(()=>labels.slice(0,mobile?2:4).map(city=>vector(city.lat,city.lon,2.18)),[mobile]);
  useEffect(()=>{
    const visibility=()=>active.current=!document.hidden;
    const move=(event:PointerEvent)=>{if(event.pointerType==="touch")return;pointer.current.x=(event.clientX/window.innerWidth-.5)*.1;pointer.current.y=(event.clientY/window.innerHeight-.5)*.08};
    document.addEventListener("visibilitychange",visibility);window.addEventListener("pointermove",move,{passive:true});
    return()=>{document.removeEventListener("visibilitychange",visibility);window.removeEventListener("pointermove",move)};
  },[]);
  useFrame(({camera,size},delta)=>{
    if(!root.current||!active.current)return;
    angle.current+=Math.min(delta,.05)*.055;
    root.current.rotation.y=angle.current+pointer.current.x;
    root.current.rotation.x=.16+pointer.current.y;
    root.current.updateMatrixWorld();
    const cameraPosition=camera.getWorldPosition(new Vector3());
    labelPoints.forEach((point,index)=>{
      const label=labelRefs.current[index];if(!label)return;
      const worldPoint=point.clone().applyMatrix4(root.current!.matrixWorld);
      const front=worldPoint.clone().normalize().dot(cameraPosition.clone().sub(worldPoint))>0;
      label.style.visibility=front?"visible":"hidden";
      if(!front)return;
      const projected=worldPoint.project(camera);
      label.style.transform=`translate3d(${(projected.x*.5+.5)*size.width+LABEL_OFFSETS[index][0]}px,${(-projected.y*.5+.5)*size.height+LABEL_OFFSETS[index][1]}px,0) translate(-50%,-50%)`;
    });
  });
  return <group ref={root} rotation={[.16,-.7,-.1]}>
    <mesh><sphereGeometry args={[1.96,48,32]}/><meshBasicMaterial color="#03132f"/></mesh>
    <mesh><sphereGeometry args={[2.08,48,32]}/><meshBasicMaterial color="#28589e" transparent opacity={.09} blending={AdditiveBlending} depthWrite={false}/></mesh>
    <DottedEarth/>
    {routes.map((city,index)=><TradeArc key={city.name} to={city} index={index}/>)}
    {globeCities.map((city,index)=><mesh key={city.name} position={vector(city.lat,city.lon,2.065)}><sphereGeometry args={[index===0?.042:.022,10,10]}/><meshBasicMaterial color={index===0?"#ff9b62":"#9ac5f4"}/></mesh>)}
  </group>;
}
export function GlobeScene(){
  const [supported,setSupported]=useState(false),[inView,setInView]=useState(true),labelRefs=useRef<(HTMLSpanElement|null)[]>([]),wrapRef=useRef<HTMLDivElement>(null);
  const mobile=typeof window!=="undefined"&&window.innerWidth<768;
  useEffect(()=>{try{const canvas=document.createElement("canvas");setSupported(Boolean(canvas.getContext("webgl2")||canvas.getContext("webgl")))}catch{setSupported(false)}},[]);
  useEffect(()=>{
    const wrap=wrapRef.current;
    if(!wrap||typeof IntersectionObserver==="undefined")return;
    const observer=new IntersectionObserver(([entry])=>setInView(entry.isIntersecting&&!document.hidden));
    const visibility=()=>{const bounds=wrap.getBoundingClientRect();setInView(!document.hidden&&bounds.bottom>0&&bounds.top<window.innerHeight)};
    observer.observe(wrap);
    document.addEventListener("visibilitychange",visibility);
    return()=>{observer.disconnect();document.removeEventListener("visibilitychange",visibility)};
  },[supported]);
  if(!supported)return <GlobeFallback/>;
  return <div ref={wrapRef} className={styles.wrap} aria-label="کره سه‌بعدی نمایشی با مسیرهای نارنجی متحرک از تهران به بندرعباس، استانبول، بمبئی و شانگهای" role="img">
    <Canvas camera={{position:[0,0,5.9],fov:50}} dpr={mobile?1:[1,1.75]} frameloop={inView?"always":"never"} gl={{alpha:true,antialias:false,powerPreference:"low-power"}} onCreated={({gl})=>{gl.domElement.addEventListener("webglcontextlost",()=>setSupported(false),{once:true})}}><ambientLight intensity={.7}/><GlobeObject labelRefs={labelRefs}/></Canvas>
    <div className={`${styles.labels} ${styles.projected}`}>{labels.slice(0,mobile?2:4).map((city,index)=><span key={city.name} ref={element=>{labelRefs.current[index]=element}}><i/>{city.name}{index>0&&<small>{distanceKm(globeCities[0],city).toLocaleString("fa-IR")} km</small>}</span>)}</div>
  </div>;
}
export function GlobeFallback(){return <div className={`${styles.wrap} ${styles.fallback}`} role="img" aria-label="تصویر جایگزین کره زمین و مسیرهای حمل"><div className={styles.fallbackOrb}/><div className={styles.labels}><span>تهران <i/></span><span>بندرعباس <i/></span><span>رشت <i/></span></div></div>}
