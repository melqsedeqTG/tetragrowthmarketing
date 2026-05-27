import dashboard1 from "@/assets/dashboard-1.jpg";
import dashboard2 from "@/assets/dashboard-2.jpg";

const tags = [
"Dados em tempo real",
"Aquisição, conversão e retenção no mesmo funil",
"Visualização detalhada das alavancas de growth",
"Painéis sob medida para decisões mais rápidas"];


const Dashboard = () => {
  return (
    <section id="diferenciais" className="py-24">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground">
            Clareza para tomar decisões de growth
          </h2>
          <p className="mt-4 text-muted-foreground text-lg">
            Dashboards personalizados e atualizados em tempo real para acompanhar indicadores de aquisição, conversão,
            retenção e receita com visão completa da operação.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-10">
          <img src={dashboard1} alt="Dashboard de analytics" className="rounded-xl border border-border w-full" />
          <img src={dashboard2} alt="Dashboard de CRM" className="rounded-xl border border-border w-full" />
        </div>

        {/* Tags marquee */}
        <div className="overflow-hidden py-4">
          <div className="flex animate-marquee whitespace-nowrap">
            {[...tags, ...tags, ...tags].map((tag, i) =>
            <span
              key={i}
              className="mx-3 flex-shrink-0 px-4 py-2 rounded-full border border-border text-sm text-primary-foreground">
              
                {tag}
              </span>
            )}
          </div>
        </div>
      </div>
    </section>);

};

export default Dashboard;