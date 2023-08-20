TRELLO-GPT
NEXT, TAILWIND, TYPESCRIPT, SWR
https://trello-gpt3.vercel.app

NEXT AUTH
- homepage => auth => board
- Google and Github login at auth/signin

DRAG AND DROP COLUMNS => DB
add new columns:
- call post api/colums and pass in the user along with the content
- GET NEW COLUMN ORDER
 - columns are sorted by an order key as a string
 - use getItemOrder util to get to new order after each drop
 - get the new column order and set it in the database

 CREATE NEW COLUMN BUTTON
 - Board => CreateListForm(addColumn) => api/columns/{userid, form data}



