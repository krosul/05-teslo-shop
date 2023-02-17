import { ShopLayout } from '../components/Layouts';
import { Typography } from '@mui/material';
import { initialData } from '../../database/products';
import { ProductList } from '@/components/Products';
import { IProduct } from '../../interfaces/products';

export default function Home() {
  return (
    <ShopLayout title="Home" pageDescription="Las tres B">
      <Typography variant="h1" component="h1">
        Tienda
      </Typography>
      <Typography variant="h2" sx={{ mb: 1 }}>
        Todos los productos
      </Typography>
      <ProductList products={initialData.products as any} />
    </ShopLayout>
  );
}
