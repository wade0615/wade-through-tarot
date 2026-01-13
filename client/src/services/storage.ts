import {
  AppStorage,
  StoredReading,
  UserPreferences,
  DEFAULT_STORAGE,
} from "@/types/storage"

const STORAGE_KEY = "wade-through-tarot"
const MAX_READINGS = 10 // 限制最多保存 10 筆記錄

/**
 * LocalStorage 資料持久化服務
 */
class StorageService {
  /**
   * 獲取完整的儲存資料
   */
  getStorage(): AppStorage {
    if (typeof window === "undefined") {
      return DEFAULT_STORAGE
    }

    try {
      const data = localStorage.getItem(STORAGE_KEY)
      if (!data) {
        return DEFAULT_STORAGE
      }

      const parsed = JSON.parse(data) as AppStorage

      // 驗證資料結構
      if (!parsed.readings || !parsed.preferences || !parsed.version) {
        console.warn("Invalid storage structure, using default")
        return DEFAULT_STORAGE
      }

      return parsed
    } catch (error) {
      console.error("Failed to parse storage:", error)
      return DEFAULT_STORAGE
    }
  }

  /**
   * 儲存完整的資料
   */
  setStorage(storage: AppStorage): void {
    if (typeof window === "undefined") {
      return
    }

    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(storage))
    } catch (error) {
      console.error("Failed to save storage:", error)
    }
  }

  /**
   * 儲存占卜記錄
   * 防止重複儲存：檢查最後一筆記錄是否與當前記錄相同
   */
  saveReading(reading: StoredReading): void {
    const storage = this.getStorage()

    // 檢查是否為重複記錄（與最後一筆記錄的卡牌完全相同）
    if (storage.readings.length > 0) {
      const lastReading = storage.readings[0]
      const isSameCards =
        lastReading.cards.length === reading.cards.length &&
        lastReading.cards.every((card, index) =>
          card.cardId === reading.cards[index].cardId &&
          card.position === reading.cards[index].position &&
          card.isReversed === reading.cards[index].isReversed
        )

      // 如果卡牌完全相同且時間差小於 5 秒，視為重複記錄，不儲存
      const timeDiff = reading.timestamp - lastReading.timestamp
      if (isSameCards && timeDiff < 5000) {
        console.log("防止重複儲存：檢測到相同的占卜記錄")
        return
      }
    }

    storage.readings.unshift(reading) // 新的記錄放在最前面

    // 限制最多保存 10 筆
    if (storage.readings.length > MAX_READINGS) {
      storage.readings = storage.readings.slice(0, MAX_READINGS)
    }

    this.setStorage(storage)
  }

  /**
   * 獲取所有占卜記錄
   */
  getAllReadings(): StoredReading[] {
    const storage = this.getStorage()
    return storage.readings
  }

  /**
   * 獲取特定占卜記錄
   */
  getReading(id: string): StoredReading | undefined {
    const storage = this.getStorage()
    return storage.readings.find((reading) => reading.id === id)
  }

  /**
   * 刪除特定占卜記錄
   */
  deleteReading(id: string): void {
    const storage = this.getStorage()
    storage.readings = storage.readings.filter(
      (reading) => reading.id !== id
    )
    this.setStorage(storage)
  }

  /**
   * 清空所有占卜記錄
   */
  clearAllReadings(): void {
    const storage = this.getStorage()
    storage.readings = []
    this.setStorage(storage)
  }

  /**
   * 獲取使用者偏好設定
   */
  getPreferences(): UserPreferences {
    const storage = this.getStorage()
    return storage.preferences
  }

  /**
   * 更新使用者偏好設定
   */
  updatePreferences(preferences: Partial<UserPreferences>): void {
    const storage = this.getStorage()
    storage.preferences = {
      ...storage.preferences,
      ...preferences,
    }
    this.setStorage(storage)
  }

  /**
   * 匯出所有資料為 JSON
   */
  exportData(): string {
    const storage = this.getStorage()
    return JSON.stringify(storage, null, 2)
  }

  /**
   * 從 JSON 匯入資料
   */
  importData(jsonData: string): boolean {
    try {
      const data = JSON.parse(jsonData) as AppStorage

      // 驗證資料結構
      if (!data.readings || !data.preferences || !data.version) {
        console.error("Invalid data structure")
        return false
      }

      this.setStorage(data)
      return true
    } catch (error) {
      console.error("Failed to import data:", error)
      return false
    }
  }

  /**
   * 清空所有資料
   */
  clearAll(): void {
    if (typeof window === "undefined") {
      return
    }

    try {
      localStorage.removeItem(STORAGE_KEY)
    } catch (error) {
      console.error("Failed to clear storage:", error)
    }
  }
}

// 匯出單例實例
export const storageService = new StorageService()
