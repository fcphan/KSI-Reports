import { MongoClient } from "mongodb";

const { MONGODB_URI, MONGODB_DB } = process.env;

// check the MongoDB URI
if (!MONGODB_URI) {
  throw new Error("Set the MONGODB_URI environmental variable");
}

// check the MongoDB DB
if (!MONGODB_DB) {
  throw new Error("Set the MONGODB_DB environmental variable");
}

let cached = global.mongo;
if (!cached) cached = global.mongo = {};

export async function connectToDatabase() {
  if (cached.conn) return cached.conn;
  if (!cached.promise) {
    const conn = {};
    const opts = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    };

    cached.promise = MongoClient.connect(MONGODB_URI, opts)
      .then((client) => {
        conn.client = client;
        return client.db(MONGODB_DB);
      })
      .then((db) => {
        conn.db = db;
        cached.conn = conn;
      });
    await cached.promise;
    return cached.conn;
  }
}
