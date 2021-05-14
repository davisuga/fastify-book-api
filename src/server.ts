import app from ".";

const PORT = process.env.PORT || 3000;
export const fastify = app();

(async () => {
  try {
    await fastify.listen(PORT);
    console.log(`Serving server at http://localhost:${PORT}`);
  } catch (error) {
    fastify.log.error(error);
  }
})();
