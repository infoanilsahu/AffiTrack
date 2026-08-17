import { drizzle } from 'drizzle-orm/node-postgres';
import * as schema from './db/schema';
import * as orm from 'drizzle-orm'
import * as nanoid from 'nanoid'

if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL environment variable is required. Please configure it before running the application.');
}
const db = drizzle(process.env.DATABASE_URL, { schema });
export { schema, db, orm, nanoid };
