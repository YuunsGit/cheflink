import { PrismaClient } from "@prisma/client";

export class Prisma {
  static Prisma;
  static getPrisma() {
    this.Prisma ||= new PrismaClient();
    return this.Prisma;
  }
}
