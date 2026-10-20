export interface PushNotifWebOptions {
  appId: string;
  origin?: string;
}

export interface PushNotifMobileOptions {
  appId: string;
  token: string;
  platform?: "android_fcm" | "ios_apns";
  segment?: string;
  tags?: string[];
  origin?: string;
}

export interface PushNotifSendOptions {
  apiKey: string;
  appId: string;
  title: string;
  body: string;
  url?: string;
  segment?: string;
  origin?: string;
}

export function initPushNotifWeb(options: PushNotifWebOptions): HTMLScriptElement | null;
export function registerPushNotifDevice(options: PushNotifMobileOptions): Promise<Record<string, any>>;
export function sendPushNotif(options: PushNotifSendOptions): Promise<Record<string, any>>;
