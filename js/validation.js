/* ==========================================================================
   Project 8 — validation.js
   Client-side form validation (no backend — UI feedback only)
   ========================================================================== */

(function () {

  const patterns = {
    email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  };

  function setError(input, message) {
    const wrap = input.closest('.form-group');
    if (!wrap) return;
    const errEl = wrap.querySelector('.field-error');
    wrap.querySelector('.input-wrap')?.classList.add('error');
    if (errEl) {
      errEl.querySelector('span') ? (errEl.querySelector('span').textContent = message) : (errEl.textContent = message);
      errEl.classList.add('show');
    }
  }

  function clearError(input) {
    const wrap = input.closest('.form-group');
    if (!wrap) return;
    wrap.querySelector('.input-wrap')?.classList.remove('error');
    wrap.querySelector('.field-error')?.classList.remove('show');
  }

  function validateField(input) {
    const value = input.value.trim();
    const type = input.getAttribute('data-validate');

    if (input.hasAttribute('required') && !value) {
      setError(input, 'This field is required');
      return false;
    }
    if (type === 'email' && value && !patterns.email.test(value)) {
      setError(input, 'Enter a valid email address');
      return false;
    }
    if (type === 'password' && value && value.length < 8) {
      setError(input, 'Password must be at least 8 characters');
      return false;
    }
    if (type === 'confirm-password' && value) {
      const original = document.querySelector('[data-validate="password"]');
      if (original && value !== original.value) {
        setError(input, 'Passwords do not match');
        return false;
      }
    }
    clearError(input);
    return true;
  }

  document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('form[data-validate-form]').forEach((form) => {
      const fields = form.querySelectorAll('[data-validate]');

      fields.forEach((input) => {
        input.addEventListener('blur', () => validateField(input));
        input.addEventListener('input', () => {
          if (input.closest('.form-group')?.querySelector('.field-error.show')) validateField(input);
          if (input.getAttribute('data-validate') === 'password') updateStrength(input);
        });
      });

      form.addEventListener('submit', (e) => {
        e.preventDefault();
        let valid = true;
        fields.forEach((input) => { if (!validateField(input)) valid = false; });

        const terms = form.querySelector('#agreeTerms');
        if (terms && !terms.checked) {
          window.showToast('Please agree to the Terms & Privacy Policy', 'fa-triangle-exclamation');
          valid = false;
        }

        if (valid) {
          window.showToast('Success! Redirecting…', 'fa-circle-check');
          setTimeout(() => {
            const redirect = form.getAttribute('data-redirect');
            if (redirect) window.location.href = redirect;
          }, 900);
        }
      });
    });

    /* Role selector (register page) */
    document.querySelectorAll('.role-option').forEach((opt) => {
      opt.addEventListener('click', () => {
        opt.parentElement.querySelectorAll('.role-option').forEach((o) => o.classList.remove('active'));
        opt.classList.add('active');
        const input = opt.querySelector('input');
        if (input) input.checked = true;
      });
    });
  });

  function updateStrength(input) {
    const meter = input.closest('.form-group')?.querySelector('.strength-meter');
    if (!meter) return;
    const value = input.value;
    meter.classList.remove('weak', 'medium', 'strong');
    if (!value) return;
    let score = 0;
    if (value.length >= 8) score++;
    if (/[A-Z]/.test(value) && /[a-z]/.test(value)) score++;
    if (/\d/.test(value) && /[^A-Za-z0-9]/.test(value)) score++;
    if (score <= 1) meter.classList.add('weak');
    else if (score === 2) meter.classList.add('medium');
    else meter.classList.add('strong');
  }

})();
