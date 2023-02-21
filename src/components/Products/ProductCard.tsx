import {
  Grid,
  Card,
  CardActionArea,
  CardMedia,
  Box,
  Typography,
  Link,
  Chip,
} from '@mui/material';
import { IProduct } from 'interfaces';

import NextLink from 'next/link';
import { FC, useMemo, useState } from 'react';

interface Props {
  product: IProduct;
}

export const ProductCard: FC<Props> = ({ product }) => {
  const [IsHovered, setIsHovered] = useState(false);
  const [isImageLoader, setIsImageLoader] = useState(false);

  const productImage = useMemo(() => {
    return IsHovered
      ? `/products/${product.images[1]}`
      : `/products/${product.images[0]}`;
  }, [IsHovered, product.images]);
  const inStock = product.inStock <= 0;
  return (
    <Grid
      item
      xs={6}
      sm={4}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Card>
        <NextLink href={`/products/${product.slug}`} passHref legacyBehavior>
          <Link>
            <CardActionArea>
              {inStock && (
                <Chip
                  color="primary"
                  label="No hay disponibles"
                  sx={{
                    position: 'absolute',
                    zIndex: '3',
                    top: '10px',
                    left: '15px',
                  }}
                />
              )}
              <CardMedia
                component="img"
                image={productImage}
                alt={product.title}
                className="fadeIn"
                onLoad={() => setIsImageLoader(true)}
              />
            </CardActionArea>
          </Link>
        </NextLink>
      </Card>
      <Box
        sx={{ mt: 1, display: isImageLoader ? 'block' : 'none' }}
        className="fadeIn"
      >
        <Typography fontWeight={700}>{product.title}</Typography>
        <Typography fontWeight={500}>${product.price}</Typography>
      </Box>
    </Grid>
  );
};
