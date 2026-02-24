/**
 * MorseGrid — Retell AI Voice Widget
 *
 * This module injects a floating "Talk to our AI" button on every page and
 * wires up the embedded call card on the homepage.
 *
 * ⚠️  IMPORTANT — API KEY SECURITY
 * The RETELL_API_KEY below is used client-side, which means it is visible in
 * your page source.  For a public production site you should route the
 * create-web-call request through a tiny serverless function (Netlify/Vercel
 * Functions, Cloudflare Workers, etc.) so the key never leaves your back-end.
 * For internal or low-risk demos, keeping it here is fine.
 *
 * HOW TO ACTIVATE
 * 1. Paste your Retell API key into RETELL_API_KEY below (Dashboard → API Keys).
 * 2. The agent ID is already pre-filled.
 * 3. Save.  The widget will appear on every page automatically.
 */

import { RetellWebClient } from 'https://esm.sh/retell-client-js-sdk';

// ── Configuration ────────────────────────────────────────────────────────────
const RETELL_API_KEY = 'YOUR_RETELL_API_KEY'; // ← Paste your key here
const AGENT_ID       = 'agent_2301b693666ba3bb18c32423ab';
// ─────────────────────────────────────────────────────────────────────────────

const retellClient = new RetellWebClient();
let callActive      = false;

// ── Floating button markup ───────────────────────────────────────────────────
const floatingHTML = `
<div class="mg-voice-float" id="mgVoiceFloat" title="Talk to our AI">
  <div class="mg-voice-pulse-ring" id="mgPulseRing"></div>
  <button class="mg-voice-fab" id="mgVoiceFab" aria-label="Talk to our AI">
    <!-- Idle: microphone -->
    <span class="mg-fab-icon" id="mgIconIdle">
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor"
           stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/>
        <path d="M19 10v2a7 7 0 0 1-14 0v-2"/>
        <line x1="12" y1="19" x2="12" y2="23"/>
        <line x1="8"  y1="23" x2="16" y2="23"/>
      </svg>
    </span>
    <!-- Loading: spinner -->
    <span class="mg-fab-icon mg-hidden" id="mgIconLoad">
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor"
           stroke-width="2.5" stroke-linecap="round">
        <path d="M21 12a9 9 0 1 1-6.219-8.56" class="mg-spin-path"/>
      </svg>
    </span>
    <!-- Active: stop square -->
    <span class="mg-fab-icon mg-hidden" id="mgIconActive">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <rect x="5" y="5" width="14" height="14" rx="2"/>
      </svg>
    </span>
  </button>
  <div class="mg-voice-label" id="mgVoiceLabel">Talk to our AI</div>
</div>`;

document.body.insertAdjacentHTML('beforeend', floatingHTML);

const fab         = document.getElementById('mgVoiceFab');
const floatWrap   = document.getElementById('mgVoiceFloat');
const label       = document.getElementById('mgVoiceLabel');
const iconIdle    = document.getElementById('mgIconIdle');
const iconLoad    = document.getElementById('mgIconLoad');
const iconActive  = document.getElementById('mgIconActive');

// ── State management ─────────────────────────────────────────────────────────
function setState(state) {
  iconIdle.classList.add('mg-hidden');
  iconLoad.classList.add('mg-hidden');
  iconActive.classList.add('mg-hidden');
  floatWrap.classList.remove('is-loading', 'is-active');

  if (state === 'idle') {
    iconIdle.classList.remove('mg-hidden');
    floatWrap.classList.remove('is-active');
    label.textContent = 'Talk to our AI';
  } else if (state === 'loading') {
    iconLoad.classList.remove('mg-hidden');
    floatWrap.classList.add('is-loading');
    label.textContent = 'Connecting…';
  } else if (state === 'active') {
    iconActive.classList.remove('mg-hidden');
    floatWrap.classList.add('is-active');
    label.textContent = 'End call';
  }

  syncEmbedCard(state);
}

// ── Call logic ───────────────────────────────────────────────────────────────
async function startCall() {
  if (callActive) return;
  setState('loading');
  try {
    const res = await fetch('https://api.retellai.com/v2/create-web-call', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${RETELL_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ agent_id: AGENT_ID }),
    });
    if (!res.ok) {
      const err = await res.text();
      throw new Error(`Retell API ${res.status}: ${err}`);
    }
    const data = await res.json();
    await retellClient.startCall({ accessToken: data.access_token });
    callActive = true;
  } catch (err) {
    console.error('[MorseGrid Voice] Failed to start call:', err);
    setState('idle');
  }
}

function stopCall() {
  retellClient.stopCall();
  callActive = false;
  setState('idle');
}

// ── SDK events ───────────────────────────────────────────────────────────────
retellClient.on('call_started', () => setState('active'));
retellClient.on('call_ended',   () => { callActive = false; setState('idle'); });
retellClient.on('error',        (err) => { console.error('[Retell]', err); stopCall(); });

// ── Floating button click ─────────────────────────────────────────────────────
fab.addEventListener('click', () => {
  callActive ? stopCall() : startCall();
});

// ── Embedded card sync ────────────────────────────────────────────────────────
function syncEmbedCard(state) {
  const embedBtn    = document.getElementById('mgVoiceBtnEmbed');
  const embedStatus = document.getElementById('mgVoiceStatusEmbed');
  const embedWaves  = document.getElementById('mgEmbedWaves');
  if (!embedBtn) return;

  embedBtn.disabled = false;
  embedBtn.classList.remove('is-active');

  if (state === 'idle') {
    embedBtn.textContent            = 'Start conversation';
    if (embedStatus) embedStatus.textContent = 'Ready to talk';
    if (embedWaves)  embedWaves.classList.remove('is-live');
  } else if (state === 'loading') {
    embedBtn.textContent            = 'Connecting…';
    embedBtn.disabled               = true;
    if (embedStatus) embedStatus.textContent = 'Connecting…';
  } else if (state === 'active') {
    embedBtn.textContent            = 'End call';
    embedBtn.classList.add('is-active');
    if (embedStatus) embedStatus.textContent = '● Live';
    if (embedWaves)  embedWaves.classList.add('is-live');
  }
}

// ── Delegated click for embedded button ───────────────────────────────────────
document.addEventListener('click', (e) => {
  if (e.target.closest('#mgVoiceBtnEmbed')) {
    callActive ? stopCall() : startCall();
  }
});
