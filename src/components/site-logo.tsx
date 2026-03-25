"use client";

import Image from "next/image";
import { useLanguage } from "@/lib/language";
import { getSiteContent } from "@/lib/site-content";

type SiteLogoProps = {
  className?: string;
  priority?: boolean;
  width?: number;
  height?: number;
};

export function SiteLogo({
  className = "",
  priority = false,
  width = 96,
  height = 96,
}: SiteLogoProps) {
  const { locale } = useLanguage();
  const content = getSiteContent(locale);

  return (
    <Image
      src="/favicon.svg"
      alt={content.ui.logoAlt}
      width={width}
      height={height}
      priority={priority}
      className={className}
      unoptimized
    />
  );
}
