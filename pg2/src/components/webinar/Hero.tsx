import { ArrowRight, Check } from "lucide-react";

const proofPoints = [
  "Aquisição",
  "Conversão",
  "Comercial",
  "Dados",
];

interface HeroProps {
  onOpenForm: () => void;
}

const Hero = ({ onOpenForm }: HeroProps) => {
  return (
    <section className="relative min-h-screen overflow-hidden hero-bg border-b border-border/60">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/45 to-transparent" />
        <div className="absolute inset-0 bg-[linear-gradient(hsl(158_20%_16%/0.12)_1px,transparent_1px),linear-gradient(90deg,hsl(158_20%_16%/0.12)_1px,transparent_1px)] bg-[size:96px_96px] opacity-45" />
        <div className="absolute left-1/2 top-28 h-[28rem] w-[28rem] -translate-x-1/2 rounded-full bg-accent/10 blur-[120px]" />
        <div className="absolute inset-x-0 bottom-0 h-56 bg-gradient-to-t from-background to-transparent" />
      </div>

      <div className="relative container mx-auto flex min-h-screen flex-col px-6 lg:px-8">
        <div className="flex items-center justify-between py-7 md:py-9">
          <div className="brand-wordmark" aria-label="Tetra Growth">
            TETRA <span>GROWTH</span>
          </div>

          <button
            type="button"
            onClick={onOpenForm}
            className="hidden sm:inline-flex rounded-[0.45rem] bg-accent px-6 py-3 text-xs font-bold text-accent-foreground transition-all hover:-translate-y-0.5 hover:bg-accent/90"
          >
            Vamos conversar?
          </button>
        </div>

        <div className="flex flex-1 items-center justify-center py-16 md:py-24">
          <div className="mx-auto max-w-6xl text-center animate-fade-in-up">
            <p className="eyebrow mb-7">Diagnóstico de marketing</p>

            <h1 className="display-title mx-auto max-w-5xl text-[2.48rem] sm:text-[4.8rem] md:text-[6rem] lg:text-[7.2rem]">
              Descubra onde seu marketing está perdendo lucro
            </h1>

            <p className="mx-auto mt-8 max-w-4xl text-base leading-relaxed text-foreground/70 sm:text-lg md:text-xl">
              Tenha uma leitura clara sobre aquisição, conversão, vendas e
              estrutura digital antes de investir mais dinheiro no ponto errado.
            </p>

            <div className="mt-11 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <button
                type="button"
                onClick={onOpenForm}
                className="group tg-button-outline"
              >
                Solicitar diagnóstico
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </button>
            </div>

            <div className="mx-auto mt-12 grid max-w-3xl grid-cols-2 gap-px overflow-hidden rounded-2xl border border-border/70 bg-border/50 sm:grid-cols-4">
              {proofPoints.map((item) => (
                <div
                  key={item}
                  className="flex items-center justify-center gap-2 bg-background/75 px-4 py-4 text-xs font-semibold uppercase tracking-[0.22em] text-foreground/75 backdrop-blur"
                >
                  <Check className="h-3.5 w-3.5 text-accent" />
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
