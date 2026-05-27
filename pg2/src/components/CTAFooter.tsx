import { ArrowRight } from "lucide-react";

const CTAFooter = () => {
  return (
    <section id="contato" className="py-32 relative overflow-hidden">
      {/* Glow background */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[600px] h-[600px] rounded-full bg-primary/10 blur-[120px]" />
      </div>

      <div className="container mx-auto px-6 text-center relative z-10">
        <h2 className="font-display text-4xl md:text-6xl font-bold text-foreground leading-tight">
          Quer transformar marketing <br />
          em <span className="text-gradient">crescimento previsível?</span>
        </h2>
        <p className="mt-6 text-lg text-muted-foreground max-w-lg mx-auto">
          Agende um diagnóstico com nosso time e descubra onde estão as maiores oportunidades de growth da sua operação.
        </p>
        <a
          href="https://linktr.ee/gestao.alpha"
          className="mt-10 inline-flex items-center gap-2 px-10 py-5 rounded-xl bg-primary text-primary-foreground font-bold text-lg hover:opacity-90 transition-opacity glow-box"
        >
          Falar com especialista
          <ArrowRight className="w-5 h-5" />
        </a>
      </div>

      {/* Footer */}
      <div className="container mx-auto px-6 mt-32 pt-8 border-t border-border">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <span className="font-display font-bold text-foreground">
            Tetra<span className="text-gradient"> Growth</span>
          </span>
          <p className="text-sm text-muted-foreground">© 2026 Tetra Growth. Todos os direitos reservados.</p>
        </div>
      </div>
    </section>
  );
};

export default CTAFooter;
