import Image from "next/image";

export function StudioLogo({ labelled = true }: { labelled?: boolean }) {
  const alt = labelled ? "WAFFI Content Studio" : "";

  return (
    <span className="relative block h-[76px] w-[86px] shrink-0 overflow-hidden md:h-[96px] md:w-[110px]">
      <Image
        src="/brand/waffi-logo-primary-transparent.png"
        alt={alt}
        width={1024}
        height={1024}
        priority
        className="nav-logo-light absolute top-[-26px] left-[-23px] h-[130px] w-[130px] max-w-none md:top-[-33px] md:left-[-29px] md:h-[167px] md:w-[167px]"
      />
      <Image
        src="/brand/waffi-logo-on-dark-transparent.png"
        alt={alt}
        width={1024}
        height={1024}
        className="nav-logo-dark absolute top-[-26px] left-[-23px] h-[130px] w-[130px] max-w-none md:top-[-33px] md:left-[-29px] md:h-[167px] md:w-[167px]"
      />
    </span>
  );
}
