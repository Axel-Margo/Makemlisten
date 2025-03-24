// filepath: c:\Users\shiny\DEV\makemlisten\server\lib\auth.ts
import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const auth = betterAuth({
    database: prismaAdapter(prisma, {
        provider: "postgresql", // or "mysql", "sqlite", etc.
    }),
    emailAndPassword: {  
        enabled: true
    }
});