import client from "./client";
import makeUserDb from "./user-db";

export const userDb = makeUserDb(client);
