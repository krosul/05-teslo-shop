import React, {useState, useContext} from 'react';
import NextLink from 'next/link';
import {AuthLayout} from '@/components/Layouts';
import {Box, Grid, Typography, TextField, Button, Link, Divider, Chip} from '@mui/material';
import {useForm} from 'react-hook-form';
import {tesloApi} from 'api';
import {validations} from 'utils';
import {ErrorOutline} from '@mui/icons-material';
import {useRouter} from 'next/router';

import {AuthContext} from 'context/auth';

type FormData = {
  name: string;
  email: string;
  password: string;
};

const RegisterPage = () => {
  const {
    register,
    handleSubmit,
    formState: {errors},
  } = useForm<FormData>();

  const [showMessageError, setShowMessageError] = useState(false);
  const [messageError, setMessageError] = useState('');
  const {registerUser} = useContext(AuthContext);
  const router = useRouter();
  const onRegisterUser = async ({email, password, name}: FormData) => {
    setShowMessageError(false);

    const {hasError, message} = await registerUser(name, email, password);
    if (hasError) {
      setShowMessageError(true);
      setMessageError(message!);
      setTimeout(() => setShowMessageError(false), 3000);
      return;
    }
    router.replace('/');
  };

  return (
    <AuthLayout title="Registrate">
      <form onSubmit={handleSubmit(onRegisterUser)}>
        <Box sx={{width: 350, padding: '10px 20px'}}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="h1" component="h1">
                Registrate
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Nombre"
                variant="filled"
                fullWidth
                {...register('name', {
                  required: 'Este campo es requerido',
                  minLength: {value: 2, message: 'Minimo 2 caracteres'},
                })}
                error={!!errors.name}
                helperText={errors.name?.message}
              />
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
                  label="Lo sentimos algo ha salido mal"
                  color="error"
                  icon={<ErrorOutline />}
                  className="fadeIn"
                  sx={{display: 'flex', padding: 1, marginY: 0.5}}
                />
              )}
              <Button
                color="secondary"
                className="circular-btn"
                size="large"
                fullWidth
                type="submit"
                disabled={showMessageError}
              >
                Registrarse
              </Button>
            </Grid>
            <Grid item xs={12} display="flex" justifyContent="center" alignItems="center" gap={2}>
              <Divider sx={{width: '45%', fontSize: '15px'}} />
              <Typography variant="h6">O</Typography>
              <Divider sx={{width: '45%', fontSize: '15px'}} />
            </Grid>
            <Grid item xs={12} display="grid" justifyItems="center">
              <NextLink href="/auth/login" passHref legacyBehavior>
                <Link underline="always">Inicia sesion</Link>
              </NextLink>
            </Grid>
          </Grid>
        </Box>
      </form>
    </AuthLayout>
  );
};

export default RegisterPage;
