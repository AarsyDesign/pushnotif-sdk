# `pushnotif-sdk` — Official PushNotif Universal SDK (Web, React Native & Node.js)

SDK resmi dari **[PushNotif](https://pushnotif.biz.id)** untuk memasang **Web Push Notification**, **In-App Promo Popup**, **Live Activity Toast**, serta **Native Mobile (React Native / Expo — Android FCM & iOS APNs)** dalam hitungan detik.

---

## 📦 Instalasi Cepat (NPM / Yarn / PNPM / Bun)

```bash
npm install github:AarsyDesign/pushnotif-sdk
# atau langsung dari CDN PushNotif:
npm install https://pushnotif.biz.id/sdk/pushnotif-sdk.tgz
```

---

## 🌐 1. Penggunaan di Website (Next.js, React, Vue, Nuxt, Vite)

### Langkah A: Buat File Service Worker Otomatis (1 Perintah)
Jalankan perintah ini di folder project Anda untuk otomatis membuat `public/pushnotif-sw.js`:
```bash
npx pushnotif-init app_xxxxxxxx
```

### Langkah B: Panggil `initPushNotifWeb` di Layout Utama
```tsx
import { useEffect } from "react";
import { initPushNotifWeb } from "pushnotif-sdk";

export default function App() {
  useEffect(() => {
    initPushNotifWeb({ appId: "app_xxxxxxxx" });
  }, []);

  return <div>Website Anda</div>;
}
```

---

## 📱 2. Penggunaan di React Native & Expo (Android FCM & iOS APNs)

Setelah mengunggah kunci Firebase JSON / APNs `.p8` di Dashboard PushNotif (`https://pushnotif.biz.id/dashboard?tab=sdk`), panggil `registerPushNotifDevice` satu baris ini:

```ts
import { Platform } from "react-native";
import { registerPushNotifDevice } from "pushnotif-sdk";

async function onDeviceTokenReady(fcmOrApnsToken: string) {
  await registerPushNotifDevice({
    appId: "app_xxxxxxxx",
    token: fcmOrApnsToken,
    platform: Platform.OS === "ios" ? "ios_apns" : "android_fcm",
    segment: "all",
    tags: ["react-native", "member"],
  });
}
```

---

## ⚡ 3. Kirim Notifikasi dari Backend Node.js / Next.js Server Action

```ts
import { sendPushNotif } from "pushnotif-sdk";

await sendPushNotif({
  apiKey: process.env.PUSHNOTIF_API_KEY!,
  appId: "app_xxxxxxxx",
  title: "Pesanan #1024 Sedang Dikirim 🚚",
  body: "Kurir sedang menuju lokasi Anda. Klik untuk melacak pengiriman.",
  url: "https://tokosaya.com/orders/1024",
});
```

---

## 🔗 Dokumentasi & Dashboard
* **Dashboard Utama**: [https://pushnotif.biz.id/dashboard](https://pushnotif.biz.id/dashboard)
* **Dokumentasi Lengkap**: [https://pushnotif.biz.id/docs](https://pushnotif.biz.id/docs)
