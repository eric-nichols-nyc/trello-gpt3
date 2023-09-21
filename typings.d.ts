interface Board {
  columns: Column[];
}

type TypedColumn = 'todo' | 'inprogress' | 'done';

interface IComment {
  _id: string;
  cardId: string;
  creatorId: string;
  creatorName: string;
  comment: string;
  createdAt: string;
}

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

interface Comment {
  _id: string;
  cardId: string;
  comment: string;
}

interface Image {
  bucketId: string;
  fildId: string;
}

interface User {
  _id: string;
  name: string;
  email: string;
  image: string;
  token: string;
  backgroundColor?: string;
  backgroundImage?: string;
}
