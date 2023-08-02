/**
 * conrols the state of the board when user drags or drops a todo
 */
import { create } from 'zustand';
import {getTodosGroupedByColumn} from "../lib/getTodosGroupedByColumn";
import { databases } from '@/appwrite';
interface BoardState {
  board: Board;
  getBoard: () => void;
  setBoardState: (board: Board) => void;
  updateTodoInDB: (todo: Todo, columnId: TypedColumn) => void;
  searchString: string;
  setSearchString: (searchString: string) => void;
  newTask: string;
  setNewTask: (task: string) => void;
  newTaskType: TypedColumn;
  setNewTaskType: (columnId: TypedColumn) => void;
}

export const useBoardStore = create<BoardState>((set) => ({
  board: {
    columns: new Map<TypedColumn, Column>()
  },

  getBoard: async() => {
    const board = await getTodosGroupedByColumn() as Board;
    set({board});
  },

  setBoardState: (board: Board) => set({board}),

  updateTodoInDB: async (todo: Todo, columnId: TypedColumn) => {
    await databases.updateDocument(
      process.env.NEXT_PUBLIC_DATABASE_ID!,
      process.env.NEXT_PUBLIC_TODOS_COLLECTION_ID as string,
      todo.$id,
      {
        title: todo.title,
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
