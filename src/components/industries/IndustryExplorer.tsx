"use client";
import { useState } from "react";
import Link from "next/link";
import { industries } from "@/content/industries";
import styles from "./IndustryExplorer.module.css";
export function IndustryExplorer(){const [active,setActive]=useState(0);const item=industries[active];return <div className={styles.layout}><div className={styles.list}>{industries.map((x,i)=><button key={x.id} className={active===i?styles.active:""} onClick={()=>setActive(i)} onMouseEnter={()=>setActive(i)} aria-pressed={active===i}><small>{String(i+1).padStart(2,"0")}</small><span>{x.title}</span><b>↗</b></button>)}</div><div className={styles.visual}><div className={styles.art} key={active}><span>{String(active+1).padStart(2,"0")}</span><i/></div><div className={styles.detail}><span className="eyebrow">صنعت / {item.title}</span><h3 className="h3">{item.detail}</h3><ul>{item.highlights.map(h=><li key={h}>{h}</li>)}</ul><Link className="btn btn-primary" href={`/contact?industry=${encodeURIComponent(item.title)}&cargo=${encodeURIComponent(item.cargoType)}`}>گفت‌وگو درباره این صنعت ↗</Link></div></div></div>}
