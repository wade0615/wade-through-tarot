'use client';

import { TarotCardComponent } from './TarotCard';
import { useTarotStore } from '@/store/tarotStore';
import { spreadPositions, cn } from '@/utils/helpers';

interface SpreadLayoutProps {
  className?: string;
}

export function SpreadLayout({ className }: SpreadLayoutProps) {
  const { spreadType, selectedCards, removeCard } = useTarotStore();
  
  const positions = spreadPositions[spreadType];

  const getCardAtPosition = (position: number) => {
    return selectedCards.find(sc => sc.position === position);
  };

  const renderSingleCardSpread = () => (
    <div className="flex justify-center">
      <div className="text-center space-y-2">
        <div className="text-sm font-medium text-blue-200">
          {positions[0].name}
        </div>
        <TarotCardComponent
          card={getCardAtPosition(0)?.card}
          isReversed={getCardAtPosition(0)?.isReversed}
          size="lg"
          onClick={() => getCardAtPosition(0) && removeCard(0)}
          className={getCardAtPosition(0) ? 'cursor-pointer' : ''}
        />
        <div className="text-xs text-slate-400 max-w-32">
          {positions[0].description}
        </div>
      </div>
    </div>
  );

  const renderThreeCardSpread = () => (
    <div className="flex justify-center space-x-8">
      {positions.map((pos, index) => (
        <div key={index} className="text-center space-y-2">
          <div className="text-sm font-medium text-blue-200">
            {pos.name}
          </div>
          <TarotCardComponent
            card={getCardAtPosition(index)?.card}
            isReversed={getCardAtPosition(index)?.isReversed}
            size="lg"
            onClick={() => getCardAtPosition(index) && removeCard(index)}
            className={getCardAtPosition(index) ? 'cursor-pointer' : ''}
          />
          <div className="text-xs text-slate-400 max-w-32">
            {pos.description}
          </div>
        </div>
      ))}
    </div>
  );

  const renderCelticCrossSpread = () => (
    <div className="flex justify-center items-center max-w-4xl mx-auto">
      {/* 中央十字牌陣 */}
      <div className="relative w-[420px] h-[580px] flex-shrink-0">
        {/* 上方：顯意識 (2) */}
        <div className="absolute left-1/2 top-4 transform -translate-x-1/2">
          <div className="text-xs font-medium text-blue-200 text-center mb-1">顯意識</div>
          <TarotCardComponent
            card={getCardAtPosition(2)?.card}
            isReversed={getCardAtPosition(2)?.isReversed}
            onClick={() => getCardAtPosition(2) && removeCard(2)}
            className={getCardAtPosition(2) ? 'cursor-pointer' : ''}
          />
        </div>

        {/* 下方：淺意識 (4) */}
        <div className="absolute left-1/2 bottom-0 transform -translate-x-1/2">
          <div className="text-xs font-medium text-blue-200 text-center mb-1">淺意識</div>
          <TarotCardComponent
            card={getCardAtPosition(4)?.card}
            isReversed={getCardAtPosition(4)?.isReversed}
            onClick={() => getCardAtPosition(4) && removeCard(4)}
            className={getCardAtPosition(4) ? 'cursor-pointer' : ''}
          />
        </div>

        {/* 左方：近期過去 (3) */}
        <div className="absolute left-0 top-1/2 transform -translate-y-1/2">
          <div className="text-xs font-medium text-blue-200 text-center mb-1">近期過去</div>
          <TarotCardComponent
            card={getCardAtPosition(3)?.card}
            isReversed={getCardAtPosition(3)?.isReversed}
            onClick={() => getCardAtPosition(3) && removeCard(3)}
            className={getCardAtPosition(3) ? 'cursor-pointer' : ''}
          />
        </div>

        {/* 右方：近期未來 (5) */}
        <div className="absolute right-0 top-1/2 transform -translate-y-1/2">
          <div className="text-xs font-medium text-blue-200 text-center mb-1">近期未來</div>
          <TarotCardComponent
            card={getCardAtPosition(5)?.card}
            isReversed={getCardAtPosition(5)?.isReversed}
            onClick={() => getCardAtPosition(5) && removeCard(5)}
            className={getCardAtPosition(5) ? 'cursor-pointer' : ''}
          />
        </div>

        {/* 中心：當前狀況 (0) */}
        <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
          <div className="text-xs font-medium text-blue-200 text-center mb-1">當前狀況</div>
          <TarotCardComponent
            card={getCardAtPosition(0)?.card}
            isReversed={getCardAtPosition(0)?.isReversed}
            onClick={() => getCardAtPosition(0) && removeCard(0)}
            className={getCardAtPosition(0) ? 'cursor-pointer' : ''}
          />
        </div>

        {/* 斜向覆蓋：挑戰跟阻力 (1) */}
        <div className="absolute left-11/20 top-11/20 transform -translate-x-1/2 -translate-y-1/2 rotate-30 z-20">
          <div className="text-xs font-medium text-blue-200 text-center mb-1">挑戰跟阻力</div>
          <TarotCardComponent
            card={getCardAtPosition(1)?.card}
            isReversed={getCardAtPosition(1)?.isReversed}
            onClick={() => getCardAtPosition(1) && removeCard(1)}
            className={cn(
              'opacity-90',
              getCardAtPosition(1) ? 'cursor-pointer' : ''
            )}
          />
        </div>
      </div>

      {/* 右側豎排：6~9 */}
      <div className="flex flex-col items-center space-y-4 ml-12">
        {/* 最終結果 (9) */}
        <div className="text-center space-y-1">
          <div className="text-xs font-medium text-blue-200">最終結果</div>
          <TarotCardComponent
            card={getCardAtPosition(9)?.card}
            isReversed={getCardAtPosition(9)?.isReversed}
            onClick={() => getCardAtPosition(9) && removeCard(9)}
            className={getCardAtPosition(9) ? 'cursor-pointer' : ''}
          />
        </div>
        {/* 希望與恐懼 (8) */}
        <div className="text-center space-y-1">
          <div className="text-xs font-medium text-blue-200">希望與恐懼</div>
          <TarotCardComponent
            card={getCardAtPosition(8)?.card}
            isReversed={getCardAtPosition(8)?.isReversed}
            onClick={() => getCardAtPosition(8) && removeCard(8)}
            className={getCardAtPosition(8) ? 'cursor-pointer' : ''}
          />
        </div>
        {/* 外在環境影響 (7) */}
        <div className="text-center space-y-1">
          <div className="text-xs font-medium text-blue-200">外在環境影響</div>
          <TarotCardComponent
            card={getCardAtPosition(7)?.card}
            isReversed={getCardAtPosition(7)?.isReversed}
            onClick={() => getCardAtPosition(7) && removeCard(7)}
            className={getCardAtPosition(7) ? 'cursor-pointer' : ''}
          />
        </div>
        {/* 問卜者方法跟態度 (6) */}
        <div className="text-center space-y-1">
          <div className="text-xs font-medium text-blue-200">問卜者方法跟態度</div>
          <TarotCardComponent
            card={getCardAtPosition(6)?.card}
            isReversed={getCardAtPosition(6)?.isReversed}
            onClick={() => getCardAtPosition(6) && removeCard(6)}
            className={getCardAtPosition(6) ? 'cursor-pointer' : ''}
          />
        </div>
      </div>
    </div>
  );

  return (
    <div className={cn('w-full', className)}>
      <div className="mb-6 text-center">
        <h3 className="text-lg font-semibold text-white mb-2">
          {spreadType === 'single' && '單張牌占卜'}
          {spreadType === 'three-card' && '三張牌占卜'}
          {spreadType === 'celtic-cross' && '凱爾特十字牌陣'}
        </h3>
        <p className="text-sm text-blue-200">
          {spreadType === 'single' && '適合簡單問題或每日指引'}
          {spreadType === 'three-card' && '適合了解情況的過去、現在、未來'}
          {spreadType === 'celtic-cross' && '適合複雜問題的深度分析'}
        </p>
      </div>

      <div className="flex justify-center">
        {spreadType === 'single' && renderSingleCardSpread()}
        {spreadType === 'three-card' && renderThreeCardSpread()}
        {spreadType === 'celtic-cross' && renderCelticCrossSpread()}
      </div>

      {/* 說明文字 */}
      <div className="mt-6 text-center text-xs text-slate-400">
        點擊已放置的牌可以移除
      </div>
    </div>
  );
}
