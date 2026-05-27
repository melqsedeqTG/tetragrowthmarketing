# Landing page — Diagnóstico de Marketing

Projeto em Vite + React + TypeScript + Tailwind CSS + shadcn/ui.

Esta versão contém as alterações solicitadas:

- Formulário removido da página principal.
- Formulário exibido em popup/modal.
- Formulário dividido em 2 etapas.
- Campos da etapa 1: nome, WhatsApp, e-mail, empresa, site ou Instagram.
- Perguntas da etapa 2 com seleção Sim/Não.
- Envio final para rota interna `/api/diagnostico`.
- Rota serverless preparada para encaminhar os dados ao webhook do Make.
- Estrutura pronta para deploy na Vercel.
- Identidade visual atualizada para fundo escuro premium, verde vibrante, tipografia forte em caixa alta e layout centralizado.
- Página sem cabeçalho com menus; a primeira dobra exibe apenas marca e CTA.

## Como rodar localmente

```sh
npm install
npm run dev
```

A aplicação fica disponível em:

```sh
http://localhost:5173
```

## Como fazer build

```sh
npm run build
```

## Como configurar o Make

1. Crie um cenário no Make.
2. Adicione o módulo **Webhooks > Custom webhook**.
3. Copie a URL gerada pelo Make.
4. Na Vercel, adicione a variável de ambiente:

```env
MAKE_WEBHOOK_URL=https://hook.us1.make.com/seu-webhook-aqui
```

5. No Make, conecte o próximo módulo em **Google Sheets > Add a Row**.
6. Mapeie os campos recebidos para as colunas da planilha.

## Variáveis de ambiente

Crie as variáveis a partir do arquivo `.env.example`.

```env
VITE_LEAD_ENDPOINT="/api/diagnostico"
MAKE_WEBHOOK_URL="https://hook.us1.make.com/seu-webhook-aqui"
```

Na Vercel, a variável mais importante é:

```env
MAKE_WEBHOOK_URL
```

Ela deve ser cadastrada como variável privada do projeto.

## Campos enviados para o Make

O payload enviado ao Make possui os seguintes campos:

```json
{
  "submitted_at": "2026-05-27T00:00:00.000Z",
  "origin": "Landing page - Diagnóstico de Marketing",
  "name": "Nome do lead",
  "whatsapp": "(00) 00000-0000",
  "email": "email@empresa.com",
  "company": "Nome da empresa",
  "site_or_instagram": "https://site.com ou @instagram",
  "captures_clients_online": "Sim",
  "invests_minimum_2000_marketing": "Sim",
  "produces_positioning_content": "Não",
  "has_digital_infrastructure": "Sim",
  "hired_marketing_or_performance_services": "Não",
  "utm_source": "",
  "utm_medium": "",
  "utm_campaign": "",
  "utm_content": "",
  "utm_term": "",
  "page_url": "https://sua-pagina.com"
}
```

## Deploy na Vercel

1. Suba o projeto para o GitHub.
2. Importe o repositório na Vercel.
3. Configure a variável `MAKE_WEBHOOK_URL`.
4. Faça o deploy.

A rota `/api/diagnostico` será publicada automaticamente como função serverless da Vercel.
