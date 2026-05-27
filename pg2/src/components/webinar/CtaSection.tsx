import { ArrowRight } from "lucide-react";
import Reveal from "./Reveal";

const items = [
  "Se o problema estiver no tráfego, você vai saber.",
  "Se estiver na conversão, você vai saber.",
  "Se estiver no comercial, você vai saber.",
  "Se estiver na estrutura, você vai saber.",
];

interface CtaSectionProps {
  onOpenForm: () => void;
}

const CtaSection = ({ onOpenForm }: CtaSectionProps) => {
  return (
    <section className="relative overflow-hidden border-y border-border/60 bg-background py-24 md:py-32">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute left-1/2 top-1/2 h-[34rem] w-[34rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/10 blur-[130px]" />
        <div className="absolute inset-0 bg-[linear-gradient(hsl(158_20%_16%/0.12)_1px,transparent_1px),linear-gradient(90deg,hsl(158_20%_16%/0.12)_1px,transparent_1px)] bg-[size:96px_96px] opacity-35" />
      </div>

      <div className="relative container mx-auto max-w-5xl px-6 text-center lg:px-8">
        <Reveal>
          <p className="eyebrow mb-7">Solicite seu diagnóstico</p>
          <h2 className="display-title mx-auto max-w-5xl text-[2.8rem] sm:text-[4.4rem] md:text-[6rem]">
            Pare de investir no escuro.
          </h2>
          <p className="copy-muted mx-auto mt-8 max-w-3xl text-lg md:text-xl">
            Antes da próxima campanha, descubra qual parte do sistema precisa
            ser corrigida para transformar marketing em lucro previsível.
          </p>
        </Reveal>

        <Reveal delay={100}>
          <div className="mx-auto mt-11 grid max-w-3xl gap-3 text-left sm:grid-cols-2">
            {items.map((it) => (
              <div
                key={it}
                className="rounded-2xl border border-border/70 bg-card/55 p-4 text-sm text-foreground/80 backdrop-blur"
              >
                {it}
              </div>
            ))}
          </div>

          <button type="button" onClick={onOpenForm} className="group tg-button mt-12">
            Solicitar meu diagnóstico
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </button>

          <p className="mx-auto mt-6 max-w-xl text-sm leading-relaxed text-muted-foreground">
            Preencha o popup em duas etapas. Se houver fit, a equipe da Tetra
            entra em contato com os próximos passos.
          </p>
        </Reveal>
      </div>
    </section>
  );
};

export default CtaSection;
