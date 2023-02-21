import { FC } from 'react';
import { ISizes } from '../../../interfaces/products';
import { Box, Button } from '@mui/material';

interface Props {
  selectedSize?: ISizes;
  sizes: ISizes[];
  onSelectedSize: (ar: ISizes) => void;
}

export const SizeSelector: FC<Props> = ({
  selectedSize,
  sizes,
  onSelectedSize,
}) => {
  return (
    <Box>
      {sizes.map((s) => (
        <Button
          key={s}
          size="small"
          color={selectedSize === s ? 'primary' : 'info'}
          onClick={() => onSelectedSize(s)}
        >
          {s}
        </Button>
      ))}
    </Box>
  );
};
