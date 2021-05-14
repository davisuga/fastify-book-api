import type { IncomingHttpHeaders } from "http2";
import { OutgoingHttpHeaders } from "http";

import { addUser, listUsers, removeUser, editUser } from "../use-cases";

import makeGetUsers from "./user/get";
import makePostUser from "./user/post";
import makeDeleteUser from "./user/delete";
import makeUpdateUser from "./user/update";

type HttpRequest = {
  headers: IncomingHttpHeaders;
  query: any;
  body: any;
};

export const getUsers = makeGetUsers({ listUsers });
export const postUser = makePostUser({ addUser });
export const deleteUser = makeDeleteUser({ removeUser });
export const updateUser = makeUpdateUser({ editUser });
export type Controller = (
  httpRequest: HttpRequest
) => Promise<{
  headers: OutgoingHttpHeaders;
  statusCode: number;
  body: any;
}>;
