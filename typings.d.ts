interface Board {
  columns: Column[];
}

type TypedColumn = 'todo' | 'inprogress' | 'done';

interface Column {
  id: string;
  cards: Card[];
}

interface Card {
  _id: string;
  $createdAt?: string;
  name: string;
  listId: string;
  image?: string;
}

interface Image {
  bucketId: string;
  fildId: string;
}