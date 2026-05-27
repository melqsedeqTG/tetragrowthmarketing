import { Instagram } from "lucide-react";
import founder1 from "@/assets/founder-1.jpg";
import founder2 from "@/assets/founder-2.png";

const AboutUs = () => {
  return (
    <section id="sobre-nos" className="py-24 px-6 bg-background">
      <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center gap-16">
        {/* Founder Photos */}
        <div className="flex -space-x-8">
          <div className="w-48 h-48 rounded-full border-4 border-background overflow-hidden bg-secondary flex items-center justify-center z-10">
            <img src={founder1} alt="Fundador 1" className="w-full h-full object-cover brightness-90 contrast-110 saturate-[0.7]" />
          </div>
          <div className="w-48 h-48 rounded-full border-4 border-background overflow-hidden bg-secondary flex items-center justify-center">
            <img src={founder2} alt="Fundador 2" className="w-full h-full object-cover brightness-90 contrast-110 saturate-[0.7]" />
          </div>
        </div>

        {/* Content */}
        <div className="flex flex-col gap-6 max-w-xl">
          <span className="inline-flex items-center gap-2 border border-border rounded-full px-4 py-1.5 text-sm text-foreground w-fit">
            <span className="w-2 h-2 rounded-full bg-primary" />
            SOBRE NÓS
          </span>

          <p className="leading-relaxed text-primary-foreground">
            A Tetra Growth atua com foco em Growth Marketing, conectando estratégia, mídia, funil e otimização contínua
            para acelerar crescimento com mais previsibilidade, eficiência e geração de receita.
          </p>

          <a
            href="https://www.instagram.com/alphamkt.agency/"
            target="_blank"
            rel="noopener noreferrer"
            className="w-12 h-12 rounded-full border border-border flex items-center justify-center text-foreground hover:border-primary hover:text-primary transition-colors">
            
            <Instagram size={20} />
          </a>
        </div>
      </div>
    </section>);

};

export default AboutUs;