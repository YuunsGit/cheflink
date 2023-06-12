"use server";

import { Prisma } from "./db";

export async function listUsers(props) {
  try {
    const users = await Prisma.getPrisma().user.findMany({
      where: props,
    });
    return users;
  } catch (e) {
    return { error: "An error has occurred" };
  }
}
