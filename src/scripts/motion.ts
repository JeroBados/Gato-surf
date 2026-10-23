import Lenis from 'lenis';

const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function reveal() {
  const nodes = document.querySelectorAll<HTMLElement>('[data-reveal]');
  if (reduce || !('IntersectionObserver' in window)) {
    nodes.forEach((n) => n.classList.add('is-in'));
    return;
  }
  const io = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        (entry.target as HTMLElement).classList.add('is-in');
        io.unobserve(entry.target);
      }
    },
    { threshold: 0.14, rootMargin: '0px 0px -6% 0px' },
  );
  nodes.forEach((n) => io.observe(n));
}

function headerChrome(y: number) {
  const header = document.querySelector<HTMLElement>('[data-header]');
  header?.classList.toggle('is-scrolled', y > 12);
}

function parallax() {
  if (reduce) return;
  document.querySelectorAll<HTMLElement>('[data-parallax]').forEach((el) => {
    const img = el.querySelector('img');
    if (!img) return;
    const rect = el.getBoundingClientRect();
    const mid = rect.top + rect.height / 2 - window.innerHeight / 2;
    img.style.transform = `scale(1.08) translate3d(0, ${mid * -0.08}px, 0)`;
  });
}

if (reduce) {
  headerChrome(window.scrollY);
} else {
  const lenis = new Lenis({
    duration: 1.4,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
    wheelMultiplier: 0.82,
    touchMultiplier: 1,
    anchors: { offset: -72, duration: 1.35 },
    autoRaf: true,
  });

  document.documentElement.classList.add('has-lenis');
  lenis.on('scroll', ({ scroll }) => {
    headerChrome(scroll);
    parallax();
  });
  headerChrome(window.scrollY);
  parallax();
}

reveal();
