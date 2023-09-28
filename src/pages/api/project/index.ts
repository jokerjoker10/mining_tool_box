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

  if(req.method == "GET") {
    prisma.project.findMany({
      where: {
        user: {
            email: session?.user?.email
        },
        projectAccess: {
            some: {
                user: {
                    email: session?.user?.email
                }
            }
        }
      },
      skip: Number(req.query.skip) ?? 0,
      take: Number(req.query.take) ?? 10
    })
    .then((data) => {
        res.status(200).json({data});
    })
    .catch((err) => {
        res.status(500).json({err})
    })
  }

  if(req.method == "POST") {
    prisma.project.create({
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
    .then((data) => {
        res.status(200).json({data})
    })
    .catch((err) => {
        res.status(500).json({err})
    })
  }
}
