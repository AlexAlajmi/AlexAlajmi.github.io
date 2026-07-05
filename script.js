document.addEventListener('click', function(e) {
  const stamp = document.createElement('div');
  stamp.className = 'paw-stamp';
  stamp.style.left = e.clientX + 'px';
  stamp.style.top = e.clientY + 'px';
  stamp.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 40 40">
    <ellipse cx="7"  cy="14" rx="5"  ry="6"   fill="#c0c0c0"/>
    <ellipse cx="15" cy="9"  rx="5"  ry="6"   fill="#c0c0c0"/>
    <ellipse cx="25" cy="9"  rx="5"  ry="6"   fill="#c0c0c0"/>
    <ellipse cx="33" cy="14" rx="5"  ry="6"   fill="#c0c0c0"/>
    <ellipse cx="20" cy="29" rx="13" ry="10"  fill="#c0c0c0"/>
    <ellipse cx="7"  cy="14" rx="3"  ry="3.5" fill="#c084fc"/>
    <ellipse cx="15" cy="9"  rx="3"  ry="3.5" fill="#c084fc"/>
    <ellipse cx="25" cy="9"  rx="3"  ry="3.5" fill="#c084fc"/>
    <ellipse cx="33" cy="14" rx="3"  ry="3.5" fill="#c084fc"/>
    <ellipse cx="20" cy="29" rx="8"  ry="6.5" fill="#c084fc"/>
  </svg>`;
  document.body.appendChild(stamp);

  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      stamp.style.opacity = '0';
    });
  });

  setTimeout(() => stamp.remove(), 900);
});

const button = document.getElementById('aboutBtn');
const ripple = document.getElementById('ripple');
const landing = document.getElementById('landing');
const portfolio = document.getElementById('portfolio');

button.addEventListener('click', function(e) {
  const x = e.clientX;
  const y = e.clientY;
  const size = Math.max(window.innerWidth, window.innerHeight) * 3;

  ripple.classList.remove('expand');
  ripple.style.width = size + 'px';
  ripple.style.height = size + 'px';
  ripple.style.left = (x - size / 2) + 'px';
  ripple.style.top = (y - size / 2) + 'px';

  void ripple.offsetWidth;

  ripple.classList.add('expand');

  for (let i = 0; i < 3; i++) {
    setTimeout(() => {
      const ring = document.createElement('div');
      ring.className = 'shockwave-ring';
      ring.style.left = (x - 50) + 'px';
      ring.style.top = (y - 50) + 'px';
      document.body.appendChild(ring);
      setTimeout(() => ring.remove(), 800);
    }, i * 100);
  }

  // After ripple covers the screen, swap to portfolio
  setTimeout(() => {
    landing.style.display = 'none';
    ripple.style.display = 'none';
    portfolio.style.display = 'flex';
    document.body.classList.add('portfolio-active');
    initNavHighlight();
  }, 1000);
});

function initNavHighlight() {
  const sections = document.querySelectorAll('.section');
  const navLinks = document.querySelectorAll('.nav-link');

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          navLinks.forEach((link) => link.classList.remove('active'));
          const active = document.querySelector(`.nav-link[href="#${entry.target.id}"]`);
          if (active) active.classList.add('active');
        }
      });
    },
    { threshold: 0.4 }
  );

  sections.forEach((section) => observer.observe(section));
}
