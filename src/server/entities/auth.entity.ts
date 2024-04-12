export interface GetAccessToken {
  id: number;
  token: string;
  user_id: number;
  created_at: Date;
}

export interface CreateUserData {
  name: string;
  email: string;
  password: string;
  role_id: number;
}
