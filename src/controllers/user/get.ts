/* 
    listUsers has to be an use case that returns an array of users.
*/
import type { IncomingHttpHeaders } from "http2";

import { OutgoingHttpHeaders } from "http";

type HttpRequest = {
  headers: IncomingHttpHeaders;
  query: any;
  body: any;
};

export default function makeGetUsers({ listUsers }: { listUsers: ListUsers }) {
  return async function getUsers(
    httpRequest: HttpRequest
  ): Promise<{
    headers: OutgoingHttpHeaders;
    statusCode: any;
    body: any;
  }> {
    const headers = {
      "Content-Type": "application/json",
    };
    const userId = httpRequest.query.userId;
    try {
      const postUsers = await listUsers({
        id: httpRequest.query.userId,
      });
      return {
        headers,
        statusCode: 200,
        body: postUsers,
      };
    } catch (e) {
      // TODO: Error logging
      console.log(e);
      return {
        headers,
        statusCode: 400,
        body: {
          error: e.message,
        },
      };
    }
  };
}
