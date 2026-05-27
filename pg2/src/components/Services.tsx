import { Instagram, Search, Compass, Rocket, GraduationCap } from "lucide-react";

const services = [
{
  icon: Search,
  label: "Diagnóstico de Growth",
  tagline: "Clareza para crescer.",
  description: "Mapeamos os gargalos de aquisição, conversão e retenção para identificar onde sua operação perde crescimento e quais alavancas priorizar."
},
{
  icon: Compass,
  label: "Estratégia de Growth Marketing",
  tagline: "Direção com foco em receita.",
  description: "Desenhamos um plano de crescimento orientado por dados, unindo marketing, vendas e produto para acelerar resultados com mais previsibilidade."
},
{
  icon: Rocket,
  label: "Operação de Growth",
  tagline: "Execução contínua.",
  description: "Atuamos na implementação e otimização das principais frentes de crescimento:",
  bullets: [
  "Aquisição paga e orgânica",
  "Funis e jornadas de conversão",
  "Automação e relacionamento",
  "Análises, testes e otimização de receita"]

},
{
  icon: GraduationCap,
  label: "Mentoria em Growth",
  tagline: "Capacitação estratégica.",
  description: "Acompanhamento próximo para líderes e empreendedores que desejam desenvolver uma visão de growth e tomar decisões mais inteligentes de marketing."
}];


const Services = () => {
  return (
    <section id="servicos" className="py-24">
      <div className="container mx-auto px-6">
        <div className="max-w-3xl mb-16">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground leading-tight">
            Growth Marketing para escalar com {" "}
            <br className="hidden md:block" />
            estratégia, testes e resultado
          </h2>
          <p className="mt-4 text-muted-foreground text-lg max-w-2xl">
            Construímos operações de crescimento que conectam atração, conversão e retenção para gerar demanda qualificada e crescimento sustentável.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {services.map((service) =>
          <div key={service.label} className="card-glass rounded-xl p-6 hover:border-primary/30 transition-colors group">
              <service.icon className="w-10 h-10 text-primary mb-4 group-hover:scale-110 transition-transform" />
              <h3 className="font-display text-lg font-semibold text-foreground mb-1">{service.label}</h3>
              <p className="text-sm font-medium text-primary mb-2">{service.tagline}</p>
              <p className="text-sm leading-relaxed text-primary-foreground">{service.description}</p>
              {service.bullets &&
            <ul className="mt-3 space-y-1">
                  {service.bullets.map((b) =>
              <li key={b} className="text-sm flex items-center gap-2 text-primary-foreground">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                      {b}
                    </li>
              )}
                </ul>
            }
            </div>
          )}
        </div>
      </div>
    </section>);

};

export default Services;