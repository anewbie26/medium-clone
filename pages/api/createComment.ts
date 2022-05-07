import sanityClient from '@sanity/client'
import type { NextApiRequest, NextApiResponse } from 'next'

const config = {
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,

  projectId: 'kv8fpwcl',
  token: process.env.SANITY_API_TOKEN,

  useCdn: process.env.NODE_ENV === 'production',
}
const client = sanityClient(config)

export default async function createComment(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { _id, name, email, comment } = JSON.parse(req.body);

  try {
    await client.create({
      _type: 'comment',
      post: {
        _type: 'reference',
        _ref: _id,
      },
      name,
      email,
      comment,
    })
  } catch (err) {
    return res.status(500).json({ message: "couldn't submit commet", err })
  }
  console.log('comment submiited')
  return res.status(200).json({ message: 'Comment Submitted' })
}

//   skUtPEo45tJtIRwh9iCvH2sYzPdwmAONuKDBDiFbwXTPzcIsL2coOErcyDlu23S2zGakE69Nui4ChTJ3UXFRLxOCBmXXEvwDSBNSet7Z4Q2PXDnHbCUpWq9W4zcyEE3hc3mZvlQ6h7IWHHw0sOQ44mO9w9EhyYVvCWMlCl3AFczaqVU8nhCF
