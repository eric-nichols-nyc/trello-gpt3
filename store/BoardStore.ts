/**
 * conrols the state of the board when user drags or drops a todo
 */
import { create } from 'zustand';
// import {getTodosGroupedByColumn} from "../lib/getTodosGroupedByColumn";
import { databases } from '@/appwrite';
interface BoardState {
  board: Board;
  getBoard: () => void;
  setBoardState: (board: Board) => void;
  updateTodoInDB: (card: Card, columnId: string) => void;
  searchString: string;
  setSearchString: (searchString: string) => void;
  newTask: string;
  setNewTask: (task: string) => void;
  newTaskType: string;
  setNewTaskType: (columnId: string) => void;
}

export const useBoardStore = create<BoardState>((set) => ({
  board: {
    columns: []
  },

  getBoard: async() => {
    // const board = await getTodosGroupedByColumn() as Board;
    // set({board});
  },

  setBoardState: (board: Board) => set({board}),

  updateTodoInDB: async (card: Card, columnId: string) => {
    await databases.updateDocument(
      process.env.NEXT_PUBLIC_DATABASE_ID!,
      process.env.NEXT_PUBLIC_TODOS_COLLECTION_ID as string,
      card._id,
      {
        title: card.name,
        status: columnId,
      }
    )
  },

  searchString: '',
  setSearchString: (searchString: string) => set({searchString}),
  newTask: '',
  setNewTask(task) {
    set({newTask: task});
  },

  newTaskType: 'todo',
  setNewTaskType(taskType) {
    set({newTaskType: taskType});
  },
}));
