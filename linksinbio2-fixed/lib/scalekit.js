import { Scalekit } from '@scalekit-sdk/node';

// ✅ Lazy initialization - build time par crash nahi karega
let _scalekit = null;

export function getScalekit() {
  if (_scalekit) return _scalekit;

  const url = process.env.SCALEKIT_ENVIRONMENT_URL;
  const clientId = process.env.SCALEKIT_CLIENT_ID;
  const clientSecret = process.env.SCALEKIT_CLIENT_SECRET;

  if (!url || !clientId || !clientSecret) {
    throw new Error('Scalekit env variables missing: SCALEKIT_ENVIRONMENT_URL, SCALEKIT_CLIENT_ID, SCALEKIT_CLIENT_SECRET');
  }

  _scalekit = new Scalekit(url, clientId, clientSecret);
  return _scalekit;
}

// Backward compat - direct import hota tha pehle
export const scalekit = new Proxy({}, {
  get(_, prop) {
    return getScalekit()[prop];
  }
});
