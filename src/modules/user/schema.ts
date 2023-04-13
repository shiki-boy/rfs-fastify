import { z } from "zod";
import { buildJsonSchemas } from "fastify-zod";

const userCore = {
  email: z
    .string({
      required_error: "Email is required",
      invalid_type_error: "Email must be a string",
    })
    .email(),
  name: z.string(),
};

const createUserSchema = z.object({
  ...userCore,
});

const createUserResponseSchema = z.object({
  id: z.string(),
  ...userCore,
});

export type CreateUserInput = z.infer<typeof createUserSchema>;

// ---

const loginSchema = z.object({
  email: z
    .string({
      required_error: "Email is required",
      invalid_type_error: "Email must be a string",
    })
    .email(),
});

const loginResponseSchema = z.object({
  accessToken: z.string(),
  refreshToken: z.string(),
  user: z.object({ ...userCore, _id: z.string() }),
});

export type LoginInput = z.infer<typeof loginSchema>;

// ---

const userInfoResponseSchema = z.object({
  ...userCore,
  fullName: z.string(),
});

// ---

const refreshTokenSchema = z.object({
  token: z.string(),
});

export type RefreshTokenInput = z.infer<typeof refreshTokenSchema>;

const refreshTokenResponseSchema = z.object({
  accessToken: z.string(),
  refreshToken: z.string(),
});

// ---

export const { schemas: userSchemas, $ref } = buildJsonSchemas({
  createUserSchema,
  createUserResponseSchema,

  loginSchema,
  loginResponseSchema,

  userInfoResponseSchema,

  refreshTokenSchema,
  refreshTokenResponseSchema,
});
