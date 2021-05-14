import type { dbClient } from "./client";

export default function makeUserDb(dbClient: dbClient): UserDb {
  const findAll = async () => dbClient.user.findMany();
  const findByEmail = async (email: string) =>
    dbClient.user.findUnique({
      where: {
        email,
      },
    });
  const findById = async (id: number) =>
    dbClient.user.findUnique({
      where: { id },
    });

  const insert = async (data: AddUserParams) => dbClient.user.create({ data });
  const remove = async (id: number) =>
    dbClient.user.delete({
      where: {
        id,
      },
    });
  const update = async (data: EditUserParams) => {
    return dbClient.user.update({ where: { id: data.id }, data });
  };

  return Object.freeze({
    findAll,
    findByEmail,
    findById,
    insert,
    remove,
    update,
  });
}
