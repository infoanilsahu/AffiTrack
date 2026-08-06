import 'dotenv/config';
import { drizzle } from 'drizzle-orm/node-postgres';
import * as schema from './db/schema';

const db = drizzle(process.env.DATABASE_URL!);
export { schema, db };
