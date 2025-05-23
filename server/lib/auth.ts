// filepath: c:\Users\shiny\DEV\makemlisten\server\lib\auth.ts
import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { PrismaClient } from "@prisma/client";

export const prisma = new PrismaClient();

export const auth = betterAuth({
    database: prismaAdapter(prisma, {
      provider: "postgresql",
    }),
    emailAndPassword: {
      enabled: true,
    },
        session: {
        cookieCache: {
            enabled: true,
            maxAge: 10 * 60 
        }
    },
    socialProviders: {
      spotify: {
        clientId: process.env.SPOTIFY_CLIENT_ID as string,
        clientSecret: process.env.SPOTIFY_CLIENT_SECRET as string,
        scopes: ["playlist-read-private", "playlist-read-collaborative", "user-read-private", "user-read-email", "streaming"]
      },
      twitter: {
        clientId: process.env.TWITTER_CLIENT_ID as string,
        clientSecret: process.env.TWITTER_CLIENT_SECRET as string,
        scopes: ["tweet.read", "users.read", "offline.access"], 
      },
    },
    trustedOrigins: [
      "http://localhost:3001", 
    ],
  });