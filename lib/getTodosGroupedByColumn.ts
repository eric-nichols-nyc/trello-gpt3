/**
 * util to get documents from database
 */
import { databases } from '../appwrite';

export const getTodosGroupedByColumn = async () => {
  const data = await databases.listDocuments(
    process.env.NEXT_PUBLIC_DATABASE_ID!,
    process.env.NEXT_PUBLIC_TODOS_COLLECTION_ID as string,
  );

    const todos = data.documents;
    // create the columns
    const columns = todos.reduce((acc, todo) => {
      if(!acc.get(todo.status)){
        acc.set(todo.status, {
          id: todo.status,
          todos: []
        })
      }

      acc.get(todo.status)?.todos.push({
        $id: todo.$id,
        $createdAt: todo.$createdAt,
        title: todo.title,
        status: todo.status,
        // get image from storage if it exists
        ...(todo.image && {
          image: todo.image
          })
      });

      return acc;
    }, new Map<TypedColumn, Column>());

    // if column doesn't have a todo, assign an empty array
    const columnTypes: TypedColumn[] = ['todo', 'inprogress', 'done'];
    for(const columnType of columnTypes){
      if(!columns.get(columnType)){
        columns.set(columnType, {
          id: columnType,
          todos: []
        })
      }
    }

    // sort columns by column type
    const sotedColumns = new Map(Array.from(columns.entries()).sort((a, b) => {
      if(a[0] < b[0]) return 1;
      if(a[0] > b[0]) return -1;
      return 0;
    }
    ));

    const board = {
       columns: sotedColumns
    }

    return board;
}

