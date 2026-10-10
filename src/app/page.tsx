import Link from "next/link";
import { ArrowUpLeft } from "lucide-react";
import { GlobeScene } from "@/components/globe/GlobeScene";
import { FreightJourney } from "@/components/journey/FreightJourney";
import { HomeSections } from "@/components/home/HomeSections";
import { Preloader } from "@/components/home/Preloader";
import styles from "./page.module.css";
export default function Home(){return <><Preloader/><section className={styles.hero}><GlobeScene/><div className={`container ${styles.heroContent}`}><div className={styles.copy}><span className="eyebrow">نیما راه‌گستر | حمل‌ونقل و لجستیک</span><h1 className="h1">از مبدأ تا مقصد،<br/><em>یک تعهد.</em></h1><p className="lead">برای هر محموله، مسیری روشن؛ از برنامه‌ریزی و هماهنگی تا رسیدن به مقصد.</p><div className={styles.actions}><Link className="btn btn-primary" href="/contact">درخواست مشاوره <ArrowUpLeft size={17}/></Link><Link className="btn" href="/services">آشنایی با خدمات <ArrowUpLeft size={17}/></Link></div></div><div className={styles.sideNote}><span>۰۱ / ۰۴</span><span>یک مسیر، یک مسئولیت</span></div></div><div className={styles.heroBottom}><span>برای دیدن مسیر، اسکرول کنید</span><span dir="ltr">SCROLL TO EXPLORE ↓</span></div></section><FreightJourney/><HomeSections/></>}
