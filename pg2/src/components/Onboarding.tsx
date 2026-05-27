import { CheckCircle2, Clock, ListTodo } from "lucide-react";

const columns = [
  {
    title: "Concluído",
    icon: CheckCircle2,
    color: "text-primary",
    tasks: [
      { name: "Briefing inicial", priority: "Alta", date: "Dia 1" },
      { name: "Pesquisa de palavras-chave", priority: "Urgente", date: "Dia 2" },
    ],
  },
  {
    title: "Em andamento",
    icon: Clock,
    color: "text-accent",
    tasks: [
      { name: "Copy de Google Search", priority: "Alta", date: "Dia 3" },
      { name: "Copy de landing page", priority: "Urgente", date: "Dia 3" },
      { name: "Copy dos criativos", priority: "Média", date: "Dia 4" },
    ],
  },
  {
    title: "Na fila",
    icon: ListTodo,
    color: "text-muted-foreground",
    tasks: [
      { name: "Criação de relatório", priority: "Média", date: "Dia 5" },
      { name: "Criação dos criativos", priority: "Urgente", date: "Dia 5" },
      { name: "Integrações e tagueamento", priority: "Média", date: "Dia 6" },
    ],
  },
];

const priorityColor: Record<string, string> = {
  Urgente: "bg-primary/15 text-primary border border-primary/20",
  Alta: "bg-accent/15 text-accent border border-accent/20",
  Média: "bg-secondary text-secondary-foreground border border-border",
};

const Onboarding = () => {
  return (
    <section className="py-24 bg-secondary/30">
      <div className="container mx-auto px-6">
        <div className="max-w-3xl mb-16">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground">
            Onboarding eficiente para quem precisa de resultados rápidos
          </h2>
          <p className="mt-4 text-muted-foreground text-lg">
            Nosso processo é prático, estruturado e pensado para acelerar resultados desde o primeiro mês.
          </p>
          <a
            href="#contato"
            className="mt-6 inline-flex px-6 py-3 rounded-lg bg-primary text-primary-foreground font-semibold text-sm hover:opacity-90 transition-opacity"
          >
            Fale com nosso time
          </a>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {columns.map((col) => (
            <div key={col.title} className="space-y-4">
              <div className="flex items-center gap-2 mb-2">
                <col.icon className={`w-5 h-5 ${col.color}`} />
                <h3 className="font-display font-semibold text-foreground">{col.title}</h3>
              </div>
              {col.tasks.map((task) => (
                <div key={task.name} className="card-glass rounded-lg p-4 space-y-2">
                  <p className="text-sm font-medium text-foreground">{task.name}</p>
                  <div className="flex items-center justify-between">
                    <span className={`text-xs px-2 py-0.5 rounded-full ${priorityColor[task.priority]}`}>
                      {task.priority}
                    </span>
                    <span className="text-xs text-muted-foreground">{task.date}</span>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Onboarding;
