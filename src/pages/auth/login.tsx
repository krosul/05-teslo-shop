import {useRouter} from 'next/router';
import {useState, useContext} from 'react';
import NextLink from 'next/link';
import {AuthLayout} from '@/components/Layouts';
import {Box, Grid, Typography, TextField, Button, Link, Divider, Chip} from '@mui/material';
import {useForm} from 'react-hook-form';
import {validations} from 'utils';

import {ErrorOutline} from '@mui/icons-material';
import {AuthContext} from 'context/auth';

type FormData = {
  email: string;
  password: string;
};
const loginPage = () => {
  const {
    register,
    handleSubmit,
    formState: {errors},
  } = useForm<FormData>();

  const {logginUser} = useContext(AuthContext);
  const router = useRouter();
  const [showMessageError, setShowMessageError] = useState(false);

  const onLogginUser = async ({email, password}: FormData) => {
    setShowMessageError(false);
    const islogginSuccess = await logginUser(email, password);

    if (!islogginSuccess) {
      setShowMessageError(true);
      setTimeout(() => setShowMessageError(false), 3000);
      return;
    }
    const destination = router.query.p?.toString() || '/';
    router.replace(destination);
  };

  return (
    <AuthLayout title="Inicia sesion">
      <form onSubmit={handleSubmit(onLogginUser)}>
        <Box sx={{width: 350, padding: '10px 20px'}}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="h1" component="h1">
                Iniciar sesion
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Correo"
                variant="filled"
                fullWidth
                {...register('email', {
                  required: 'Este campo es requerido',
                  validate: validations.isEmail,
                })}
                error={!!errors.email}
                helperText={errors.email?.message}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Contraseña"
                type="password"
                variant="filled"
                fullWidth
                {...register('password', {
                  required: 'Este campo es requerido',
                  minLength: {value: 6, message: 'Minimo 6 caracteres'},
                })}
                error={!!errors.password}
                helperText={errors.password?.message}
              />
            </Grid>
            <Grid item xs={12}>
              {showMessageError && (
                <Chip
                  label="No existe ese correo o contraseña"
                  color="error"
                  icon={<ErrorOutline />}
                  className="fadeIn"
                  sx={{display: 'flex', padding: 1, marginY: 0.5}}
                />
              )}
              <Button
                type="submit"
                color="secondary"
                className="circular-btn"
                size="large"
                fullWidth
                disabled={showMessageError}
              >
                Ingresar
              </Button>
            </Grid>
            <Grid item xs={12} display="flex" justifyContent="center" alignItems="center" gap={2}>
              <Divider sx={{width: '45%', fontSize: '15px'}} />
              <Typography variant="h6">O</Typography>
              <Divider sx={{width: '45%', fontSize: '15px'}} />
            </Grid>
            <Grid item xs={12} display="grid" justifyItems="center">
              <NextLink href={`/auth/register?p=${router.query.p || '/'}`} passHref legacyBehavior>
                <Link underline="always">Registrarse</Link>
              </NextLink>
            </Grid>
          </Grid>
        </Box>
      </form>
    </AuthLayout>
  );
};

export default loginPage;
