import {Box, Button, CardActionArea, CardMedia, Grid, Link, Typography} from '@mui/material';

import {FC, useContext} from 'react';
import NextLink from 'next/link';
import {ItemCounter} from '../UI';
import {ICart} from 'interfaces';
import {CartContext} from 'context/cart';

interface Props {
  editable?: boolean;
}

export const CartList: FC<Props> = ({editable = false}) => {
  const {cart: productsInCart, updateCartQuantity, deleteProductInCart} = useContext(CartContext);

  const handlerChangeQuantity = (product: ICart, newQuantity: number) => {
    product.quantify = newQuantity;
    updateCartQuantity(product);
  };
  return (
    <>
      {productsInCart.map((product) => (
        <Grid container key={product.slug + product.size} sx={{mb: 1}}>
          <Grid item xs={3}>
            {/*LLevar a la pagina del producto*/}
            <NextLink href={`/product/${product.slug}`} passHref legacyBehavior>
              <Link>
                <CardActionArea>
                  <CardMedia
                    image={`/products/${product.images}`}
                    component="img"
                    sx={{borderRadius: 5}}
                  />
                </CardActionArea>
              </Link>
            </NextLink>
          </Grid>
          <Grid item xs={7}>
            <Box display="flex" flexDirection="column" marginLeft={1}>
              <Typography variant="body1">{product.title}</Typography>
              <Typography variant="body1">
                Talla:<strong>{product.size}</strong>
              </Typography>
              {editable ? (
                <ItemCounter
                  quantify={product.quantify}
                  maxValue={product.inStock}
                  onChangeQuantify={(newQuantity) => handlerChangeQuantity(product, newQuantity)}
                />
              ) : (
                <Typography variant="h6">{`${product.quantify} ${
                  product.quantify > 1 ? 'Productos' : 'Producto'
                }`}</Typography>
              )}
            </Box>
          </Grid>
          <Grid item xs={2} display="flex" alignItems="center" flexDirection="column">
            <Typography variant="subtitle1">{`$${product.price}`}</Typography>
            {editable && (
              <Button variant="text" color="secondary" onClick={() => deleteProductInCart(product)}>
                Remover
              </Button>
            )}
          </Grid>
        </Grid>
      ))}
    </>
  );
};
