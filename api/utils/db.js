import { MongoClient } from 'mongodb';

let cachedDb = null;
let cachedClient = null;

export async function connectToDatabase() {
  const uri = process.env.MONGODB_URI;
  
  if (!uri) {
    throw new Error('Please define the MONGODB_URI environment variable');
  }

  if (cachedClient && cachedDb) {
    return { client: cachedClient, db: cachedDb };
  }

  const client = await MongoClient.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 3000,
    connectTimeoutMS: 3000
  });

  const dbName = new URL(uri).pathname.substring(1) || 'archumart';
  const db = client.db(dbName);

  cachedClient = client;
  cachedDb = db;

  return { client, db };
}
