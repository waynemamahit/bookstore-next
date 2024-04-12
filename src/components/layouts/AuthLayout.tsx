import { ArrowBack } from '@mui/icons-material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import {
  Avatar,
  Box,
  Button,
  CircularProgress,
  Container,
  Grid,
  Typography,
} from '@mui/material';
import { useRouter } from 'next/navigation';
import React, { ReactNode, useState } from 'react';
import { AuthUser } from '../../models/Auth';

export default function AuthLayout({
  title,
  action,
  children,
  auth = null,
  onSubmit,
}: {
  title: string;
  action: {
    url: string;
    label: string;
  };
  children?: ReactNode;
  auth: AuthUser | null;
  onSubmit: (
    e?: React.BaseSyntheticEvent<object, any, any> | undefined
  ) => Promise<void>;
}) {
  const { push } = useRouter();
  const [loadLogout, setLoadLogout] = useState(false);

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          {auth === null ? title : 'User has been logged in'}
        </Typography>
        {auth === null ? (
          <Box component={'form'} onSubmit={onSubmit} sx={{ mt: 1 }}>
            {children}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              {title}
            </Button>
            <Grid container>
              <Grid item xs={12}>
                <Button variant="text" onClick={() => push('/' + action.url)}>
                  {action.label}
                </Button>
              </Grid>
              <Grid item xs={12}>
                <Button
                  variant="text"
                  startIcon={<ArrowBack />}
                  onClick={() => push('/')}
                >
                  Back to Home
                </Button>
              </Grid>
            </Grid>
          </Box>
        ) : (
          <Button
            type="submit"
            fullWidth
            variant="outlined"
            onClick={() => {
              setLoadLogout(true);
              setTimeout(() => {
                setLoadLogout(false);
              }, 3000);
            }}
          >
            {loadLogout ? (
              <CircularProgress color="primary" size={24} />
            ) : (
              'Logout'
            )}
          </Button>
        )}
        <Typography
          variant="body2"
          color="text.secondary"
          align="center"
          sx={{ mt: 8, mb: 4 }}
        >
          © Hyperhire Bookstore {new Date().getFullYear()} by Nusantara Software
          Artisan
        </Typography>
      </Box>
    </Container>
  );
}
