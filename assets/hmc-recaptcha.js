(function () {
  const SCRIPT_ID = 'hmc-recaptcha-api';
  const GOOGLE_FIELDS = ['g-recaptcha-response', 'recaptcha-v3-token'];

  function getWidgets() {
    return document.querySelectorAll('[data-hmc-recaptcha][data-sitekey]');
  }

  function showError(widget, message) {
    const errorEl = widget.querySelector('.hmc-recaptcha__error');
    if (errorEl) {
      errorEl.hidden = false;
      errorEl.textContent = message;
    }
    if (window.showToast) window.showToast(message, 'error');
  }

  function clearError(widget) {
    const errorEl = widget.querySelector('.hmc-recaptcha__error');
    if (!errorEl) return;
    errorEl.hidden = true;
    errorEl.textContent = '';
  }

  function stripGoogleFields(form) {
    for (const name of GOOGLE_FIELDS) {
      const fields = form.querySelectorAll('[name="' + name + '"]');
      for (const field of fields) {
        field.removeAttribute('name');
        field.disabled = true;
      }
    }
  }

  function isSolved(widget) {
    const widgetId = widget.dataset.widgetId;
    if (widgetId == null || !window.grecaptcha) return false;
    const response = window.grecaptcha.getResponse(widgetId);
    return Boolean(response);
  }

  function renderWidgets() {
    if (!window.grecaptcha || typeof window.grecaptcha.render !== 'function') return;

    const widgets = getWidgets();
    for (const widget of widgets) {
      if (widget.dataset.widgetId) continue;

      const holder = widget.querySelector('.g-recaptcha');
      if (!holder) continue;

      const widgetId = window.grecaptcha.render(holder, {
        sitekey: widget.dataset.sitekey,
        theme: widget.dataset.theme === 'dark' ? 'dark' : 'light',
        callback: function () {
          clearError(widget);
        },
      });
      widget.dataset.widgetId = String(widgetId);
    }
  }

  function loadGoogleScript() {
    if (document.getElementById(SCRIPT_ID)) return;

    window.hmcOnRecaptchaLoad = renderWidgets;

    const script = document.createElement('script');
    script.id = SCRIPT_ID;
    script.src = 'https://www.google.com/recaptcha/api.js?onload=hmcOnRecaptchaLoad&render=explicit';
    script.async = true;
    script.defer = true;
    document.head.appendChild(script);
  }

  function onSubmit(event) {
    const form = event.target;
    if (!form || form.tagName !== 'FORM') return;

    const widget = form.querySelector('[data-hmc-recaptcha]');
    if (!widget) return;

    if (!isSolved(widget)) {
      event.preventDefault();
      event.stopImmediatePropagation();
      showError(widget, widget.dataset.error || 'Please verify you are not a robot.');
      widget.scrollIntoView({ block: 'center', behavior: 'smooth' });
      return;
    }

    stripGoogleFields(form);
  }

  function init() {
    if (!getWidgets().length) return;
    loadGoogleScript();
    if (window.grecaptcha && typeof window.grecaptcha.render === 'function') {
      renderWidgets();
    }
    document.addEventListener('submit', onSubmit, true);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
