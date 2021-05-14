import { IncomingMessage, ServerResponse, Server } from "http";
import { FastifyReply, FastifyRequest } from "fastify";
import { RouteGenericInterface } from "fastify/types/route";
import type { Controller } from "../controllers";

export default function makeFastifyCallback(controller: Controller) {
  return async (
    req: FastifyRequest<RouteGenericInterface, Server, IncomingMessage>,
    res: FastifyReply<
      Server,
      IncomingMessage,
      ServerResponse,
      RouteGenericInterface,
      unknown
    >
  ) => {
    const httpRequest = {
      body: req.body,
      query: req.query,
      params: req.params,
      ip: req.ip,
      method: req.method,
      path: req.routerPath,
      headers: req.headers,
    };
    try {
      const response = await controller(httpRequest);
      res.status(response.statusCode);
      return response.body;
    } catch {
      res.status(500).send({ error: "An unkown error occurred." });
    }
    //   .then((httpResponse) => {
    //     res.status(httpResponse.statusCode).send(httpResponse);
    //     res.statusCode;
    //   })
    //   .catch((e) =>
    //
    //   );
  };
}
