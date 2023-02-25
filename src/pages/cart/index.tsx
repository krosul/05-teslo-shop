import {useContext, useEffect} from 'react';
import {Card, CardContent, Divider, Grid, Typography, Box, Button} from '@mui/material';
import {ShopLayout} from '@/components/Layouts';
import {CartList, OrderResume} from '@/components/Cart';
import {CartContext} from 'context/cart';
import {useRouter} from 'next/router';

const CartPage = () => {
  const {isLoaded, cart} = useContext(CartContext);
  const router = useRouter();
  useEffect(() => {
    if (isLoaded && cart.length === 0) {
      router.replace('/cart/empty');
    }
  }, [isLoaded, cart, router]);
  if (!isLoaded) {
    return <></>;
  }
  return (
    <ShopLayout title="Teslo Shop | Carrito" pageDescription="carrito de compra">
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
              <Divider sx={{my: 1}} />
              <OrderResume />
              <Box sx={{mt: 3}}>
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
