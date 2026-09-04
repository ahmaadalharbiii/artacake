/**
 * سكربت مشترك لموقع أرتا كيك
 * يشمل: تتبع النقرات على الواتساب، قائمة الجوال، تمييز الرابط النشط، وبناء بطاقات الأسعار
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
      window.gtag('event', 'whatsapp_click', { send_to: 'G-7SE7Q16HK9' });
    }
  } catch (e) {}
}

// خطوة بناء بطاقات الأسعار المشتركة من ARTA_MENU
function renderMenuCards(containerOrId, sectionIds) {
  var container = typeof containerOrId === 'string' ? document.getElementById(containerOrId) : containerOrId;
  if (!container || !window.ARTA_MENU) return;

  var sections = window.ARTA_MENU;
  if (sectionIds && sectionIds.length > 0) {
    sections = [];
    sectionIds.forEach(function(id) {
      var found = window.ARTA_MENU.find(function(s) { return s.id === id; });
      if (found) sections.push(found);
    });
  }

  var html = '';
  sections.forEach(function(section) {
    var sectionIdAttr = section.id ? ' id="' + section.id + '"' : '';
    var iconHtml = section.icon ? '<svg class="icon icon-menu-title" aria-hidden="true"><use href="/assets/icons.svg#i-' + section.icon + '"></use></svg> ' : '';
    html += '<article class="menu-card"' + sectionIdAttr + '>';
    html += '<div class="menu-card-header">';
    if (section.subtitle) {
      html += '<div>';
      html += '<h3 class="menu-card-title">' + iconHtml + section.title + '</h3>';
      html += '<span class="menu-card-subtitle">' + section.subtitle + '</span>';
      html += '</div>';
    } else {
      html += '<h3 class="menu-card-title">' + iconHtml + section.title + '</h3>';
    }
    html += '</div>';

    html += '<ul class="menu-items-list">';
    section.items.forEach(function(item) {
      html += '<li class="menu-item">';
      html += '<div class="menu-item-details">';
      html += '<span class="menu-item-name">' + item.name + '</span>';
      if (item.desc) {
        html += '<span class="menu-item-desc">' + item.desc + '</span>';
      }
      html += '</div>';
      if (item.price !== undefined && item.price !== null) {
        html += '<div class="menu-item-price-box">';
        html += '<span class="menu-item-price-val">' + item.price + '</span>';
        html += '<span class="menu-item-price-unit">ريال</span>';
        html += '</div>';
      }
      html += '</li>';
    });
    html += '</ul>';

    if (section.id === 'gifts-flowers') {
      html += '<div class="flower-action-box">';
      html += '<a href="https://wa.me/966590059848?text=%D9%85%D8%B1%D8%AD%D8%A8%D8%A7%D9%8B%20%F0%9F%8C%B8%20%D8%A3%D8%A8%D8%BA%D9%89%20%D8%A3%D8%B3%D8%AA%D9%81%D8%B3%D8%B1%20%D8%B9%D9%86%20%D8%AA%D9%86%D8%B3%D9%8A%D9%82%20%D9%88%D8%B1%D8%AF%20%D9%88%D9%87%D8%AF%D8%A7%D9%8A%D8%A7" class="wa-flower-btn track-wa-click" target="_blank" rel="noopener noreferrer">';
      html += '<svg class="wa-icon" viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.36 3.45 16.86L2.05 22L7.3 20.62C8.75 21.41 10.38 21.83 12.04 21.83C17.5 21.83 21.95 17.38 21.95 11.92C21.95 9.27 20.92 6.78 19.05 4.91C17.18 3.03 14.69 2 12.04 2M12.05 3.67C14.25 3.67 16.31 4.53 17.87 6.09C19.42 7.65 20.28 9.72 20.28 11.92C20.28 16.46 16.58 20.15 12.04 20.15C10.56 20.15 9.11 19.76 7.85 19L7.55 18.83L4.43 19.65L5.26 16.61L5.06 16.29C4.24 15 3.8 13.47 3.8 11.91C3.81 7.37 7.5 3.67 12.05 3.67M9.05 7.42C8.86 7.42 8.56 7.49 8.3 7.78C8.04 8.07 7.31 8.76 7.31 10.17C7.31 11.58 8.34 12.94 8.48 13.13C8.63 13.32 10.45 16.12 13.24 17.32C13.9 17.61 14.42 17.78 14.82 17.91C15.48 18.12 16.09 18.09 16.56 18.02C17.09 17.94 18.18 17.36 18.41 16.71C18.64 16.07 18.64 15.52 18.57 15.4C18.5 15.29 18.31 15.22 18.03 15.08C17.74 14.94 16.34 14.25 16.08 14.15C15.82 14.06 15.63 14.01 15.44 14.3C15.25 14.59 14.71 15.22 14.55 15.4C14.39 15.59 14.23 15.61 13.94 15.47C13.66 15.33 12.74 15.03 11.64 14.05C10.79 13.29 10.21 12.35 10.05 12.07C9.88 11.78 10.03 11.63 10.18 11.49C10.31 11.36 10.46 11.16 10.61 10.99C10.75 10.82 10.8 10.69 10.89 10.51C10.99 10.32 10.94 10.16 10.87 10.02C10.8 9.88 10.23 8.48 10 7.92C9.77 7.37 9.54 7.45 9.37 7.44C9.21 7.43 9.05 7.42 9.05 7.42Z"/></svg>';
      html += '<span>استفسري عن الورد والهدايا عبر واتساب</span>';
      html += '</a>';
      html += '</div>';
    }

    html += '</article>';
  });

  if (sections.length > 0) {
    html += '<p class="menu-note">الأسعار تشمل ضريبة القيمة المضافة ولا تشمل الإضافات · عدد الأشخاص تقديري ويعتمد على حجم التقطيع</p>';
  }

  container.innerHTML = html;
  // الأقسام تُبنى بعد تحميل الصفحة، فالرابط /order/#daily يحتاج تمريراً يدوياً بعد البناء
  if (window.location.hash) {
    var target = document.getElementById(window.location.hash.slice(1));
    if (target) target.scrollIntoView();
  }

  // ربط أحداث التتبع للأزرار المنشأة حديثاً
  var newWaBtns = container.querySelectorAll('.track-wa-click');
  newWaBtns.forEach(function(btn) {
    btn.addEventListener('click', handleWhatsAppClick);
  });
}

window.renderMenuCards = renderMenuCards;

document.addEventListener('DOMContentLoaded', function() {
  // 1. ربط أزرار الواتساب الثابتة والتفاعلية بالتتبع
  var waButtons = document.querySelectorAll('.track-wa-click');
  waButtons.forEach(function(btn) {
    btn.addEventListener('click', handleWhatsAppClick);
  });

  // 2. قائمة الجوال
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

  // 4. بناء بطاقات الأسعار إذا وُجدت الحاوية وARTA_MENU
  var menuContainers = document.querySelectorAll('#menu-cards-container, [data-menu-container]');
  menuContainers.forEach(function(c) {
    var sectionsAttr = c.getAttribute('data-sections');
    var sectionIds = sectionsAttr ? sectionsAttr.split(',').map(function(s) { return s.trim(); }).filter(Boolean) : null;
    renderMenuCards(c, sectionIds);
  });
});
