import { MongoClient } from 'mongodb';
let client;
export async function connectDB() {
  if (client) return client;
  client = new MongoClient(process.env.MONGODB_URI);
  await client.connect();
  return client;
}
