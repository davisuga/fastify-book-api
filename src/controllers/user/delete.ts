import type { IncomingHttpHeaders } from "http2";

type RemoveUser = (id: number) => Promise<User>;

type HttpRequest = {
  headers: IncomingHttpHeaders;
  query: any;
  body: any;
};

export default function makePostUser({
  removeUser,
}: {
  removeUser: RemoveUser;
}) {
  return async function deleteUser(httpRequest: HttpRequest) {
    try {
      const idToDelete = parseInt(httpRequest.query.id);

      const deleted = await removeUser(idToDelete);

      return {
        headers: {
          "Content-Type": "application/json",
        },
        statusCode: 200,
        body: { deleted },
      };
    } catch (e) {
      // TODO: Error logging
      console.log(e);

      return {
        headers: {
          "Content-Type": "application/json",
        },
        statusCode: 400,
        body: {
          error: e.message,
        },
      };
    }
  };
}
