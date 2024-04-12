'use client';

import { AddShoppingCart } from '@mui/icons-material';
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Chip,
  Stack,
  Typography,
  Grid,
} from '@mui/material';
import MainLayout from '../components/layouts/MainLayout';

export default function Home() {
  return (
    <MainLayout>
      <Grid container justifyContent={'center'} spacing={2} columns={12}>
        {Array.from(Array(12)).map((_, index) => (
          <Grid key={'book-' + index} item xs={12} sm={6} md={4} lg={3}>
            <Card sx={{ maxWidth: 345 }}>
              <CardMedia
                component="img"
                alt="book"
                src="https://img.freepik.com/free-vector/hand-drawn-flat-design-stack-books-illustration_23-2149341898.jpg?size=338&ext=jpg&ga=GA1.1.735520172s.1710979200&semt=ais"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  Book Title
                </Typography>
                <Typography gutterBottom variant="h6" component="div">
                  Author:
                </Typography>
                <Typography
                  variant="subtitle1"
                  color="text.secondary"
                  component="div"
                >
                  Price :
                </Typography>
                <Stack direction="row" spacing={1}>
                  <Chip label="Tag" variant="outlined" color="primary" />
                </Stack>
              </CardContent>
              <CardActions>
                <Button
                  size="large"
                  startIcon={<AddShoppingCart />}
                  color="secondary"
                  variant="outlined"
                >
                  Buy
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </MainLayout>
  );
}
