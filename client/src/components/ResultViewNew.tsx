'use client';

import { ReadingResult } from './ReadingResult';

interface ResultViewNewProps {
  onNewReading: () => void;
  onSaveReading: () => void;
}

/**
 * 結果頁面組件 - 顯示占卜結果和牌陣佈局
 * 淺色主題版本
 */
export function ResultViewNew({ onNewReading, onSaveReading }: ResultViewNewProps) {
  return (
    <ReadingResult
      onNewReading={onNewReading}
      onSaveReading={onSaveReading}
    />
  );
} 