import { MongoClient, MongoClientOptions } from 'mongodb'

require('dotenv').config();

const url = process.env.MONGODB_URL || 'default-url';

const options: MongoClientOptions = {}

export async function connectDB() {
  const client = await MongoClient.connect(url, options);
  return client;
}