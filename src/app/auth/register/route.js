import { NextResponse } from "next/server";
import clientPromise from "@/database/mongo";
import Joi from "joi";

export async function POST(req) {
  const credentials = await req.json();

  const client = await clientPromise;
  const db = client.db("cheflink");

  const schema = Joi.object().keys({
    email: Joi.string().email().required(),
    username: Joi.string().alphanum().min(3).max(30).required(),
    password: Joi.string()
      .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
      .required(),
  });

  if ((err = schema.validate(credentials).error)) {
    return NextResponse.json(err.details, {
      status: 400,
      headers: { "content-type": "application/json" },
    });
  }

  const existingEmail = await db
    .collection("users")
    .findOne({ email: credentials.email });
  if (existingEmail) {
    return NextResponse.json(
      { message: "Email already exists" },
      { status: 400, headers: { "content-type": "application/json" } }
    );
  }

  const existingUsername = await db
    .collection("users")
    .findOne({ username: credentials.username });
  if (existingUsername) {
    return NextResponse.json(
      { message: "Username already exists" },
      { status: 400, headers: { "content-type": "application/json" } }
    );
  }

  await db.collection("users").insertOne(credentials);

  return NextResponse.json(
    { message: "Register successful" },
    { status: 200, headers: { "content-type": "application/json" } }
  );
}
