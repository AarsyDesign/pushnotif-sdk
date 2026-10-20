#!/usr/bin/env node
"use strict";
const fs = require("fs");
const path = require("path");

const args = process.argv.slice(2);
const appId = args.find((a) => a.startsWith("app_")) || "app_xxxx";
const swContent = 'importScripts("https://pushnotif.biz.id/sdk/pushnotif-sw.js");\n';

const publicDir = path.join(process.cwd(), "public");
const targetDir = fs.existsSync(publicDir) ? publicDir : process.cwd();
const swPath = path.join(targetDir, "pushnotif-sw.js");

fs.writeFileSync(swPath, swContent, "utf8");
console.log("✅ [PushNotif] Service Worker berhasil dibuat di:", swPath);
console.log("🚀 Langkah selanjutnya di komponen utama (Next.js / React / Vue):");
console.log(`   import { initPushNotifWeb } from "pushnotif-sdk";`);
console.log(`   initPushNotifWeb({ appId: "${appId}" });`);
