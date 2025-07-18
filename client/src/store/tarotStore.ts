import { create } from "zustand";
import { TarotCard } from "@/data/tarotCards";

export interface SelectedCard {
  card: TarotCard;
  position: number;
  isReversed: boolean;
}

export interface TarotReading {
  id: string;
  date: Date;
  question: string;
  selectedCards: SelectedCard[];
  spreadType: "single" | "three-card" | "celtic-cross";
}

interface TarotStore {
  // 當前狀態
  currentQuestion: string;
  selectedCards: SelectedCard[];
  availableCards: TarotCard[];
  isReading: boolean;
  spreadType: "single" | "three-card" | "celtic-cross";

  // 歷史記錄
  readingHistory: TarotReading[];

  // Actions
  setQuestion: (question: string) => void;
  setSpreadType: (type: "single" | "three-card" | "celtic-cross") => void;
  selectCard: (card: TarotCard, position: number, isReversed?: boolean) => void;
  removeCard: (position: number) => void;
  clearSelection: () => void;
  startReading: () => void;
  endReading: () => void;
  saveReading: () => void;
  setAvailableCards: (cards: TarotCard[]) => void;
  shuffleCards: () => void;

  // 計算屬性
  getMaxCards: () => number;
  isReadingComplete: () => boolean;
  canAddCard: () => boolean;
}

export const useTarotStore = create<TarotStore>((set, get) => ({
  // 初始狀態
  currentQuestion: "",
  selectedCards: [],
  availableCards: [],
  isReading: false,
  spreadType: "three-card",
  readingHistory: [],

  // Actions
  setQuestion: (question: string) => {
    set({ currentQuestion: question });
  },

  setSpreadType: (type: "single" | "three-card" | "celtic-cross") => {
    set({
      spreadType: type,
      selectedCards: [], // 清空已選擇的牌
    });
  },

  selectCard: (card: TarotCard, position: number, isReversed = false) => {
    const { selectedCards, getMaxCards } = get();

    // 檢查是否已達到最大牌數
    if (selectedCards.length >= getMaxCards()) {
      return;
    }

    // 檢查該位置是否已有牌
    const existingCard = selectedCards.find((sc) => sc.position === position);
    if (existingCard) {
      return;
    }

    const newCard: SelectedCard = {
      card,
      position,
      isReversed,
    };

    set({
      selectedCards: [...selectedCards, newCard].sort(
        (a, b) => a.position - b.position
      ),
    });
  },

  removeCard: (position: number) => {
    const { selectedCards } = get();
    set({
      selectedCards: selectedCards.filter((sc) => sc.position !== position),
    });
  },

  clearSelection: () => {
    set({
      selectedCards: [],
      // 不清空 currentQuestion，保持問題不變
    });
  },

  startReading: () => {
    set({ isReading: true });
  },

  endReading: () => {
    set({
      isReading: false,
      selectedCards: [],
      currentQuestion: "",
    });
  },

  saveReading: () => {
    const { currentQuestion, selectedCards, spreadType, readingHistory } =
      get();

    if (selectedCards.length === 0) return;

    const newReading: TarotReading = {
      id: `reading-${Date.now()}`,
      date: new Date(),
      question: currentQuestion,
      selectedCards: [...selectedCards],
      spreadType,
    };

    set({
      readingHistory: [newReading, ...readingHistory],
    });
  },

  setAvailableCards: (cards: TarotCard[]) => {
    set({ availableCards: cards });
  },

  shuffleCards: () => {
    const { availableCards } = get();
    const shuffled = [...availableCards];

    // Fisher-Yates shuffle algorithm
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }

    set({ availableCards: shuffled });
  },

  // 計算屬性
  getMaxCards: () => {
    const { spreadType } = get();
    switch (spreadType) {
      case "single":
        return 1;
      case "three-card":
        return 3;
      case "celtic-cross":
        return 10;
      default:
        return 3;
    }
  },

  isReadingComplete: () => {
    const { selectedCards, getMaxCards } = get();
    return selectedCards.length === getMaxCards();
  },

  canAddCard: () => {
    const { selectedCards, getMaxCards } = get();
    return selectedCards.length < getMaxCards();
  },
}));
