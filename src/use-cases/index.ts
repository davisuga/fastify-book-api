import makeAddUser from "./add-user";
import makeListUsers from "./list-users";
import makeRemoveUser from "./remove-user";
import makeEditUser from "./edit-user";
import { userDb } from "../repo";

export const addUser = makeAddUser({ userDb });
export const listUsers = makeListUsers({ userDb });
export const removeUser = makeRemoveUser({ userDb });
export const editUser = makeEditUser({ userDb });
