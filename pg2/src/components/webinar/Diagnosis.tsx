import { ArrowRight } from "lucide-react";
import Reveal from "./Reveal";

const symptoms = [
  "Os leads chegam, mas poucos viram clientes.",
  "O comercial diz que os contatos não têm perfil.",
  "Você investe, mas não sabe exatamente onde perde dinheiro.",
  "O crescimento depende demais de indicação ou esforço manual.",
  "Cada nova campanha parece uma aposta.",
];

interface DiagnosisProps {
  onOpenForm: () => void;
}

const Diagnosis = ({ onOpenForm }: DiagnosisProps) => {
  return (
    <section className="section-frame py-24 md:py-32">
      <div className="relative container mx-auto max-w-6xl px-6 lg:px-8">
        <Reveal>
          <div className="mx-auto max-w-4xl text-center">
            <p className="eyebrow mb-6">Identificação</p>
            <h2 className="headline-tight text-3xl sm:text-4xl md:text-6xl">
              Marketing em movimento não significa receita previsível.
            </h2>
            <p className="copy-muted mx-auto mt-7 max-w-3xl text-lg">
              Se a empresa já anuncia, produz conteúdo ou recebe leads, mas a
              conta ainda não fecha, o problema pode estar escondido entre o
              clique e a venda.
            </p>
          </div>
        </Reveal>

        <div className="mt-16 grid gap-4 md:grid-cols-5">
          {symptoms.map((s, i) => (
            <Reveal key={s} delay={i * 70}>
              <div className="soft-card h-full p-6">
                <span className="number-chip">0{i + 1}</span>
                <p className="mt-8 text-sm leading-relaxed text-foreground/78">
                  {s}
                </p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal>
          <div className="mx-auto mt-14 flex max-w-3xl flex-col items-center text-center">
            <p className="text-lg leading-relaxed text-foreground/78">
              O diagnóstico separa sintoma de causa-raiz e mostra onde agir
              primeiro para parar de desperdiçar verba, tempo e oportunidade.
            </p>
            <button
              type="button"
              onClick={onOpenForm}
              className="group tg-button mt-9"
            >
              Continuar diagnóstico
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </button>
          </div>
        </Reveal>
      </div>
    </section>
  );
};

export default Diagnosis;
