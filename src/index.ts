import { Server, IncomingMessage, ServerResponse } from "http";

import fastify, { FastifyInstance } from "fastify";

import makeFastifyCallback from "./fastify-handler";
import { getUsers, postUser, deleteUser, updateUser } from "./controllers";

const server: FastifyInstance<
  Server,
  IncomingMessage,
  ServerResponse
> = fastify({ logger: null });

function build() {
  server.get("/", async (request, reply) => {
    return "👍";
  });

  server.get("/users", makeFastifyCallback(getUsers));
  server.post("/user", makeFastifyCallback(postUser));
  server.delete("/user", makeFastifyCallback(deleteUser));
  server.put("/user", makeFastifyCallback(updateUser));
  return server;
}
export default build;
