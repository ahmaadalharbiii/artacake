/**
 * سكربت مشترك لموقع أرتا كيك
 * يشمل: تتبع النقرات على الواتساب، قائمة الجوال، وتمييز الرابط النشط
 */

// خطوة تتبع مشتركة واحدة لجميع أزرار واتساب
function handleWhatsAppClick() {
  try {
    if (typeof window.ttq === 'object' && typeof window.ttq.track === 'function') {
      window.ttq.track('Contact', { content_name: 'بدء محادثة واتساب' });
    }
  } catch (e) {}

  try {
    if (typeof window.gtag === 'function') {
      window.gtag('event', 'conversion', { send_to: 'AW-18423214890/OJ8ECJf73O0cEKrm79BE' });
    }
  } catch (e) {}
}

document.addEventListener('DOMContentLoaded', function() {
  // 1. ربط أزرار الواتساب الثابتة والتفاعلية بالتتبع
  var waButtons = document.querySelectorAll('.track-wa-click');
  waButtons.forEach(function(btn) {
    btn.addEventListener('click', handleWhatsAppClick);
  });

  // 2. قائمة الجوال ☰
  var toggleBtn = document.querySelector('.site-nav-toggle');
  var navMenu = document.querySelector('.site-nav-menu');

  if (toggleBtn && navMenu) {
    toggleBtn.addEventListener('click', function(e) {
      e.stopPropagation();
      var isExpanded = toggleBtn.getAttribute('aria-expanded') === 'true';
      toggleBtn.setAttribute('aria-expanded', String(!isExpanded));
      navMenu.classList.toggle('is-open');
    });

    // إغلاق عند النقر خارج القائمة
    document.addEventListener('click', function(e) {
      if (navMenu.classList.contains('is-open')) {
        if (!navMenu.contains(e.target) && !toggleBtn.contains(e.target)) {
          navMenu.classList.remove('is-open');
          toggleBtn.setAttribute('aria-expanded', 'false');
          toggleBtn.focus();
        }
      }
    });

    // إغلاق عند الضغط على زر الهروب Escape
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape' && navMenu.classList.contains('is-open')) {
        navMenu.classList.remove('is-open');
        toggleBtn.setAttribute('aria-expanded', 'false');
        toggleBtn.focus();
      }
    });
  }

  // 3. تمييز الرابط النشط في الترويسة
  var path = window.location.pathname;
  var normalizedPath = path.replace(/\/index\.html$/, '');
  if (normalizedPath === '' || normalizedPath === '/') {
    normalizedPath = '/';
  } else if (!normalizedPath.endsWith('/')) {
    normalizedPath += '/';
  }

  var navLinks = document.querySelectorAll('.site-nav-link');
  navLinks.forEach(function(link) {
    var href = link.getAttribute('href');
    if (!href) return;

    var linkPath = href.replace(/\/index\.html$/, '');
    if (linkPath === '' || linkPath === '/') {
      linkPath = '/';
    } else if (!linkPath.endsWith('/')) {
      linkPath += '/';
    }

    if (linkPath === '/' && normalizedPath === '/') {
      link.classList.add('is-active');
      link.setAttribute('aria-current', 'page');
    } else if (linkPath !== '/' && normalizedPath === linkPath) {
      link.classList.add('is-active');
      link.setAttribute('aria-current', 'page');
    }
  });
});
