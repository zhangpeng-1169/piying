/**
 * 全局导航栏 · 汉堡菜单 + 下拉菜单交互
 * 适配手机/平板：展开折叠菜单、锁定滚动、ESC 关闭
 */
(function () {
  const menuToggle = document.getElementById('menuToggle');
  const navLinks = document.getElementById('navLinks');

  if (!menuToggle || !navLinks) return;

  const MOBILE_BREAKPOINT = 1024;

  function closeMenu() {
    navLinks.classList.remove('open');
    menuToggle.classList.remove('active');
    menuToggle.setAttribute('aria-expanded', 'false');
    document.body.classList.remove('menu-open');
    navLinks.querySelectorAll('.nav-dropdown.open').forEach(function (item) {
      item.classList.remove('open');
    });
  }

  function openMenu() {
    navLinks.classList.add('open');
    menuToggle.classList.add('active');
    menuToggle.setAttribute('aria-expanded', 'true');
    document.body.classList.add('menu-open');
  }

  menuToggle.addEventListener('click', function () {
    if (navLinks.classList.contains('open')) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  /* 移动端：点击「非遗概述」展开子菜单 */
  navLinks.querySelectorAll('.nav-dropdown > a').forEach(function (trigger) {
    trigger.addEventListener('click', function (e) {
      if (window.innerWidth > MOBILE_BREAKPOINT) return;
      const parent = trigger.parentElement;
      const isOpen = parent.classList.contains('open');
      navLinks.querySelectorAll('.nav-dropdown.open').forEach(function (item) {
        item.classList.remove('open');
      });
      if (!isOpen) {
        e.preventDefault();
        parent.classList.add('open');
      }
    });
  });

  navLinks.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', function () {
      if (link.parentElement.classList.contains('nav-dropdown') &&
          window.innerWidth <= MOBILE_BREAKPOINT &&
          !link.closest('.dropdown-menu')) {
        return;
      }
      closeMenu();
    });
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
      closeMenu();
    }
  });

  window.addEventListener('resize', function () {
    if (window.innerWidth > MOBILE_BREAKPOINT) {
      closeMenu();
    }
  });
})();
