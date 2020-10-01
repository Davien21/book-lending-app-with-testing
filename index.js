/*
* Implementation of the module design pattern to build a book lending app.
* By Chidiebere Ekennia
* Use the public methods to interact with the book store.
*/
class BookLender {
  constructor() {
    this.store = [],
    this.borrowedBooks = [];
  }
  add(book) {
    if (!book) throw new Error('book cannot be a falsy value');

    if (typeof book !== 'object') throw new Error('book must be an object');

    if (!book.title) 
      throw new Error('book must have a title key and value');

    book.id = this.store.length + 1
    this.store.push(book);

    return book;
  }
  findById (bookId, arr = this.store) {
    if (typeof bookId !== 'number') throw new Error('book id must be a number');

    const book = arr.find( x => x.id === bookId);
    if (!book) throw new Error('book was not found');

    return book;
  }
  lend(bookId) {
    const book = this.findById(bookId, this.store);
    const bookIndex = this.store.indexOf(book);

    this.store.splice(bookIndex,1)

    this.borrowedBooks.push(book)

    return book;
  }
  retrieve(bookId) {
    const book = this.findById(bookId, this.borrowedBooks);
    const bookIndex = this.borrowedBooks.indexOf(book);

    this.borrowedBooks.splice(bookIndex,1)

    this.store.push(book)

    return book;
  }
  removeById(bookId, arr = this.store) {
    const book = this.findById(bookId, arr);
    const bookIndex = arr.indexOf(book);

    arr.splice(bookIndex,1)

    return book;
  }
}
 
module.exports = new BookLender();
