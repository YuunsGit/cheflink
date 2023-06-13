"use server";

import { Prisma } from "./db";

export async function createRecipe({
  userId,
  title,
  image,
  steps,
  ingredients,
}) {
  try {
    const slug =
      title
        .toLowerCase()
        .replace(/ /g, "-")
        .replace(/[^\w-]+/g, "") +
      "-" +
      Math.floor(Math.random() * (10000 + 1));
    await Prisma.getPrisma().recipe.create({
      data: {
        userId,
        title,
        image,
        steps,
        ingredients,
        slug,
      },
    });
    return { message: "Recipe created successfully", slug };
  } catch (e) {
    return { error: "An error has occurred" };
  }
}

export async function deleteRecipe({ recipeId }) {
  try {
    await Prisma.getPrisma().comment.deleteMany({
      where: {
        recipeId,
      },
    });
    await Prisma.getPrisma().recipe.delete({
      where: {
        id: recipeId,
      },
    });
    return { message: "Recipe deleted successfully" };
  } catch (e) {
    return { error: "An error has occurred" };
  }
}

export async function listRecipes(props) {
  try {
    const recipes = await Prisma.getPrisma().recipe.findMany({
      where: props,
    });
    return recipes;
  } catch (e) {
    return { error: "An error has occurred" };
  }
}

export async function updateRecipe({ userId }) {
  try {
    const recipes = await Prisma.getPrisma().recipe.findMany({
      where: {
        userId,
      },
    });
    return recipes;
  } catch (e) {
    return { error: "An error has occurred" };
  }
}
