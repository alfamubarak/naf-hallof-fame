/* The user's original intro.mp4 plays ONLY behind the welcome page, with local offline fallback. */
(() => {
  'use strict';
  const welcome = document.getElementById('welcomeScreen');
  const video = document.getElementById('welcomeBackgroundVideo');
  const button = document.getElementById('welcomeVideoToggle');
  const label = button?.querySelector('.welcome-video-toggle-label');
  const symbol = button?.querySelector('.welcome-video-toggle-icon');
  const modal = document.getElementById('modal');
  if (!welcome || !video || !button) return;
  let userPaused = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  video.muted = true;
  video.volume = 0;
  video.loop = true;
  video.playsInline = true;
  function updateButton() {
    const playing = !video.paused && !video.ended;
    if (label) label.textContent = playing ? 'PAUSE BACKGROUND' : 'PLAY BACKGROUND';
    if (symbol) symbol.textContent = playing ? 'Ⅱ' : '▶';
    button.setAttribute('aria-label', playing ? 'Pause background video' : 'Play background video');
    button.setAttribute('aria-pressed', String(!playing));
  }
  function syncPlayback() {
    const visible = !welcome.hidden && welcome.style.display !== 'none';
    const modalOpen = modal && !modal.hidden;
    if (!visible || userPaused || modalOpen) {
      video.pause();
      updateButton();
      return;
    }
    const pending = video.play();
    if (pending && typeof pending.catch === 'function') pending.catch(() => updateButton());
  }
  video.addEventListener('loadeddata', () => video.classList.add('is-ready'));
  video.addEventListener('playing', () => { video.classList.add('is-ready'); updateButton(); });
  video.addEventListener('pause', updateButton);
  video.addEventListener('error', () => { video.classList.remove('is-ready'); button.hidden = true; });
  button.addEventListener('click', () => { userPaused = !video.paused ? true : false; syncPlayback(); });
  new MutationObserver(syncPlayback).observe(welcome, { attributes:true, attributeFilter:['hidden','style'] });
  if (modal) new MutationObserver(syncPlayback).observe(modal, { attributes:true, attributeFilter:['hidden'] });
  window.addEventListener('museum:enter', syncPlayback);
  window.addEventListener('museum:reset', () => { userPaused = window.matchMedia('(prefers-reduced-motion: reduce)').matches; requestAnimationFrame(syncPlayback); });
  document.addEventListener('visibilitychange', () => { if (document.hidden) video.pause(); else syncPlayback(); });
  // A native photographic fallback remains visible until the local video can render.
  updateButton();
  syncPlayback();
})();
