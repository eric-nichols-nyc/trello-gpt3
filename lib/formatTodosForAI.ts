export const formatTodosForAi = (board: Board) => {
  const todos = Array.from(board.columns.entries());

  const flatArray = todos.reduce((map:any, [key, value]) => {
    map[key] = value.cards;
    return map;
  }, {} as { [key in TypedColumn]: Card[] });

  const flatArrayCounted = Object.entries(flatArray).reduce(
    (map, [key, value]:any) => {
      map[key as TypedColumn] = value.length;
      return map;
    },
    {} as { [key in TypedColumn]: number }
  );

  return flatArrayCounted;
};
