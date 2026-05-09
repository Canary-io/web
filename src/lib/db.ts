import { Pool } from "pg";

declare global {
  var postgresPool: Pool | undefined;
}

function getDatabaseUrl() {
  const databaseUrl = process.env.DATABASE_URL;

  if (!databaseUrl) {
    throw new Error(
      "DATABASE_URL is not set. Add it to your environment before loading deployments.",
    );
  }

  return databaseUrl;
}

export function getPool() {
  if (!globalThis.postgresPool) {
    globalThis.postgresPool = new Pool({
      connectionString: getDatabaseUrl(),
    });
  }

  return globalThis.postgresPool;
}
