import { NextResponse } from "next/server";
import clientPromise from "@/database/mongo";

export async function POST() {
  const client = await clientPromise;
  const db = client.db("cheflink");

  const recipes = await db.collection("recipes").find().toArray();

  return NextResponse.json(
    { recipes },
    { status: 200, headers: { "content-type": "application/json" } }
  );
}
