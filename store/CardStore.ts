/**
 * @fileoverview card store
 */
import { create } from 'zustand';
import { useDeleteCard } from '@/hooks/useColumn';
// 1. set current card for modaal
// 2. delete card from db
interface CardState {
  currentCard: Card;
  setCurrentCard: (card: Card) => void;
  allCards: Card[];
  setCards: () => void;
  deleteCard(cardId: string): void;
  comments: Comment[];
  setComments:() => void;
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
  allCards: [],
  setCards: async () => {
    const response = await fetch('/api/cards');
    const cards = await response.json();
    set({ allCards: cards });
  },

  deleteCard: async (cardId) => {
    const response = await fetch(`/api/cards/${cardId}`, {
      method: 'DELETE',
    });

    if (!response.ok) throw new Error('Failed to delete card');

    // set({allCards: []});
  },
  comments: [],
  setComments: async () => {
    const response = await fetch('/api/comments')
    const comments = await response.json();
    set({ comments });
  }
}));
