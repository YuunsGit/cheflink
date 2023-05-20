import { MongoClient } from "mongodb";

if (!process.env.DB_URI) {
  throw new Error("Add Mongo URI to .env.local");
}

let client;
let clientPromise;

const options = {
  useUnifiedTopology: true,
  useNewUrlParser: true,
};

if (!global._mongoClientPromise) {
  client = new MongoClient(process.env.DB_URI, options);
  global._mongoClientPromise = client.connect();
}
clientPromise = global._mongoClientPromise;

export default clientPromise;
