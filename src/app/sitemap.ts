import type { MetadataRoute } from "next";
import { articles } from "@/content/articles";
export default function sitemap():MetadataRoute.Sitemap{const base=process.env.NEXT_PUBLIC_SITE_URL??"http://localhost:3000";return ["","about","services","industries","insights","careers","community","contact","privacy","terms",...articles.map(a=>`insights/${a.slug}`)].map(path=>({url:`${base}/${path}`,lastModified:new Date("2026-10-10")}))}
