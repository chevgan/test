import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Button, FormHelperText, Link, InputAdornment, InputLabel, OutlinedInput, Stack, IconButton } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

import useAuth from 'hooks/useAuth';
import Grid from "@mui/material/Grid2";

const AuthLogin = () => {
  const { login } = useAuth();
  const [showPassword, setShowPassword] = React.useState(false);
  const [error, setError] = React.useState('');
  const [email, setEmail] = React.useState('admin@demo.com');
  const [password, setPassword] = React.useState('123456');

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      setError('');
      await login(email.trim(), password);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Произошла неизвестная ошибка');
      }
    }
  };

  return (
    <form noValidate onSubmit={handleSubmit}>
      <Grid container spacing={3}>
        <Grid size={12}>
          <Stack spacing={1}>
            <InputLabel htmlFor="email-login">Email</InputLabel>
            <OutlinedInput
              id="email-login"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Введите email"
              fullWidth
            />
          </Stack>
        </Grid>

        <Grid size={12}>
          <Stack spacing={1}>
            <InputLabel htmlFor="password-login">Password</InputLabel>
            <OutlinedInput
              id="password-login"
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton onClick={handleClickShowPassword} edge="end">
                    {showPassword ? <VisibilityIcon/> : <VisibilityOffIcon/>}
                  </IconButton>
                </InputAdornment>
              }
              placeholder="Введите пароль"
              fullWidth
            />
          </Stack>
        </Grid>

        <Grid size={12} sx={{ mt: -1 }}>
          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Link component={RouterLink} to="/reset-password" color="text.primary">
              Сменить пароль
            </Link>
          </Stack>
        </Grid>

        {error && (
            <Grid size={12}>
            <FormHelperText error>{error}</FormHelperText>
          </Grid>
        )}

        <Grid size={12}>
          <Button disableElevation fullWidth size="large" type="submit" variant="contained" color="primary">
            Войти
          </Button>
        </Grid>
      </Grid>
    </form>
  );
}

export default AuthLogin;
