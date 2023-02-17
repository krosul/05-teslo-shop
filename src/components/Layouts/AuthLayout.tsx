import { Box } from '@mui/material';
import Head from 'next/head';
import React, { FC } from 'react';

interface Props extends React.PropsWithChildren {
  title: string;
}

export const AuthLayout: FC<Props> = ({ children, title }) => {
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <main>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          height="calc(100dvh - 200px)"
        >
          {children}
        </Box>
      </main>
    </>
  );
};
