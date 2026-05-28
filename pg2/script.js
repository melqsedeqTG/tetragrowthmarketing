(() => {
  const endpoint = document.body.dataset.leadEndpoint || "/api/diagnostico";
  const modal = document.getElementById("lead-modal");
  const form = document.getElementById("diagnostico-popup-form");
  const toastRegion = document.querySelector(".toast-region");
  const currentYearTargets = document.querySelectorAll("[data-current-year]");

  const state = {
    step: 1,
    loading: false,
    values: {
      capturesClientsOnline: "",
      investsMinimumMarketing: "",
      producesPositioningContent: "",
      hasDigitalInfrastructure: "",
      hiredMarketingServices: "",
    },
  };

  const labels = {
    name: "Informe seu nome",
    whatsapp: "WhatsApp inválido",
    email: "E-mail inválido",
    company: "Informe a empresa",
    siteOrInstagram: "Informe o site ou Instagram",
    capturesClientsOnline: "Selecione uma opção",
    investsMinimumMarketing: "Selecione uma opção",
    producesPositioningContent: "Selecione uma opção",
    hasDigitalInfrastructure: "Selecione uma opção",
    hiredMarketingServices: "Selecione uma opção",
  };

  currentYearTargets.forEach((target) => {
    target.textContent = String(new Date().getFullYear());
  });

  const showToast = (title, message, type = "success") => {
    if (!toastRegion) return;

    const toast = document.createElement("div");
    toast.className = `toast ${type}`;
    toast.innerHTML = `<strong>${title}</strong><span>${message}</span>`;
    toastRegion.append(toast);

    window.setTimeout(() => {
      toast.style.opacity = "0";
      toast.style.transform = "translateY(12px)";
      window.setTimeout(() => toast.remove(), 220);
    }, 4200);
  };

  const clearErrors = () => {
    document.querySelectorAll("[data-error-for]").forEach((node) => {
      node.textContent = "";
    });
  };

  const setErrors = (errors) => {
    clearErrors();
    Object.entries(errors).forEach(([field, message]) => {
      const target = document.querySelector(`[data-error-for="${field}"]`);
      if (target) target.textContent = message;
    });
  };

  const setStep = (step) => {
    state.step = step;
    const firstPanel = document.querySelector('[data-step-panel="1"]');
    const secondPanel = document.querySelector('[data-step-panel="2"]');
    const firstActions = document.querySelector('[data-step-actions="1"]');
    const secondActions = document.querySelector('[data-step-actions="2"]');
    const stepNumber = document.querySelector("[data-step-number]");
    const progress = document.querySelector("[data-progress]");
    const title = document.querySelector("[data-form-title]");
    const description = document.querySelector("[data-form-description]");

    if (firstPanel) firstPanel.hidden = step !== 1;
    if (secondPanel) secondPanel.hidden = step !== 2;
    if (firstActions) firstActions.hidden = step !== 1;
    if (secondActions) secondActions.hidden = step !== 2;
    if (stepNumber) stepNumber.textContent = String(step);
    if (progress) progress.style.width = step === 1 ? "50%" : "100%";

    if (title) title.textContent = step === 1 ? "Solicite seu diagnóstico" : "Qualifique seu cenário";
    if (description) {
      description.textContent =
        step === 1
          ? "Preencha seus dados para iniciar a análise."
          : "Responda às perguntas abaixo para avaliarmos se existe fit para uma reunião estratégica.";
    }
  };

  const openModal = () => {
    if (!modal) return;
    modal.classList.add("is-open");
    modal.setAttribute("aria-hidden", "false");
    document.body.classList.add("modal-open");
    window.setTimeout(() => {
      const firstInput = modal.querySelector("input, button");
      if (firstInput) firstInput.focus();
    }, 50);
  };

  const closeModal = () => {
    if (!modal) return;
    modal.classList.remove("is-open");
    modal.setAttribute("aria-hidden", "true");
    document.body.classList.remove("modal-open");
  };

  document.querySelectorAll("[data-open-form]").forEach((button) => {
    button.addEventListener("click", openModal);
  });

  document.querySelectorAll("[data-close-form]").forEach((button) => {
    button.addEventListener("click", closeModal);
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && modal?.classList.contains("is-open")) {
      closeModal();
    }
  });

  const getInputValue = (name) => {
    const input = form?.elements.namedItem(name);
    return input && "value" in input ? input.value.trim() : "";
  };

  const validateStepOne = () => {
    const errors = {};
    const name = getInputValue("name");
    const whatsapp = getInputValue("whatsapp");
    const email = getInputValue("email");
    const company = getInputValue("company");
    const siteOrInstagram = getInputValue("siteOrInstagram");

    if (name.length < 2) errors.name = labels.name;
    if (whatsapp.length < 8 || !/^[0-9()+\-\s]+$/.test(whatsapp)) errors.whatsapp = labels.whatsapp;
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.email = labels.email;
    if (!company) errors.company = labels.company;
    if (siteOrInstagram.length < 2) errors.siteOrInstagram = labels.siteOrInstagram;

    return errors;
  };

  const validateStepTwo = () => {
    const errors = {};
    Object.keys(state.values).forEach((key) => {
      if (!state.values[key]) errors[key] = labels[key];
    });
    return errors;
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

  const setLoading = (loading) => {
    state.loading = loading;
    const button = document.querySelector("[data-submit-button]");
    if (!button) return;
    button.disabled = loading;
    button.innerHTML = loading
      ? '<span class="spinner" aria-hidden="true"></span> Enviando'
      : 'Solicitar meu diagnóstico <span class="icon-arrow" aria-hidden="true"></span>';
  };

  const resetForm = () => {
    form?.reset();
    Object.keys(state.values).forEach((key) => {
      state.values[key] = "";
    });
    document.querySelectorAll(".choice-grid button").forEach((button) => {
      button.classList.remove("is-selected");
      button.setAttribute("aria-pressed", "false");
    });
    clearErrors();
    setStep(1);
  };

  const showSuccess = () => {
    const success = document.querySelector("[data-form-success]");
    const content = document.querySelector("[data-form-content]");
    if (success) success.hidden = false;
    if (content) content.hidden = true;
  };

  document.querySelectorAll("[data-question]").forEach((question) => {
    const field = question.dataset.question;
    question.querySelectorAll("[data-option]").forEach((button) => {
      button.setAttribute("aria-pressed", "false");
      button.addEventListener("click", () => {
        state.values[field] = button.dataset.option;
        question.querySelectorAll("[data-option]").forEach((optionButton) => {
          const selected = optionButton === button;
          optionButton.classList.toggle("is-selected", selected);
          optionButton.setAttribute("aria-pressed", selected ? "true" : "false");
        });
        const error = document.querySelector(`[data-error-for="${field}"]`);
        if (error) error.textContent = "";
      });
    });
  });

  document.querySelector("[data-back-step]")?.addEventListener("click", () => {
    clearErrors();
    setStep(1);
  });

  form?.addEventListener("submit", async (event) => {
    event.preventDefault();
    if (state.loading) return;

    if (state.step === 1) {
      const errors = validateStepOne();
      if (Object.keys(errors).length) {
        setErrors(errors);
        return;
      }
      clearErrors();
      setStep(2);
      return;
    }

    const stepOneErrors = validateStepOne();
    const stepTwoErrors = validateStepTwo();
    const errors = { ...stepOneErrors, ...stepTwoErrors };

    if (Object.keys(errors).length) {
      setErrors(errors);
      return;
    }

    const payload = {
      submitted_at: new Date().toISOString(),
      origin: "Landing page - Diagnóstico de Marketing",
      name: getInputValue("name"),
      whatsapp: getInputValue("whatsapp"),
      email: getInputValue("email"),
      company: getInputValue("company"),
      site_or_instagram: getInputValue("siteOrInstagram"),
      captures_clients_online: readableAnswer(state.values.capturesClientsOnline),
      invests_minimum_2000_marketing: readableAnswer(state.values.investsMinimumMarketing),
      produces_positioning_content: readableAnswer(state.values.producesPositioningContent),
      has_digital_infrastructure: readableAnswer(state.values.hasDigitalInfrastructure),
      hired_marketing_or_performance_services: readableAnswer(state.values.hiredMarketingServices),
      ...getUtms(),
    };

    setLoading(true);

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) throw new Error("Falha ao enviar diagnóstico");

      showSuccess();
      resetForm();
      showToast("Solicitação recebida", "Em breve a Tetra entra em contato.");
    } catch {
      showToast("Erro no envio", "Não foi possível enviar sua solicitação. Tente novamente.", "error");
    } finally {
      setLoading(false);
    }
  });

  document.querySelectorAll("[data-accordion]").forEach((accordion) => {
    accordion.querySelectorAll(".faq-item button").forEach((button) => {
      button.addEventListener("click", () => {
        const item = button.closest(".faq-item");
        const shouldOpen = !item.classList.contains("is-open");

        accordion.querySelectorAll(".faq-item").forEach((faqItem) => {
          faqItem.classList.remove("is-open");
          faqItem.querySelector("button")?.setAttribute("aria-expanded", "false");
        });

        if (shouldOpen) {
          item.classList.add("is-open");
          button.setAttribute("aria-expanded", "true");
        }
      });
    });
  });

  const revealTargets = document.querySelectorAll(".reveal");

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 },
    );

    revealTargets.forEach((target) => observer.observe(target));
  } else {
    revealTargets.forEach((target) => target.classList.add("is-visible"));
  }
})();
