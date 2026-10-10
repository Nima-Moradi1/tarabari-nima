"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowUpLeft, Menu, X } from "lucide-react";
import { navigation } from "@/content/navigation";
import { BrandLogo } from "@/components/brand/BrandLogo";
import styles from "./Header.module.css";

export function Header(){
  const [open,setOpen]=useState(false); const [scrolled,setScrolled]=useState(false); const path=usePathname(); const menuRef=useRef<HTMLDivElement>(null); const opener=useRef<HTMLButtonElement>(null);
  useEffect(()=>{setOpen(false)},[path]);
  useEffect(()=>{const fn=()=>setScrolled(window.scrollY>48);fn();window.addEventListener("scroll",fn,{passive:true});return()=>window.removeEventListener("scroll",fn)},[]);
  useEffect(()=>{
    if(!open)return; document.body.classList.add("menu-open"); const previous=document.activeElement as HTMLElement|null;
    const menu=menuRef.current; const openerButton=opener.current; const focusables=()=>Array.from(menu?.querySelectorAll<HTMLElement>('a,button')??[]);
    focusables()[0]?.focus(); const key=(event:KeyboardEvent)=>{if(event.key==="Escape")setOpen(false);if(event.key!=="Tab")return;const items=focusables();const first=items[0],last=items.at(-1);if(event.shiftKey&&document.activeElement===first){event.preventDefault();last?.focus()}else if(!event.shiftKey&&document.activeElement===last){event.preventDefault();first?.focus()}};
    document.addEventListener("keydown",key);return()=>{document.body.classList.remove("menu-open");document.removeEventListener("keydown",key);(openerButton??previous)?.focus()};
  },[open]);
  return <><header className={`${styles.header} ${scrolled?styles.scrolled:""}`}>
    <div className={styles.inner}><BrandLogo/><nav className={styles.desktop} aria-label="پیمایش اصلی">{navigation.slice(0,5).map(item=><Link key={item.href} href={item.href} aria-current={path===item.href?"page":undefined}>{item.label}</Link>)}</nav>
      <div className={styles.actions}><Link className={`btn btn-primary ${styles.cta}`} href="/contact">شروع همکاری <ArrowUpLeft size={16}/></Link><button ref={opener} className={styles.menuButton} aria-label={open?"بستن فهرست":"باز کردن فهرست"} aria-expanded={open} aria-controls="site-menu" onClick={()=>setOpen(!open)}>{open?<X size={22}/>:<Menu size={22}/>}<span>{open?"بستن":"فهرست"}</span></button></div>
    </div></header>
    {open&&<div id="site-menu" className={styles.overlay} ref={menuRef} role="dialog" aria-modal="true" aria-label="فهرست سایت"><div className={styles.overlayInner}><div className={styles.menuTop}><BrandLogo/><button className={styles.close} onClick={()=>setOpen(false)} aria-label="بستن فهرست"><X size={26}/></button></div><nav aria-label="همه صفحات">{navigation.map((item,i)=><Link key={item.href} href={item.href} aria-current={path===item.href?"page":undefined} onClick={()=>setOpen(false)}><small>{String(i+1).padStart(2,"0")}</small>{item.label}<ArrowUpLeft size={23}/></Link>)}</nav><p>یک مسیر، یک مسئولیت <span>—</span> نیما راه‌گستر</p></div></div>}
  </>;
}
