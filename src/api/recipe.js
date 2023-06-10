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
    await Prisma.getPrisma().recipe.create({
      data: {
        userId,
        title,
        image,
        steps,
        ingredients,
        slug:
          title
            .toLowerCase()
            .replace(/ /g, "-")
            .replace(/[^\w-]+/g, "") +
          "-" +
          Math.floor(Math.random() * (10000 + 1)),
      },
    });
    return { message: "Recipe created successfully" };
  } catch (e) {
    return { error: "An error has ocurred" };
  }
}

export async function deleteRecipe({ recipeId }) {
  try {
    await Prisma.getPrisma().recipe.delete({
      where: {
        recipeId,
      },
    });
    return { message: "Recipe deleted successfully" };
  } catch (e) {
    return { error: "An error has ocurred" };
  }
}

export async function listRecipes(props) {
  try {
    const recipes = await Prisma.getPrisma().recipe.findMany({
      where: props,
    });
    return recipes;
  } catch (e) {
    return { error: "An error has ocurred" };
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
    return { error: "An error has ocurred" };
  }
}
