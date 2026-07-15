/* =========================================================
   Cognify - main.js
   Shared behavior used across every page: theme, drawer nav,
   tabs, accordions, toasts, and simple form validation
   ========================================================= */

/* ---------- Theme ---------- */
function setTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem('cognify-theme', theme);
}

(function () {
  var saved = localStorage.getItem('cognify-theme');
  setTheme(saved ? saved : 'light');
})();

function toggleTheme() {
  var current = document.documentElement.getAttribute('data-theme');
  setTheme(current === 'dark' ? 'light' : 'dark');
}

/* ---------- Toast ---------- */
function showToast(message) {
  var toast = document.querySelector('.toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.className = 'toast';
    document.body.appendChild(toast);
  }
  toast.innerHTML = '<i class="fa-solid fa-circle-check"></i> ' + message;
  toast.classList.add('show');
  setTimeout(function () { toast.classList.remove('show'); }, 2800);
}

/* ---------- Form validation helpers ---------- */
function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function showFieldError(input, message) {
  var group = input.closest('.form-group');
  var error = group ? group.querySelector('.form-error') : null;
  if (error) {
    error.textContent = message;
    error.classList.add('show');
  }
  input.style.borderColor = '#e11d48';
}

function clearFieldError(input) {
  var group = input.closest('.form-group');
  var error = group ? group.querySelector('.form-error') : null;
  if (error) error.classList.remove('show');
  input.style.borderColor = '';
}

document.addEventListener('DOMContentLoaded', function () {

  /* Theme toggle buttons */
  document.querySelectorAll('.theme-toggle').forEach(function (btn) {
    btn.addEventListener('click', toggleTheme);
  });

  /* Side drawer nav */
  var drawer = document.getElementById('drawer');
  var overlay = document.getElementById('overlay');
  var menuBtn = document.getElementById('menuBtn');
  var drawerClose = document.getElementById('drawerClose');

  function openDrawer() {
    drawer.classList.add('open');
    overlay.classList.add('show');
  }
  function closeDrawer() {
    drawer.classList.remove('open');
    overlay.classList.remove('show');
  }

  if (menuBtn) menuBtn.addEventListener('click', openDrawer);
  if (drawerClose) drawerClose.addEventListener('click', closeDrawer);
  if (overlay) overlay.addEventListener('click', closeDrawer);

  /* Mark the current page as active in the drawer */
  var page = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.drawer-links a').forEach(function (link) {
    if (link.getAttribute('href') === page) link.classList.add('active');
    else link.classList.remove('active');
  });

  /* Tabs (course details page) */
  document.querySelectorAll('.tab-btn').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var target = btn.getAttribute('data-tab');
      document.querySelectorAll('.tab-btn').forEach(function (b) { b.classList.remove('active'); });
      document.querySelectorAll('.tab-panel').forEach(function (p) { p.classList.remove('active'); });
      btn.classList.add('active');
      document.getElementById(target).classList.add('active');
    });
  });

  /* Accordion (curriculum list) */
  document.querySelectorAll('.accordion-head').forEach(function (head) {
    head.addEventListener('click', function () {
      head.parentElement.classList.toggle('open');
    });
  });

  /* Category chip filter (visual only) */
  document.querySelectorAll('.chip-row').forEach(function (row) {
    row.querySelectorAll('.chip').forEach(function (chip) {
      chip.addEventListener('click', function () {
        row.querySelectorAll('.chip').forEach(function (c) { c.classList.remove('active'); });
        chip.classList.add('active');
      });
    });
  });

  /* Role selector (register page) */
  document.querySelectorAll('.role-option').forEach(function (opt) {
    opt.addEventListener('click', function () {
      opt.parentElement.querySelectorAll('.role-option').forEach(function (o) { o.classList.remove('active'); });
      opt.classList.add('active');
      opt.querySelector('input').checked = true;
    });
  });

  /* Modal open / close */
  document.querySelectorAll('[data-open-modal]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      document.getElementById(btn.getAttribute('data-open-modal')).classList.add('show');
    });
  });
  document.querySelectorAll('[data-close-modal]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      btn.closest('.modal-bg').classList.remove('show');
    });
  });

  /* Buttons that just show a toast (submit assignment, download cert, etc.) */
  document.querySelectorAll('[data-toast]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      showToast(btn.getAttribute('data-toast'));
    });
  });

  /* Show / hide password */
  document.querySelectorAll('.toggle-pw').forEach(function (icon) {
    icon.addEventListener('click', function () {
      var input = icon.previousElementSibling;
      if (input.type === 'password') {
        input.type = 'text';
        icon.classList.replace('fa-eye', 'fa-eye-slash');
      } else {
        input.type = 'password';
        icon.classList.replace('fa-eye-slash', 'fa-eye');
      }
    });
  });

  /* Delete course row (instructor dashboard) */
  document.querySelectorAll('.delete-course').forEach(function (btn) {
    btn.addEventListener('click', function () {
      if (confirm('Remove this course?')) {
        btn.closest('.manage-row').remove();
        showToast('Course removed');
      }
    });
  });

  /* Footer year */
  document.querySelectorAll('.year').forEach(function (el) {
    el.textContent = new Date().getFullYear();
  });

  /* ---------- Login form ---------- */
  var loginForm = document.getElementById('loginForm');
  if (loginForm) {
    loginForm.addEventListener('submit', function (e) {
      e.preventDefault();
      var email = document.getElementById('email');
      var password = document.getElementById('password');
      var valid = true;

      if (!isValidEmail(email.value)) {
        showFieldError(email, 'Enter a valid email address');
        valid = false;
      } else {
        clearFieldError(email);
      }

      if (password.value.length < 6) {
        showFieldError(password, 'Password must be at least 6 characters');
        valid = false;
      } else {
        clearFieldError(password);
      }

      if (valid) {
        showToast('Login successful. Redirecting...');
        setTimeout(function () { window.location.href = 'student-dashboard.html'; }, 1000);
      }
    });
  }

  /* ---------- Register form ---------- */
  var registerForm = document.getElementById('registerForm');
  if (registerForm) {
    registerForm.addEventListener('submit', function (e) {
      e.preventDefault();
      var name = document.getElementById('fullname');
      var email = document.getElementById('regEmail');
      var password = document.getElementById('regPassword');
      var confirmPw = document.getElementById('regConfirm');
      var terms = document.getElementById('agreeTerms');
      var valid = true;

      if (name.value.trim() === '') {
        showFieldError(name, 'Please enter your full name');
        valid = false;
      } else {
        clearFieldError(name);
      }

      if (!isValidEmail(email.value)) {
        showFieldError(email, 'Enter a valid email address');
        valid = false;
      } else {
        clearFieldError(email);
      }

      if (password.value.length < 6) {
        showFieldError(password, 'Password must be at least 6 characters');
        valid = false;
      } else {
        clearFieldError(password);
      }

      if (confirmPw.value !== password.value) {
        showFieldError(confirmPw, 'Passwords do not match');
        valid = false;
      } else {
        clearFieldError(confirmPw);
      }

      if (!terms.checked) {
        showToast('Please agree to the Terms to continue');
        valid = false;
      }

      if (valid) {
        showToast('Account created. Redirecting...');
        setTimeout(function () { window.location.href = 'student-dashboard.html'; }, 1000);
      }
    });
  }

  /* ---------- Create course form (instructor dashboard) ---------- */
  var courseForm = document.getElementById('createCourseForm');
  if (courseForm) {
    courseForm.addEventListener('submit', function (e) {
      e.preventDefault();
      showToast('Course saved successfully');
      courseForm.reset();
    });
  }

  /* ---------- Edit profile form ---------- */
  var profileForm = document.getElementById('editProfileForm');
  if (profileForm) {
    profileForm.addEventListener('submit', function (e) {
      e.preventDefault();
      showToast('Profile updated successfully');
      document.getElementById('editProfileModal').classList.remove('show');
    });
  }

  /* ---------- Animate progress rings on load ---------- */
  document.querySelectorAll('.ring .fg').forEach(function (circle) {
    var pct = parseFloat(circle.getAttribute('data-pct')) || 0;
    var r = circle.r.baseVal.value;
    var c = 2 * Math.PI * r;
    circle.style.strokeDasharray = c;
    circle.style.strokeDashoffset = c - (pct / 100) * c;
  });

});
