import { PrismaClient } from "@prisma/client";

export const db = globalThis.prisma || new PrismaClient();

// In development, stores Prisma in globalThis for reuse.
// In production, it always creates a new instance.
if (process.env.NODE_ENV !== "production") {
  globalThis.prisma = db;
}

// globalThis.prisma: This global variable ensures that the Prisma client instance is
// reused across hot reloads during development.
// Without this, each time your application reloads, a new instance of the Prisma client would be created,
// potentially leading to connection issues.

// +++++++globalThis.prisma++++++++
// Prevents creating multiple Prisma instances in development (avoids connection issues).
// If an instance already exists, it reuses it.

// new PrismaClient();
// Creates a new Prisma client only if no instance exists.
