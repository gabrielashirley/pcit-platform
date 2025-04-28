import "dotenv/config"

import { neonConfig, Pool as NeonPool } from '@neondatabase/serverless';
import { drizzle as neonDrizzle } from 'drizzle-orm/neon-serverless';
import { WebSocket } from 'ws';
import { Pool as PgPool } from 'pg';
import { drizzle as pgDrizzle } from 'drizzle-orm/node-postgres';

import * as schema from './schema';

const connectionString =
  process.env.NODE_ENV === 'production' ? process.env.DATABASE_URL : process.env.LOCAL_DATABASE_URL;

let db;
if (process.env.NODE_ENV === 'production') {
  neonConfig.webSocketConstructor = WebSocket;
  neonConfig.poolQueryViaFetch = true;
  const pool = new NeonPool({ connectionString });
  db = neonDrizzle(pool, { schema });
} else {
  // For local development, use standard pg driver
  const pool = new PgPool({ connectionString });
  db = pgDrizzle(pool, { schema });
}

export { db };
