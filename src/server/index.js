import "regenerator-runtime/runtime";
import fastify from "fastify";
import fastifySensible from "fastify-sensible";

import { User } from "../model/index.js";

import { apiRoute } from "./routes/api.js";
import { spaRoute } from "./routes/spa.js";
import { createConnection } from "./typeorm/connection.js";
import { initialize } from "./typeorm/initialize.js";

const IS_PRODUCTION = process.env.NODE_ENV === "production";

const server = fastify({
  disableRequestLogging: true,
  logger: IS_PRODUCTION
    ? false
    : {
        prettyPrint: {
          ignore: "pid,hostname",
          translateTime: "SYS:HH:MM:ss",
        },
      },
});
server.register(fastifySensible);
server.register(require('fastify-compress'));

server.addHook("onRequest", async (req, res) => {
  if (req.url.match(/users|betting|initialize/)) {
    const repo = (await createConnection()).getRepository(User);

    const userId = req.headers["x-app-userid"];
    if (userId !== undefined) {
      const user = await repo.findOne(userId);
      if (user === undefined) {
        res.unauthorized();
        return;
      }
      req.user = user;
    }
  }
});

server.addHook("onRequest", async (req, res) => {
  if (req.url.match(/^\/api/)) {
    if (req.url.match(/users|betting|initialize/)) {
      res.header("Cache-Control", "no-cache, no-store");
    } else {
      res.header("Cache-Control", "public, max-age=31536000");
    }
  }
  if (req.url === "/") {
    const imageUrl = "/assets/images/hero.avif";

    const { date = new Date().toLocaleString("ja-JP", {year: "numeric", month: "2-digit", day: "2-digit"}).split("/").join("-") } = req.query;
    const since = Date.parse(date + " 00:00:00") / 1000;
    const until = since + 86399;
    const jsonUrl = `/api/races?since=${since}&until=${until}`;
    res
      .header("Link", `<${imageUrl}>;rel="preload";as="image",<${jsonUrl}>;rel="preload";as="fetch";crossorigin="anonymous"`)
  }
});

server.register(apiRoute, { prefix: "/api" });
server.register(spaRoute);

const start = async () => {
  try {
    await initialize();
    await server.listen(process.env.PORT || 3000, "0.0.0.0");
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
};
start();
