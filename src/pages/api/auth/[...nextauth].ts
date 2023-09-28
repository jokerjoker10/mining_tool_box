import clientPromise from "@/lib/db";
import NextAuth, { NextAuthOptions  } from "next-auth";
import EmailProvider from "next-auth/providers/email";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";
import prisma from "@/lib/prisma";
import { error } from "console";
import { TURBO_TRACE_DEFAULT_MEMORY_LIMIT } from "next/dist/shared/lib/constants";

export const authOptions:NextAuthOptions = {
    adapter: PrismaAdapter(prisma),
    providers: [
        EmailProvider({
            server: {
                host: process.env.EMAIL_SERVER_HOST,
                port: process.env.EMAIL_SERVER_PORT,
                auth: {
                    user: process.env.EMAIL_SERVER_USER,
                    pass: process.env.EMAIL_SERVER_PASSWORD
                }
            },
            from: process.env.EMAIL_FROM
        }),
    ],
    callbacks: {
        async signIn({user}){          
            
            var user_db = await prisma.user.findUnique({
                where: {
                    email: user.email!
                }
            });

            if(!user_db){
                return false;
            }
            
            if(!user_db?.account_complete){
                return true;

                // TODO: Disabele for Production
                return '/complete_account';
            }

            return true;
        }
    }
} 

export default NextAuth(authOptions)