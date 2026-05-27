import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Reveal from "./Reveal";

const faqs = [
  {
    q: "O diagnóstico tem custo?",
    a: "Não. A reunião de diagnóstico é gratuita. Ela existe para identificar o gargalo principal e avaliar se há fit para uma parceria futura com a Tetra.",
  },
  {
    q: "Para quem o diagnóstico foi feito?",
    a: "Para donos, sócios e decisores de empresas que já vendem e investem, ou pretendem investir, em marketing, mas ainda não têm clareza sobre a principal trava de receita.",
  },
  {
    q: "Toda solicitação vira uma reunião?",
    a: "Não. A Tetra avalia maturidade, momento, capacidade de investimento e tipo de gargalo antes de marcar a conversa.",
  },
  {
    q: "Preciso já ter equipe de marketing?",
    a: "Não é obrigatório. O diagnóstico funciona tanto para empresas com time interno quanto para empresas que terceirizam marketing ou estão estruturando essa área agora.",
  },
  {
    q: "Quanto tempo dura a reunião?",
    a: "Cerca de 45 a 60 minutos, online. O foco é entender seu cenário, identificar o gargalo dominante e indicar a prioridade certa para o próximo passo.",
  },
];

const Faq = () => {
  return (
    <section className="section-frame py-24 md:py-32">
      <div className="relative container mx-auto max-w-4xl px-6 lg:px-8">
        <Reveal>
          <p className="eyebrow mb-6 text-center">Perguntas frequentes</p>
          <h2 className="headline-tight mb-12 text-center text-3xl sm:text-4xl md:text-6xl">
            Dúvidas comuns
          </h2>
        </Reveal>

        <Reveal>
          <Accordion type="single" collapsible className="soft-card w-full px-5 md:px-8">
            {faqs.map((f, i) => (
              <AccordionItem
                key={f.q}
                value={`item-${i}`}
                className="border-border/50"
              >
                <AccordionTrigger className="py-6 text-left font-display text-base font-semibold uppercase tracking-[-0.03em] text-foreground hover:no-underline md:text-xl">
                  {f.q}
                </AccordionTrigger>
                <AccordionContent className="pb-6 text-base leading-relaxed text-muted-foreground">
                  {f.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Reveal>
      </div>
    </section>
  );
};

export default Faq;
