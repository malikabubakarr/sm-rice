// lib/mongodb.ts
import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;

if (!uri) {
  console.warn("⚠️ MONGODB_URI is not defined yet (build phase)");
}

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

// Global cache for development (HMR safe)
declare global {
  // eslint-disable-next-line no-var
  var _mongoClientPromise: Promise<MongoClient> | undefined;
}

if (process.env.NODE_ENV === "development") {
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri as string);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise!;
} else {
  client = new MongoClient(uri as string);
  clientPromise = client.connect();
}

export default clientPromise;
