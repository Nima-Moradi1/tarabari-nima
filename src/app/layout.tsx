import type { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ContentInteractionGuard } from "@/components/layout/ContentInteractionGuard";
import { brand } from "@/content/brand";
import "@/styles/tokens.css";
import "@/styles/base.css";
import "@/styles/motion.css";
import "./globals.css";
export const metadata:Metadata={title:{default:`${brand.name} | حمل‌ونقل و لجستیک`,template:`%s | ${brand.name}`},description:"روایت نمایشی از راهکارهای حمل‌ونقل و لجستیک؛ از برنامه‌ریزی مسیر تا هماهنگی جابه‌جایی.",icons:{icon:"/brand/nima-monogram.svg"},robots:{index:false,follow:false}};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="fa" dir="rtl"><body><ContentInteractionGuard/><a className="skip" href="#main">پرش به محتوا</a><Header/><main id="main">{children}</main><Footer/></body></html>}
