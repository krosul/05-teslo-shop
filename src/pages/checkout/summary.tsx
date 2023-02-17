import {
  Card,
  CardContent,
  Divider,
  Grid,
  Typography,
  Box,
  Button,
  Link,
} from '@mui/material';
import { ShopLayout } from '../../components/Layouts/ShopLayout';
import NextLink from 'next/link';
import { CartList, OrderResume } from '@/components/Cart';
const summaryPage = () => {
  return (
    <ShopLayout title="Resumen de orden" pageDescription="resumen de orden ">
      <Typography variant="h1" component="h1">
        Resumen de orden
      </Typography>
      <Grid container>
        <Grid item xs={12} sm={7}>
          <CartList />
        </Grid>
        <Grid item xs={12} sm={5}>
          <Card className="summary-card">
            <CardContent>
              <Typography variant="h2">Resumen (3 productos)</Typography>
              <Divider sx={{ my: 1 }} />
              <Box display="flex" justifyContent="end" alignItems="center">
                <NextLink passHref legacyBehavior href="/checkout/address">
                  <Link underline="always">Editar</Link>
                </NextLink>
              </Box>
              <Typography variant="subtitle1">Direccion del envio</Typography>
              <Typography>Juan Pablo Rodriguez</Typography>
              <Typography>*****</Typography>
              <Typography>Soacha ciudad verde</Typography>
              <Typography>Canada</Typography>
              <Typography>3115074806</Typography>

              <Box display="flex" justifyContent="end" alignItems="center">
                <NextLink passHref legacyBehavior href="/cart">
                  <Link underline="always">Editar</Link>
                </NextLink>
              </Box>

              <OrderResume />
              <Box sx={{ mt: 3 }}>
                <Button color="secondary" className="circular-btn" fullWidth>
                  Confirmar orden
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </ShopLayout>
  );
};

export default summaryPage;
