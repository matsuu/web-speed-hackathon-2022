import { join } from "path";

import fastifyStatic from "fastify-static";
import { createConnection } from "../typeorm/connection.js";
import { Race } from "../../model/index.js";

/**
 * @type {import('fastify').FastifyPluginCallback}
 */
export const spaRoute = async (fastify) => {
  fastify.register(fastifyStatic, {
    root: join(__dirname, "public"),
    wildcard: false,
    maxAge: 31536000000,
    preCompressed: true,
  });

  fastify.get("/favicon.ico", () => {
    throw fastify.httpErrors.notFound();
  });

  fastify.get("/races/:raceId/*", async (req, reply) => {
    const repo = (await createConnection()).getRepository(Race);
    const race = await repo.findOne(req.params.raceId);
    const imageUrl = race.image.replace(/(.*)\/([^\/]*)\.jpg/, '$1/400x225-$2.avif');
    return reply.header("Link", `<${imageUrl}>;rel="preload";as="image"`).sendFile("index.html", join(__dirname, "public"));
  });

  fastify.get("*", (_req, reply) => {
    return reply.sendFile("index.html", join(__dirname, "public"));
  });
};
