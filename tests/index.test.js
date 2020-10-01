const bookLender = require('../index');
describe('add book', () => {
  it('should throw error if book is falsy', () => {
    const args = [null, undefined, NaN, '', 0, false];
    args.forEach(a => {
      expect(() => { bookLender.add(a) }).toThrow();
    })
  })
  it('should throw error if book is not an object', () => {
    expect(() => { bookLender.add('da vinci code') }).toThrow();
  })
  it('should throw an error if book has no title property', () => {
    const args = [ {}, { name: 'a'} ];
    args.forEach(a => {
      expect(() => { bookLender.add(a) }).toThrow();
    })
  })
  it('should throw an error if book title is falsy', () => {
    const args = [null, undefined, NaN, '', 0, false];
    args.forEach(a => {
      expect(() => { bookLender.add({ title: a}) }).toThrow();
    })
  })
  it('should return an object with id and title', () => {
    const result = bookLender.add({ id: 1, title: 'da vinci code' });
    expect(result).toMatchObject({ id: bookLender.store.length, title: 'da vinci code' })
  })
})

describe('find book', () => {
  it('should throw error if bookId is not a number', () => {
    expect(() => { bookLender.findById('a') }).toThrow();
  })
  it('should throw error if book with given id cannot be found', () => {
    expect(() => { bookLender.findById(20) }).toThrow();
  })
  it('should return a book with an id and title', () => {
    const result = bookLender.findById(1);
    expect(result).toMatchObject({ id: 1, title: 'da vinci code'})
  })
})

describe('lend out book', () => {
  it('should throw error if book is not found', () => {
    expect(() => { bookLender.lend(20) }).toThrow();
  })
  it('should move a book with given id from store to borrowed books', () => {
    const result = bookLender.lend(1);
    expect(result).toMatchObject({ id: 1, title: 'da vinci code'})
    expect(bookLender.store).not.toEqual(expect.arrayContaining([result]));
    expect(bookLender.borrowedBooks).toEqual(expect.arrayContaining([result]));
  })
})

describe('retrieve book', () => {
  it('should throw error if book is not found', () => {
    expect(() => { bookLender.retrieve(20)}).toThrow();
  })
  it('should move a book with given id from borrowed books to store', () => {
    const result = bookLender.retrieve(1);
    expect(result).toMatchObject({ id: 1, title: 'da vinci code'})
    expect(bookLender.store).toEqual(expect.arrayContaining([result]));
    expect(bookLender.borrowedBooks).not.toEqual(expect.arrayContaining([result]));
  })
})

describe('remove book', () => {
  it('should throw error if book is not found', () => {
    expect(() => { bookLender.removeById(20) }).toThrow();
  })
  it('should remove a book with given id', () => {
    const result = bookLender.removeById(1);
    expect(result).toMatchObject({ id: 1, title: 'da vinci code'})
    expect(bookLender.store).not.toEqual(expect.arrayContaining([result]));
  })
})
