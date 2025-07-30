import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();


export const auth = betterAuth({
    database: prismaAdapter(prisma, {
        provider: "postgresql", 
    }),

    trustedOrigins: [
        "https://blog-client-ivory-rho.vercel.app", 
        "https://blog-admin-vert.vercel.app"  
    ],

    emailAndPassword: {
        enabled: true,
        autoSignIn: false 
    }, 
    socialProviders: {
        google: { 
            prompt: "select_account", // to make sure a user selects an account
            clientId: process.env.GOOGLE_CLIENT_ID as string, 
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string, 
        }, 
        github: { 
            clientId: process.env.GITHUB_CLIENT_ID as string, 
            clientSecret: process.env.GITHUB_CLIENT_SECRET as string, 
        }, 
    },
    session: {
        expiresIn: 60 * 60 * 24 * 7, // 7 days
        updateAge: 60 * 60 * 24,     // 1 day
        cookieCache: {
          enabled: true,
          maxAge: 5 * 60,
        },
        cookie: {
            secure: true,       
            sameSite: "none",     
          },
    }
      
});