// Navigation with active state
function navigateTo(sectionId) {
  const section = document.getElementById(sectionId);
  if (section) {
    section.scrollIntoView({ behavior: 'smooth' });
    updateActiveNav(sectionId);
  }
}

function updateActiveNav(sectionId) {
  document.querySelectorAll('nav a').forEach(link => {
    link.classList.remove('active');
  });
  const activeLink = document.querySelector(`nav a[href="#${sectionId}"]`);
  if (activeLink) {
    activeLink.classList.add('active');
  }
}

// Update active nav on scroll
window.addEventListener('scroll', () => {
  const sections = document.querySelectorAll('section[id]');
  let current = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    if (pageYOffset >= sectionTop - 200) {
      current = section.getAttribute('id');
    }
  });
  updateActiveNav(current);
});

// Theme toggle
const themeToggle = document.getElementById('themeToggle');
const html = document.documentElement;

const savedTheme = localStorage.getItem('theme') || 'light';
html.setAttribute('data-theme', savedTheme);
updateThemeIcon(savedTheme);

themeToggle.addEventListener('click', () => {
  const currentTheme = html.getAttribute('data-theme');
  const newTheme = currentTheme === 'light' ? 'dark' : 'light';
  html.setAttribute('data-theme', newTheme);
  localStorage.setItem('theme', newTheme);
  updateThemeIcon(newTheme);
});

function updateThemeIcon(theme) {
  themeToggle.textContent = theme === 'light' ? '🌙' : '☀️';
}

// Copy email
const copyEmailBtn = document.getElementById('copyEmailBtn');
copyEmailBtn.addEventListener('click', () => {
  const email = 'vigneshrethinakumar@gmail.com';
  navigator.clipboard.writeText(email).then(() => {
    const originalText = copyEmailBtn.textContent;
    copyEmailBtn.textContent = '✅ Copied!';
    setTimeout(() => {
      copyEmailBtn.textContent = originalText;
    }, 2000);
  });
});

// Project filter
function filterProjects(category) {
  const projects = document.querySelectorAll('[data-category]');
  const buttons = document.querySelectorAll('.filter-btn');

  buttons.forEach(btn => btn.classList.remove('active'));
  event.target.classList.add('active');

  projects.forEach(project => {
    if (category === 'all' || project.getAttribute('data-category') === category) {
      project.style.display = 'block';
    } else {
      project.style.display = 'none';
    }
  });
}

// Contact form submission
const contactForm = document.getElementById('contactForm');
contactForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const message = document.getElementById('message').value;

  if (name && email && message) {
    alert(`Thank you, ${name}! Your message has been received.\n\nI will get back to you at ${email} soon.`);
    contactForm.reset();
  } else {
    alert('Please fill in all the fields!');
  }
});