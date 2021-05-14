export default function makeListUsers({ userDb }: { userDb: UserDb }) {
  return async function listUsers() {
    const users = userDb.findAll();
    return users;
  };
}
