import { ShopLayout } from '@/components/Layouts';
import { ProductList } from '@/components/Products';
import { FullScreenLoading } from '@/components/UI';
import { Typography } from '@mui/material';
import { useProducts } from 'hooks';
const KidCategoryPage = () => {
  const { error, isLoading, products } = useProducts('/products?gender=kid');
  return (
    <ShopLayout
      title="Teslo shop | Niños"
      pageDescription="Teslo shop categoria para niños"
    >
      <Typography variant="h1" component="h1">
        Tienda
      </Typography>
      <Typography variant="h2" sx={{ mb: 1 }}>
        Categoria niños
      </Typography>
      {isLoading ? (
        <FullScreenLoading />
      ) : (
        <ProductList products={products as any} />
      )}
    </ShopLayout>
  );
};

export default KidCategoryPage;
