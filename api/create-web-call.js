/**
 * Vercel Serverless Function — /api/create-web-call
 *
 * Proxies the Retell AI create-web-call request server-side so the API key
 * is never exposed in client-side code.
 *
 * Set RETELL_API_KEY in your Vercel project dashboard:
 *   Project → Settings → Environment Variables → Add → RETELL_API_KEY
 */

export default async function handler(req, res) {
  // Only allow POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const apiKey = process.env.RETELL_API_KEY;
  if (!apiKey) {
    console.error('[create-web-call] RETELL_API_KEY env var is not set');
    return res.status(500).json({ error: 'Server misconfiguration' });
  }

  try {
    const retellRes = await fetch('https://api.retellai.com/v2/create-web-call', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(req.body),
    });

    const data = await retellRes.json();

    if (!retellRes.ok) {
      console.error('[create-web-call] Retell API error:', data);
      return res.status(retellRes.status).json(data);
    }

    return res.status(200).json(data);
  } catch (err) {
    console.error('[create-web-call] Unexpected error:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
