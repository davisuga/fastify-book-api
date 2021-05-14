import { makeUser } from "../entities";

export default function makeAddUser({ userDb }: { userDb: UserDb }) {
  return async function addUser(userInfo: AddUserParams) {
    const user = makeUser(userInfo);

    return userDb.insert({
      name: user.getName(),
      email: user.getEmail(),
    });
  };
}
