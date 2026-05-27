import { ArrowRight } from "lucide-react";
import Reveal from "./Reveal";

const analyses = [
  "Como sua empresa atrai demanda.",
  "Como transforma interesse em oportunidade.",
  "Como o comercial aproveita os leads.",
  "Onde existe perda de conversão.",
  "Se o problema está em tráfego, oferta, funil, vendas ou estrutura.",
];

const deliverables = [
  "Clareza estratégica",
  "Gargalo dominante",
  "Leitura de marketing e vendas",
  "Avaliação de fit",
  "Prioridade de ação",
];

interface BottlenecksProps {
  onOpenForm: () => void;
}

const Bottlenecks = ({ onOpenForm }: BottlenecksProps) => {
  return (
    <section className="section-frame py-24 md:py-32">
      <div className="relative container mx-auto max-w-6xl px-6 lg:px-8">
        <Reveal>
          <div className="mx-auto max-w-4xl text-center">
            <p className="eyebrow mb-6">A oferta</p>
            <h2 className="headline-tight text-3xl sm:text-4xl md:text-6xl">
              O diagnóstico mostra onde sua receita está escapando.
            </h2>
            <p className="copy-muted mx-auto mt-7 max-w-3xl text-lg">
              Uma reunião estratégica para entender seu cenário, encontrar o
              gargalo principal e indicar qual prioridade merece atenção agora.
            </p>
          </div>
        </Reveal>

        <div className="mt-16 grid gap-6 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <div className="overflow-hidden rounded-[1.65rem] border border-border/70 bg-border/50">
              {analyses.map((a, i) => (
                <Reveal key={a} delay={i * 60}>
                  <div className="grid grid-cols-[84px,1fr] border-b border-border/60 bg-background/70 last:border-b-0">
                    <div className="flex items-center justify-center border-r border-border/60 text-accent/85">
                      0{i + 1}
                    </div>
                    <p className="px-6 py-6 text-base leading-relaxed text-foreground/82 md:text-lg">
                      {a}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>

          <div className="lg:col-span-5">
            <Reveal delay={120}>
              <div className="soft-card h-full p-8 md:p-10">
                <p className="eyebrow mb-7">Você recebe</p>
                <ul className="space-y-4">
                  {deliverables.map((d) => (
                    <li
                      key={d}
                      className="flex items-center justify-between gap-4 border-b border-border/50 pb-4 text-foreground/86 last:border-b-0 last:pb-0"
                    >
                      <span>{d}</span>
                      <span className="h-2 w-2 rounded-full bg-accent" />
                    </li>
                  ))}
                </ul>
                <button
                  type="button"
                  onClick={onOpenForm}
                  className="group tg-button mt-9 w-full"
                >
                  Solicitar meu diagnóstico
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </button>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Bottlenecks;
