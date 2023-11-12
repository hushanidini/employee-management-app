import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';
dotenv.config();
const {
  MONGO_HOST,
  MONGO_USERNAME,
  MONGO_PASSWORD,
  MONGO_PORT,
  MONGO_DBNAME,
  MONGO_LOCAL,
} = process.env;


let MONGO_URI = `mongodb://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_HOST}:${MONGO_PORT}/${MONGO_DBNAME}?authSource=admin`;

if (MONGO_LOCAL) {
  MONGO_URI = `mongodb://${MONGO_HOST}:${MONGO_PORT}/${MONGO_DBNAME}`;
}

console.log('MONGO_URI---', MONGO_URI);
export const client = new MongoClient(MONGO_URI);
export const db = client.db();