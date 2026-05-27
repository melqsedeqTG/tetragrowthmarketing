import { ArrowRight } from "lucide-react";
import Reveal from "./Reveal";

const causes = [
  "Oferta pouco clara",
  "Página que não converte",
  "Funil confuso",
  "Leads sem contexto",
  "Atendimento comercial fraco",
  "Falta de follow-up",
  "Dados sem leitura real",
];

interface BeliefBreakProps {
  onOpenForm: () => void;
}

const BeliefBreak = ({ onOpenForm }: BeliefBreakProps) => {
  return (
    <section className="section-frame bg-secondary/20 py-24 md:py-32">
      <div className="relative container mx-auto max-w-6xl px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-6">
            <Reveal>
              <p className="eyebrow mb-6">Quebra de crença</p>
              <h2 className="headline-tight text-3xl sm:text-4xl md:text-6xl">
                Mais tráfego não corrige uma estrutura que perde oportunidade.
              </h2>
            </Reveal>
          </div>

          <div className="lg:col-span-6">
            <Reveal delay={100}>
              <div className="soft-card p-7 md:p-9">
                <p className="copy-muted text-lg">
                  Muitas empresas acreditam que precisam apenas de mais leads.
                  Na prática, a perda pode estar depois do clique, no caminho
                  entre interesse, atendimento, proposta e fechamento.
                </p>

                <div className="mt-8 grid gap-3 sm:grid-cols-2">
                  {causes.map((cause) => (
                    <div
                      key={cause}
                      className="rounded-2xl border border-border/70 bg-background/45 px-4 py-4 text-sm font-medium text-foreground/82"
                    >
                      {cause}
                    </div>
                  ))}
                </div>

                <button
                  type="button"
                  onClick={onOpenForm}
                  className="group tg-button-outline mt-8 w-full sm:w-auto"
                >
                  Solicitar análise
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

export default BeliefBreak;
