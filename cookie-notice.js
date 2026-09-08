(function () {
  'use strict';
  const KEY = 'grillranch-cookie-notice-v1';
  const LIFETIME = 180 * 24 * 60 * 60 * 1000;
  const script = document.currentScript;
  const base = new URL('.', script.src);
  const privacy = new URL(base.pathname.includes('/grillranch-vorschau/') ? 'datenschutz.html' : 'datenschutz', base).href;
  function remembered() {
    try {
      const saved = JSON.parse(localStorage.getItem(KEY));
      return saved && saved.version === 1 && saved.until > Date.now() && saved.until <= Date.now() + LIFETIME;
    } catch (_) { return false; }
  }
  function init() {
    if (document.getElementById('cookie-notice')) return;
    const panel = document.createElement('section');
    panel.id = 'cookie-notice';
    panel.className = 'cookie-notice';
    panel.setAttribute('role', 'region');
    panel.setAttribute('aria-label', 'Cookies und Datenschutz');
    panel.hidden = true;
    panel.innerHTML = '<div class="cookie-notice-copy"><p class="cookie-kicker">IHRE PRIVATSPHÄRE</p><h2>Ein kurzer Cookie-Hinweis.</h2><p>Diese Vorschau verwendet keine Analyse- oder Werbe-Cookies. Wenn Sie diesen Hinweis bestätigen, merken wir uns das auf Ihrem Gerät für 180 Tage.</p><details><summary>Welche Daten werden gespeichert?</summary><div class="cookie-details"><p><strong>Nur Ihre Bestätigung:</strong> Wir speichern sie im lokalen Browserspeicher unter „grillranch-cookie-notice-v1“. Sie wird nicht an uns gesendet und nicht zur Wiedererkennung für Werbung verwendet.</p><p>Das Kontaktformular übermittelt Ihre Angaben erst beim Absenden an FormSubmit. Dort kann eine Spamprüfung durch Google reCAPTCHA folgen. Karten und der virtuelle Rundgang öffnen sich erst nach einem Klick auf den jeweiligen externen Link.</p></div></details></div><div class="cookie-notice-actions"><button type="button" class="cookie-confirm">Verstanden</button><a class="cookie-privacy">Datenschutz lesen</a></div>';
    panel.querySelector('.cookie-privacy').href = privacy;
    document.body.appendChild(panel);
    let trigger = null;
    function show(button) {
      trigger = button || null;
      panel.hidden = false;
      document.body.classList.add('cookie-notice-visible');
      if (button) panel.querySelector('.cookie-confirm').focus();
    }
    function hide() {
      panel.hidden = true;
      document.body.classList.remove('cookie-notice-visible');
      if (trigger) trigger.focus();
    }
    panel.querySelector('.cookie-confirm').addEventListener('click', function () {
      try { localStorage.setItem(KEY, JSON.stringify({version: 1, until: Date.now() + LIFETIME})); } catch (_) {}
      hide();
    });
    const footer = document.querySelector('.ranch-footer nav');
    if (footer) {
      const button = document.createElement('button');
      button.type = 'button';
      button.className = 'cookie-reopen';
      button.textContent = 'Cookie-Hinweis';
      button.setAttribute('aria-controls', 'cookie-notice');
      button.addEventListener('click', function () { show(button); });
      footer.appendChild(button);
    }
    if (!remembered()) show();
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init, {once:true});
  else init();
})();
