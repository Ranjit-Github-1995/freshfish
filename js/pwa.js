// pwa.js — registers the service worker and shows an "Install app" button
(function () {
  // 1. Service worker
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', function () {
      navigator.serviceWorker.register('./sw.js').catch(function (err) {
        console.warn('Service worker registration failed:', err);
      });
    });
  }

  var isStandalone = window.matchMedia('(display-mode: standalone)').matches ||
                     window.navigator.standalone === true;
  if (isStandalone) document.documentElement.classList.add('is-app');

  // 2. Install button (Android / desktop Chrome)
  var deferredPrompt = null;
  function installBtn() { return document.getElementById('installAppBtn'); }

  window.addEventListener('beforeinstallprompt', function (e) {
    e.preventDefault();
    deferredPrompt = e;
    var btn = installBtn();
    if (btn && !isStandalone) btn.parentElement.style.display = '';
  });

  window.installApp = function () {
    // iPhone has no install prompt; tell the customer how to do it manually
    var isIOS = /iphone|ipad|ipod/i.test(navigator.userAgent);
    if (!deferredPrompt) {
      if (isIOS) alert('To install: tap the Share button, then "Add to Home Screen".');
      return;
    }
    deferredPrompt.prompt();
    deferredPrompt.userChoice.finally(function () {
      deferredPrompt = null;
      var btn = installBtn();
      if (btn) btn.parentElement.style.display = 'none';
    });
  };

  window.addEventListener('appinstalled', function () {
    var btn = installBtn();
    if (btn) btn.parentElement.style.display = 'none';
  });

  // iPhone in Safari: show the button so customers can see the instructions
  document.addEventListener('DOMContentLoaded', function () {
    var isIOS = /iphone|ipad|ipod/i.test(navigator.userAgent);
    var btn = installBtn();
    if (btn && isIOS && !isStandalone) btn.parentElement.style.display = '';
  });
})();
