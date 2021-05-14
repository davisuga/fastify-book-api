import { makeBook } from "../entities";
import bookDb, { BookDb } from "../repo/book-db";

export default function makeAddBook({ userDb }: { userDb: BookDb }) {
  return async function addBook(bookInfo: AddBookParams) {
    // const book = makeBook(bookInfo);
    // return bookDb.insert({});
  };
}
