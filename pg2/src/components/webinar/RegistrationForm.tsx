import { useMemo, useState } from "react";
import { z } from "zod";
import { toast } from "sonner";
import { ArrowLeft, ArrowRight, CheckCircle2, Loader2 } from "lucide-react";

const yesNoValues = ["sim", "nao"] as const;

type YesNoValue = (typeof yesNoValues)[number];

const stepOneSchema = z.object({
  name: z.string().trim().min(2, "Informe seu nome").max(120),
  whatsapp: z
    .string()
    .trim()
    .min(8, "WhatsApp inválido")
    .max(30)
    .regex(/^[0-9()+\-\s]+$/, "Use apenas números e símbolos válidos"),
  email: z.string().trim().email("E-mail inválido").max(255),
  company: z.string().trim().min(1, "Informe a empresa").max(150),
  siteOrInstagram: z
    .string()
    .trim()
    .min(2, "Informe o site ou Instagram")
    .max(255),
});

const stepTwoSchema = z.object({
  capturesClientsOnline: z.enum(yesNoValues, {
    required_error: "Selecione uma opção",
  }),
  investsMinimumMarketing: z.enum(yesNoValues, {
    required_error: "Selecione uma opção",
  }),
  producesPositioningContent: z.enum(yesNoValues, {
    required_error: "Selecione uma opção",
  }),
  hasDigitalInfrastructure: z.enum(yesNoValues, {
    required_error: "Selecione uma opção",
  }),
  hiredMarketingServices: z.enum(yesNoValues, {
    required_error: "Selecione uma opção",
  }),
});

const schema = stepOneSchema.merge(stepTwoSchema);

type FormData = z.infer<typeof schema>;
type FormErrors = Partial<Record<keyof FormData, string>>;

interface Props {
  variant?: "hero" | "section" | "popup";
  id?: string;
}

const initialForm: FormData = {
  name: "",
  whatsapp: "",
  email: "",
  company: "",
  siteOrInstagram: "",
  capturesClientsOnline: "" as YesNoValue,
  investsMinimumMarketing: "" as YesNoValue,
  producesPositioningContent: "" as YesNoValue,
  hasDigitalInfrastructure: "" as YesNoValue,
  hiredMarketingServices: "" as YesNoValue,
};

const qualificationQuestions: Array<{
  name: keyof z.infer<typeof stepTwoSchema>;
  label: string;
  description?: string;
}> = [
  {
    name: "capturesClientsOnline",
    label: "Você capta clientes online?",
  },
  {
    name: "investsMinimumMarketing",
    label: "Investe no mínimo R$2.000,00 por mês em marketing?",
  },
  {
    name: "producesPositioningContent",
    label: "Produz conteúdo de posicionamento?",
  },
  {
    name: "hasDigitalInfrastructure",
    label: "Tem infraestrutura digital?",
    description: "Exemplo: conta de anúncios, site, hospedagem.",
  },
  {
    name: "hiredMarketingServices",
    label: "Já contratou serviços de marketing ou marketing de performance?",
  },
];

const readableAnswer = (value: YesNoValue) => (value === "sim" ? "Sim" : "Não");

const getUtms = () => {
  if (typeof window === "undefined") return {};

  const params = new URLSearchParams(window.location.search);

  return {
    utm_source: params.get("utm_source") || "",
    utm_medium: params.get("utm_medium") || "",
    utm_campaign: params.get("utm_campaign") || "",
    utm_content: params.get("utm_content") || "",
    utm_term: params.get("utm_term") || "",
    page_url: window.location.href,
  };
};

const RegistrationForm = ({
  variant = "hero",
  id,
}: Props) => {
  const [step, setStep] = useState<1 | 2>(1);
  const [form, setForm] = useState<FormData>(initialForm);
  const [errors, setErrors] = useState<FormErrors>({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const formEndpoint = useMemo(
    () => import.meta.env.VITE_LEAD_ENDPOINT || "/api/diagnostico",
    [],
  );

  const update = (field: keyof FormData, value: string) => {
    setForm((previous) => ({
      ...previous,
      [field]: value as FormData[typeof field],
    }));

    if (errors[field]) {
      setErrors((previous) => ({ ...previous, [field]: undefined }));
    }
  };

  const setFieldErrors = (issues: z.ZodIssue[]) => {
    const fieldErrors: FormErrors = {};

    issues.forEach((issue) => {
      const key = issue.path[0] as keyof FormData;
      if (!fieldErrors[key]) fieldErrors[key] = issue.message;
    });

    setErrors(fieldErrors);
  };

  const handleContinue = () => {
    const parsed = stepOneSchema.safeParse({
      name: form.name,
      whatsapp: form.whatsapp,
      email: form.email,
      company: form.company,
      siteOrInstagram: form.siteOrInstagram,
    });

    if (!parsed.success) {
      setFieldErrors(parsed.error.issues);
      return;
    }

    setErrors({});
    setStep(2);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (step === 1) {
      handleContinue();
      return;
    }

    const parsed = schema.safeParse(form);

    if (!parsed.success) {
      setFieldErrors(parsed.error.issues);
      return;
    }

    const payload = {
      submitted_at: new Date().toISOString(),
      origin: "Landing page - Diagnóstico de Marketing",
      name: parsed.data.name,
      whatsapp: parsed.data.whatsapp,
      email: parsed.data.email,
      company: parsed.data.company,
      site_or_instagram: parsed.data.siteOrInstagram,
      captures_clients_online: readableAnswer(parsed.data.capturesClientsOnline),
      invests_minimum_2000_marketing: readableAnswer(
        parsed.data.investsMinimumMarketing,
      ),
      produces_positioning_content: readableAnswer(
        parsed.data.producesPositioningContent,
      ),
      has_digital_infrastructure: readableAnswer(
        parsed.data.hasDigitalInfrastructure,
      ),
      hired_marketing_or_performance_services: readableAnswer(
        parsed.data.hiredMarketingServices,
      ),
      ...getUtms(),
    };

    setLoading(true);

    try {
      const response = await fetch(formEndpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error("Falha ao enviar diagnóstico");
      }

      setSuccess(true);
      setForm(initialForm);
      setStep(1);
      toast.success("Solicitação recebida! Em breve a Tetra entra em contato.");
    } catch {
      toast.error("Não foi possível enviar sua solicitação. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  const inputBase =
    "w-full rounded-2xl border border-border/70 bg-foreground/[0.035] px-4 py-4 text-foreground outline-none transition-colors placeholder:text-muted-foreground/70 focus:border-accent/70 focus:bg-foreground/[0.055]";

  const formContainerClass =
    variant === "popup"
      ? "space-y-5"
      : "soft-card mx-auto max-w-2xl space-y-5 p-6 md:p-10";

  if (success) {
    return (
      <div
        id={id}
        className={
          variant === "popup"
            ? "py-8 text-center"
            : "soft-card p-8 text-center md:p-10"
        }
      >
        <CheckCircle2 className="mx-auto mb-4 h-12 w-12 text-accent" />
        <h3 className="mb-2 font-display text-2xl font-semibold uppercase tracking-[-0.04em] text-foreground">
          Solicitação enviada
        </h3>
        <p className="leading-relaxed text-muted-foreground">
          As informações foram recebidas. Se houver fit com o seu cenário, a
          equipe da Tetra entra em contato pelo e-mail ou WhatsApp informado.
        </p>
      </div>
    );
  }

  return (
    <form id={id} onSubmit={handleSubmit} className={formContainerClass} noValidate>
      <div className="space-y-3">
        <div className="flex items-center justify-between gap-4">
          <p className="eyebrow">
            Etapa {step} de 2
          </p>
          <div className="h-1.5 w-28 overflow-hidden rounded-full bg-border/70">
            <div
              className="h-full bg-accent transition-all duration-300"
              style={{ width: step === 1 ? "50%" : "100%" }}
            />
          </div>
        </div>

        <div>
          <h3 className="font-display text-2xl font-semibold uppercase tracking-[-0.04em] text-foreground md:text-3xl">
            {step === 1 ? "Solicite seu diagnóstico" : "Qualifique seu cenário"}
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            {step === 1
              ? "Preencha seus dados para iniciar a análise."
              : "Responda às perguntas abaixo para avaliarmos se existe fit para uma reunião estratégica."}
          </p>
        </div>
      </div>

      {step === 1 ? (
        <div className="space-y-4">
          <div>
            <input
              type="text"
              placeholder="Nome"
              value={form.name}
              onChange={(event) => update("name", event.target.value)}
              className={inputBase}
              maxLength={120}
              autoComplete="name"
            />
            {errors.name && (
              <p className="mt-1 text-xs text-destructive">{errors.name}</p>
            )}
          </div>

          <div>
            <input
              type="tel"
              placeholder="WhatsApp"
              value={form.whatsapp}
              onChange={(event) => update("whatsapp", event.target.value)}
              className={inputBase}
              maxLength={30}
              autoComplete="tel"
            />
            {errors.whatsapp && (
              <p className="mt-1 text-xs text-destructive">{errors.whatsapp}</p>
            )}
          </div>

          <div>
            <input
              type="email"
              placeholder="E-mail"
              value={form.email}
              onChange={(event) => update("email", event.target.value)}
              className={inputBase}
              maxLength={255}
              autoComplete="email"
            />
            {errors.email && (
              <p className="mt-1 text-xs text-destructive">{errors.email}</p>
            )}
          </div>

          <div>
            <input
              type="text"
              placeholder="Empresa"
              value={form.company}
              onChange={(event) => update("company", event.target.value)}
              className={inputBase}
              maxLength={150}
              autoComplete="organization"
            />
            {errors.company && (
              <p className="mt-1 text-xs text-destructive">{errors.company}</p>
            )}
          </div>

          <div>
            <input
              type="text"
              placeholder="Site ou Instagram"
              value={form.siteOrInstagram}
              onChange={(event) => update("siteOrInstagram", event.target.value)}
              className={inputBase}
              maxLength={255}
              autoComplete="url"
            />
            {errors.siteOrInstagram && (
              <p className="mt-1 text-xs text-destructive">
                {errors.siteOrInstagram}
              </p>
            )}
          </div>
        </div>
      ) : (
        <div className="space-y-3">
          {qualificationQuestions.map((question) => (
            <div
              key={question.name}
              className="rounded-2xl border border-border/70 bg-foreground/[0.035] p-4"
            >
              <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                <div className="space-y-1">
                  <p className="text-sm font-semibold leading-snug text-foreground">
                    {question.label}
                  </p>
                  {question.description && (
                    <p className="text-xs leading-relaxed text-muted-foreground">
                      {question.description}
                    </p>
                  )}
                  {errors[question.name] && (
                    <p className="mt-1 text-xs text-destructive">
                      {errors[question.name]}
                    </p>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-2 md:min-w-36">
                  {yesNoValues.map((option) => {
                    const selected = form[question.name] === option;

                    return (
                      <button
                        key={option}
                        type="button"
                        onClick={() => update(question.name, option)}
                        className={
                          selected
                            ? "rounded-xl bg-accent px-4 py-2 text-sm font-bold text-accent-foreground transition-colors"
                            : "rounded-xl border border-border/70 bg-background/40 px-4 py-2 text-sm font-bold text-muted-foreground transition-colors hover:border-accent/70 hover:text-foreground"
                        }
                        aria-pressed={selected}
                      >
                        {option === "sim" ? "Sim" : "Não"}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="space-y-3 pt-1">
        {step === 1 ? (
          <button
            type="submit"
            className="group tg-button w-full"
          >
            Continuar diagnóstico
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </button>
        ) : (
          <div className="space-y-3">
            <div className="grid gap-3 sm:grid-cols-[auto,1fr]">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="flex items-center justify-center gap-2 rounded-xl border border-border/70 bg-background/40 px-5 py-4 text-sm font-bold text-muted-foreground transition-colors hover:border-accent/70 hover:text-foreground"
              >
                <ArrowLeft className="h-4 w-4" />
                Voltar
              </button>

              <button
                type="submit"
                disabled={loading}
                className="group tg-button w-full disabled:opacity-60 sm:w-auto"
              >
                {loading ? (
                  <Loader2 className="h-5 w-5 animate-spin" />
                ) : (
                  <>
                    Solicitar meu diagnóstico
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </>
                )}
              </button>
            </div>

            <p className="text-center text-xs leading-relaxed text-muted-foreground/80">
              As informações serão usadas para avaliar seu cenário e entender se
              existe fit para uma reunião estratégica.
            </p>
          </div>
        )}
      </div>
    </form>
  );
};

export default RegistrationForm;
