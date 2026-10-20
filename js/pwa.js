// pwa.js — registers the service worker and shows an "Install app" button
(function () {
  // 1. Service worker (auto-updates)
  if ('serviceWorker' in navigator) {
    var hadController = !!navigator.serviceWorker.controller;
    var reloading = false;

    // When a new version takes over, reload once so the customer sees it right away.
    navigator.serviceWorker.addEventListener('controllerchange', function () {
      if (!hadController || reloading) return;
      // Don't interrupt someone who is on the checkout page
      var pay = document.getElementById('paymentPage');
      if (pay && pay.style.display === 'block') return;
      reloading = true;
      window.location.reload();
    });

    window.addEventListener('load', function () {
      navigator.serviceWorker.register('./sw.js', { updateViaCache: 'none' })
        .then(function (reg) {
          // Check for a new version whenever the app is opened again from the home screen
          document.addEventListener('visibilitychange', function () {
            if (document.visibilityState === 'visible') reg.update();
          });
          setInterval(function () { reg.update(); }, 30 * 60 * 1000);
        })
        .catch(function (err) { console.warn('Service worker registration failed:', err); });
    });
  }

  var isStandalone = window.matchMedia('(display-mode: standalone)').matches ||
                     window.navigator.standalone === true;
  if (isStandalone) document.documentElement.classList.add('is-app');

  // 2. Install button: always visible in the browser (hidden only inside the installed app)
  var deferredPrompt = null;
  var ua = navigator.userAgent;
  var isIOS     = /iphone|ipad|ipod/i.test(ua) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
  var isAndroid = /android/i.test(ua);
  var isMobile  = isIOS || isAndroid;
  var isEdge    = /edg\//i.test(ua);
  var isFirefox = /firefox|fxios/i.test(ua);
  var isSamsung = /samsungbrowser/i.test(ua);
  var isSafari  = /safari/i.test(ua) && !/chrome|crios|fxios|edg|android/i.test(ua);
  var inAppBrowser = /fban|fbav|instagram|whatsapp|line\//i.test(ua);

  window.addEventListener('beforeinstallprompt', function (e) {
    e.preventDefault();           // keep it, and show it when the customer taps our button
    deferredPrompt = e;
  });
  window.addEventListener('appinstalled', function () { deferredPrompt = null; });

  function steps() {
    if (inAppBrowser) return [
      'This page is open inside another app (WhatsApp, Instagram, etc.).',
      'Tap the <b>⋮</b> or <b>⋯</b> menu and choose <b>Open in browser</b> (Chrome or Safari).',
      'Then tap <b>Install app</b> again.'
    ];
    if (isIOS && !isSafari) return [
      'On iPhone, apps install from <b>Safari</b>.',
      'Copy this page link and open it in <b>Safari</b>.',
      'Tap <b>Share</b> <i class="far fa-share-from-square"></i>, then <b>Add to Home Screen</b>.'
    ];
    if (isIOS) return [
      'Tap the <b>Share</b> button <i class="far fa-share-from-square"></i> at the bottom of Safari.',
      'Scroll down and tap <b>Add to Home Screen</b>.',
      'Tap <b>Add</b>. FreshFish appears on your home screen.'
    ];
    if (isAndroid && isSamsung) return [
      'Tap the <b>≡</b> menu at the bottom of Samsung Internet.',
      'Tap <b>Add page to</b>, then <b>Home screen</b>.',
      'Tap <b>Add</b>.'
    ];
    if (isAndroid) return [
      'Tap the <b>⋮</b> menu at the top right of Chrome.',
      'Tap <b>Install app</b> or <b>Add to Home screen</b>.',
      'Tap <b>Install</b>. FreshFish appears with your other apps.'
    ];
    if (isFirefox) return [
      'Firefox on computer cannot install apps.',
      'Open this page in <b>Chrome</b> or <b>Edge</b> and click <b>Install app</b> again.',
      'Or press <b>Ctrl + D</b> to bookmark it.'
    ];
    if (isSafari) return [
      'In the Safari menu bar, click <b>File</b>.',
      'Click <b>Add to Dock</b>.',
      'Click <b>Add</b>. FreshFish opens like a normal Mac app.'
    ];
    return [
      'Click the install icon <i class="far fa-square-plus"></i> at the right end of the address bar.',
      'Or open the <b>' + (isEdge ? '⋯' : '⋮') + '</b> menu → <b>' + (isEdge ? 'Apps → Install this site as an app' : 'Cast, save and share → Install page as app') + '</b>.',
      'Click <b>Install</b>. FreshFish opens in its own window.'
    ];
  }

  function showInstallHelp() {
    var list = document.getElementById('installSteps');
    var modal = document.getElementById('installModal');
    if (!list || !modal) return;
    list.innerHTML = steps().map(function (t) { return '<li>' + t + '</li>'; }).join('');
    document.getElementById('installDevice').textContent =
      isIOS ? 'iPhone / iPad' : isAndroid ? 'Android' : 'Computer';
    document.getElementById('overlay').style.display = 'block';
    modal.style.display = 'block';
  }
  window.closeInstallHelp = function () {
    document.getElementById('installModal').style.display = 'none';
    document.getElementById('overlay').style.display = 'none';
  };

  window.installApp = function () {
    if (deferredPrompt) {               // Chrome / Edge / Android: real install popup
      deferredPrompt.prompt();
      deferredPrompt.userChoice.finally(function () { deferredPrompt = null; });
      return;
    }
    showInstallHelp();                  // everyone else: step-by-step help
  };

  document.addEventListener('DOMContentLoaded', function () {
    var wrap = document.querySelector('.hd-install');
    if (wrap) wrap.style.display = isStandalone ? 'none' : '';
  });
})();
