/**
 * @fileoverview card store
 */
import { create } from 'zustand';

interface CardState {
  currentCard: Card;
  setCurrentCard: (card: Card) => void;
}

export const useCardStore = create<CardState>((set) => ({
  currentCard: {
    _id: '',
    order: '',
    userId: '',
    columnId: '',
    boardId: '',
    title: '',
    image: '',
    description: '',
  },

  setCurrentCard(card) {
    set({ currentCard: card });
  },
    
}));


