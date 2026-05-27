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

  const makeWebhookUrl = process.env.MAKE_WEBHOOK_URL;

  if (!makeWebhookUrl) {
    return res.status(500).json({
      ok: false,
      message: "Webhook do Make não configurado.",
    });
  }

  let payload;

  try {
    payload = parseBody(req.body);
  } catch (error) {
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

    if (!makeResponse.ok) {
      return res.status(502).json({
        ok: false,
        message: "O Make não confirmou o recebimento dos dados.",
      });
    }

    return res.status(200).json({
      ok: true,
      message: "Diagnóstico solicitado com sucesso.",
    });
  } catch (error) {
    return res.status(502).json({
      ok: false,
      message: "Não foi possível conectar ao Make.",
    });
  }
}
