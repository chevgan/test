import React, { useState } from 'react';
import { Button, FormHelperText, IconButton, InputAdornment, InputLabel, OutlinedInput, Stack } from '@mui/material';
import useAuth from 'hooks/useAuth';
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import Grid from "@mui/material/Grid2";
import {useNavigate} from "react-router-dom";

const AuthResetPassword = () => {
  const { changePassword } = useAuth();
  const navigate = useNavigate();
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleShowOldPassword = () => setShowOldPassword((prev) => !prev);
  const handleShowNewPassword = () => setShowNewPassword((prev) => !prev);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!oldPassword) {
      setError('Старый пароль обязателен');
      return;
    }
    if (!newPassword) {
      setError('Новый пароль обязателен');
      return;
    }

    setSubmitting(true);
    try {
      await changePassword(oldPassword, newPassword);
      setSubmitting(false);
      navigate('/login', { replace: true });
    } catch (err: unknown) {
      setSubmitting(false);
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
              <InputLabel htmlFor="old-password">Старый пароль</InputLabel>
              <OutlinedInput
                  id="old-password"
                  type={showOldPassword ? 'text' : 'password'}
                  value={oldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton onClick={handleShowOldPassword} edge="end">
                        {showOldPassword ? <VisibilityIcon/> : <VisibilityOffIcon/>}
                      </IconButton>
                    </InputAdornment>
                  }
                  fullWidth
              />
            </Stack>
          </Grid>

          <Grid size={12}>
            <Stack spacing={1}>
              <InputLabel htmlFor="new-password">Новый пароль</InputLabel>
              <OutlinedInput
                  id="new-password"
                  type={showNewPassword ? 'text' : 'password'}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton onClick={handleShowNewPassword} edge="end">
                        {showNewPassword ? <VisibilityIcon/> : <VisibilityOffIcon/>}
                      </IconButton>
                    </InputAdornment>
                  }
                  fullWidth
              />
            </Stack>
          </Grid>

          {error && (
              <Grid size={12}>
                <FormHelperText error>{error}</FormHelperText>
              </Grid>
          )}

          <Grid size={12}>
            <Button disableElevation disabled={submitting} fullWidth size="large" type="submit" variant="contained" color="primary">
              Подтвердить
            </Button>
          </Grid>
        </Grid>
      </form>
  );
}

export default AuthResetPassword;