// Intersection Observer to trigger reveal animations only once when elements enter the viewport

document.addEventListener('DOMContentLoaded', () => {
    const elementsToReveal = [
      'h1',
      'h2',
      'h4',
      'a',
      'p',
      '.contact__contaniner',
      '.service__card',
      '.portfolio__item',
      'form',
      '.footer__grid',
      '.footer__card',
      '.footer__bottom'
    ];
  
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('reveal-visible');
          obs.unobserve(entry.target); // run only once per element
        }
      });
    }, {
      threshold: 0.15
    });
  
    elementsToReveal.forEach(selector => {
      document.querySelectorAll(selector).forEach(el => {
        el.classList.add('reveal');
        observer.observe(el);
      });
    });
  });
  