// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]';
import prisma from '@/lib/prisma';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getServerSession(req, res, authOptions);
  if (!session) {
    res.status(401).json({message: "You must be logged in."});
  }
  
  if(req.method == "POST") {
    await prisma.tool.create({
      data: {
        name: req.body.name,
        user: {
          connect: {
            email: session?.user?.email!
          }
        },
        public_view: req.body.public_view ?? false,
        notes: req.body.notes ?? null
      }
    })
  }

  if(req.method == "GET") {
    await prisma.tool.findMany({
      where: {
                
      }
    })
  }

  res.status(200).json({ name: 'John Doe' });
}
