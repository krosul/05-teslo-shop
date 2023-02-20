import type { NextApiRequest, NextApiResponse } from 'next';

type Data = {
  message: string;
};

export default function (req: NextApiRequest, res: NextApiResponse<Data>) {
  switch (req.method) {
    case 'GET':
      return res
        .status(404)
        .json({ message: 'bad request se necesita una query' });
    default:
      return res.status(404).json({ message: 'Bad request' });
  }
}
