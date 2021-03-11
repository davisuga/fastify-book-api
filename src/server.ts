import app from ".";

const PORT = process.env.PORT || 3000;
const fastify = app();

(async () => {
  try {
    await fastify.listen(PORT);
  } catch (error) {
    fastify.log.error(error);
    process.exit(1);
  }
})();
