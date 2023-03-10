import { ShopLayout } from '@/components/Layouts';
import { Typography } from '@mui/material';

import { ProductList } from '@/components/Products';
import { useProducts } from 'hooks';
import { FullScreenLoading } from '@/components/UI';

export default function Home() {
  const { error, isLoading, products } = useProducts('/products');
  // if (error) return <div>failed to load</div>;
  // if (isLoading) return <div>loading...</div>;
  return (
    <ShopLayout title="Home" pageDescription="Las tres B">
      <Typography variant="h1" component="h1">
        Tienda
      </Typography>
      <Typography variant="h2" sx={{ mb: 1 }}>
        Todos los productos
      </Typography>
      {isLoading ? (
        <FullScreenLoading />
      ) : (
        <ProductList products={products as any} />
      )}
    </ShopLayout>
  );
}
