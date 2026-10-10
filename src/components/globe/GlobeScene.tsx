"use client";
import { Canvas, useFrame } from "@react-three/fiber";
import { useEffect, useMemo, useRef, useState, type RefObject } from "react";
import { AdditiveBlending, BufferAttribute, BufferGeometry, Color, Group, Line, LineBasicMaterial, Vector3 } from "three";
import landPoints from "@/content/globe-points.json";
import { globeCities } from "@/content/cities";
import styles from "./GlobeScene.module.css";
const LABEL_OFFSETS=[[-18,-18],[30,20],[-58,-40],[42,-36]] as const;

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
  const geometry=useMemo(()=>{
    const from=vector(35.6892,51.389,2.02),end=vector(to.lat,to.lon,2.02),coords:number[]=[];
    for(let i=0;i<=64;i++){const t=i/64;const point=from.clone().lerp(end,t).normalize().multiplyScalar(2.03+Math.sin(t*Math.PI)*(.18+index*.04));coords.push(point.x,point.y,point.z)}
    const result=new BufferGeometry();result.setAttribute("position",new BufferAttribute(new Float32Array(coords),3));return result;
  },[to,index]);
  const line=useMemo(()=>new Line(geometry,new LineBasicMaterial({color:index===0?"#ad6647":"#6896fa",transparent:true,opacity:.7,blending:AdditiveBlending})),[geometry,index]);
  useEffect(()=>()=>{geometry.dispose();(line.material as LineBasicMaterial).dispose()},[geometry,line]);
  return <primitive object={line}/>;
}
function GlobeObject({labelRefs}:{labelRefs:RefObject<(HTMLSpanElement|null)[]>}){
  const root=useRef<Group>(null),active=useRef(true),pointer=useRef({x:0,y:0}),angle=useRef(-.7);
  const mobile=window.innerWidth<768;
  const labelPoints=useMemo(()=>globeCities.slice(0,mobile?2:4).map(city=>vector(city.lat,city.lon,2.18)),[mobile]);
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
    <mesh><sphereGeometry args={[1.96,48,32]}/><meshBasicMaterial color={new Color("#061d5e")} transparent opacity={.62}/></mesh>
    <mesh><sphereGeometry args={[2.08,48,32]}/><meshBasicMaterial color="#28589e" transparent opacity={.09} blending={AdditiveBlending} depthWrite={false}/></mesh>
    <DottedEarth/>{globeCities.slice(1).map((city,index)=><TradeArc key={city.name} to={city} index={index}/>)}
  </group>;
}
export function GlobeScene(){
  const [supported,setSupported]=useState(false),labelRefs=useRef<(HTMLSpanElement|null)[]>([]);
  const mobile=typeof window!=="undefined"&&window.innerWidth<768;
  useEffect(()=>{try{const canvas=document.createElement("canvas");setSupported(Boolean(canvas.getContext("webgl2")||canvas.getContext("webgl")))}catch{setSupported(false)}},[]);
  if(!supported)return <GlobeFallback/>;
  return <div className={styles.wrap} aria-label="کره سه‌بعدی نمایشی با مسیرهای تهران، بندرعباس، رشت و نوشهر" role="img">
    <Canvas camera={{position:[0,0,5.9],fov:50}} dpr={[1,1.75]} gl={{alpha:true,antialias:false,powerPreference:"low-power"}} onCreated={({gl})=>{gl.domElement.addEventListener("webglcontextlost",()=>setSupported(false),{once:true})}}><ambientLight intensity={.7}/><GlobeObject labelRefs={labelRefs}/></Canvas>
    <div className={`${styles.labels} ${styles.projected}`}>{globeCities.slice(0,mobile?2:4).map((city,index)=><span key={city.name} ref={element=>{labelRefs.current[index]=element}}><i/>{city.name}</span>)}</div>
  </div>;
}
export function GlobeFallback(){return <div className={`${styles.wrap} ${styles.fallback}`} role="img" aria-label="تصویر جایگزین کره زمین و مسیرهای حمل"><div className={styles.fallbackOrb}/><div className={styles.labels}><span>تهران <i/></span><span>بندرعباس <i/></span><span>رشت <i/></span></div></div>}
