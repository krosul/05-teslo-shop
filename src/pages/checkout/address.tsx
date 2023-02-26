import {ShopLayout} from '@/components/Layouts';
import {
  Box,
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from '@mui/material';
import {useRouter} from 'next/router';
import {useForm} from 'react-hook-form';
import {countries} from 'utils';
import Cookies from 'js-cookie';
import {useContext} from 'react';
import {CartContext} from 'context/cart';

type FormData = {
  name: string;
  lastName: string;
  address: string;
  address2: string;
  zip: string;
  city: string;
  country: string;
  phone: string;
};

const getAddressfromCookies = (): FormData => {
  return {
    name: Cookies.get('name') || '',
    lastName: Cookies.get('lastName') || '',
    address: Cookies.get('address') || '',
    address2: Cookies.get('address2') || '',
    zip: Cookies.get('zip') || '',
    city: Cookies.get('city') || '',
    country: Cookies.get('country') || '',
    phone: Cookies.get('phone') || '',
  };
};

const addressPage = () => {
  const router = useRouter();
  const {updateAddress} = useContext(CartContext);
  const {
    register,
    handleSubmit,
    formState: {errors},
  } = useForm<FormData>({
    defaultValues: getAddressfromCookies(),
  });
  const onSubmit = (data: FormData) => {
    updateAddress(data);
    router.push('/checkout/summary');
  };
  return (
    <ShopLayout
      title="direccion | checkout"
      pageDescription={'confirmar direccion del checkout o destino'}
    >
      <Typography variant="h1" component="h1">
        Direccion
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={2} sx={{mt: 2}}>
          <Grid item xs={12} sm={6}>
            <TextField
              label="nombre"
              variant="filled"
              fullWidth
              {...register('name', {required: 'Este campo es requerido'})}
              error={!!errors.name}
              helperText={errors.name?.message}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="apellido"
              variant="filled"
              fullWidth
              {...register('lastName', {required: 'Este campo es requerido'})}
              error={!!errors.lastName}
              helperText={errors.lastName?.message}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              label="Direccion*"
              variant="filled"
              fullWidth
              {...register('address', {required: 'Este campo es requerido'})}
              error={!!errors.address}
              helperText={errors.address?.message}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField label="Direccion2" variant="filled" fullWidth {...register('address2')} />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              label="Codigo postal"
              variant="filled"
              fullWidth
              {...register('zip', {required: 'Este campo es requerido'})}
              error={!!errors.zip}
              helperText={errors.zip?.message}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Ciudad"
              variant="filled"
              fullWidth
              {...register('city', {required: 'Este campo es requerido'})}
              error={!!errors.city}
              helperText={errors.city?.message}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <TextField
                key={Cookies.get('country') || countries[0].code}
                select
                defaultValue={Cookies.get('country') || countries[0].code}
                variant="filled"
                label="Pais"
                {...register('country', {required: 'Este campo es requerido'})}
                error={!!errors.country}
                helperText={errors.country?.message}
              >
                {countries.map((co) => (
                  <MenuItem key={co.code} value={co.code}>
                    {co.name}
                  </MenuItem>
                ))}
              </TextField>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Telefono"
              variant="filled"
              fullWidth
              {...register('phone', {required: 'Este campo es requerido'})}
              error={!!errors.phone}
              helperText={errors.phone?.message}
            />
          </Grid>
        </Grid>
        <Box display="flex" justifyContent="center" alignItems="center" sx={{mt: 5}} gap={2}>
          <Button color="secondary" className="circular-btn" size="large" type="submit">
            Revisar pedido
          </Button>
          {/* <Button color="info" className="circular-btn" size="large">
          Guardar direccion
        </Button> */}
        </Box>
      </form>
    </ShopLayout>
  );
};

export default addressPage;
