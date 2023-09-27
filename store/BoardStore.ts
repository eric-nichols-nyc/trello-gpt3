/**
 * conrols the state of the board when user drags or drops a todo
 */
import { create } from 'zustand';
// import {getTodosGroupedByColumn} from "../lib/getTodosGroupedByColumn";
interface BoardState {
  board: Board;
  getBoard: () => void;
  setBoardState: (board: Board) => void;
  searchString: string;
  setSearchString: (searchString: string) => void;
  bgColor: string | null;
  bgImage: string | null;
  setBGColor: (color: string) => void;
  setBgImage: (url: string) => void;
  showMenu: boolean;
  setShowMenu: (showMenu: boolean) => void;
}

export const useBoardStore = create<BoardState>((set) => ({
  board: {
    columns: [],
  },

  getBoard: async () => {
    // const board = await getTodosGroupedByColumn() as Board;
    // set({board});
  },

  setBoardState: (board: Board) => set({ board }),
  searchString: '',
  setSearchString: (searchString: string) => set({ searchString }),
  bgColor: 'bg-slate-800',
  setBGColor(color) {
    set({ bgColor: color });
  },
  showMenu: false,
  setShowMenu(showMenu) {
    set({ showMenu });
  },
  bgImage: null,
  setBgImage(url) {
    set({ bgImage: url });
  },
}));
