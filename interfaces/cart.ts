import { ISizes, ITypes } from './';

export interface ICart {
  _id?: string;
  images: string;
  inStock: number;
  price: number;
  size?: ISizes;
  slug: string;
  title: string;
  gender: 'men' | 'women' | 'kid' | 'unisex';
  quantify: number;
}
