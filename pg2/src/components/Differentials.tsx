import { Briefcase, TrendingUp, DollarSign, Settings2, Workflow, Zap, Monitor, Package, Truck, Tag } from "lucide-react";

const areas = [
{ icon: Briefcase, label: "Comercial" },
{ icon: TrendingUp, label: "Vendas" },
{ icon: DollarSign, label: "Financeiro" },
{ icon: Settings2, label: "Gestão" },
{ icon: Workflow, label: "Processos" },
{ icon: Zap, label: "Automação" },
{ icon: Monitor, label: "Sistemas" },
{ icon: Package, label: "Produto" }];



const Differentials = () => {
  return (
    <section id="diferencial" className="py-24">
      <div className="container mx-auto px-6">
        <div className="max-w-3xl mb-16">
          <p className="text-sm font-medium text-primary tracking-wider uppercase mb-3">Visão de Growth</p>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground leading-tight">
            Growth de verdade acontece quando {" "}
            <br className="hidden md:block" />
            toda a operação evolui junto.
          </h2>
          <p className="mt-4 text-muted-foreground text-lg max-w-2xl">
            Atuamos além da mídia para destravar conversão, processo, oferta e experiência, criando uma base mais eficiente para crescer com consistência.
          </p>
        </div>

        {/* Áreas complementares */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-16">
          {areas.map((area) =>
          <div
            key={area.label}
            className="card-glass rounded-xl p-4 flex flex-col items-center gap-2 hover:border-primary/30 transition-colors group">
            
              <area.icon className="w-7 h-7 text-primary group-hover:scale-110 transition-transform" />
              <span className="text-xs font-medium text-foreground text-center">{area.label}</span>
            </div>
          )}
        </div>

        {/* Oferta única de valor */}
        <div className="card-glass rounded-xl p-8 md:p-12 border-primary/20 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent pointer-events-none" />
          <div className="relative max-w-3xl mx-auto text-center">
            <Tag className="w-8 h-8 text-primary mx-auto mb-4" />
            <p className="text-sm font-medium tracking-wider uppercase mb-4 text-primary-foreground">Oferta Única de Valor</p>
            <blockquote className="font-display text-xl md:text-2xl font-semibold text-foreground leading-relaxed">
              "Estruturamos um sistema de Growth Marketing que integra aquisição, conversão, retenção e operação para transformar ações isoladas em crescimento contínuo."
            </blockquote>
          </div>
        </div>
      </div>
    </section>);

};

export default Differentials;