/* ============================================
   VALIDATION.JS - Form validation (5+ rules)
   Name / Email / Phone / Budget / Description
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
  initContactForm();
  initCharCounter();
});

/* ---------- Validation Helpers ---------- */
const validators = {
  // 1. Name: not empty, min 3 chars, only alphabets + spaces
  name(v) {
    if (!v.trim()) return 'Name is required';
    if (v.trim().length < 3) return 'Name must be at least 3 characters';
    if (!/^[A-Za-z\s.'-]+$/.test(v)) return 'Name can only contain letters';
    return '';
  },
  // 2. Email format
  email(v) {
    if (!v.trim()) return 'Email is required';
    const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!re.test(v)) return 'Please enter a valid email address';
    return '';
  },
  // 3. Phone: exactly 10 digits
  phone(v) {
    if (!v.trim()) return 'Phone number is required';
    const cleaned = v.replace(/\D/g, '');
    if (!/^\d+$/.test(cleaned)) return 'Phone can only contain numbers';
    if (cleaned.length !== 10) return 'Phone must be exactly 10 digits';
    return '';
  },
  // 4. Budget: must be > 1000
  budget(v) {
    if (!v.trim()) return 'Please provide an estimated budget';
    const n = parseFloat(v.replace(/[^\d.]/g, ''));
    if (isNaN(n)) return 'Budget must be a number';
    if (n <= 1000) return 'Budget must be greater than ₹1,000';
    return '';
  },
  // 5. Description: min 30 chars
  description(v) {
    if (!v.trim()) return 'Project description is required';
    if (v.trim().length < 30) return `Please add at least ${30 - v.trim().length} more character(s)`;
    return '';
  },
  // Optional: subject
  subject(v) {
    if (!v.trim()) return 'Subject is required';
    if (v.trim().length < 4) return 'Subject must be at least 4 characters';
    return '';
  }
};

function showError(input, msg) {
  input.classList.add('error');
  const errEl = input.parentElement.querySelector('.form-error');
  if (errEl) {
    errEl.textContent = '⚠ ' + msg;
    errEl.classList.add('show');
  }
}

function clearError(input) {
  input.classList.remove('error');
  const errEl = input.parentElement.querySelector('.form-error');
  if (errEl) errEl.classList.remove('show');
}

/* ---------- Contact Form Init ---------- */
function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  const fields = {
    name: form.querySelector('[name="name"]'),
    email: form.querySelector('[name="email"]'),
    phone: form.querySelector('[name="phone"]'),
    budget: form.querySelector('[name="budget"]'),
    description: form.querySelector('[name="description"]'),
    subject: form.querySelector('[name="subject"]')
  };

  // Live validation on blur + clear on input
  Object.keys(fields).forEach(key => {
    const f = fields[key];
    if (!f || !validators[key]) return;
    f.addEventListener('blur', () => {
      const msg = validators[key](f.value);
      if (msg) showError(f, msg); else clearError(f);
    });
    f.addEventListener('input', () => clearError(f));
  });

  // Phone: digits only as the user types
  if (fields.phone) {
    fields.phone.addEventListener('input', () => {
      fields.phone.value = fields.phone.value.replace(/\D/g, '').slice(0, 10);
    });
  }

  // Submit with anti-duplicate guard
  let submitting = false;
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (submitting) return;

    let firstError = null;
    Object.keys(fields).forEach(key => {
      const f = fields[key];
      if (!f || !validators[key]) return;
      const msg = validators[key](f.value);
      if (msg) {
        showError(f, msg);
        if (!firstError) firstError = f;
      } else {
        clearError(f);
      }
    });

    if (firstError) {
      firstError.focus();
      if (window.showToast) window.showToast('Please fix the highlighted errors', 'error');
      return;
    }

    submitting = true;
    const btn = form.querySelector('button[type="submit"]');
    const original = btn.innerHTML;
    btn.innerHTML = '<span class="spinner"></span> Sending...';
    btn.disabled = true;

    // Simulate API request
    setTimeout(() => {
      form.reset();
      btn.innerHTML = original;
      btn.disabled = false;
      submitting = false;
      // Reset char counter
      const counter = document.querySelector('.char-counter');
      if (counter) counter.textContent = '0 / 500 characters';
      // Show success modal
      const modal = document.getElementById('success-modal');
      if (modal && typeof modal.showModal === 'function') modal.showModal();
      else if (window.showToast) window.showToast('🎉 Your inquiry has been sent! I will respond within 12 hours.', 'success');
    }, 1400);
  });

  // Modal close
  const modal = document.getElementById('success-modal');
  if (modal) {
    modal.querySelectorAll('[data-close]').forEach(btn => {
      btn.addEventListener('click', () => modal.close());
    });
  }
}

/* ---------- Character Counter ---------- */
function initCharCounter() {
  const textarea = document.querySelector('[name="description"]');
  const counter = document.querySelector('.char-counter');
  if (!textarea || !counter) return;
  const max = parseInt(textarea.getAttribute('maxlength') || '500', 10);
  const update = () => {
    const len = textarea.value.length;
    counter.textContent = `${len} / ${max} characters`;
    counter.style.color = len < 30 ? 'var(--accent-warning)' : len >= max - 20 ? 'var(--accent-error)' : 'var(--text-muted)';
  };
  textarea.addEventListener('input', update);
  update();
}

/* CSS for spinner injected */
const style = document.createElement('style');
style.textContent = `
  .spinner {
    display: inline-block;
    width: 14px; height: 14px;
    border: 2px solid rgba(255,255,255,0.3);
    border-top-color: white;
    border-radius: 50%;
    animation: spin 0.7s linear infinite;
    vertical-align: middle;
    margin-right: 6px;
  }
  @keyframes spin { to { transform: rotate(360deg); } }
`;
document.head.appendChild(style);
