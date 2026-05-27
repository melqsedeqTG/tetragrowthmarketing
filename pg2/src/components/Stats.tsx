const stats = [
  {
    value: "+R$ 5.3 mi",
    label: "gerados com estratégias de growth",
    highlight: true,
  },
  {
    value: "+R$ 100k",
    label: "investidos para acelerar aquisição",
    highlight: false,
  },
  {
    value: "+25",
    label: "operações atendidas com foco em crescimento",
    highlight: false,
  },
];

const Stats = () => {
  return (
    <section className="py-20 md:py-28 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[600px] h-[300px] bg-primary/10 rounded-full blur-[120px]" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-12">
          <p className="text-primary font-semibold text-sm tracking-widest uppercase mb-3">Growth em números</p>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground">
            Crescimento medido por resultado, não por vaidade
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className={`relative rounded-2xl p-8 md:p-10 text-center flex flex-col items-center gap-3 transition-all ${
                stat.highlight ? "bg-primary/10 border-2 border-primary/30 glow-box" : "card-glass"
              }`}
            >
              <span className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-gradient leading-none">
                {stat.value}
              </span>
              <span className="text-muted-foreground text-sm md:text-base max-w-[220px] leading-relaxed">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;
