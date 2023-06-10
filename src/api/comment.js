"use server";

import { Prisma } from "./db";

export async function insertComment({ userId, recipeId, content, rating }) {
  try {
    await Prisma.getPrisma().comment.create({
      data: {
        userId,
        recipeId,
        content,
        rating,
      },
    });
    return { message: "Comment created successfully" };
  } catch (e) {
    return { error: "An error has ocurred" };
  }
}

export async function deleteComment({ commentId }) {
  try {
    await Prisma.getPrisma().comment.delete({
      where: {
        id: commentId,
      },
    });
    return { message: "Comment deleted successfully" };
  } catch (e) {
    return { error: "An error has ocurred" };
  }
}

export async function listComments(props) {
  try {
    const comments = await Prisma.getPrisma().comment.findMany({
      where: props,
    });
    return comments;
  } catch (e) {
    return { error: "An error has ocurred" };
  }
}
