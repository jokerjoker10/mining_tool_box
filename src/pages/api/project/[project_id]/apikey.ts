// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { getServerSession } from 'next-auth';
import { authOptions } from '../../auth/[...nextauth]';
import prisma from '@/lib/prisma';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getServerSession(req, res, authOptions);
  if (!session) {
    res.status(401).json({message: "You must be logged in."});
  }

  const project_id = String(req.query.project_id) ?? "";
  
  if (project_id == "") {
    res.status(401).json({message: "Project ID Failed"})
  }

  if(req.method == "GET") {
    prisma.apiKey.findMany({
      where: {
        project: {
            id: project_id
        },
      },
      orderBy: {
        createdAt: 'desc'
      },

    })
    .then((data) => {
        var data_tmp = []
        data.forEach((point) => {
            point.key == null;
            data_tmp.push(point);
        })
        res.status(200).json({data});
    })
    .catch((err) => {
        res.status(500).json({err})
    })
  }

  if(req.method == "PUT") {
    prisma.project.update({
      where: {
        id: project_id
      },
      data: {
        name: req.body.name,
        tags: req.body.tags,
        user: {
          connect: {
            email: session?.user?.email!
          }
        },
        public_view: req.body.public_view,
        notes: req.body.notes
      }
    })
    .then((data) => {
        res.status(200).json({data})
    })
    .catch((err) => {
        res.status(500).json({err})
    })
  }

  if(req.method == "DELETE") {
    prisma.project.delete({
      where:{
        id: project_id
      }
    })
    .then((data) => {
      res.status(200).json({data});
    })
    .catch((err) => {
      res.status(500).json({err});
    })
  }
  
}
