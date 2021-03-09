import fastify, { FastifyInstance } from "fastify";
import { Server, IncomingMessage, ServerResponse } from "http";

const server: FastifyInstance<
  Server,
  IncomingMessage,
  ServerResponse
> = fastify({ logger: null });

function build() {
  server.get("/ping", async (request, reply) => {
    return "pong\n";
  });
  return server;
}
export default build;
