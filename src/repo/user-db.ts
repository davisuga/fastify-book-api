import type User from "../entities/user";
type UserDb = {
  findById: (id: number) => User;
  insert: (User: User) => User;
};
export default UserDb;
