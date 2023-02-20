import React from 'react';
import {
  NextPage,
  GetServerSideProps,
  GetStaticProps,
  GetStaticPaths,
} from 'next';
import { ShopLayout } from '../../components/Layouts/ShopLayout';
import { initialData } from 'database/products';
import { Box, Button, Chip, Grid, Typography } from '@mui/material';
import { ItemCounter, SlideShow } from '@/components/UI';
import { SizeSelector } from '@/components/Products';
// import { useProducts } from 'hooks';
import { IProduct } from 'interfaces';
import { dbProducts } from 'database';

// const product = initialData.products[0];
interface Props {
  product: IProduct;
}
const ProductDetailPage: NextPage<Props> = ({ product }) => {
  // const router = useRouter();
  // const {
  //   error,
  //   isLoading,
  //   products: product,
  // } = useProducts(`/products/${router.query.slug}`);
  // if (isLoading) {
  //   return <h1>Cargando</h1>;
  // }
  return (
    <ShopLayout title={product.title} pageDescription={product.description}>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={7}>
          <SlideShow images={product.images} />
        </Grid>
        <Grid item xs={12} sm={5}>
          <Box display="flex" flexDirection="column">
            <Typography variant="h1" component="h1">
              {product.title}
            </Typography>
            <Typography variant="subtitle1" component="h2">
              ${product.price}
            </Typography>
            <Box sx={{ my: 2 }}>
              <Typography variant="subtitle2">Cantidad</Typography>
              <ItemCounter />
              <SizeSelector
                selectedSize={product.sizes[0]}
                sizes={product.sizes}
              />
            </Box>
            <Button color="secondary" className="circular-btn">
              Agregar al carrito
            </Button>

            <Chip label="No hay disponibles" color="error" variant="outlined" />
          </Box>
          <Box sx={{ mt: 3 }}>
            <Typography variant="subtitle1">Descripcion</Typography>
            <Typography variant="body2">{product.description}</Typography>
          </Box>
        </Grid>
      </Grid>
    </ShopLayout>
  );
};

// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time
export default ProductDetailPage;

// You should use getStaticProps when:
//- The data required to render the page is available at build time ahead of a user’s request.
//- The data comes from a headless CMS.
//- The data can be publicly cached (not user-specific).
//- The page must be pre-rendered (for SEO) and be very fast — getStaticProps generates HTML and JSON files, both of which can be cached by a CDN for performance.

// You should use getStaticPaths if you’re statically pre-rendering pages that use dynamic routes

export const getStaticPaths: GetStaticPaths = async (ctx) => {
  const Slugs = await dbProducts.getAllProducsSlugs();

  return {
    paths: Slugs.map(({ slug }) => ({
      params: { slug },
    })),
    fallback: 'blocking',
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { slug } = params as { slug: string };
  const product = await dbProducts.getProductBySlug(`${slug}`);

  if (!product) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }
  return {
    props: {
      product,
    },
    revalidate: 86400,
  };
};
