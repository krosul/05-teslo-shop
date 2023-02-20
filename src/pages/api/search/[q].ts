import { db } from 'database';
import { Product } from 'models';
import type { NextApiRequest, NextApiResponse } from 'next';
import { IProduct } from '../../../../interfaces/products';

type Data = { message: string } | IProduct[];

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  console.log(req.query.q);

  switch (req.method) {
    case 'GET':
      return searchProducts(req, res);

    default:
      return res.status(400).json({ message: 'Example' });
  }
}
async function searchProducts(req: NextApiRequest, res: NextApiResponse<Data>) {
  let { q = '' } = req.query;
  console.log(q);

  if (!q.length) {
    return res.status(400).json({ message: 'bad request' });
  }
  q = q.toString().toLowerCase();

  await db.connect();

  const products = await Product.find({
    $text: { $search: q },
  })
    .select('title images price inStock slug -_id')
    .lean();

  await db.disconnect();

  return res.status(200).json(products);
}
