// Utitity to get the order of a new item in the database
// get the dipoint between to numbers
// 6 positions first | last | middle-left | middle-right | up | down

const midString = (prev: string, next: string) => {
  let p;
  let n;
  let pos;
  let str;
  for (pos = 0; p === n; pos++) {
    // find leftmost non-matching character
    p = pos < prev.length ? prev.charCodeAt(pos) : 96;
    n = pos < next.length ? next.charCodeAt(pos) : 123;
  }
  str = prev.slice(0, pos - 1); // copy identical part of string
  if (p === 96) {
    // prev string equals beginning of next
    while (n === 97) {
      // next character is 'a'
      n = pos < next.length ? next.charCodeAt(pos++) : 123; // get char from next
      str += 'a'; // insert an 'a' to match the 'a'
    }
    if (n === 98) {
      // next character is 'b'
      str += 'a'; // insert an 'a' to match the 'b'
      n = 123; // set to end of alphabet
    }
  } else if (p && p + 1 === n) {
    // found consecutive characters
    str += String.fromCharCode(p); // insert character from prev
    n = 123; // set to end of alphabet
    while ((p = pos < prev.length ? prev.charCodeAt(pos++) : 96) === 122) {
      // p='z'
      str += 'z'; // insert 'z' to match 'z'
    }
  }
  if (p && n) {
    return str + String.fromCharCode(Math.ceil((p + n) / 2)); // append middle character
  }
  return undefined;
};

export const getNewOrder = (
  columns: Column[],
  sourceIndex: number,
  destinationIndex: number
) => {
  // if position is first, get point between first and second
  console.log(
    'columns[destinationIndex].order = ',
    columns[destinationIndex].order,
    'columns[sourceIndex].order = ',
    columns[sourceIndex].order
  );
  let newOrder;
  if (destinationIndex === 0) {
    // item is first
    console.log('first');
    newOrder = midString('', columns[0].order);
    console.log('newOrder = ', newOrder);
    return newOrder;
  }
  // item move down or right prev index
  if (destinationIndex > sourceIndex) {
    console.log('down or right');
    newOrder = midString(
      columns[destinationIndex - 1].order,
      columns[destinationIndex].order
    );
    console.log('newOrder = ', newOrder);
    return newOrder;
  }
  if (destinationIndex < sourceIndex) {
    console.log('up or left');
    newOrder = midString(
      columns[destinationIndex].order,
      columns[destinationIndex + 1].order
    );
    console.log('newOrder = ', newOrder);
    return newOrder;
  }
  if (destinationIndex === columns.length) {
    console.log('last');
    newOrder = midString(columns[destinationIndex].order, '');
    console.log('newOrder = ', newOrder);
    return newOrder;
  }
};
