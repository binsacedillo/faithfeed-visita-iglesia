import path from "path";
import { env } from "~/env";
import { PrismaClient } from "../../generated/prisma";

// High-Fidelity Absolute Path Construction for Vercel
const dbPath = path.join(process.cwd(), "prisma", "db.sqlite");
const dbUrl = `file:${dbPath}`;

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
