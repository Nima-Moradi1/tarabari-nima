import { describe, expect, it } from "vitest";
import { contactSchema, normalizeMobile } from "../../src/lib/validation/contact";
const valid={requestType:"مشاوره مسیر",transportMode:"جاده‌ای",fullName:"نیما احمدی",mobile:"۰۹۱۲۳۴۵۶۷۸۹",company:"",email:"",originCity:"تهران",destinationCity:"رشت",cargoType:"عمومی",estimatedWeightKg:"",urgency:"",message:"",demoConsent:true};
describe("Iranian inquiry validation",()=>{
  it("normalizes Persian and international mobile forms",()=>{expect(normalizeMobile("۰۹۱۲۳۴۵۶۷۸۹")).toBe("09123456789");expect(normalizeMobile("+98 912 345 6789")).toBe("09123456789");expect(normalizeMobile("0098-912-345-6789")).toBe("09123456789")});
  it("accepts a complete local-only inquiry",()=>{const result=contactSchema.safeParse(valid);expect(result.success).toBe(true);if(result.success)expect(result.data.mobile).toBe("09123456789")});
  it("rejects same city, invalid mobile, and missing consent",()=>{const result=contactSchema.safeParse({...valid,destinationCity:"تهران",mobile:"123",demoConsent:false});expect(result.success).toBe(false);if(!result.success)expect(result.error.issues.map(x=>x.path.join("."))).toEqual(expect.arrayContaining(["mobile","destinationCity","demoConsent"]))});
});
