const requiredFields = [
  "name",
  "whatsapp",
  "email",
  "company",
  "site_or_instagram",
  "captures_clients_online",
  "invests_minimum_2000_marketing",
  "produces_positioning_content",
  "has_digital_infrastructure",
  "hired_marketing_or_performance_services",
];

const parseBody = (body) => {
  if (!body) return {};
  if (typeof body === "string") return JSON.parse(body);
  return body;
};

const setJsonHeaders = (res) => {
  res.setHeader("Content-Type", "application/json");
  res.setHeader("Cache-Control", "no-store");
};

const getMakeWebhookUrl = () => {
  const envNames = [
    "MAKE_WEBHOOK_URL",
    "MAKE_DIAGNOSTICO_WEBHOOK_URL",
    "DIAGNOSTICO_WEBHOOK_URL",
    "WEBHOOK_URL",
  ];

  return envNames
    .map((name) => process.env[name]?.trim().replace(/^['"]|['"]$/g, ""))
    .find(Boolean);
};

export default async function handler(req, res) {
  setJsonHeaders(res);

  if (req.method === "OPTIONS") {
    return res.status(204).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({
      ok: false,
      message: "Método não permitido.",
    });
  }

  const makeWebhookUrl = getMakeWebhookUrl();

  if (!makeWebhookUrl) {
    return res.status(500).json({
      ok: false,
      message: "Webhook do Make não configurado.",
      expected_env: [
        "MAKE_WEBHOOK_URL",
        "MAKE_DIAGNOSTICO_WEBHOOK_URL",
        "DIAGNOSTICO_WEBHOOK_URL",
        "WEBHOOK_URL",
      ],
    });
  }

  let payload;

  try {
    payload = parseBody(req.body);
  } catch {
    return res.status(400).json({
      ok: false,
      message: "JSON inválido.",
    });
  }

  const missingFields = requiredFields.filter((field) => !payload[field]);

  if (missingFields.length > 0) {
    return res.status(400).json({
      ok: false,
      message: "Campos obrigatórios ausentes.",
      missing_fields: missingFields,
    });
  }

  try {
    const makeResponse = await fetch(makeWebhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const makeResponseText = await makeResponse.text().catch(() => "");

    if (!makeResponse.ok) {
      return res.status(502).json({
        ok: false,
        message: "O Make não confirmou o recebimento dos dados.",
        make_status: makeResponse.status,
        make_response: makeResponseText.slice(0, 500),
      });
    }

    return res.status(200).json({
      ok: true,
      message: "Diagnóstico solicitado com sucesso.",
      make_status: makeResponse.status,
    });
  } catch (error) {
    return res.status(502).json({
      ok: false,
      message: "Não foi possível conectar ao Make.",
      error: error instanceof Error ? error.message : "Erro desconhecido.",
    });
  }
}
