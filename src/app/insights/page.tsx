import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { ArticleBrowser } from "@/components/insights/ArticleBrowser";
export const metadata:Metadata={title:"دانستنی‌ها",description:"مطالب آموزشی و نمونه درباره برنامه‌ریزی حمل‌ونقل و لجستیک."};
export default function Insights(){return <><PageHero eyebrow="مجله مسیر" title="از جریان حمل‌ونقل باخبر باشید." lead="چند مطلب آموزشی برای شناخت بهتر تصمیم‌هایی که در سفر کالا گرفته می‌شوند."/><section className="section"><div className="container"><ArticleBrowser/></div></section></>}
