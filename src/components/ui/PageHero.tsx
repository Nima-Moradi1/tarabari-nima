import Link from "next/link";
import { ArrowUpLeft } from "lucide-react";
export function PageHero({eyebrow,title,lead,tone="default",cta}:{eyebrow:string;title:string;lead:string;tone?:"default"|"sea"|"green"|"warm";cta?:{href:string;label:string}}){return <section className={`detail-hero ${tone==="default"?"":`detail-hero--${tone}`}`}><div className="container"><span className="eyebrow kicker-line">{eyebrow}</span><h1 className="h1">{title}</h1><p className="lead">{lead}</p>{cta&&<Link className="btn btn-primary" href={cta.href}>{cta.label}<ArrowUpLeft size={18}/></Link>}</div></section>}
