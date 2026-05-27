import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="border-t border-border/60 bg-background py-12">
      <div className="container mx-auto max-w-6xl px-6 lg:px-8">
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <div className="max-w-md">
            <p className="brand-wordmark mb-4">
              TETRA <span>GROWTH</span>
            </p>
            <p className="text-sm leading-relaxed text-muted-foreground">
              Diagnóstico de marketing para empresas que querem entender onde
              aquisição, conversão, comercial e dados estão limitando receita.
            </p>
          </div>

          <div className="flex flex-col gap-2 text-sm text-muted-foreground md:items-end">
            <Link
              to="/politica-de-privacidade"
              className="transition-colors hover:text-foreground"
            >
              Política de Privacidade
            </Link>
            <span>
              © {new Date().getFullYear()} Tetra Growth. Todos os direitos
              reservados.
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
