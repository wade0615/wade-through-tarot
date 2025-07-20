"use client";

import Script from "next/script";

// 擴展 Window 介面以包含 gtag
declare global {
  interface Window {
    gtag: (
      command: string,
      targetId: string | Date,
      config?: Record<string, unknown>
    ) => void;
    dataLayer: unknown[];
  }
}

interface GoogleAnalyticsProps {
  measurementId: string;
}

/**
 * Google Analytics 4 追蹤組件
 * 使用 Next.js Script 組件進行最佳化載入
 */
export default function GoogleAnalytics({
  measurementId,
}: GoogleAnalyticsProps) {
  return (
    <>
      {/* Google Analytics 4 追蹤代碼 */}
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${measurementId}', {
            page_title: 'Wade Through Tarot',
            page_location: window.location.href,
            custom_map: {
              'custom_parameter_1': 'tarot_reading_type',
              'custom_parameter_2': 'spread_type',
              'custom_parameter_3': 'cards_selected'
            }
          });
        `}
      </Script>
    </>
  );
}

/**
 * 自定義事件追蹤函數
 * 用於追蹤塔羅占卜相關的用戶行為
 */
export const trackEvent = (
  eventName: string,
  parameters?: Record<string, unknown>
) => {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", eventName, parameters);
  }
};

/**
 * 追蹤塔羅占卜開始事件
 */
export const trackReadingStart = (spreadType: string, question?: string) => {
  trackEvent("tarot_reading_start", {
    spread_type: spreadType,
    question_length: question?.length || 0,
    event_category: "tarot_reading",
    event_label: spreadType,
  });
};

/**
 * 追蹤牌卡選擇事件
 */
export const trackCardSelection = (
  cardName: string,
  position: number,
  isReversed: boolean
) => {
  trackEvent("card_selected", {
    card_name: cardName,
    position: position,
    is_reversed: isReversed,
    event_category: "card_selection",
    event_label: cardName,
  });
};

/**
 * 追蹤占卜完成事件
 */
export const trackReadingComplete = (
  spreadType: string,
  totalCards: number,
  readingDuration: number
) => {
  trackEvent("tarot_reading_complete", {
    spread_type: spreadType,
    total_cards: totalCards,
    reading_duration: readingDuration,
    event_category: "tarot_reading",
    event_label: spreadType,
  });
};

/**
 * 追蹤頁面瀏覽事件
 */
export const trackPageView = (pageName: string) => {
  trackEvent("page_view", {
    page_name: pageName,
    event_category: "navigation",
    event_label: pageName,
  });
};

/**
 * 追蹤用戶互動事件
 */
export const trackUserInteraction = (
  action: string,
  element: string,
  value?: string
) => {
  trackEvent("user_interaction", {
    action: action,
    element: element,
    value: value,
    event_category: "user_engagement",
    event_label: `${action}_${element}`,
  });
};
