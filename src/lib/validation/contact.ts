import { z } from "zod";
export const normalizeDigits=(input:string)=>input.replace(/[۰-۹]/g,c=>String(c.charCodeAt(0)-1776)).replace(/[٠-٩]/g,c=>String(c.charCodeAt(0)-1632));
export const normalizeMobile=(input:string)=>{const value=normalizeDigits(input).replace(/[\s()-]/g,"");return value.startsWith("+98")?`0${value.slice(3)}`:value.startsWith("0098")?`0${value.slice(4)}`:value};
export const contactSchema=z.object({
  requestType:z.string().min(1,"موضوع درخواست را انتخاب کنید."),
  transportMode:z.string().min(1,"نوع حمل را انتخاب کنید."),
  fullName:z.string().trim().min(3,"نام باید دست‌کم ۳ نویسه باشد.").max(80,"نام بیش از حد طولانی است."),
  mobile:z.string().transform(normalizeMobile).refine(v=>/^09\d{9}$/.test(v),"شماره موبایل ایرانی معتبر وارد کنید."),
  company:z.string().max(120,"نام مجموعه بیش از حد طولانی است."),
  email:z.union([z.literal(""),z.email("ایمیل معتبر وارد کنید.")]),
  originCity:z.string().min(1,"شهر مبدأ را انتخاب کنید."),
  destinationCity:z.string().min(1,"شهر مقصد را انتخاب کنید."),
  cargoType:z.string().min(1,"نوع محموله را انتخاب کنید."),
  estimatedWeightKg:z.string().refine(v=>v===""||((Number(normalizeDigits(v))>=.1)&&(Number(normalizeDigits(v))<=1000000)),"وزن باید بین ۰٫۱ تا ۱٬۰۰۰٬۰۰۰ کیلوگرم باشد."),
  urgency:z.string(),message:z.string().max(1000,"توضیحات بیش از ۱۰۰۰ نویسه است."),
  demoConsent:z.boolean().refine(Boolean,"برای ادامه، شرایط نسخه نمایشی را بپذیرید.")
}).refine(v=>v.originCity!==v.destinationCity,{path:["destinationCity"],message:"شهر مقصد باید با مبدأ متفاوت باشد."});
export type ContactInput=z.input<typeof contactSchema>;
export type ContactOutput=z.output<typeof contactSchema>;
