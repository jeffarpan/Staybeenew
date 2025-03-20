import { MongoClient } from "mongodb";

const client = new MongoClient(process.env.DATABASE_URL);

async function connectDB() {
  if (!client.topology || !client.topology.isConnected()) {
    await client.connect();
  }
  return client.db();
}

export default connectDB;
