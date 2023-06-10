"use server";

import bcrypt from "bcryptjs";
import { Prisma } from "./db";
import { cookies } from "next/dist/client/components/headers";
import { kv } from "@vercel/kv";
import { userSchema } from "./joi";

export async function register(credentials) {
  if (userSchema.validate(credentials).error) {
    return { error: "Invalid input format" };
  }

  const existingEmail = await Prisma.getPrisma().user.findUnique({
    where: {
      email: credentials.email,
    },
  });
  if (existingEmail) {
    return { error: "Email already exists" };
  }

  const existingUsername = await Prisma.getPrisma().user.findUnique({
    where: {
      username: credentials.username,
    },
  });
  if (existingUsername) {
    return { error: "Username already exists" };
  }

  const hashedPassword = await bcrypt.hash(credentials.password, 10);

  try {
    await Prisma.getPrisma().user.create({
      data: {
        username: credentials.username,
        email: credentials.email,
        password: hashedPassword,
      },
    });
    return { message: "Register successful" };
  } catch (e) {
    return { error: "An error has ocurred" };
  }
}

export async function login(credentials) {
  const user = await Prisma.getPrisma().user.findUnique({
    where: {
      email: credentials.email,
    },
  });
  if (!user) {
    return { error: "Invalid email or password" };
  }

  const result = await bcrypt.compare(credentials.password, user.password);
  if (!result) {
    return { error: "Invalid email or password" };
  }

  if (cookies().get("session")) {
    kv.del(cookies().get("session").value);
  }

  const sessionId = crypto.randomUUID();
  await kv.set(sessionId, {
    userId: user.id.toString(),
    username: user.username,
  });

  cookies().set("session", sessionId, { secure: true });

  return {
    message: "Login successful",
    userId: user.id,
    username: user.username,
  };
}

export async function authorize() {
  if (cookies().get("session")) {
    const user = await kv.get(cookies().get("session").value);
    if (user) return { authorized: true, ...user };
  }
  return { authorized: false };
}
