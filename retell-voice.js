/**
 * MorseGrid — Retell AI Voice Widget
 * Floating button (all pages) + embedded card (homepage)
 *
 * The Retell API key lives server-side in the Vercel env var RETELL_API_KEY.
 * Nothing sensitive is exposed here.
 *
 * How it connects to your agent:
 *  1. User clicks button → browser calls /api/create-web-call (our Vercel function)
 *  2. Vercel function calls Retell API with your AGENT_ID + API key
 *  3. Retell returns an access token
 *  4. Browser uses that token + the Retell WebRTC SDK to open a live voice call
 *     directly with your published agent (agent_2301b693666ba3bb18c32423ab)
 */

import { RetellWebClient } from 'https://esm.sh/retell-client-js-sdk@latest';

const AGENT_ID     = 'agent_058504bce8784462547b533058';
const CALL_TIMEOUT = 20000; // ms

// ── Inject floating button ────────────────────────────────────────────────────
document.body.insertAdjacentHTML('beforeend', `
<div class="mg-voice-float" id="mgVoiceFloat" title="Talk to our AI">
  <div class="mg-voice-pulse-ring"></div>
  <button class="mg-voice-fab" id="mgVoiceFab" aria-label="Talk to our AI">
    <span class="mg-fab-icon" id="mgIconIdle">
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/>
        <path d="M19 10v2a7 7 0 0 1-14 0v-2"/>
        <line x1="12" y1="19" x2="12" y2="23"/>
        <line x1="8"  y1="23" x2="16" y2="23"/>
      </svg>
    </span>
    <span class="mg-fab-icon mg-hidden" id="mgIconLoad">
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round">
        <path d="M21 12a9 9 0 1 1-6.219-8.56" class="mg-spin-path"/>
      </svg>
    </span>
    <span class="mg-fab-icon mg-hidden" id="mgIconActive">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <rect x="5" y="5" width="14" height="14" rx="2"/>
      </svg>
    </span>
  </button>
  <div class="mg-voice-label" id="mgVoiceLabel">Talk to our AI</div>
</div>
<div id="mgVoiceToast" style="
  display:none;position:fixed;bottom:100px;right:28px;
  background:#1e293b;color:#f8fafc;font-family:var(--sans,sans-serif);
  font-size:13px;padding:10px 16px;border-radius:10px;
  box-shadow:0 4px 20px rgba(0,0,0,0.3);z-index:10000;max-width:260px;
  border-left:3px solid #ef4444;"></div>`);

const fab        = document.getElementById('mgVoiceFab');
const floatWrap  = document.getElementById('mgVoiceFloat');
const label      = document.getElementById('mgVoiceLabel');
const iconIdle   = document.getElementById('mgIconIdle');
const iconLoad   = document.getElementById('mgIconLoad');
const iconActive = document.getElementById('mgIconActive');
const toast      = document.getElementById('mgVoiceToast');

let callActive   = false;
const retellClient = new RetellWebClient();

// ── Wire up SDK events immediately ────────────────────────────────────────────
retellClient.on('call_started', () => { callActive = true;  setState('active'); });
retellClient.on('call_ended',   () => { callActive = false; setState('idle');   });
retellClient.on('error', (err) => {
  console.error('[Retell SDK error]', err);
  callActive = false;
  showToast('Call error — please try again.');
  setState('idle');
});

// ── Toast helper ──────────────────────────────────────────────────────────────
function showToast(msg) {
  toast.textContent = msg;
  toast.style.display = 'block';
  clearTimeout(showToast._timer);
  showToast._timer = setTimeout(() => { toast.style.display = 'none'; }, 4000);
}

// ── UI state ──────────────────────────────────────────────────────────────────
function setState(state) {
  iconIdle.classList.add('mg-hidden');
  iconLoad.classList.add('mg-hidden');
  iconActive.classList.add('mg-hidden');
  floatWrap.classList.remove('is-loading', 'is-active');

  if (state === 'idle') {
    iconIdle.classList.remove('mg-hidden');
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

// ── Start / stop ──────────────────────────────────────────────────────────────
async function startCall() {
  if (callActive) return;
  setState('loading');

  const timer = setTimeout(() => {
    if (!callActive) {
      showToast('Connection timed out. Check your internet and try again.');
      setState('idle');
    }
  }, CALL_TIMEOUT);

  try {
    console.log('[MorseGrid Voice] Requesting access token…');
    const res = await fetch('/api/create-web-call', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ agent_id: AGENT_ID }),
    });

    if (!res.ok) {
      const body = await res.text().catch(() => String(res.status));
      throw new Error(`Server error ${res.status}: ${body}`);
    }

    const data = await res.json();
    console.log('[MorseGrid Voice] Got access token, starting call…');

    if (!data.access_token) throw new Error('No access token in server response.');

    await retellClient.startCall({ accessToken: data.access_token });
    // call_started event will fire and setState('active')
  } catch (err) {
    console.error('[MorseGrid Voice] startCall failed:', err);
    clearTimeout(timer);
    showToast(err.message || 'Could not start call. Please try again.');
    setState('idle');
    return;
  }

  clearTimeout(timer);
}

function stopCall() {
  try { retellClient.stopCall(); } catch (_) {}
  callActive = false;
  setState('idle');
}

fab.addEventListener('click', () => {
  callActive ? stopCall() : startCall();
});

// ── Sync homepage embedded card ───────────────────────────────────────────────
function syncEmbedCard(state) {
  const embedBtn    = document.getElementById('mgVoiceBtnEmbed');
  const embedStatus = document.getElementById('mgVoiceStatusEmbed');
  const embedWaves  = document.getElementById('mgEmbedWaves');
  if (!embedBtn) return;

  embedBtn.disabled = false;
  embedBtn.classList.remove('is-active');

  if (state === 'idle') {
    embedBtn.textContent = 'Start conversation';
    if (embedStatus) embedStatus.textContent = 'Ready to talk';
    if (embedWaves)  embedWaves.classList.remove('is-live');
  } else if (state === 'loading') {
    embedBtn.textContent = 'Connecting…';
    embedBtn.disabled    = true;
    if (embedStatus) embedStatus.textContent = 'Connecting…';
  } else if (state === 'active') {
    embedBtn.textContent = 'End call';
    embedBtn.classList.add('is-active');
    if (embedStatus) embedStatus.textContent = '● Live';
    if (embedWaves)  embedWaves.classList.add('is-live');
  }
}

document.addEventListener('click', (e) => {
  if (e.target.closest('#mgVoiceBtnEmbed')) {
    callActive ? stopCall() : startCall();
  }
});
