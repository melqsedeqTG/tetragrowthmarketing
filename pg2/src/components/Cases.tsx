import { Quote } from "lucide-react";

const cases = [
  {
    quote: "O lançamento de meu produto expirou no mesmo dia com a ativação das campanhas",
    name: "Ariana Bento",
    company: "Bento Doce",
    metric: "60%",
    metricLabel: "mais vendas",
  },
  {
    quote: "O trabalho de marketing estratégico desenvolvido foi crucial para reposicionar nossa empresa no mercado",
    name: "Walter Amorim",
    company: "Alumi",
    metric: "40%",
    metricLabel: "mais ROAS",
  },
  {
    quote: "A estratégia utilizada garantiu nossas vendas em meio a crise do varejo",
    name: "Alison Boas",
    company: "UOMO",
    metric: "5x",
    metricLabel: "mais ROI",
  },
];

const Cases = () => {
  return (
    <section id="cases" className="py-24">
      <div className="container mx-auto px-6">
        <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground text-center mb-4">
          Cases reais de marcas que aceleraram <br className="hidden md:block" />
          crescimento com a Tetra Growth
        </h2>

        <div className="grid md:grid-cols-3 gap-6 mt-16">
          {cases.map((c) => (
            <div
              key={c.name}
              className="card-glass rounded-xl p-8 flex flex-col justify-between hover:border-primary/30 transition-colors"
            >
              <div>
                <Quote className="w-8 h-8 text-primary mb-4" />
                <p className="text-foreground text-lg font-medium leading-relaxed">"{c.quote}"</p>
              </div>
              <div className="mt-8">
                <div className="flex items-end gap-2 mb-4">
                  <span className="text-gradient font-display text-4xl font-bold">{c.metric}</span>
                  <span className="text-muted-foreground text-sm mb-1">{c.metricLabel}</span>
                </div>
                <p className="text-sm font-semibold text-foreground">{c.name}</p>
                <p className="text-sm text-muted-foreground">{c.company}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <a
            href="#contato"
            className="inline-flex px-8 py-4 rounded-lg bg-primary text-primary-foreground font-semibold hover:opacity-90 transition-opacity"
          >
            Agende um diagnóstico gratuito
          </a>
        </div>
      </div>
    </section>
  );
};

export default Cases;
