import { ShopLayout } from '@/components/Layouts';
import { Chip, Grid, Link, Typography } from '@mui/material';
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import NextLink from 'next/link';
const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 100 },
  { field: 'fullName', headerName: 'Nombre Completo', width: 300 },
  {
    field: 'paid',
    headerName: 'Pagada',
    description: 'Muestra informacion del estado del pago',
    width: 200,
    renderCell: (params: GridRenderCellParams) => {
      return params.row.paid ? (
        <Chip color="success" label="Pagada" variant="outlined" />
      ) : (
        <Chip color="error" label="No pagada" variant="outlined" />
      );
    },
  },
  {
    field: 'id',
    headerName: 'Links',
    width: 100,
    renderCell: (params: GridRenderCellParams) => (
      <NextLink href={`/orders/${params.row.id}`} legacyBehavior passHref>
        <Link underline="always">Ver orden</Link>
      </NextLink>
    ),
    description: 'Link hacia la orden',
    sortable: false,
  },
];

const row = [
  { id: 1, fullName: 'Juan Pablo Rodriguez', paid: true },
  { id: 2, fullName: 'Cesar Rodriguez', paid: false },
  { id: 3, fullName: 'Urbanibel Piñero', paid: true },
  { id: 4, fullName: 'Sebas Rodriguez', paid: false },
  { id: 5, fullName: 'Cesita rodriguez', paid: true },
];

const historyPage = () => {
  return (
    <ShopLayout
      title="Historial de ordenes"
      pageDescription="Historial de ordenes"
    >
      <Typography variant="h1" component="h1">
        Historial de ordenes
      </Typography>

      <Grid container>
        <Grid item xs={12} sx={{ height: 650, width: '100%' }}>
          <DataGrid
            rows={row}
            columns={columns}
            pageSize={10}
            rowsPerPageOptions={[10]}
          />
        </Grid>
      </Grid>
    </ShopLayout>
  );
};

export default historyPage;
