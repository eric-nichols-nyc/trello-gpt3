import { formatTodosForAi } from './formatTodosForAI';

export const fetchSuggestion = async (board: Board) => {
  const todos = formatTodosForAi(board);
  const response = await fetch('/api/generateSummary', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ todos }),
  });
  const GPTdata = await response.json();
  const { data:{content} } = GPTdata;
  return content;
};
