"use client";

import {
  AccountCircle,
  SearchOutlined,
  ShoppingCartCheckoutOutlined,
} from '@mui/icons-material';
import {
  AppBar,
  Button,
  Container,
  Fab,
  FormControl,
  IconButton,
  InputAdornment,
  OutlinedInput,
  Paper,
  Toolbar,
  Typography,
} from '@mui/material';
import { useRouter } from 'next/navigation';
import { ReactNode } from 'react';

export default function MainLayout({ children }: { children?: ReactNode }) {
  const { push } = useRouter();

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Hyperhire Bookstore
          </Typography>
          <div>
            <FormControl>
              <OutlinedInput
                type="text"
                size="small"
                className="text-white"
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="search books button"
                      onClick={() => console.log('chekh')}
                      edge="end"
                    >
                      {<SearchOutlined />}
                    </IconButton>
                  </InputAdornment>
                }
              />
            </FormControl>
            <Button
              size="large"
              onClick={() => push('/signin')}
              startIcon={<AccountCircle />}
              color="inherit"
            >
              User Login Name
            </Button>
          </div>
        </Toolbar>
      </AppBar>
      <Container maxWidth="xl" className="h-[78vh] overflow-auto py-10">
        {children}
      </Container>
      <Fab
        color="secondary"
        aria-label="checkout"
        sx={{ position: 'fixed', bottom: 30, right: '50%', zIndex: 9999 }}
      >
        <ShoppingCartCheckoutOutlined />
      </Fab>
      <Paper
        sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }}
        elevation={3}
      >
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            &copy; {new Date().getFullYear()} by Nusantara Software Artisan
          </Typography>
        </Toolbar>
      </Paper>
    </>
  );
}
