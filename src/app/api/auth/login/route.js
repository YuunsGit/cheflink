import { NextResponse } from "next/server";
import clientPromise from "@/database/mongo";
import { kv } from "@vercel/kv";
import bcrypt from "bcryptjs";
import crypto from "crypto";
import { cookies } from "next/headers";

export async function POST(req) {
  const credentials = await req.json();

  const client = await clientPromise;
  const db = client.db("cheflink");

  const user = await db
    .collection("users")
    .findOne({ email: credentials.email });
  if (!user) {
    return NextResponse.json(
      { message: "Invalid email or password" },
      { status: 400, headers: { "content-type": "application/json" } }
    );
  }

  const result = await bcrypt.compare(credentials.password, user.password);
  if (!result) {
    return NextResponse.json(
      { message: "Invalid email or password" },
      { status: 400, headers: { "content-type": "application/json" } }
    );
  }

  const sessionId = crypto.randomUUID();
  await kv.set(sessionId, user._id.toString());

  cookies().set("session", sessionId, { secure: true });

  return NextResponse.json(
    { message: "Login successful", session: sessionId, userId: user._id },
    { status: 200, headers: { "content-type": "application/json" } }
  );
}
