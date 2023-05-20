import { NextResponse } from "next/server";
import clientPromise from "@/database/mongo";

export async function POST(req) {
  const credentials = await req.json();

  const client = await clientPromise;
  const db = client.db("cheflink");

  const user = await db
    .collection("users")
    .findOne({ email: credentials.email });

  console.log(user);

  return NextResponse.json(
    { message: "Register successful" },
    { status: 200, headers: { "content-type": "application/json" } }
  );
}
