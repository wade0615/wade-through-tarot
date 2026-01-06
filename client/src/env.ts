import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  /**
   * 客戶端環境變數（NEXT_PUBLIC_ 開頭）
   * 這些變數會被嵌入到客戶端代碼中
   */
  client: {
    NEXT_PUBLIC_GA_MEASUREMENT_ID: z
      .string()
      .regex(/^G-[A-Z0-9]+$/, "GA Measurement ID must match format G-XXXXXXXXXX")
      .optional(),

    NEXT_PUBLIC_ADSENSE_ID: z
      .string()
      .regex(
        /^ca-pub-\d{16}$/,
        "AdSense ID must match format ca-pub-XXXXXXXXXXXXXXXX"
      )
      .optional(),

    NEXT_PUBLIC_SITE_URL: z.string().url("Site URL must be a valid URL"),

    NEXT_PUBLIC_SITE_NAME: z
      .string()
      .min(1, "Site name cannot be empty")
      .default("Wade Through Tarot"),

    NEXT_PUBLIC_DEV_MODE: z
      .enum(["true", "false"])
      .default("false")
      .transform((val) => val === "true"),

    NEXT_PUBLIC_ENABLE_ANALYTICS: z
      .enum(["true", "false"])
      .default("true")
      .transform((val) => val === "true"),
  },

  /**
   * 伺服器端環境變數
   * 這些變數只在伺服器端可用，不會被嵌入到客戶端代碼中
   */
  server: {
    // 未來如果有伺服器端 API keys 可在此新增
    // 例如：
    // OPENAI_API_KEY: z.string().min(1),
  },

  /**
   * 執行時期環境變數
   * 從 process.env 讀取實際值
   */
  runtimeEnv: {
    NEXT_PUBLIC_GA_MEASUREMENT_ID: process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID,
    NEXT_PUBLIC_ADSENSE_ID: process.env.NEXT_PUBLIC_ADSENSE_ID,
    NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
    NEXT_PUBLIC_SITE_NAME: process.env.NEXT_PUBLIC_SITE_NAME,
    NEXT_PUBLIC_DEV_MODE: process.env.NEXT_PUBLIC_DEV_MODE,
    NEXT_PUBLIC_ENABLE_ANALYTICS: process.env.NEXT_PUBLIC_ENABLE_ANALYTICS,
  },

  /**
   * 跳過驗證的條件
   * 在某些情況下可以跳過環境變數驗證（例如在 CI/CD 建置時）
   */
  skipValidation: !!process.env.SKIP_ENV_VALIDATION,

  /**
   * 讓空字串被視為 undefined
   * 這對於可選的環境變數很有用
   */
  emptyStringAsUndefined: true,
});
