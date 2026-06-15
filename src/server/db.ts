import path from "path";
import { env } from "~/env";
import { PrismaClient } from "../../generated/prisma";

const getDatabaseUrl = () => {
  const envUrl = process.env.DATABASE_URL;
  if (envUrl && (envUrl.startsWith("postgres:") || envUrl.startsWith("postgresql:"))) {
    return envUrl;
  }
  // High-Fidelity Absolute Path Construction for local SQLite
  const dbPath = path.join(process.cwd(), "prisma", "db.sqlite");
  return `file:${dbPath}`;
};

const dbUrl = getDatabaseUrl();

const createPrismaClient = () =>
  new PrismaClient({
    datasources: {
      db: {
        url: dbUrl,
      },
    },
    log: env.NODE_ENV === "development" ? ["query", "error", "warn"] : ["error"],
  });

const globalForPrisma = globalThis as unknown as {
  prisma: ReturnType<typeof createPrismaClient> | undefined;
};

export const db = globalForPrisma.prisma ?? createPrismaClient();

if (env.NODE_ENV !== "production") globalForPrisma.prisma = db;
