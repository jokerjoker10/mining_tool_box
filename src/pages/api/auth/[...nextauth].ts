import clientPromise from "@/lib/db";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import NextAuth, { AuthOptions  } from "next-auth";
import { Adapter } from 'next-auth/adapters'
import EmailProvider from "next-auth/providers/email";

const mongoAdapter = MongoDBAdapter(clientPromise);
export const authOptions:AuthOptions = {
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
    adapter: mongoAdapter,
} 

export default NextAuth(authOptions)