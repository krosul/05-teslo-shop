import React from 'react';
import NextLink from 'next/link';
import { AuthLayout } from '@/components/Layouts';
import {
  Box,
  Grid,
  Typography,
  TextField,
  Button,
  Link,
  Divider,
} from '@mui/material';

const RegisterPage = () => {
  return (
    <AuthLayout title="Inicia sesion">
      <Box sx={{ width: 350, padding: '10px 20px' }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="h1" component="h1">
              Registrate
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <TextField label="Nombre" variant="filled" fullWidth />
          </Grid>
          <Grid item xs={12}>
            <TextField label="Correo" variant="filled" fullWidth />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Contraseña"
              type="password"
              variant="filled"
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              color="secondary"
              className="circular-btn"
              size="large"
              fullWidth
            >
              Registrarse
            </Button>
          </Grid>
          <Grid
            item
            xs={12}
            display="flex"
            justifyContent="center"
            alignItems="center"
            gap={2}
          >
            <Divider sx={{ width: '45%', fontSize: '15px' }} />
            <Typography variant="h6">O</Typography>
            <Divider sx={{ width: '45%', fontSize: '15px' }} />
          </Grid>
          <Grid item xs={12} display="grid" justifyItems="center">
            <NextLink href="/auth/login" passHref legacyBehavior>
              <Link underline="always">Inicia sesion</Link>
            </NextLink>
          </Grid>
        </Grid>
      </Box>
    </AuthLayout>
  );
};

export default RegisterPage;
