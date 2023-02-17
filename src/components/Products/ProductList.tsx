import { Grid } from '@mui/material';
import { FC } from 'react';
import { IProduct } from '../../../interfaces';
import { ProductCard } from './ProductCard';

interface Props {
  products: IProduct[];
}

export const ProductList: FC<Props> = ({ products }) => {
  return (
    <Grid container spacing={4}>
      {products.map((p) => (
        <ProductCard product={p} key={p.slug} />
      ))}
    </Grid>
  );
};
