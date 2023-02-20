import { ShopLayout } from '@/components/Layouts';
import { Box, Typography } from '@mui/material';
import { GetServerSideProps, NextPage } from 'next';
import { ProductList } from '@/components/Products';
import { dbProducts } from 'database';
import { IProduct } from 'interfaces';

interface Props {
  products: IProduct[];
  existProducts: boolean;
  query: string;
}

const SearchPage: NextPage<Props> = ({ products, existProducts, query }) => {
  // if (isLoading) return <div>loading...</div>;
  return (
    <ShopLayout title="Teslo shop| Search" pageDescription="Las tres B">
      <Typography variant="h1" component="h1">
        Buscar producto
      </Typography>
      {existProducts ? (
        <Typography variant="h2" sx={{ mb: 1 }} textTransform="capitalize">
          {query}
        </Typography>
      ) : (
        <Box display="flex" gap={0.5} marginBottom={2}>
          <Typography variant="h2" sx={{ mb: 1 }}>
            No existen productos con esa etiqueta
          </Typography>
          <Typography variant="h2" sx={{ mb: 1 }} color="secondary">
            {query}
          </Typography>
        </Box>
      )}

      <ProductList products={products as any} />
    </ShopLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const { query = '' } = params as { query: string };
  if (!query.length) {
    return {
      redirect: {
        destination: '/',
        permanent: true,
      },
    };
  }
  let products = await dbProducts.searchTerm(query);

  const existProducts = products.length > 0;
  if (!products.length) {
    products = await dbProducts.getAllProducts();
  }
  return {
    props: {
      products,
      existProducts,
      query,
    },
  };
};
export default SearchPage;
