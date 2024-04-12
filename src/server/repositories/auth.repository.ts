import { GetRole, GetUser } from '../../interfaces/Auth';
import { CreateUserData, GetAccessToken } from '../entities/auth.entity';
import { BaseRepository } from './base.repository';

export default class AuthRepository extends BaseRepository {
  createRole = (name: string) =>
    this.query<GetRole>(() =>
      this.prisma.role.create({
        data: {
          name,
        },
      })
    );

  getRoles = (role_ids: number[] = []) =>
    this.query<GetRole[]>(() =>
      this.prisma.role.findMany({
        where: {
          id: {
            in: role_ids.length > 0 ? role_ids : undefined,
          },
        },
      })
    );

  getUser = (email: string) =>
    this.query<GetUser>(() =>
      this.prisma.user.findFirst({
        where: {
          OR: [
            {
              email: {
                contains: email,
              },
            },
          ],
        },
        include: {
          customer: true,
          role: true,
        },
      })
    );

  createUser = (data: CreateUserData) =>
    this.query<GetUser>(() =>
      this.prisma.user.create({
        data,
        include: {
          customer: true,
          role: true,
        },
      })
    );

  createToken = (user_id: number, token: string) =>
    this.query<GetAccessToken>(() =>
      this.prisma.personalAccessToken.create({
        data: {
          token,
          user_id,
          created_at: new Date(),
        },
      })
    );

  getToken = (user_id: number, token: string) =>
    this.query<GetAccessToken>(() =>
      this.prisma.personalAccessToken.findFirst({
        where: {
          user_id,
          token,
        },
      })
    );

  deleteToken = (user_id: number) =>
    this.query<{ count: number }>(() =>
      this.prisma.personalAccessToken.deleteMany({
        where: {
          user_id,
        },
      })
    );
}
