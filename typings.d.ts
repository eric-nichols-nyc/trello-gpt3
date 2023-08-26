interface Board {
  columns: Column[];
}

type TypedColumn = 'todo' | 'inprogress' | 'done';

interface Column {
  _id: string;
  columnName: string;
  name: string;
  order: string;
  cards: Card[];
}

interface Card {
  _id: string;
  order: string;
  userId?: string;
  columnId?: string;
  boardId?: string;
  title?: string;
  image?: string;
  description?: string;
}

interface Image {
  bucketId: string;
  fildId: string;
}

interface User {
  id: string;
  name: string;
  email: string;
  image: string;
  token: string;
}
