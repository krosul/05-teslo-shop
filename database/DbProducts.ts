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

export const searchTerm = async (term: string): Promise<IProduct[]> => {
  await db.connect();

  term = term.toString().toLowerCase();

  const products = await Product.find({
    $text: { $search: term },
  })
    .select('title images price inStock slug -_id')
    .lean();
  await db.disconnect();

  return products;
};

export const getAllProducts = async (): Promise<IProduct[]> => {
  await db.connect();
  const allProducts = await Product.find().select('-_id').lean();
  await db.disconnect();
  return JSON.parse(JSON.stringify(allProducts));
};
