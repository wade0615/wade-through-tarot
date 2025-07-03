'use client';

import { TarotCardComponent } from './TarotCard';
import { useTarotStore } from '@/store/tarotStore';
import { spreadPositions, formatDate, cn } from '@/utils/helpers';

interface ReadingResultProps {
  onNewReading?: () => void;
  onSaveReading?: () => void;
  className?: string;
}

export function ReadingResult({ 
  onNewReading, 
  onSaveReading,
  className 
}: ReadingResultProps) {
  const { 
    selectedCards, 
    currentQuestion, 
    spreadType,
    saveReading,
    clearSelection 
  } = useTarotStore();

  const positions = spreadPositions[spreadType];

  const handleNewReading = () => {
    clearSelection();
    onNewReading?.();
  };

  const handleSaveReading = () => {
    saveReading();
    onSaveReading?.();
  };

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
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          占卜結果
        </h2>
        {currentQuestion && (
          <p className="text-gray-600 italic">
            「{currentQuestion}」
          </p>
        )}
        <p className="text-sm text-gray-500 mt-1">
          {formatDate(new Date())}
        </p>
      </div>

      {/* 牌卡解釋 */}
      <div className="space-y-6">
        {selectedCards.map((selectedCard, index) => {
          const interpretation = getInterpretation(index);
          if (!interpretation) return null;

          return (
            <div key={index} className="bg-white rounded-lg shadow-md p-6 border">
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
                    <h3 className="text-lg font-semibold text-gray-800">
                      {interpretation.position.name}
                    </h3>
                    <p className="text-sm text-gray-600 mb-2">
                      {interpretation.position.description}
                    </p>
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-gray-800">
                        {interpretation.card.name}
                      </span>
                      <span className="text-sm text-gray-500">
                        ({interpretation.card.nameEn})
                      </span>
                      {interpretation.isReversed && (
                        <span className="text-xs bg-red-100 text-red-700 px-2 py-1 rounded">
                          逆位
                        </span>
                      )}
                    </div>
                  </div>

                  {/* 牌義 */}
                  <div>
                    <h4 className="font-medium text-gray-700 mb-2">
                      {interpretation.isReversed ? '逆位含義：' : '正位含義：'}
                    </h4>
                    <div className="flex flex-wrap gap-2 mb-3">
                      {interpretation.meanings.map((meaning, idx) => (
                        <span
                          key={idx}
                          className={cn(
                            'px-3 py-1 rounded-full text-sm',
                            interpretation.isReversed
                              ? 'bg-red-100 text-red-700'
                              : 'bg-green-100 text-green-700'
                          )}
                        >
                          {meaning}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* 牌卡描述 */}
                  <div>
                    <h4 className="font-medium text-gray-700 mb-2">解釋：</h4>
                    <p className="text-gray-600 leading-relaxed">
                      {interpretation.card.description}
                    </p>
                  </div>

                  {/* 關鍵詞 */}
                  <div>
                    <h4 className="font-medium text-gray-700 mb-2">關鍵詞：</h4>
                    <div className="flex flex-wrap gap-2">
                      {interpretation.card.keywords.map((keyword, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-sm"
                        >
                          {keyword}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* 整體總結 */}
      <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg p-6 border">
        <h3 className="text-lg font-semibold text-gray-800 mb-3">
          整體建議
        </h3>
        <p className="text-gray-700 leading-relaxed">
          {generateOverallAdvice(selectedCards, spreadType)}
        </p>
      </div>

      {/* 操作按鈕 */}
      <div className="flex justify-center space-x-4">
        <button
          onClick={handleSaveReading}
          className="px-6 py-3 bg-purple-600 text-white rounded-lg font-medium hover:bg-purple-700 transition-colors"
        >
          保存這次占卜
        </button>
        <button
          onClick={handleNewReading}
          className="px-6 py-3 bg-gray-600 text-white rounded-lg font-medium hover:bg-gray-700 transition-colors"
        >
          開始新的占卜
        </button>
      </div>
    </div>
  );
}

// 生成整體建議
function generateOverallAdvice(selectedCards: any[], spreadType: string): string {
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
