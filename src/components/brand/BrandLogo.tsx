import Image from "next/image";
import Link from "next/link";
import { brand } from "@/content/brand";
export function BrandLogo({ dark = false }: { dark?: boolean }) {
  return <Link href="/" className={`brand-logo ${dark ? "brand-logo-dark" : ""}`} aria-label={`${brand.name}، صفحه نخست`}>
    <Image src="/brand/nima-monogram.svg" alt="" width={44} height={44} priority />
    <span><strong>{brand.name}</strong><small>{brand.latin}</small></span>
  </Link>;
}
