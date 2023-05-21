import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from "../../lib/prisma"

type Data = {
  [key: string]: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const {title, content} = req.body

  try {
    // CREATE
    await prisma.note.create({
      data: {
        title,
        content
      }
    })
    res.status(200).json({ message: 'Note created' })
  } catch (error: any) {
    console.log(error)
    res.status(400).json({ message: error })
  }
}
