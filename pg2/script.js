(() => {
  const endpoint = window.__TETRA_LEAD_ENDPOINT__ || document.documentElement.dataset.leadEndpoint || "/api/diagnostico";

  const modal = document.querySelector("[data-lead-modal]");
  const form = document.querySelector("[data-lead-form]");
  const successView = document.querySelector("[data-success-view]");
  const toast = document.querySelector("[data-toast]");
  const stepOne = document.querySelector('[data-step="1"]');
  const stepTwo = document.querySelector('[data-step="2"]');
  const stepLabel = document.querySelector("[data-step-label]");
  const stepDescription = document.querySelector("[data-step-description]");
  const progressBar = document.querySelector("[data-progress-bar]");
  const prevButton = document.querySelector("[data-prev-step]");
  const finalActions = document.querySelector("[data-final-actions]");
  const microcopy = document.querySelector("[data-microcopy]");
  const submitButton = document.querySelector("[data-submit-button]");
  const currentYear = document.querySelector("[data-current-year]");
  const submitButtonDefaultContent = submitButton?.innerHTML || "Solicitar meu diagnóstico";

  const stepOneFields = ["name", "whatsapp", "email", "company", "siteOrInstagram"];
  const stepTwoFields = [
    "capturesClientsOnline",
    "investsMinimumMarketing",
    "producesPositioningContent",
    "hasDigitalInfrastructure",
    "hiredMarketingServices",
  ];

  let activeStep = 1;
  let lastFocusedElement = null;
  let toastTimer = null;

  if (currentYear) currentYear.textContent = String(new Date().getFullYear());

  const showToast = (message, type = "success") => {
    if (!toast) return;
    window.clearTimeout(toastTimer);
    toast.textContent = message;
    toast.classList.toggle("is-error", type === "error");
    toast.classList.add("is-visible");
    toastTimer = window.setTimeout(() => toast.classList.remove("is-visible"), 4200);
  };

  const hideSuccess = () => {
    if (!successView || !form) return;
    successView.hidden = true;
    form.hidden = false;
  };

  const openModal = () => {
    if (!modal) return;
    lastFocusedElement = document.activeElement;
    hideSuccess();
    modal.hidden = false;
    modal.classList.add("is-open");
    modal.setAttribute("aria-hidden", "false");
    document.body.classList.add("modal-open");
    window.setTimeout(() => {
      const firstInput = modal.querySelector('input[name="name"]');
      if (firstInput) firstInput.focus();
    }, 50);
  };

  const closeModal = () => {
    if (!modal) return;
    modal.classList.remove("is-open");
    modal.setAttribute("aria-hidden", "true");
    modal.hidden = true;
    document.body.classList.remove("modal-open");
    if (lastFocusedElement && typeof lastFocusedElement.focus === "function") lastFocusedElement.focus();
  };

  const setStep = (step) => {
    activeStep = step;
    const isStepOne = step === 1;

    if (stepOne) stepOne.hidden = !isStepOne;
    if (stepTwo) stepTwo.hidden = isStepOne;
    if (finalActions) finalActions.hidden = false;
    if (prevButton) prevButton.hidden = isStepOne;
    if (microcopy) microcopy.hidden = isStepOne;
    if (stepLabel) stepLabel.textContent = `Etapa ${step} de 2`;
    if (progressBar) progressBar.style.width = isStepOne ? "50%" : "100%";

    const modalTitle = document.getElementById("modal-title");
    if (modalTitle) modalTitle.textContent = isStepOne ? "Solicite seu diagnóstico" : "Qualifique seu cenário";
    if (stepDescription) {
      stepDescription.textContent = isStepOne
        ? "Preencha seus dados para iniciar a análise."
        : "Responda às perguntas abaixo para avaliarmos se existe fit para uma reunião estratégica.";
    }
  };

  const setError = (field, message) => {
    const error = document.querySelector(`[data-error-for="${field}"]`);
    if (!error) return;
    error.textContent = message || "";
    error.classList.toggle("is-visible", Boolean(message));
  };

  const clearErrors = () => {
    document.querySelectorAll(".field-error").forEach((error) => {
      error.textContent = "";
      error.classList.remove("is-visible");
    });
  };

  const getInput = (name) => form?.elements.namedItem(name);

  const valueOf = (name) => {
    const input = getInput(name);
    if (!input) return "";
    if (input instanceof RadioNodeList) return input.value.trim();
    return input.value.trim();
  };

  const isValidEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  const isValidWhatsapp = (value) => /^[0-9()+\-\s]+$/.test(value) && value.replace(/\D/g, "").length >= 8;

  const validateStepOne = () => {
    clearErrors();
    const values = {
      name: valueOf("name"),
      whatsapp: valueOf("whatsapp"),
      email: valueOf("email"),
      company: valueOf("company"),
      siteOrInstagram: valueOf("siteOrInstagram"),
    };

    let valid = true;

    if (values.name.length < 2) {
      setError("name", "Informe seu nome.");
      valid = false;
    }

    if (!isValidWhatsapp(values.whatsapp)) {
      setError("whatsapp", "Informe um WhatsApp válido.");
      valid = false;
    }

    if (!isValidEmail(values.email)) {
      setError("email", "Informe um e-mail válido.");
      valid = false;
    }

    if (!values.company) {
      setError("company", "Informe a empresa.");
      valid = false;
    }

    if (values.siteOrInstagram.length < 2) {
      setError("siteOrInstagram", "Informe o site ou Instagram.");
      valid = false;
    }

    if (!valid) {
      const firstError = document.querySelector(".field-error.is-visible");
      const input = firstError?.closest("label")?.querySelector("input");
      if (input) input.focus();
    }

    return valid;
  };

  const validateStepTwo = () => {
    clearErrors();
    let valid = true;

    stepTwoFields.forEach((field) => {
      if (!valueOf(field)) {
        setError(field, "Selecione uma opção.");
        valid = false;
      }
    });

    if (!valid) {
      const firstQuestionError = document.querySelector(".question-card .field-error.is-visible");
      const firstInput = firstQuestionError?.closest(".question-card")?.querySelector("input");
      if (firstInput) firstInput.focus();
    }

    return valid;
  };

  const readableAnswer = (value) => (value === "sim" ? "Sim" : "Não");

  const getUtms = () => {
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

  const normalizeText = (value) =>
    String(value || "")
      .trim()
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");

  const normalizeEmail = (value) => String(value || "").trim().toLowerCase();

  const normalizePhone = (value) => {
    let digits = String(value || "").replace(/\D/g, "");
    if (digits.length === 10 || digits.length === 11) digits = "55" + digits;
    return digits;
  };

  const splitFullName = (fullName) => {
    const parts = normalizeText(fullName).split(/\s+/).filter(Boolean);
    return {
      first_name: parts[0] || "",
      last_name: parts.length > 1 ? parts.slice(1).join(" ") : "",
    };
  };

  const generateEventId = () => {
    if (window.crypto && crypto.randomUUID) return crypto.randomUUID();
    return `lead_${Date.now()}_${Math.random().toString(16).slice(2)}`;
  };

  const buildPayload = () => {
    const eventId = generateEventId();
    return {
      event_id: eventId,
      submitted_at: new Date().toISOString(),
      origin: "Landing page - Diagnóstico de Marketing",
      name: valueOf("name"),
      whatsapp: valueOf("whatsapp"),
      email: valueOf("email"),
      company: valueOf("company"),
      site_or_instagram: valueOf("siteOrInstagram"),
      captures_clients_online: readableAnswer(valueOf("capturesClientsOnline")),
      invests_minimum_2000_marketing: readableAnswer(valueOf("investsMinimumMarketing")),
      produces_positioning_content: readableAnswer(valueOf("producesPositioningContent")),
      has_digital_infrastructure: readableAnswer(valueOf("hasDigitalInfrastructure")),
      hired_marketing_or_performance_services: readableAnswer(valueOf("hiredMarketingServices")),
      ...getUtms(),
    };
  };

  const pushLeadToDataLayer = (payload) => {
    const nameParts = splitFullName(payload.name);
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: "generate_lead",
      event_id: payload.event_id,
      form_id: "diagnostico-popup-form",
      form_name: "Diagnóstico de Marketing",
      page_url: payload.page_url,
      user_data: {
        email: normalizeEmail(payload.email),
        phone: normalizePhone(payload.whatsapp),
        first_name: nameParts.first_name,
        last_name: nameParts.last_name,
      },
      lead_data: {
        company: payload.company,
        site_or_instagram: payload.site_or_instagram,
        captures_clients_online: payload.captures_clients_online,
        invests_minimum_2000_marketing: payload.invests_minimum_2000_marketing,
        produces_positioning_content: payload.produces_positioning_content,
        has_digital_infrastructure: payload.has_digital_infrastructure,
        hired_marketing_or_performance_services: payload.hired_marketing_or_performance_services,
      },
    });
  };

  const setLoading = (loading) => {
    if (!submitButton) return;
    submitButton.disabled = loading;
    submitButton.innerHTML = loading ? '<span class="spinner" aria-hidden="true"></span> Enviando...' : submitButtonDefaultContent;
  };

  const resetForm = () => {
    if (!form) return;
    form.reset();
    clearErrors();
    setStep(1);
  };

  const showSuccess = () => {
    if (!form || !successView) return;
    form.hidden = true;
    successView.hidden = false;
  };

  document.querySelectorAll("[data-open-form]").forEach((button) => {
    button.addEventListener("click", openModal);
  });

  document.querySelectorAll("[data-close-form]").forEach((button) => {
    button.addEventListener("click", closeModal);
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && modal?.classList.contains("is-open")) closeModal();
  });

  if (prevButton) {
    prevButton.addEventListener("click", () => {
      clearErrors();
      setStep(1);
    });
  }

  if (form) {
    [...stepOneFields, ...stepTwoFields].forEach((field) => {
      const fieldElements = form.elements.namedItem(field);
      if (!fieldElements) return;

      if (fieldElements instanceof RadioNodeList) {
        Array.from(fieldElements).forEach((input) => input.addEventListener("change", () => setError(field, "")));
        return;
      }

      fieldElements.addEventListener("input", () => setError(field, ""));
    });

    form.addEventListener("submit", async (event) => {
      event.preventDefault();

      if (activeStep === 1) {
        if (validateStepOne()) setStep(2);
        return;
      }

      if (!validateStepOne() || !validateStepTwo()) return;

      setLoading(true);

      try {
        const payload = buildPayload();
        const response = await fetch(endpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });

        const result = await response.json().catch(() => ({}));
        if (!response.ok) throw new Error(result.message || "Falha ao enviar diagnóstico.");

        pushLeadToDataLayer(payload);
        resetForm();
        showSuccess();
        showToast("Solicitação recebida! Em breve a Tetra entra em contato.");
      } catch (error) {
        showToast(error.message || "Não foi possível enviar sua solicitação. Tente novamente.", "error");
      } finally {
        setLoading(false);
      }
    });

    setStep(1);
  }

  const revealElements = document.querySelectorAll(".reveal");
  const revealElement = (element) => element.classList.add("is-visible");

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            revealElement(entry.target);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );

    revealElements.forEach((element, index) => {
      if (!element.classList.contains("is-visible")) {

        observer.observe(element);
      }
    });
  } else {
    revealElements.forEach(revealElement);
  }

  document.querySelectorAll(".faq-button").forEach((button) => {
    const content = document.getElementById(button.getAttribute("aria-controls"));
    if (!content) return;

    button.addEventListener("click", () => {
      const isOpening = button.getAttribute("aria-expanded") !== "true";

      document.querySelectorAll(".faq-button").forEach((otherButton) => {
        const otherContent = document.getElementById(otherButton.getAttribute("aria-controls"));
        otherButton.setAttribute("aria-expanded", "false");
        if (otherContent) otherContent.hidden = true;
      });

      if (isOpening) {
        button.setAttribute("aria-expanded", "true");
        content.hidden = false;
      }
    });
  });

  const logoTicker = document.querySelector("[data-logo-ticker]");

  if (logoTicker) {
    const track = logoTicker.querySelector(".logo-ticker__track");
    const originalGroup = logoTicker.querySelector(".logo-ticker__group");

    if (track && originalGroup) {
      const clone = originalGroup.cloneNode(true);
      clone.setAttribute("aria-hidden", "true");
      clone.querySelectorAll("img").forEach((img) => img.setAttribute("alt", ""));
      track.appendChild(clone);

      window.requestAnimationFrame(() => {
        logoTicker.classList.add("is-ready");
      });
    }
  }
})();
