import heroImage from "@/assets/hero-image.jpg";

const adBadges = [
  { name: "Aquisição", icon: "↗", delay: "" },
  { name: "Conversão", icon: "◎", delay: "animate-float-delayed" },
  { name: "Retenção", icon: "◌", delay: "animate-float-delayed-2" },
  { name: "Receita", icon: "$", delay: "animate-float" },
];

const Hero = () => {
  return (
    <section className="relative min-h-screen hero-bg flex items-center pt-20 overflow-hidden">
      <div className="container mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">
        <div className="animate-fade-in-up">
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-foreground">
            Growth Marketing <br />
            para empresas que <br />
            <span className="text-gradient">querem crescer com previsibilidade</span>
          </h1>
          <p className="mt-6 text-lg text-muted-foreground max-w-lg leading-relaxed">
            A Tetra Growth estrutura aquisição, conversão e retenção para transformar marketing em crescimento
            consistente, com estratégia, experimentação e foco em receita.
          </p>
          <a
            href="#contato"
            className="mt-8 inline-flex px-8 py-4 rounded-lg bg-primary text-primary-foreground font-semibold text-base hover:opacity-90 transition-opacity glow-box"
          >
            Agende um diagnóstico de growth
          </a>
        </div>

        <div className="relative hidden lg:block">
          <img
            src={heroImage}
            alt="Especialista em marketing digital"
            className="w-full h-auto rounded-2xl object-cover"
          />
          <div className="absolute top-8 right-4 space-y-4">
            {adBadges.map((badge) => (
              <div
                key={badge.name}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl bg-primary/15 backdrop-blur-md border border-primary/20 text-foreground text-sm font-medium ${badge.delay || "animate-float"}`}
              >
                <span className="text-primary font-bold">{badge.icon}</span>
                {badge.name}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom gradient divider */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
};

export default Hero;
