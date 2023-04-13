import Fastify from "fastify";
import cors from "@fastify/cors";
import helmet from "@fastify/helmet";

import validateEnv from "./validateEnv";
import loggingOptions from "./loggingOptions";
import { userSchemas } from "./modules/user/schema";
import userRoutes from "./modules/user/routes";
import authenticate from "./authenticate";

declare module "fastify" {
  export interface FastifyRequest {
    // user
    token: string;
  }

  export interface FastifyInstance {
    authenticate: () => void;
  }
}

validateEnv();

startServer();

async function startServer() {
  const server = Fastify({
    logger: loggingOptions[process.env.NODE_ENV],
  });

  await server.register(cors, {
    origin: process.env.ORIGIN,
    credentials: true,
  });

  // this can be done by nginx
  // await server.register(import("@fastify/compress"));

  server.register(helmet);

  server.decorate("authenticate", authenticate);

  server.get("/healthcheck", async function () {
    return { status: "OK" };
  });

  for (const schema of [...userSchemas]) {
    server.addSchema(schema);
  }

  server.register(userRoutes, { prefix: "api/auth" });

  await server.ready();

  // start server
  const port = process.env.PORT as unknown as number;

  await server.listen({ port, host: "0.0.0.0" });
}
