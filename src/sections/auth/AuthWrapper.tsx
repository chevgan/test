import { ReactElement } from 'react';
import Box from '@mui/material/Box';
import Grid from "@mui/material/Grid2";

interface Props {
  children: ReactElement;
}

const AuthWrapper = ({ children }: Props) => {
  return (
    <Box
      sx={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: { xs: `calc( 100% - 50px)`, sm: 'auto' }
      }}
    >
      <Grid size={12}>
        <Grid
          size={12}
          container
          justifyContent="center"
          alignItems="center"
          sx={{ minHeight: { xs: 'calc(100vh - 210px)', sm: 'calc(100vh - 134px)', md: 'calc(100vh - 112px)' } }}
        >
          {children}
        </Grid>
      </Grid>
    </Box>
  );
}

export default AuthWrapper;