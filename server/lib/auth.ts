// filepath: c:\Users\shiny\DEV\makemlisten\server\lib\auth.ts
import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const auth = betterAuth({
    database: prismaAdapter(prisma, {
      provider: "postgresql",
    }),
    emailAndPassword: {
      enabled: true,
    },
    socialProviders: {
      spotify: {
        clientId: process.env.SPOTIFY_CLIENT_ID as string,
        clientSecret: process.env.SPOTIFY_CLIENT_SECRET as string,
      },
      twitter: {
        clientId: process.env.TWITTER_CLIENT_ID as string,
        clientSecret: process.env.TWITTER_CLIENT_SECRET as string,
        scopes: ["tweet.read", "users.read", "offline.access"], // Scopes nécessaires
      },
    },
    trustedOrigins: [
      "http://localhost:3001", // Origine du frontend
      "http://localhost:5431"// Origine du backend
    ],
  });