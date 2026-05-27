import Reveal from "./Reveal";

const pillars = ["Aquisição", "Conversão", "Comercial", "Lucro"];

const AboutTetra = () => {
  return (
    <section className="section-frame py-24 md:py-32">
      <div className="relative container mx-auto max-w-6xl px-6 lg:px-8">
        <div className="grid items-start gap-12 lg:grid-cols-12 lg:gap-20">
          <div className="lg:col-span-6">
            <Reveal>
              <p className="eyebrow mb-6">Tetra Growth</p>
              <h2 className="headline-tight text-3xl sm:text-4xl md:text-5xl">
                Marketing, vendas e dados na mesma direção.
              </h2>
              <p className="copy-muted mt-7 text-lg">
                A Tetra Growth atua conectando aquisição, conversão, processo
                comercial e análise de dados para transformar investimento em
                uma operação mais previsível, eficiente e lucrativa.
              </p>
            </Reveal>
          </div>

          <div className="lg:col-span-6">
            <div className="grid grid-cols-2 gap-px overflow-hidden rounded-[1.65rem] border border-border/70 bg-border/60">
              {pillars.map((p, i) => (
                <Reveal key={p} delay={i * 80}>
                  <div className="flex min-h-[170px] flex-col justify-between bg-background/75 p-7 md:p-9">
                    <span className="number-chip">0{i + 1}</span>
                    <span className="font-display text-2xl font-semibold uppercase leading-none tracking-[-0.05em] text-foreground md:text-3xl">
                      {p}
                    </span>
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

export default AboutTetra;
