import { FC } from 'react';
import { ISizes } from '../../../interfaces/products';
import { Box, Button } from '@mui/material';

interface Props {
  selectedSize?: ISizes;
  sizes: ISizes[];
}

export const SizeSelector: FC<Props> = ({ selectedSize, sizes }) => {
  return (
    <Box>
      {sizes.map((s) => (
        <Button
          key={s}
          size="small"
          color={selectedSize === s ? 'primary' : 'info'}
        >
          {s}
        </Button>
      ))}
    </Box>
  );
};
