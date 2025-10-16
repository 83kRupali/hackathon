import { MongoClient, Db } from "mongodb";

let client: MongoClient | null = null;
let db: Db | null = null;

export async function getDb(): Promise<Db> {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    throw new Error("MONGODB_URI is not configured");
  }
  if (db) return db;
  client = new MongoClient(uri, {});
  await client.connect();
  const dbName = process.env.MONGODB_DB || new URL(uri).pathname.replace(/^\//, '') || 'ecobite';
  db = client.db(dbName);
  return db;
}

export function getClient(): MongoClient | null {
  return client;
}
