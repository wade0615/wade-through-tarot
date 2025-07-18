'use client';

import { ReadingResult } from './ReadingResult';

interface ResultViewProps {
  onNewReading: () => void;
  onSaveReading: () => void;
}

/**
 * 結果頁面組件 - 顯示占卜結果和牌陣佈局
 * 深色主題版本
 */
export function ResultView({ onNewReading, onSaveReading }: ResultViewProps) {
  return (
    <ReadingResult
      onNewReading={onNewReading}
      onSaveReading={onSaveReading}
    />
  );
} 