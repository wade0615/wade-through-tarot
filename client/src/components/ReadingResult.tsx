"use client";

import { useEffect, useRef } from "react";
import { TarotCardComponent } from "./TarotCard";
import { SpreadLayout } from "./SpreadLayout";
import { useTarotStore } from "@/store/tarotStore";
import { TarotCard } from "@/data/tarotCards";
import { spreadPositions, formatDate, cn } from "@/utils/helpers";
import { ResponsiveAd } from "@/components/GoogleAds";
import { getAdSlot } from "@/config/ads";
import { useToast } from "@/hooks/useToast";

interface ReadingResultProps {
  onNewReading?: () => void;
  onSaveReading?: () => void;
  className?: string;
}

/**
 * 占卜結果組件 - 顯示完整的占卜結果和牌陣佈局
 * 包含牌卡解釋、位置說明和整體建議
 */
export function ReadingResult({
  onNewReading,
  onSaveReading,
  className,
}: ReadingResultProps) {
  const {
    selectedCards,
    currentQuestion,
    spreadType,
    saveReading,
    clearSelection,
  } = useTarotStore();

  const toast = useToast();
  const positions = spreadPositions[spreadType];
  const hasSaved = useRef(false); // 追蹤是否已經儲存過

  /**
   * 自動儲存占卜記錄（當組件掛載時）
   * 使用 useRef 防止重複儲存（React Strict Mode 會導致 useEffect 執行兩次）
   */
  useEffect(() => {
    if (selectedCards.length > 0 && !hasSaved.current) {
      hasSaved.current = true; // 標記為已儲存
      saveReading();
      onSaveReading?.();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // 只在組件掛載時執行一次

  /**
   * 開始新的占卜
   */
  const handleNewReading = () => {
    clearSelection();
    onNewReading?.();
  };

  /**
   * 複製內容到剪貼簿
   */
  const handleCopyContent = async () => {
    const content = generateOverallAdvice(
      selectedCards,
      spreadType,
      currentQuestion
    );
    try {
      await navigator.clipboard.writeText(content);
      toast.success("已成功複製到剪貼簿！", 3000);
    } catch (err) {
      console.error("複製失敗:", err);
      toast.error("複製失敗，請手動選取複製", 4000);
    }
  };

  /**
   * 前往 ChatGPT 詢問
   */
  const handleGoToChatGPT = () => {
    const content = generateOverallAdvice(
      selectedCards,
      spreadType,
      currentQuestion
    );
    const encodedContent = encodeURIComponent(content);
    const chatgptUrl = `https://chat.openai.com/?q=${encodedContent}`;
    window.open(chatgptUrl, "_blank");
  };

  // const handleSaveReading = () => {
  //   saveReading();
  //   onSaveReading?.();
  // };

  /**
   * 獲取指定位置的牌卡解釋
   * @param cardIndex - 牌卡位置索引
   * @returns 牌卡解釋對象，包含牌卡、位置、含義等信息
   */
  const getInterpretation = (cardIndex: number) => {
    const selectedCard = selectedCards[cardIndex];
    if (!selectedCard) return null;

    const { card, isReversed } = selectedCard;
    const meanings = isReversed ? card.meaning.reversed : card.meaning.upright;
    const position = positions[cardIndex];

    return {
      card,
      isReversed,
      meanings,
      position: position || { name: "位置", description: "" },
    };
  };

  if (selectedCards.length === 0) {
    return null;
  }

  return (
    <div className={cn("space-y-8", className)}>
      {/* 標題和問題 */}
      <div className="text-center">
        <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-200 via-purple-100 to-amber-200 mb-3">
          占卜結果
        </h2>
        {currentQuestion && (
          <p className="text-purple-300/80 italic">「{currentQuestion}」</p>
        )}
        <p className="text-sm text-slate-500 mt-2">{formatDate(new Date())}</p>
      </div>
      {/* 牌陣佈局 */}
      <SpreadLayout />
      {/* 複製內文給 GPT 解牌 */}
      <div className="glass-card p-6">
        <h3 className="text-lg font-semibold text-purple-200 mb-3">
          請 GPT 解牌
        </h3>
        <p className="text-slate-300 leading-relaxed text-sm">
          {generateOverallAdvice(selectedCards, spreadType, currentQuestion)}
        </p>

        {/* 複製和 ChatGPT 按鈕 */}
        <div className="flex flex-col sm:flex-row gap-3 mt-5 justify-end">
          <button
            onClick={handleCopyContent}
            className="px-5 py-3 min-h-[44px] rounded-xl font-medium transition-all duration-300
              bg-purple-500/20 border border-purple-400/30 text-purple-200
              hover:bg-purple-500/30 hover:border-purple-400/50
              hover:shadow-[0_0_20px_rgba(139,92,246,0.2)]"
            aria-label="複製占卜結果到剪貼簿"
          >
            複製內容
          </button>
          <button
            onClick={handleGoToChatGPT}
            className="px-5 py-3 min-h-[44px] rounded-xl font-semibold transition-all duration-300
              bg-gradient-to-r from-amber-600 to-amber-500 text-slate-900
              hover:from-amber-500 hover:to-amber-400
              hover:shadow-[0_0_25px_rgba(251,191,36,0.4)]"
            aria-label="開啟 ChatGPT 進行深度分析"
          >
            前往 ChatGPT 詢問
          </button>
        </div>
      </div>

      {/* Google Ads 廣告位置 */}
      <ResponsiveAd adSlot={getAdSlot("RESPONSIVE_GENERAL")} />

      {/* 操作按鈕 */}
      <div className="flex justify-center space-x-4">
        <button
          onClick={handleNewReading}
          className="px-6 py-3 min-h-[44px] rounded-xl font-medium transition-all duration-300
            bg-white/5 border border-purple-500/30 text-purple-200
            hover:bg-purple-500/15 hover:border-purple-400/50
            hover:shadow-[0_0_20px_rgba(139,92,246,0.2)]"
        >
          開始新的占卜
        </button>
      </div>

      {/* 牌卡解釋 */}
      <div className="space-y-6">
        {selectedCards.map((_selectedCard, index) => {
          const interpretation = getInterpretation(index);
          if (!interpretation) return null;

          return (
            <div
              key={index}
              className="glass-card-subtle p-6 hover-lift"
            >
              <div className="flex flex-col md:flex-row gap-6">
                {/* 牌卡 */}
                <div className="flex-shrink-0 flex justify-center">
                  <TarotCardComponent
                    card={interpretation.card}
                    isReversed={interpretation.isReversed}
                    size="lg"
                  />
                </div>

                {/* 解釋內容 */}
                <div className="flex-1 space-y-4">
                  {/* 位置和牌名 */}
                  <div>
                    <h3 className="text-lg font-semibold text-purple-200">
                      {interpretation.position.name}
                    </h3>
                    <p className="text-sm text-slate-400 mb-2">
                      {interpretation.position.description}
                    </p>
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-medium text-purple-100">
                        {interpretation.card.name}
                      </span>
                      <span className="text-sm text-slate-400">
                        ({interpretation.card.nameEn})
                      </span>
                      {interpretation.isReversed && (
                        <span className="text-xs bg-red-500/20 text-red-300 px-2 py-1 rounded-full border border-red-500/30">
                          逆位
                        </span>
                      )}
                    </div>
                  </div>

                  {/* 牌義 */}
                  <div>
                    <h4 className="font-medium text-purple-300/80 mb-2 text-sm">
                      {interpretation.isReversed ? "逆位含義" : "正位含義"}
                    </h4>
                    <div className="flex flex-wrap gap-2 mb-3">
                      {interpretation.meanings.map((meaning, idx) => (
                        <span
                          key={idx}
                          className={cn(
                            "px-3 py-1 rounded-full text-sm",
                            interpretation.isReversed
                              ? "bg-red-500/15 text-red-300 border border-red-500/25"
                              : "bg-emerald-500/15 text-emerald-300 border border-emerald-500/25"
                          )}
                        >
                          {meaning}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* 牌卡描述 */}
                  <div>
                    <h4 className="font-medium text-purple-300/80 mb-2 text-sm">
                      牌面解釋
                    </h4>
                    <p className="text-slate-300 leading-relaxed text-sm">
                      {interpretation.card.description}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/**
 * 生成整體占卜建議
 * 根據牌陣類型、逆位牌數量和大阿爾卡納牌數量生成建議
 * @param selectedCards - 已選擇的牌卡陣列
 * @param spreadType - 牌陣類型
 * @returns 整體建議文字
 */
function generateOverallAdvice(
  selectedCards: Array<{ card: TarotCard; isReversed: boolean }>,
  spreadType: string,
  currentQuestion: string
): string {
  if (selectedCards.length === 0) return "";

  // 生成牌陣名稱
  let spreadName = "";
  if (spreadType === "single") {
    spreadName = "單牌陣";
  } else if (spreadType === "three-card") {
    spreadName = "三牌陣-過去,現在,未來";
  } else if (spreadType === "celtic-cross") {
    spreadName =
      "凱爾特十字牌陣-現況,挑戰阻力,淺意識,過去,顯意識,未來,態度,環境,希望恐懼,結果";
  }

  // 生成抽牌結果
  const cardResults = selectedCards
    .map((sc, index) => {
      const position =
        spreadPositions[spreadType as keyof typeof spreadPositions][index];
      const positionName = position ? position.name : `位置${index + 1}`;
      const cardName = sc.card.name;
      const isReversed = sc.isReversed ? "逆位" : "正位";
      return `${positionName}: ${cardName}(${isReversed})`;
    })
    .join(", ");

  // 構建完整的提示詞
  let prompt = `你是一名專業的塔羅師，我用<${spreadName}>問了一個問題`;

  if (currentQuestion) {
    prompt += `，<${currentQuestion}>`;
  }

  prompt += `，抽到：<${cardResults}>，請告訴我每個牌位的意思，整體建議與結果`;

  return prompt;
}
