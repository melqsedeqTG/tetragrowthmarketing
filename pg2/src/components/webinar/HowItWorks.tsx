import { ArrowRight } from "lucide-react";
import Reveal from "./Reveal";

const steps = [
  {
    title: "Preencha o popup",
    text: "Envie seus dados e responda às perguntas de qualificação em duas etapas.",
  },
  {
    title: "Avaliamos o cenário",
    text: "A Tetra analisa maturidade, momento, estrutura e capacidade de investimento.",
  },
  {
    title: "Marcamos a reunião",
    text: "Se houver fit, a equipe entra em contato para aprofundar o diagnóstico.",
  },
  {
    title: "Você recebe direção",
    text: "A conversa aponta qual prioridade faz mais sentido para a empresa agora.",
  },
];

interface HowItWorksProps {
  onOpenForm: () => void;
}

const HowItWorks = ({ onOpenForm }: HowItWorksProps) => {
  return (
    <section className="section-frame py-24 md:py-32">
      <div className="relative container mx-auto max-w-6xl px-6 lg:px-8">
        <Reveal>
          <div className="mx-auto max-w-4xl text-center">
            <p className="eyebrow mb-6">Como funciona</p>
            <h2 className="headline-tight text-3xl sm:text-4xl md:text-6xl">
              Um processo simples para uma decisão mais precisa.
            </h2>
          </div>
        </Reveal>

        <div className="mt-16 grid gap-px overflow-hidden rounded-[1.65rem] border border-border/70 bg-border/60 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((s, i) => (
            <Reveal key={s.title} delay={i * 80}>
              <div className="group h-full bg-background/75 p-7 transition-colors hover:bg-secondary/45 md:p-9">
                <span className="number-chip">0{i + 1}</span>
                <h3 className="mt-12 font-display text-2xl font-semibold uppercase leading-tight tracking-[-0.04em] text-foreground">
                  {s.title}
                </h3>
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                  {s.text}
                </p>
                <div className="mt-8 h-px w-10 bg-accent/55 transition-all group-hover:w-20" />
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal>
          <div className="mt-12 text-center">
            <button type="button" onClick={onOpenForm} className="group tg-button">
              Solicitar diagnóstico
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </button>
          </div>
        </Reveal>
      </div>
    </section>
  );
};

export default HowItWorks;
