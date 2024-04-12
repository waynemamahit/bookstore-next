'use client';

import TextField from '@mui/material/TextField';
import { useForm } from 'react-hook-form';
import AuthLayout from '../../components/layouts/AuthLayout';
import { SigninDto } from '../../validations/zod/auth.validation';

export default function SignIn() {
  const { register, handleSubmit } = useForm<SigninDto>();
  const onSubmit = (data: SigninDto) => {
    console.log(data);
  };

  return (
    <AuthLayout
      title="Sign in"
      action={{
        url: 'signup',
        label: "Don't have an account? Sign Up",
      }}
      auth={null}
      onSubmit={handleSubmit(onSubmit)}
    >
      <TextField
        margin="normal"
        required
        fullWidth
        id="email"
        label="Email Address"
        autoComplete="email"
        autoFocus
        {...register('email')}
      />
      <TextField
        margin="normal"
        required
        fullWidth
        label="Password"
        type="password"
        id="password"
        autoComplete="current-password"
        {...register('password')}
      />
    </AuthLayout>
  );
}
