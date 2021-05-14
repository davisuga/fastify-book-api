import type { dbClient } from "./client";
import type Book from "../entities/book";

export type BookDb = Readonly<{
  findAll: () => Promise<Book[]>;
  findByAuthorId: (email: string) => Promise<Book[]>;
  findById: (id: number) => Promise<Book>;
  insert: (data: Book) => Promise<Book>;
}>;

export default function makeBookDb(dbClient: dbClient): BookDb {
  const findAll = async () => dbClient.book.findMany();
  const findByAuthorId = async (authorId: string) => {
    const parsedAuthorId = parseInt(authorId);
    return dbClient.book.findMany({
      where: {
        authorId: parsedAuthorId,
      },
    });
  };
  const findById = async (id: number) =>
    dbClient.book.findUnique({
      where: { id },
    });
  const insert = async (data: Book) => dbClient.book.create({ data });
  const remove = async (id: number) =>
    dbClient.book.delete({
      where: {
        id,
      },
    });
  const update = async (id: number) => {};

  return Object.freeze({
    findAll,
    findByAuthorId,
    findById,
    insert,
  });
}
