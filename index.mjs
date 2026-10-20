/**
 * PushNotif Official Universal SDK v2.1.0
 * Supports:
 *  1. Web Browser (Next.js, React, Vue, Nuxt, Vite, HTML)
 *  2. React Native & Expo (Android FCM & iOS APNs)
 *  3. Node.js Backend / Next.js Server Actions
 */

const DEFAULT_ORIGIN = "https://pushnotif.biz.id";

/**
 * Initialize PushNotif Web SDK (Bell Widget, In-App Popup, & Live Activity Toast) in browser environments.
 */
export function initPushNotifWeb(options = {}) {
  if (typeof window === "undefined" || typeof document === "undefined") {
    return null;
  }
  const appId = (options.appId || "").trim();
  if (!appId) {
    console.warn("[PushNotif] appId wajib diisi pada initPushNotifWeb({ appId: 'app_xxxx' }).");
    return null;
  }
  const origin = (options.origin || DEFAULT_ORIGIN).replace(/\/+$/, "");
  const existing = document.querySelector(`script[data-app-id="${appId}"]`);
  if (existing) return existing;

  const s = document.createElement("script");
  s.src = `${origin}/sdk/pushnotif.js`;
  s.setAttribute("data-app-id", appId);
  s.defer = true;
  document.head.appendChild(s);
  return s;
}

/**
 * Register a React Native / Expo / Mobile Native device token (FCM or APNs) with PushNotif.
 */
export async function registerPushNotifDevice(options = {}) {
  const appId = (options.appId || "").trim();
  const token = (options.token || options.deviceToken || "").trim();
  const platform = (options.platform || "android_fcm").trim();
  const segment = (options.segment || "all").trim();
  const tags = Array.isArray(options.tags) ? options.tags.join(",") : String(options.tags || "all");
  const origin = (options.origin || DEFAULT_ORIGIN).replace(/\/+$/, "");

  if (!appId || !token) {
    throw new Error("[PushNotif] appId dan token wajib diisi pada registerPushNotifDevice().");
  }

  const res = await fetch(`${origin}/api/v1/subscribe/mobile`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      app_id: appId,
      platform,
      device_token: token,
      tags,
    }),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.detail || `PushNotif mobile registration failed (${res.status})`);
  }
  return await res.json();
}

/**
 * Send a Push Notification from a Node.js backend or Next.js Server Action.
 */
export async function sendPushNotif(options = {}) {
  const apiKey = (options.apiKey || "").trim();
  const appId = (options.appId || "").trim();
  const title = (options.title || "").trim();
  const body = (options.body || "").trim();
  const url = (options.url || "https://pushnotif.biz.id").trim();
  const segment = (options.segment || "all").trim();
  const origin = (options.origin || DEFAULT_ORIGIN).replace(/\/+$/, "");

  if (!apiKey || !appId || !title || !body) {
    throw new Error("[PushNotif] apiKey, appId, title, dan body wajib diisi pada sendPushNotif().");
  }

  const res = await fetch(`${origin}/api/v1/notifications`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      app_id: appId,
      title,
      body,
      url,
      segment,
    }),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.detail || `PushNotif send failed (${res.status})`);
  }
  return await res.json();
}

export default {
  initPushNotifWeb,
  registerPushNotifDevice,
  sendPushNotif,
};
