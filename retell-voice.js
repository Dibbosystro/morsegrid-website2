/**
 * MorseGrid — Retell AI Voice Widget
 * Floating button (all pages) + embedded card (homepage)
 *
 * The Retell API key lives server-side in the Vercel env var RETELL_API_KEY.
 * Nothing sensitive is exposed here.
 */

const AGENT_ID     = 'agent_2301b693666ba3bb18c32423ab';
const CALL_TIMEOUT = 15000; // ms — reset to idle if nothing happens

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
</div>`);

const fab        = document.getElementById('mgVoiceFab');
const floatWrap  = document.getElementById('mgVoiceFloat');
const label      = document.getElementById('mgVoiceLabel');
const iconIdle   = document.getElementById('mgIconIdle');
const iconLoad   = document.getElementById('mgIconLoad');
const iconActive = document.getElementById('mgIconActive');

let callActive   = false;
let retellClient = null;

// ── UI state ──────────────────────────────────────────────────────────────────
function setState(state) {
  iconIdle.classList.add('mg-hidden');
  iconLoad.classList.add('mg-hidden');
  iconActive.classList.add('mg-hidden');
  floatWrap.classList.remove('is-loading', 'is-active');

  if (state === 'idle' || state === 'error') {
    iconIdle.classList.remove('mg-hidden');
    label.textContent = state === 'error' ? 'Try again' : 'Talk to our AI';
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

// ── Load the Retell SDK from CDN (no build step needed) ───────────────────────
async function loadSDK() {
  // Try two CDNs in order — jsdelivr first, esm.sh as fallback
  const urls = [
    'https://cdn.jsdelivr.net/npm/retell-client-js-sdk/+esm',
    'https://esm.sh/retell-client-js-sdk',
  ];
  for (const url of urls) {
    try {
      const mod    = await import(url);
      const Client = mod.RetellWebClient ?? mod.default?.RetellWebClient ?? mod.default;
      if (typeof Client === 'function') return Client;
    } catch (e) {
      console.warn('[MorseGrid Voice] SDK CDN failed:', url, e);
    }
  }
  throw new Error('Could not load Retell SDK from CDN. Check your internet connection.');
}

// ── Start call ────────────────────────────────────────────────────────────────
async function startCall() {
  if (callActive) return;
  setState('loading');

  try {
    await Promise.race([
      doStartCall(),
      new Promise((_, reject) =>
        setTimeout(() => reject(new Error('Timed out — please try again.')), CALL_TIMEOUT)
      ),
    ]);
  } catch (err) {
    console.error('[MorseGrid Voice]', err.message);
    callActive = false;
    setState('error');
    setTimeout(() => { if (!callActive) setState('idle'); }, 3000);
  }
}

async function doStartCall() {
  // 1. Load SDK dynamically
  const RetellWebClient = await loadSDK();
  retellClient = new RetellWebClient();

  retellClient.on('call_started', () => { callActive = true; setState('active'); });
  retellClient.on('call_ended',   () => { callActive = false; setState('idle'); });
  retellClient.on('error', (err) => {
    console.error('[Retell SDK]', err);
    callActive = false;
    try { retellClient.stopCall(); } catch (_) {}
    setState('error');
    setTimeout(() => setState('idle'), 3000);
  });

  // 2. Get access token via our server-side Vercel function
  const res = await fetch('/api/create-web-call', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ agent_id: AGENT_ID }),
  });

  if (!res.ok) {
    const body = await res.text().catch(() => String(res.status));
    throw new Error(`Server error ${res.status}: ${body}`);
  }

  const { access_token } = await res.json();
  if (!access_token) throw new Error('No access token returned.');

  // 3. Start the call — the browser will request mic permission at this point
  await retellClient.startCall({ accessToken: access_token });
}

// ── Stop call ─────────────────────────────────────────────────────────────────
function stopCall() {
  try { if (retellClient) retellClient.stopCall(); } catch (_) {}
  callActive = false;
  setState('idle');
}

// ── Button click ──────────────────────────────────────────────────────────────
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

  if (state === 'idle' || state === 'error') {
    embedBtn.textContent = state === 'error' ? 'Try again' : 'Start conversation';
    if (embedStatus) embedStatus.textContent = state === 'error' ? 'Something went wrong' : 'Ready to talk';
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
