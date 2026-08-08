import { drizzle } from 'drizzle-orm/node-postgres';
import * as schema from './db/schema';
import * as orm from 'drizzle-orm'

const db = drizzle(process.env.DATABASE_URL!);
export { schema, db, orm };
