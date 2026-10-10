import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { IndustryExplorer } from "@/components/industries/IndustryExplorer";
export const metadata:Metadata={title:"صنایع",description:"نگاهی به نیازهای حمل‌ونقل در دوازده حوزه صنعتی و تجاری."};
export default function Industries(){return <><PageHero eyebrow="مسیرهای تخصصی" title="هر صنعت، مسیر خودش را دارد." lead="از بسته‌بندی و زمان‌بندی تا مدارک و نقاط انتقال، ویژگی‌های هر صنعت مسیر جابه‌جایی را تغییر می‌دهد." tone="green" cta={{href:"#explore",label:"کشف مسیرها"}}/><section className="section" id="explore"><div className="container"><div className="section-head"><div><span className="eyebrow">دوازده حوزه / یک نگاه دقیق</span><h2 className="h2">صنعت خود را انتخاب کنید</h2></div><p className="lead">این نمونه، پرسش‌های پایه هر حوزه را نشان می‌دهد و تضمین ارائه خدمت واقعی نیست.</p></div><IndustryExplorer/></div></section></>}
