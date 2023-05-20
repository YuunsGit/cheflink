import { NextResponse } from "next/server";
import clientPromise from "@/database/mongo";

export async function POST(req) {
  const recipe = await req.json();

  const client = await clientPromise;
  const db = client.db("cheflink");

  const newRecipe = await db.collection("recipes").insertOne(recipe);
  await db.collection("users").updateOne(
    { id: recipe._userId },
    {
      $push: {
        recipes: newRecipe.insertedId,
      },
    }
  );

  return NextResponse.json(
    { message: "Recipe created successfully" },
    { status: 200, headers: { "content-type": "application/json" } }
  );
}
