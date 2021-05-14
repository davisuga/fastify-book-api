import type { IncomingHttpHeaders } from "http2";

type EditUser = (User: EditUserParams) => Promise<User>;

type HttpRequest = {
  headers: IncomingHttpHeaders;
  query: any;
  body: any;
};
export default function makeUpdateUser({ editUser }: { editUser: EditUser }) {
  return async function updateUser(httpRequest: HttpRequest) {
    try {
      const userInfo: User = httpRequest.body;
      const userId: number = parseInt(httpRequest.query.id);
      const updated = await editUser({
        id: userId,
        name: userInfo.name,
        email: userInfo.email,
      });

      return {
        headers: {
          "Content-Type": "application/json",
        },
        statusCode: 200,
        body: { updated },
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
