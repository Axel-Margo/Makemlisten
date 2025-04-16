"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.auth = exports.prisma = void 0;
// filepath: c:\Users\shiny\DEV\makemlisten\server\lib\auth.ts
const better_auth_1 = require("better-auth");
const prisma_1 = require("better-auth/adapters/prisma");
const client_1 = require("@prisma/client");
exports.prisma = new client_1.PrismaClient();
exports.auth = (0, better_auth_1.betterAuth)({
    database: (0, prisma_1.prismaAdapter)(exports.prisma, {
        provider: "postgresql",
    }),
    emailAndPassword: {
        enabled: true,
    },
    socialProviders: {
        spotify: {
            clientId: process.env.SPOTIFY_CLIENT_ID,
            clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
        },
        twitter: {
            clientId: process.env.TWITTER_CLIENT_ID,
            clientSecret: process.env.TWITTER_CLIENT_SECRET,
            scopes: ["tweet.read", "users.read", "offline.access"], // Scopes nécessaires
        },
    },
    advanced: {
        defaultCookieAttributes: {
            secure: false, // A chang€r en prod
            httpOnly: false,
            sameSite: "none", // Allows CORS-based cookie sharing across subdomains
            partitioned: true, // New browser standards will mandate this for foreign cookies
        }
    },
    trustedOrigins: [
        "http://localhost:3001", // Origine du frontend
        "http://localhost:5431" // Origine du backend
    ],
});
