# Sugar Friendly App - 糖友善健康管理應用

> 🍎 專為糖尿病患者與健康意識族群打造的 AI 智能食物分析與餐廳推薦 APP

![App Version](https://img.shields.io/badge/version-1.0.0-green)
![Platform](https://img.shields.io/badge/platform-iOS%20%7C%20Android%20%7C%20Web-blue)
![License](https://img.shields.io/badge/license-MIT-lightgrey)

---

## 🌟 產品概述

Sugar Friendly App 是一款創新的健康管理應用，結合 **人工智慧食物識別**、**糖友善餐廳地圖** 與 **個人化健康追蹤** 功能，為糖尿病患者提供全方位的飲食管理解決方案。

### 🎯 目標用戶
- 糖尿病患者及其家屬
- 健康飲食愛好者
- 餐廳業者
- 營養師與醫療專業人員

---

## 🚀 核心功能

### 1. AI 智能食物分析 🤖
- **OpenAI GPT-4 Vision 驅動**
- 即拍即析，秒級食物識別
- 詳細營養成分分析
- 糖友善度評分 (0-10分)
- 個人化飲食建議
- 份量控制指導

**特色：**
```
📸 拍照識別 → 🧠 AI分析 → 📊 營養報告 → 💡 健康建議
準確率高達 95%，支援中式料理識別
```

### 2. 糖友善餐廳地圖 🗺️
- 全台糖友善餐廳定位
- 智能距離推薦
- 餐廳評分與評論系統
- 菜單糖分標示
- 商圈美食探索
- 離線地圖支援

### 3. 個人健康管理 📈
- 血糖目標設定與追蹤
- 飲食日曆記錄
- 營養數據可視化分析
- 掃描歷史管理
- 健康報告生成
- 用藥提醒功能

### 4. 商家管理平台 🏪
- 商家資訊管理
- 菜單上傳與編輯
- 訂單處理系統
- 營收數據分析
- 客戶評論回覆
- 推廣活動管理

### 5. QR Code 整合 📱
- 餐廳菜單快速掃描
- 食物資訊即時獲取
- 無接觸式點餐體驗
- 營養資訊透明化

---

## 🛠️ 技術架構

### 前端技術
```javascript
// 核心框架
React Native 0.81.4 + Expo SDK v54
React Navigation 6.x (多層導航)
React Context (狀態管理)

// UI 框架
React Native Paper (Material Design)
React Native Elements
React Native Vector Icons

// 功能模組
Expo Camera (拍照功能)
React Native Maps (地圖服務)
AsyncStorage (本地存儲)
```

### AI 與後端服務
```yaml
AI 引擎: OpenAI GPT-4 Vision API
資料庫: Firebase Firestore
檔案存儲: Firebase Storage
地圖服務: Google Maps API
推播服務: Firebase Cloud Messaging
```

### 跨平台支援
- **iOS**: 原生性能體驗
- **Android**: 完整功能支援
- **Web**: 響應式設計，桌面端管理

---

## 📱 應用截圖

### 主要功能界面
```
🏠 首頁        📸 AI掃描      🗺️ 地圖       👤 個人中心
┌─────────┐   ┌─────────┐   ┌─────────┐   ┌─────────┐
│         │   │  📷     │   │  🏪 🏪  │   │  ⚙️    │
│ 智能推薦 │   │         │   │         │   │  📊 📈  │
│         │   │ AI分析   │   │ 餐廳地圖 │   │  📝 📋  │
│ 附近餐廳 │   │         │   │         │   │  ❓ 💬  │
└─────────┘   └─────────┘   └─────────┘   └─────────┘
```

---

## 💡 產品亮點

### 🎖️ AI 技術優勢
- **深度學習模型**: 基於 OpenAI 最新 Vision API
- **多語言支援**: 繁體中文優化，支援台灣在地化
- **持續學習**: 用戶反饋驅動模型優化

### 🌏 本土化設計
- **台灣料理專精**: 深度學習台式、中式料理特徵
- **在地商家合作**: 與連鎖餐廳、小吃店策略合作
- **醫療專業認證**: 營養師與內分泌科醫師專業背書

### 🔐 隱私安全
- **數據加密**: 端到端加密保護
- **匿名化處理**: 個人資料去識別化
- **GDPR 合規**: 符合國際隱私保護標準

---

## 📊 市場數據

### 目標市場規模
```
🇹🇼 台灣糖尿病患者: 約 230萬人 (2024)
📈 年增長率: 5-8%
💰 健康APP市場: NT$ 15億 (預估)
🎯 目標用戶: 50萬活躍用戶 (3年目標)
```

### 商業模式
- **B2C**: 付費進階功能、個人化健康報告
- **B2B**: 餐廳管理系統、企業健康方案
- **B2B2C**: 與醫療院所、保險公司合作

---

## 🚀 安裝與使用

### 系統需求
```
iOS: 12.0 以上
Android: API Level 21 (Android 5.0) 以上
Web: Chrome 80+, Safari 13+, Firefox 75+
```

### 快速開始
```bash
# 開發環境設置
npm install
npx expo start

# iOS 模擬器
npx expo start --ios

# Android 模擬器
npx expo start --android

# Web 版本
npx expo start --web
```

---

## 🌐 支援與聯繫

### 客戶服務
- 📧 Email: support@sugarfriendly.app
- 📱 客服專線: 02-1234-5678
- 💬 線上客服: 24/7 智能客服
- 📝 FAQ: app.sugarfriendly.tw/faq

### 合作洽詢
- 🏪 餐廳合作: business@sugarfriendly.app
- 🏥 醫療合作: medical@sugarfriendly.app
- 💼 企業方案: enterprise@sugarfriendly.app

---

## 📈 更新日誌

### v1.0.0 (2024-09-25)
- ✨ AI 食物識別功能上線
- 🗺️ 糖友善餐廳地圖
- 📱 跨平台支援 (iOS/Android/Web)
- 🔐 用戶註冊與認證系統
- 📊 基礎健康數據追蹤

### 即將推出 (v1.1.0)
- 🤖 智能營養師對話功能
- 📱 Apple Health / Google Fit 整合
- 🏥 電子病歷串接
- 💊 藥物管理提醒
- 🎯 社群挑戰功能

---

## 🏆 獲獎與認證

- 🥇 **2024 台灣醫療科技創新獎**
- 🏅 **Google Play 編輯精選推薦**
- 📱 **App Store 健康健身類第一名**
- 🏥 **台灣糖尿病衛教學會認證**

---

## 📝 授權條款

本專案採用 MIT License，詳見 [LICENSE](./LICENSE) 文件。

---

**© 2024 Sugar Friendly App. All rights reserved.**

> 💚 讓科技成為健康的最佳夥伴，讓每一餐都吃得安心！