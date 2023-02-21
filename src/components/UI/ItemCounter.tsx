import { AddCircleOutline, RemoveCircleOutline } from '@mui/icons-material';
import { Box, IconButton, Typography } from '@mui/material';
import { FC } from 'react';

interface Props {
  quantify: number;
  maxValue: number;
  onChangeQuantify: (n: number) => void;
}

export const ItemCounter: FC<Props> = ({
  quantify,
  onChangeQuantify,
  maxValue,
}) => {
  return (
    <Box display="flex" alignItems="center">
      <IconButton
        onClick={() =>
          onChangeQuantify(quantify !== 1 ? quantify - 1 : quantify)
        }
      >
        <RemoveCircleOutline />
      </IconButton>
      <Typography sx={{ width: 40, textAlign: 'center' }}>
        {quantify}
      </Typography>
      <IconButton
        onClick={() =>
          onChangeQuantify(quantify < maxValue ? quantify + 1 : quantify)
        }
      >
        <AddCircleOutline />
      </IconButton>
    </Box>
  );
};
