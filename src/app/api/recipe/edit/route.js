import { NextResponse } from "next/server";
import clientPromise from "@/database/mongo";

export async function POST(req) {
  const recipe = await req.json();

  const client = await clientPromise;
  const db = client.db("cheflink");

  const { _id, ...rest } = recipe;

  db.collection("recipes").updateOne(
    { id: _id },
    {
      $set: rest,
    }
  );

  return NextResponse.json(
    { message: "Recipe updated successfully" },
    { status: 200, headers: { "content-type": "application/json" } }
  );
}
