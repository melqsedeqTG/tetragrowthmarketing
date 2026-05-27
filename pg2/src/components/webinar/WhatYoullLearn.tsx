import { ArrowRight } from "lucide-react";
import Reveal from "./Reveal";

const clarities = [
  "Onde a aquisição está travando.",
  "Qual problema precisa ser priorizado.",
  "Se faz sentido investir mais em marketing agora.",
  "Se o comercial aproveita bem as oportunidades.",
  "Qual próximo passo evita desperdício de tempo e verba.",
];

interface WhatYoullLearnProps {
  onOpenForm: () => void;
}

const WhatYoullLearn = ({ onOpenForm }: WhatYoullLearnProps) => {
  return (
    <section className="section-frame bg-secondary/20 py-24 md:py-32">
      <div className="relative container mx-auto max-w-6xl px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <Reveal>
              <p className="eyebrow mb-6">Benefício central</p>
              <h2 className="headline-tight text-3xl sm:text-4xl md:text-5xl">
                Clareza para decidir antes de executar.
              </h2>
              <p className="copy-muted mt-7 text-lg">
                O diagnóstico conecta gargalo, perda de receita, desperdício de
                marketing e falta de previsibilidade em uma leitura única.
              </p>
              <button
                type="button"
                onClick={onOpenForm}
                className="group tg-button-outline mt-9"
              >
                Começar análise
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </button>
            </Reveal>
          </div>

          <div className="lg:col-span-7">
            <div className="grid gap-4">
              {clarities.map((p, i) => (
                <Reveal key={p} delay={i * 70}>
                  <div className="soft-card flex items-center gap-5 p-5 md:p-6">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-accent/30 bg-accent/10 font-display text-sm text-accent">
                      0{i + 1}
                    </span>
                    <p className="text-base leading-relaxed text-foreground/84 md:text-lg">
                      {p}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhatYoullLearn;
