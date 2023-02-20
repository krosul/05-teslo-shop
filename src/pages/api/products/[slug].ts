import { db } from 'database';
import { Product } from 'models';
import type { NextApiRequest, NextApiResponse } from 'next';
import { IProduct } from '../../../../interfaces';

type Data = { message: string } | IProduct;

export default function (req: NextApiRequest, res: NextApiResponse<Data>) {
  switch (req.method) {
    case 'GET':
      return getProductBySlug(req, res);

    default:
      return res.status(400).json({ message: 'error en la request' });
  }
  res.status(200).json({ message: 'Example' });
}
async function getProductBySlug(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { slug } = req.query;

  db.connect();

  const productBySlug = await Product.findOne({ slug }).lean();
  console.log(productBySlug);

  db.disconnect();
  if (!productBySlug) {
    return res
      .status(404)
      .json({ message: 'Producto no encontrado meidante el slug:' + slug });
  }
  res.status(200).json(productBySlug);
}
