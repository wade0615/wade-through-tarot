'use client';

import { TarotCardComponent } from './TarotCard';
import { SpreadLayout } from './SpreadLayout';
import { useTarotStore } from '@/store/tarotStore';
import { TarotCard } from '@/data/tarotCards';
import { spreadPositions, formatDate, cn } from '@/utils/helpers';

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
  // onSaveReading,
  className 
}: ReadingResultProps) {
  const { 
    selectedCards, 
    currentQuestion, 
    spreadType,
    // saveReading,
    clearSelection 
  } = useTarotStore();

  const positions = spreadPositions[spreadType];

  /**
   * 開始新的占卜
   */
  const handleNewReading = () => {
    clearSelection();
    onNewReading?.();
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
      position: position || { name: '位置', description: '' }
    };
  };

  if (selectedCards.length === 0) {
    return null;
  }

  return (
    <div className={cn('space-y-6', className)}>
      {/* 標題和問題 */}
      <div className="text-center">
        <h2 className="text-2xl font-bold text-blue-100 mb-2">
          占卜結果
        </h2>
        {currentQuestion && (
          <p className="text-blue-200 italic">
            「{currentQuestion}」
          </p>
        )}
        <p className="text-sm text-blue-300 mt-1">
          {formatDate(new Date())}
        </p>
      </div>

      {/* 牌陣佈局 */}
      <SpreadLayout />

      {/* 牌卡解釋 */}
      <div className="space-y-6">
        {selectedCards.map((selectedCard, index) => {
          const interpretation = getInterpretation(index);
          if (!interpretation) return null;

          return (
            <div key={index} className="bg-gray-800/90 rounded-lg shadow-lg p-6 border border-blue-900/30">
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
                    <h3 className="text-lg font-semibold text-blue-100">
                      {interpretation.position.name}
                    </h3>
                    <p className="text-sm text-blue-200 mb-2">
                      {interpretation.position.description}
                    </p>
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-blue-100">
                        {interpretation.card.name}
                      </span>
                      <span className="text-sm text-blue-300">
                        ({interpretation.card.nameEn})
                      </span>
                      {interpretation.isReversed && (
                        <span className="text-xs bg-red-900/30 text-red-300 px-2 py-1 rounded border border-red-800/50">
                          逆位
                        </span>
                      )}
                    </div>
                  </div>

                  {/* 牌義 */}
                  <div>
                    <h4 className="font-medium text-blue-200 mb-2">
                      {interpretation.isReversed ? '逆位含義：' : '正位含義：'}
                    </h4>
                    <div className="flex flex-wrap gap-2 mb-3">
                      {interpretation.meanings.map((meaning, idx) => (
                        <span
                          key={idx}
                          className={cn(
                            'px-3 py-1 rounded-full text-sm',
                            interpretation.isReversed
                              ? 'bg-red-900/30 text-red-300 border border-red-800/50'
                              : 'bg-green-900/30 text-green-300 border border-green-800/50'
                          )}
                        >
                          {meaning}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* 牌卡描述 */}
                  <div>
                    <h4 className="font-medium text-blue-200 mb-2">牌面解釋：</h4>
                    <p className="text-blue-100 leading-relaxed">
                      {interpretation.card.description}
                    </p>
                  </div>

                  {/* 關鍵詞 */}
                  {/* <div>
                    <h4 className="font-medium text-blue-200 mb-2">牌面關鍵詞：</h4>
                    <div className="flex flex-wrap gap-2">
                      {interpretation.card.keywords.map((keyword, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-1 bg-blue-900/30 text-blue-200 rounded text-sm border border-blue-800/50"
                        >
                          {keyword}
                        </span>
                      ))}
                    </div>
                  </div> */}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* 整體總結 */}
      <div className="bg-gradient-to-r from-gray-800/80 to-blue-900/80 rounded-lg p-6 border border-blue-800/30">
        <h3 className="text-lg font-semibold text-blue-100 mb-3">
          整體建議
        </h3>
        <p className="text-blue-200 leading-relaxed">
          {generateOverallAdvice(selectedCards, spreadType)}
        </p>
      </div>

      {/* 操作按鈕 */}
      <div className="flex justify-center space-x-4">
        {/* <button
          onClick={handleSaveReading}
          className="px-6 py-3 bg-blue-900 text-white rounded-lg font-medium hover:bg-blue-800 transition-colors border border-blue-700"
        >
          保存這次占卜
        </button> */}
        <button
          onClick={handleNewReading}
          className="px-6 py-3 bg-gray-700 text-blue-100 rounded-lg font-medium hover:bg-gray-600 transition-colors border border-gray-600"
        >
          開始新的占卜
        </button>
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
function generateOverallAdvice(selectedCards: Array<{card: TarotCard, isReversed: boolean}>, spreadType: string): string {
  if (selectedCards.length === 0) return '';

  const hasReversed = selectedCards.some(sc => sc.isReversed);
  const majorCards = selectedCards.filter(sc => sc.card.suit === 'major').length;

  let advice = '';

  // 根據牌陣類型給出不同建議
  if (spreadType === 'single') {
    advice = '這張牌為您指出了當前最重要的指引方向。';
  } else if (spreadType === 'three-card') {
    advice = '從過去到未來的能量流動告訴我們，';
    if (hasReversed) {
      advice += '雖然有些阻礙需要克服，但這也是成長的機會。';
    } else {
      advice += '整體能量流動順暢，是個好的發展趨勢。';
    }
  } else if (spreadType === 'celtic-cross') {
    advice = '這個複雜的牌陣揭示了問題的多個面向。';
  }

  // 根據大阿爾卡納牌的數量添加建議
  if (majorCards >= 2) {
    advice += ' 出現多張大阿爾卡納牌意味著這個問題對您的人生有重要意義，需要認真對待。';
  } else if (majorCards === 1) {
    advice += ' 大阿爾卡納牌的出現提醒您關注人生的重要課題。';
  }

  // 根據逆位牌的情況添加建議
  if (hasReversed) {
    advice += ' 逆位牌提醒您需要反思內在，或者表示阻礙正在消散。';
  }

  advice += ' 記住，塔羅牌是指引而非命運，最終的選擇權在您手中。';

  return advice;
}
