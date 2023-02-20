import { ShopLayout } from '@/components/Layouts';
import { ProductList } from '@/components/Products';
import { FullScreenLoading } from '@/components/UI';
import { Typography } from '@mui/material';
import { useProducts } from 'hooks';
const WomenCategoryPage = () => {
  const { error, isLoading, products } = useProducts('/products?gender=women');
  return (
    <ShopLayout
      title="Teslo shop | Mujeres"
      pageDescription="Teslo shop categoria para mujeres"
    >
      <Typography variant="h1" component="h1">
        Tienda
      </Typography>
      <Typography variant="h2" sx={{ mb: 1 }}>
        Categoria mujeres
      </Typography>
      {isLoading ? (
        <FullScreenLoading />
      ) : (
        <ProductList products={products as any} />
      )}
    </ShopLayout>
  );
};

export default WomenCategoryPage;
