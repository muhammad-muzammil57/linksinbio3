import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;

let clientPromise;

if (process.env.NODE_ENV === "development") {
  // Development mein global variable use karo taake hot-reload par naya connection na bane
  if (!global._mongoClientPromise) {
    const client = new MongoClient(uri);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  // Production mein fresh connection
  const client = new MongoClient(uri);
  clientPromise = client.connect();
}

export default clientPromise;
