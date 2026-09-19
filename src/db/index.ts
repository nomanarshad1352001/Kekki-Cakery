import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";

/**
 * OPTIONAL database scaffold.
 *
 * CakeCraft Commerce currently runs on curated dummy data (see `src/lib/`),
 * so the database is never used — Vercel deployments do not need
 * `DATABASE_URL`. The pool is created lazily on first access, so importing
 * this module is always safe and throws only if the DB is actually queried
 * without configuration.
 */

const globalForDb = globalThis as typeof globalThis & {
  __arenaNextJsPostgresqlPool?: Pool;
  __arenaNextJsDb?: ReturnType<typeof drizzle>;
};

function getPool(): Pool {
  const databaseUrl = process.env.DATABASE_URL;
  if (!databaseUrl) {
    throw new Error(
      "DATABASE_URL is not configured — this build runs on dummy data. " +
        "Set DATABASE_URL only if you enable the optional persistence layer."
    );
  }
  if (!globalForDb.__arenaNextJsPostgresqlPool) {
    globalForDb.__arenaNextJsPostgresqlPool = new Pool({
      connectionString: databaseUrl,
    });
  }
  return globalForDb.__arenaNextJsPostgresqlPool;
}

function getDb() {
  if (!globalForDb.__arenaNextJsDb) {
    globalForDb.__arenaNextJsDb = drizzle(getPool());
  }
  return globalForDb.__arenaNextJsDb;
}

/** Lazy drizzle client — safe to import, connects only on first use. */
export const db = new Proxy({} as ReturnType<typeof getDb>, {
  get(_target, prop, receiver) {
    return Reflect.get(getDb() as object, prop, receiver);
  },
});

export type Db = ReturnType<typeof getDb>;
export { getDb };
