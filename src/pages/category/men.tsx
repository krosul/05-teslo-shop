import { ShopLayout } from '@/components/Layouts';
import { ProductList } from '@/components/Products';
import { FullScreenLoading } from '@/components/UI';
import { Typography } from '@mui/material';
import { useProducts } from 'hooks';
const MenCategoryPage = () => {
  const { error, isLoading, products } = useProducts('/products?gender=men');
  return (
    <ShopLayout
      title="Teslo shop | Hombres"
      pageDescription="Teslo shop categoria para hombres"
    >
      <Typography variant="h1" component="h1">
        Tienda
      </Typography>
      <Typography variant="h2" sx={{ mb: 1 }}>
        Categoria hombres
      </Typography>
      {isLoading ? (
        <FullScreenLoading />
      ) : (
        <ProductList products={products as any} />
      )}
    </ShopLayout>
  );
};

export default MenCategoryPage;
