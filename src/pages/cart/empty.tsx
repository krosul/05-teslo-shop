import { ShopLayout } from '@/components/Layouts';
import { RemoveShoppingCartOutlined } from '@mui/icons-material';
import { Box, Link, Typography } from '@mui/material';
import Nextlink from 'next/link';

const emptyPage = () => {
  return (
    <ShopLayout
      title="Carrito de compra vacio"
      pageDescription="No hay articulos en el carrito"
    >
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="calc(100vh - 200px)"
        sx={{ flexDirection: { xs: 'column', sm: 'row' } }}
      >
        <RemoveShoppingCartOutlined sx={{ fontSize: 100 }} />
        <Box display="flex" flexDirection="column" alignItems="center">
          <Typography>Su carrio esta vacio</Typography>
          <Nextlink href="/" passHref legacyBehavior>
            <Link typography="h6" color="secondary">
              Regresar
            </Link>
          </Nextlink>
        </Box>
      </Box>
    </ShopLayout>
  );
};

export default emptyPage;
