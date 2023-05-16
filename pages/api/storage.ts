import { NextApiRequest, NextApiResponse } from 'next';
import { nextApiHttpHandler } from '@shared/application/http/next-api-http-handler';
import { storageFilePost } from '@shared/presentation/controllers/storage-file-post';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    const result = await storageFilePost.run(req, res);
    return result;
  }

  return nextApiHttpHandler.notFound(res);
}

export const config = {
  api: {
    bodyParser: false,
  },
};
