import { useRef, useState } from "react";
import type { PointerEvent as ReactPointerEvent } from "react";
import bentoDoce from "@/assets/clients/bento-doce.png";
import compartilhe from "@/assets/clients/compartilhe.png";
import masterBreast from "@/assets/clients/master-breast.png";
import masterfue from "@/assets/clients/masterfue.png";
import duny from "@/assets/clients/duny.png";
import donna from "@/assets/clients/donna.png";
import worldBeauty from "@/assets/clients/world-beauty.png";
import teamDeb from "@/assets/clients/team-deb.png";
import lvrs from "@/assets/clients/lvrs.png";
import uomo from "@/assets/clients/uomo.png";

const logos = [
  { name: "Bento Doce", src: bentoDoce },
  { name: "Compartilhe CSC", src: compartilhe },
  { name: "Master Breast Surgery", src: masterBreast },
  { name: "MasterFUE", src: masterfue },
  { name: "Duny", src: duny },
  { name: "Donna", src: donna },
  { name: "World Beauty", src: worldBeauty },
  { name: "Team Deb", src: teamDeb },
  { name: "LVRS", src: lvrs },
  { name: "UOMO", src: uomo },
];

const LogoMarquee = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const handlePointerDown = (e: ReactPointerEvent) => {
    const el = containerRef.current;
    if (!el) return;
    setIsDragging(true);
    setIsPaused(true);
    setStartX(e.clientX - el.offsetLeft);
    setScrollLeft(el.scrollLeft);
    el.setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: ReactPointerEvent) => {
    if (!isDragging || !containerRef.current) return;
    const x = e.clientX - containerRef.current.offsetLeft;
    containerRef.current.scrollLeft = scrollLeft - (x - startX);
  };

  const handlePointerUp = () => {
    setIsDragging(false);
    setIsPaused(false);
  };

  return (
    <section className="py-16 border-y border-border">
      <p className="text-center text-sm text-muted-foreground mb-10">Marcas que aceleraram crescimento com a Tetra Growth</p>
      <div
        ref={containerRef}
        className="overflow-x-auto md:overflow-hidden cursor-grab active:cursor-grabbing scrollbar-hide touch-pan-x"
        style={{ WebkitOverflowScrolling: "touch" }}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerLeave={handlePointerUp}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => {
          if (!isDragging) setIsPaused(false);
        }}
      >
        <div
          className={`flex whitespace-nowrap items-center ${isPaused ? "" : "animate-marquee"}`}
          style={isPaused ? { animationPlayState: "paused" } : undefined}
        >
          {[...logos, ...logos].map((logo, i) => (
            <div key={i} className="mx-6 md:mx-10 flex-shrink-0 select-none">
              <img
                src={logo.src}
                alt={logo.name}
                className="h-20 md:h-28 w-auto object-contain grayscale opacity-50 hover:opacity-80 transition-opacity pointer-events-none"
                draggable={false}
              />
            </div>
          ))}
        </div>
      </div>

      <div className="text-center mt-12">
        <a
          href="#contato"
          className="inline-flex px-8 py-4 rounded-lg bg-primary text-primary-foreground font-semibold hover:opacity-90 transition-opacity"
        >
          Agende um diagnóstico gratuito
        </a>
      </div>
    </section>
  );
};

export default LogoMarquee;
