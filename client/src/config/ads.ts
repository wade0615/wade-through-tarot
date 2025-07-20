/**
 * Google Ads 配置
 * 請將 ca-pub-XXXXXXXXXX 替換為您的實際 Publisher ID
 * 請將 ad-slot-XXXXXX 替換為您的實際廣告單元 ID
 */

export const ADS_CONFIG = {
  // Publisher ID - 請替換為您的實際 ID
  PUBLISHER_ID: "ca-pub-4201768192395434",

  // 廣告單元配置
  AD_SLOTS: {
    // 首頁頂部橫幅廣告
    HOME_TOP_BANNER: "ad-slot-home-top",

    // 首頁底部橫幅廣告
    HOME_BOTTOM_BANNER: "ad-slot-home-bottom",

    // 占卜結果頁面廣告
    RESULT_PAGE_RECTANGLE: "ad-slot-result-rectangle",

    // 牌卡圖鑑頁面廣告
    CARDS_PAGE_SIDEBAR: "ad-slot-cards-sidebar",

    // 響應式廣告（通用）
    RESPONSIVE_GENERAL: "ad-slot-responsive-general",
  },

  // 廣告格式配置
  AD_FORMATS: {
    BANNER: {
      width: "728px",
      height: "90px",
      maxWidth: "100%",
    },
    RECTANGLE: {
      width: "300px",
      height: "250px",
    },
    SKYSCRAPER: {
      width: "160px",
      height: "600px",
    },
    RESPONSIVE: {
      width: "100%",
      maxWidth: "728px",
    },
  },

  // 廣告位置配置
  AD_POSITIONS: {
    HOME: {
      top: "HOME_TOP_BANNER",
      bottom: "HOME_BOTTOM_BANNER",
      sidebar: "RESPONSIVE_GENERAL",
    },
    RESULT: {
      content: "RESULT_PAGE_RECTANGLE",
      sidebar: "RESPONSIVE_GENERAL",
    },
    CARDS: {
      sidebar: "CARDS_PAGE_SIDEBAR",
      bottom: "RESPONSIVE_GENERAL",
    },
  },
} as const;

/**
 * 獲取廣告單元 ID
 */
export function getAdSlot(slotKey: keyof typeof ADS_CONFIG.AD_SLOTS): string {
  return ADS_CONFIG.AD_SLOTS[slotKey];
}

/**
 * 獲取 Publisher ID
 */
export function getPublisherId(): string {
  return ADS_CONFIG.PUBLISHER_ID;
}

/**
 * 檢查是否為開發環境
 */
export function isDevelopment(): boolean {
  return process.env.NODE_ENV === "development";
}

/**
 * 檢查是否應該顯示廣告
 */
export function shouldShowAds(): boolean {
  // 在開發環境中不顯示廣告
  if (isDevelopment()) {
    return false;
  }

  // 檢查是否有有效的 Publisher ID
  return (
    ADS_CONFIG.PUBLISHER_ID !== "ca-pub-4201768192395434" ||
    process.env.NODE_ENV === "production"
  );
}
