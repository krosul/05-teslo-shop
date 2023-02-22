import {IProduct} from '../interfaces/products';
import {initialData} from './Info-seed';
interface SeedUser {
  name: string;
  email: string;
  password: string;
  role: 'admin' | 'client';
}
interface SeedData {
  products: IProduct[];
  users: SeedUser[];
}

export const seedData: SeedData = {
  products: initialData.products,
  users: initialData.users,
};
