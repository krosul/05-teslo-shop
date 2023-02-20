export interface IProduct {
  _id?: string;
  description: string;
  images: string[];
  inStock: number;
  price: number;
  sizes: ISizes[];
  slug: string;
  tags: string[];
  title: string;
  type: ITypes;
  gender: 'men' | 'women' | 'kid' | 'unisex';

  //TODO AGREGAR CREATEDAT Y UPDATEDAT
  createdAt: string;
  updateAt: string;
}
export type ISizes = 'XS' | 'S' | 'M' | 'L' | 'XL' | 'XXL' | 'XXXL';
export type ITypes = 'shirts' | 'pants' | 'hoodies' | 'hats';
