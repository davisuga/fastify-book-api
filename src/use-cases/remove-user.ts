export default function makeRemoveUser({ userDb }: { userDb: UserDb }) {
  return async function removeUser(id: number) {
    return userDb.remove(id);
  };
}
