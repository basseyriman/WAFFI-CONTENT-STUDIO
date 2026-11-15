import Image from "next/image";

export function StudioLogo({ labelled = true }: { labelled?: boolean }) {
  const alt = labelled ? "WAFFI Content Studio" : "";

  return (
    <span className="relative block h-[58px] w-[66px] shrink-0 overflow-hidden sm:h-[76px] sm:w-[86px] md:h-[96px] md:w-[110px]">
      <Image
        src="/brand/waffi-logo-primary-transparent.png"
        alt={alt}
        width={1024}
        height={1024}
        priority
        className="nav-logo-light absolute top-[-20px] left-[-18px] h-[100px] w-[100px] max-w-none sm:top-[-26px] sm:left-[-23px] sm:h-[130px] sm:w-[130px] md:top-[-33px] md:left-[-29px] md:h-[167px] md:w-[167px]"
      />
      <Image
        src="/brand/waffi-logo-on-dark-transparent.png"
        alt={alt}
        width={1024}
        height={1024}
        className="nav-logo-dark absolute top-[-20px] left-[-18px] h-[100px] w-[100px] max-w-none sm:top-[-26px] sm:left-[-23px] sm:h-[130px] sm:w-[130px] md:top-[-33px] md:left-[-29px] md:h-[167px] md:w-[167px]"
      />
    </span>
  );
}
