import { db } from 'database';
import { Product } from 'models';
import type { NextApiRequest, NextApiResponse } from 'next';
import { seedData } from '../../../database/seed-data';

type Props = {
  message: string;
};

export default async function (
  req: NextApiRequest,
  res: NextApiResponse<Props>
) {
  if (process.env.NODE_ENV === 'production') {
    return res.status(401).json({ message: 'No tiene acceso a este servicio' });
  }
  await db.connect();
  await Product.deleteMany();
  await Product.insertMany(seedData.products);
  await db.disconnect();

  res.status(200).json({ message: 'Proceso realizado correctamente' });
}
