import { IProduct } from '../interfaces/products';
import { initialData } from './products';

interface SeedData {
  products: IProduct[];
}

export const seedData: SeedData = {
  products: initialData.products,
};
