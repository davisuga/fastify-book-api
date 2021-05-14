export default function makeEditUser({ userDb }: { userDb: UserDb }) {
  return async function editUser(userInfo: EditUserParams) {
    return userDb.update(userInfo);
  };
}
