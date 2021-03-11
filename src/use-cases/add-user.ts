import { makeUser } from "../entities";
import type User from "../entities/user";
import type userDb from "../repo/user-db";

export default function makeAddUser({ userDb }: { userDb: userDb }) {
  return async function addUser(userInfo: User) {
    const user = makeUser(userInfo);
    const exists = userDb.findById(user.getId());
    if (exists) return exists;
    return userDb.insert({
      id: user.getId(),
      name: user.getName(),
      email: user.getEmail(),
    });
  };
}
