import type { IncomingHttpHeaders } from "http2";

type AddUserParams = {
  id?: number;
  name: string;
  email: string;
};

type AddUser = (User: AddUserParams) => Promise<User>;

type HttpRequest = {
  headers: IncomingHttpHeaders;
  query: any;
  body: any;
};
export default function makePostUser({ addUser }: { addUser: AddUser }) {
  return async function postUser(httpRequest: HttpRequest) {
    try {
      const userInfo: User = httpRequest.body;

      const posted = await addUser({
        name: userInfo.name,
        email: userInfo.email,
      });

      return {
        headers: {
          "Content-Type": "application/json",
        },
        statusCode: 200,
        body: { posted },
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
