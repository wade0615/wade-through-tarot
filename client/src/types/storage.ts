import { SpreadType } from "@/store/tarotStore"

/**
 * 儲存的占卜記錄
 */
export interface StoredReading {
  id: string
  timestamp: number
  question: string
  spreadType: SpreadType
  cards: Array<{
    cardId: string
    position: number
    isReversed: boolean
  }>
}

/**
 * 使用者偏好設定
 */
export interface UserPreferences {
  theme: "light" | "dark" | "auto"
  language: "zh-TW" | "en"
  notifications: boolean
  defaultSpreadType: SpreadType
}

/**
 * 應用程式儲存結構
 */
export interface AppStorage {
  readings: StoredReading[]
  preferences: UserPreferences
  version: string
}

/**
 * 預設使用者偏好設定
 */
export const DEFAULT_PREFERENCES: UserPreferences = {
  theme: "auto",
  language: "zh-TW",
  notifications: true,
  defaultSpreadType: "single",
}

/**
 * 預設應用程式儲存
 */
export const DEFAULT_STORAGE: AppStorage = {
  readings: [],
  preferences: DEFAULT_PREFERENCES,
  version: "1.0.0",
}
