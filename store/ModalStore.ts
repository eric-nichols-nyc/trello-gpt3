/** */
import {create} from 'zustand';

interface ModalState {
  type: string;
  isOpen: boolean;
  openModal:() => void;
  closeModal:() => void;
  setType: (type: string) => void;
}

export const useModalStore = create<ModalState>((set) => ({
  type: 'CARD',
  isOpen: false,
  openModal: () => set({ isOpen: true }),
  closeModal: () => set({ isOpen: false }),
  setType: (type) => set({ type }),
}));