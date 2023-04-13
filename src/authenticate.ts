import { FastifyReply, FastifyRequest } from "fastify";

export default async function authenticate(
  request: FastifyRequest,
  reply: FastifyReply,
  tokenProvided = null
) {
  const token = request.headers["authorization"]?.split("Bearer").pop().trim() ?? tokenProvided;

  // check if token is blacklisted or not
  try {

    // if (!user) {
    //   return Promise.reject();
    // } else {
      // request.user = user;
      // request.token = token;
    // }
  } catch (error) {
    reply.code(401).send({ message: "Invalid authentication credentials" });
  }
}
