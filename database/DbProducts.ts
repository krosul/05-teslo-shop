import { db } from 'database';
import { IProduct } from 'interfaces';
import { Product } from 'models';

export const getProductBySlug = async (
  slug: string
): Promise<IProduct | null> => {
  await db.connect();

  const produc = await Product.findOne({ slug }).lean();

  await db.disconnect();

  if (!produc) {
    return null;
  }
  return JSON.parse(JSON.stringify(produc));
};

interface ProductSlug {
  slug: string;
}

export const getAllProducsSlugs = async (): Promise<ProductSlug[]> => {
  await db.connect();
  const slugs = await Product.find().select('slug -_id').lean();
  await db.disconnect();
  return slugs;
};
