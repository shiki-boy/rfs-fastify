import { FastifyReply, FastifyRequest } from "fastify";

import { CreateUserInput, LoginInput, RefreshTokenInput } from "./schema";
import prisma from "@/dbClient";

export async function registerUserHandler(
  request: FastifyRequest<{
    Body: CreateUserInput;
  }>,
  reply: FastifyReply
) {
  const body = request.body;

  try {
    const userExists = await prisma.user.findFirst({
      where: { email: body.email },
    });

    if (userExists) {
      return reply.code(400).send({ detail: "This email already exists" });
    }

    const user = await prisma.user.create({
      data: {
        email: body.email,
        name: body.name,
      },
    });
    // const user = await createUser(body);
    return reply.code(201).send(user);
  } catch (e) {
    console.log(e);
    return reply.code(500).send(e);
  }
}

export async function loginHandler(
  request: FastifyRequest<{
    Body: LoginInput;
  }>,
  reply: FastifyReply
) {
  // const response = await loginUser(request.body);
  // reply.send(response);
}

export async function logoutUserHandler(
  request: FastifyRequest,
  reply: FastifyReply
) {
  // reply.send({ message: "User logged out successfully" });
}

export async function getUserHandler(
  request: FastifyRequest,
  reply: FastifyReply
) {
  // const response = request.userObj;
  // reply.send(response);
}

export async function refreshTokenHandler(
  request: FastifyRequest<{
    Body: RefreshTokenInput;
  }>,
  reply: FastifyReply
) {
  // blacklisting refresh tokens
  // await blacklistToken(request.body.token);
  // const user = await userModel.findByToken(request.body.token)
  // // @ts-expect-error generateAuthToken is there
  // const tokens = user.generateAuthToken();
  // reply.send(tokens);
}
