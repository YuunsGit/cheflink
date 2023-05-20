import { NextResponse } from "next/server";
import clientPromise from "@/database/mongo";
import { ObjectId } from "mongodb";

export async function POST(req) {
  const recipe = await req.json();

  const client = await clientPromise;
  const db = client.db("cheflink");

  await db.collection("recipes").deleteOne({ id: recipe._id });
  await db.collection("users").updateOne(
    { id: recipe._userId },
    {
      $pull: {
        recipes: new ObjectId(recipe.id),
      },
    }
  );

  return NextResponse.json(
    { message: "Recipe deleted successfully" },
    { status: 200, headers: { "content-type": "application/json" } }
  );
}
