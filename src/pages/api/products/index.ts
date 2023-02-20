import { db, SHOP_CONSTANTS } from 'database';
import { Product } from 'models';
import type { NextApiRequest, NextApiResponse } from 'next';
import { IProduct } from '../../../../interfaces/products';

type Data = { message: string } | IProduct[];

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  switch (req.method) {
    case 'GET':
      return getAllProducts(req, res);

    default:
      return res.status(400).json({ message: 'erroe en la request' });
  }

  res.status(200).json({ message: 'Example' });
}
async function getAllProducts(req: NextApiRequest, res: NextApiResponse<Data>) {
  const { gender = 'all' } = req.query;

  let conditional = {};

  if (
    gender !== 'all' &&
    SHOP_CONSTANTS.validGenders.includes(gender as string)
  ) {
    conditional = { gender };
  }

  await db.connect();

  const products = await Product.find(conditional)
    .select('title images price inStock slug -_id')
    .lean();

  await db.disconnect();

  return res.json(products);
}
