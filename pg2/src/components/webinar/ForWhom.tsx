import { Check, X } from "lucide-react";
import Reveal from "./Reveal";

const forYou = [
  "Já vendem e querem mais previsibilidade.",
  "Investem ou pretendem investir em marketing.",
  "Têm dúvidas sobre onde está o gargalo.",
  "Recebem leads, mas convertem abaixo do esperado.",
  "Querem decidir antes de colocar mais dinheiro em execução.",
];

const notForYou = [
  "Busca fórmula mágica.",
  "Procura apenas uma consultoria gratuita.",
  "Quer contratar tráfego sem olhar oferta, funil e comercial.",
  "Não participa da decisão da empresa.",
  "Espera garantia de resultado em uma primeira conversa.",
];

const ForWhom = () => {
  return (
    <section className="section-frame bg-secondary/20 py-24 md:py-32">
      <div className="relative container mx-auto max-w-6xl px-6 lg:px-8">
        <Reveal>
          <div className="mx-auto mb-14 max-w-4xl text-center">
            <p className="eyebrow mb-6">Fit</p>
            <h2 className="headline-tight text-3xl sm:text-4xl md:text-6xl">
              Para quem faz sentido avançar.
            </h2>
          </div>
        </Reveal>

        <div className="grid gap-6 lg:grid-cols-2">
          <Reveal>
            <div className="soft-card h-full p-7 md:p-9">
              <div className="mb-8 flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-accent/12 text-accent">
                  <Check className="h-5 w-5" />
                </span>
                <h3 className="font-display text-2xl font-semibold uppercase tracking-[-0.04em]">
                  Este diagnóstico é para
                </h3>
              </div>
              <ul className="space-y-4">
                {forYou.map((p) => (
                  <li key={p} className="flex gap-3 border-b border-border/50 pb-4 text-foreground/82 last:border-b-0 last:pb-0">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                    <span>{p}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          <Reveal delay={120}>
            <div className="soft-card h-full p-7 md:p-9 opacity-90">
              <div className="mb-8 flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-destructive/12 text-destructive">
                  <X className="h-5 w-5" />
                </span>
                <h3 className="font-display text-2xl font-semibold uppercase tracking-[-0.04em]">
                  Este diagnóstico não é para
                </h3>
              </div>
              <ul className="space-y-4">
                {notForYou.map((p) => (
                  <li key={p} className="flex gap-3 border-b border-border/50 pb-4 text-muted-foreground last:border-b-0 last:pb-0">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-destructive/80" />
                    <span>{p}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
};

export default ForWhom;
