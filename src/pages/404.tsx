import React from 'react';
import { ShopLayout } from '../components/Layouts/ShopLayout';
import { Box, Typography } from '@mui/material';

const NotFoundPage = () => {
  return (
    <ShopLayout title="Pagina no encontrada" pageDescription="">
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="calc(100vh - 200px)"
        flexDirection={{ xs: 'column', sm: 'row' }}
      >
        <Typography
          variant="h1"
          component="h1"
          fontSize={75}
          fontWeight={200}
          textAlign="center"
        >
          404|
        </Typography>
        <Typography
          variant="h1"
          component="h1"
          fontWeight={200}
          textAlign="center"
          marginLeft={2}
        >
          Pagina no encontrada
        </Typography>
      </Box>
    </ShopLayout>
  );
};

export default NotFoundPage;
