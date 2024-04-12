'use client';

import TextField from '@mui/material/TextField';
import { useForm } from 'react-hook-form';
import AuthLayout from '../../components/layouts/AuthLayout';
import { SignupDto } from '../../validations/zod/auth.validation';

export default function SignUp() {
  const { register, handleSubmit } = useForm<SignupDto>();
  const onSubmit = (data: SignupDto) => {
    console.log(data);
  };

  return (
    <AuthLayout
      title="Sign up"
      action={{
        url: 'signin',
        label: 'Already have an account? Sign in',
      }}
      auth={null}
      onSubmit={handleSubmit(onSubmit)}
    >
      <TextField
        margin="normal"
        autoComplete="given-name"
        required
        fullWidth
        id="fullName"
        label="Name"
        autoFocus
        {...register('name')}
      />
      <TextField
        margin="normal"
        required
        fullWidth
        id="email"
        label="Email Address"
        autoComplete="email"
        {...register('email')}
      />
      <TextField
        margin="normal"
        required
        fullWidth
        label="Password"
        type="password"
        id="password"
        autoComplete="new-password"
        {...register('password')}
      />
    </AuthLayout>
  );
}
