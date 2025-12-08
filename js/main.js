document.querySelectorAll('[id^="ano"]').forEach(span => span.textContent = new Date().getFullYear());

// MENU RESPONSIVO
const menuToggle = document.getElementById('menu-toggle');
const menu = document.getElementById('menu');

if (menuToggle && menu) {
  menuToggle.addEventListener('click', () => {
    const expanded = menu.getAttribute('aria-expanded') === 'true';
    menu.setAttribute('aria-expanded', !expanded);
  });
}

// TEMA CLARO/ESCURO (salva em localStorage)
const themeToggle = document.getElementById('theme-toggle');
const preferredTheme = localStorage.getItem('theme') || 'light';
if (preferredTheme === 'dark') document.body.classList.add('dark');

themeToggle && themeToggle.addEventListener('click', () => {
  document.body.classList.toggle('dark');
  const isDark = document.body.classList.contains('dark');
  localStorage.setItem('theme', isDark ? 'dark' : 'light');
});

// VALIDAÇÃO DO FORMULÁRIO DE CONTATO E SIMULAÇÃO DE ENVIO
const form = document.getElementById('contact-form');
const feedback = document.getElementById('feedback');

if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault(); // evita envio real

    const nome = document.getElementById('nome').value.trim();
    const email = document.getElementById('email').value.trim();
    const mensagem = document.getElementById('mensagem').value.trim();

    // Validações básicas
    if (!nome || !email || !mensagem) {
      showFeedback('Por favor, preencha todos os campos.', 'error');
      return;
    }

    // Verifica formato de e-mail
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      showFeedback('Formato de e-mail inválido. Use ex: usuario@dominio.com', 'error');
      return;
    }
    form.reset();
    showFeedback('Mensagem enviada com sucesso!', 'success');
  });
}

function showFeedback(message, type) {
  if (!feedback) return;
  feedback.textContent = message;
  feedback.style.padding = '0.7rem';
  feedback.style.borderRadius = '6px';
  feedback.style.marginTop = '1rem';
  if (type === 'success') {
    feedback.style.background = '#dff0d8';
    feedback.style.color = '#2b6f2b';
  } else {
    feedback.style.background = '#f8d7da';
    feedback.style.color = '#772029';
  }

  // Remove depois de 5s
  setTimeout(() => {
    feedback.textContent = '';
    feedback.style.padding = '';
    feedback.style.background = '';
  }, 5000);
}