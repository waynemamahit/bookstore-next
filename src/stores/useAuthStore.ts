import { create } from 'zustand';
import { GetUser } from '../interfaces/Auth';
import { AuthUser } from '../models/Auth';

export type AuthStore = {
  auth: GetUser;
  setAuth: (newAuth: GetUser) => void;
};

export const useAuthStore = create<AuthStore>((set) => ({
  auth: new AuthUser(),
  setAuth: (newAuth: GetUser) => set(() => ({ auth: newAuth })),
}));
