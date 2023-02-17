import {
  Card,
  CardContent,
  Divider,
  Grid,
  Typography,
  Box,
  Button,
} from '@mui/material';
import { ShopLayout } from '../../components/Layouts/ShopLayout';
import { CartList, OrderResume } from '@/components/Cart';
const CartPage = () => {
  return (
    <ShopLayout title="Carro - ${cantidad}" pageDescription="carrito de compra">
      <Typography variant="h1" component="h1">
        Carrito
      </Typography>
      <Grid container>
        <Grid item xs={12} sm={7}>
          <CartList editable />
        </Grid>
        <Grid item xs={12} sm={5}>
          <Card className="summary-card">
            <CardContent>
              <Typography variant="h2">Orden</Typography>
              <Divider sx={{ my: 1 }} />
              <OrderResume />
              <Box sx={{ mt: 3 }}>
                <Button color="secondary" className="circular-btn" fullWidth>
                  Checkout
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </ShopLayout>
  );
};

export default CartPage;
