const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="container mx-auto px-6 py-20 max-w-3xl">
        <a href="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-12">
          ← Voltar ao site
        </a>

        <h1 className="font-display text-4xl font-bold mb-2">Política de Privacidade</h1>
        <p className="text-muted-foreground mb-12">Última atualização: 09 de março de 2026</p>

        <div className="space-y-10 text-muted-foreground leading-relaxed">
          <section>
            <h2 className="font-display text-xl font-semibold text-foreground mb-3">1. Introdução</h2>
            <p>
              A Tetra Growth ("nós", "nosso" ou "empresa") está comprometida em proteger a privacidade dos visitantes do nosso site e dos nossos clientes. Esta Política de Privacidade descreve como coletamos, usamos, armazenamos e protegemos suas informações pessoais.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-semibold text-foreground mb-3">2. Informações que Coletamos</h2>
            <p className="mb-3">Podemos coletar os seguintes tipos de informações:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong className="text-foreground">Dados de identificação:</strong> nome, e-mail, telefone e empresa, fornecidos voluntariamente por meio de formulários de contato.</li>
              <li><strong className="text-foreground">Dados de navegação:</strong> endereço IP, tipo de navegador, páginas visitadas, tempo de permanência e dados de cookies.</li>
              <li><strong className="text-foreground">Dados de marketing:</strong> interações com nossos e-mails, anúncios e conteúdos.</li>
            </ul>
          </section>

          <section>
            <h2 className="font-display text-xl font-semibold text-foreground mb-3">3. Como Utilizamos suas Informações</h2>
            <p className="mb-3">Utilizamos suas informações para:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Responder a solicitações de contato e propostas comerciais;</li>
              <li>Enviar comunicações de marketing relevantes (com seu consentimento);</li>
              <li>Melhorar nosso site, serviços e experiência do usuário;</li>
              <li>Cumprir obrigações legais e regulatórias;</li>
              <li>Realizar análises internas e relatórios de desempenho.</li>
            </ul>
          </section>

          <section>
            <h2 className="font-display text-xl font-semibold text-foreground mb-3">4. Compartilhamento de Dados</h2>
            <p>
              Não vendemos, alugamos ou compartilhamos suas informações pessoais com terceiros para fins de marketing sem seu consentimento. Podemos compartilhar dados com prestadores de serviço que nos auxiliam na operação do site e na execução de campanhas, sempre sob acordos de confidencialidade.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-semibold text-foreground mb-3">5. Cookies e Tecnologias de Rastreamento</h2>
            <p>
              Utilizamos cookies e tecnologias similares para personalizar sua experiência, analisar o tráfego do site e veicular anúncios relevantes. Você pode gerenciar suas preferências de cookies nas configurações do seu navegador.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-semibold text-foreground mb-3">6. Segurança dos Dados</h2>
            <p>
              Implementamos medidas técnicas e organizacionais adequadas para proteger suas informações contra acesso não autorizado, alteração, divulgação ou destruição. No entanto, nenhum método de transmissão pela internet é 100% seguro.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-semibold text-foreground mb-3">7. Seus Direitos (LGPD)</h2>
            <p className="mb-3">De acordo com a Lei Geral de Proteção de Dados (LGPD), você tem direito a:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Confirmar a existência de tratamento de dados;</li>
              <li>Acessar, corrigir ou excluir seus dados pessoais;</li>
              <li>Revogar o consentimento a qualquer momento;</li>
              <li>Solicitar a portabilidade dos dados;</li>
              <li>Obter informações sobre o compartilhamento de dados.</li>
            </ul>
          </section>

          <section>
            <h2 className="font-display text-xl font-semibold text-foreground mb-3">8. Retenção de Dados</h2>
            <p>
              Mantemos suas informações pessoais pelo tempo necessário para cumprir as finalidades descritas nesta política, salvo quando um período de retenção maior for exigido ou permitido por lei.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-semibold text-foreground mb-3">9. Alterações nesta Política</h2>
            <p>
              Podemos atualizar esta Política de Privacidade periodicamente. Quaisquer alterações serão publicadas nesta página com a data de atualização revisada.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-semibold text-foreground mb-3">10. Contato</h2>
            <p>
              Para exercer seus direitos ou esclarecer dúvidas sobre esta política, entre em contato conosco através do e-mail:{" "}
              <a href="mailto:contato@alphamkt.com.br" className="text-primary hover:underline">contato@alphamkt.com.br</a>.
            </p>
          </section>
        </div>

        <div className="mt-16 pt-8 border-t border-border text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} Tetra Growth. Todos os direitos reservados.
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
