import { ShopLayout } from '@/components/Layouts';
import { Typography } from '@mui/material';
import { GetServerSideProps, NextPage } from 'next';
import { ProductList } from '@/components/Products';
import { dbProducts } from 'database';
import { IProduct } from 'interfaces';

interface Props {
  products: IProduct[];
}

const SearchPage: NextPage<Props> = ({ products }) => {
  // if (isLoading) return <div>loading...</div>;
  return (
    <ShopLayout title="Teslo shop| Search" pageDescription="Las tres B">
      <Typography variant="h1" component="h1">
        Buscar producto
      </Typography>
      <Typography variant="h2" sx={{ mb: 1 }}>
        ABC--123
      </Typography>

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

  return {
    props: {
      products,
    },
  };
};
export default SearchPage;
