import { PrismaClient } from '@prisma/client';
import { BaseResult, ErrorResult } from '../../models/Base';

export class BaseRepository {
  protected prisma = new PrismaClient();

  protected async query<QueryReturn>(
    command: () => Promise<QueryReturn | null>,
    result = new BaseResult<QueryReturn>()
  ) {
    try {
      result.data = await command();
    } catch (error) {
      result.error = error as ErrorResult;
    }
    return result;
  }
}
