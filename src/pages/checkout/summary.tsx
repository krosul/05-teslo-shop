import {Card, CardContent, Divider, Grid, Typography, Box, Button, Link} from '@mui/material';
import {ShopLayout} from '@/components/Layouts/ShopLayout';
import NextLink from 'next/link';
import {CartList, OrderResume} from '@/components/Cart';
import {useContext} from 'react';
import {CartContext} from 'context/cart';
import {countries} from 'utils';
const summaryPage = () => {
  const {shippingAddress, numberOfItems} = useContext(CartContext);
  console.log(shippingAddress);

  if (!shippingAddress) {
    return <></>;
  }
  const {name, phone, zip, address, address2 = '', city, country, lastName} = shippingAddress;
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
              <Typography variant="h2">
                Resumen ({numberOfItems} {numberOfItems === 1 ? 'producto' : 'productos'})
              </Typography>
              <Divider sx={{my: 1}} />
              <Box display="flex" justifyContent="end" alignItems="center">
                <NextLink passHref legacyBehavior href="/checkout/address">
                  <Link underline="always">Editar</Link>
                </NextLink>
              </Box>
              <Typography variant="subtitle1">Direccion del envio</Typography>
              <Typography>{`${name} ${lastName}`}</Typography>
              <Typography>{address}</Typography>
              <Typography>
                {city},{zip}
              </Typography>
              <Typography>{countries.find((co) => co.code === country)?.name}</Typography>
              <Typography>{phone}</Typography>

              <Box display="flex" justifyContent="end" alignItems="center">
                <NextLink passHref legacyBehavior href="/cart">
                  <Link underline="always">Editar</Link>
                </NextLink>
              </Box>

              <OrderResume />
              <Box sx={{mt: 3}}>
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
