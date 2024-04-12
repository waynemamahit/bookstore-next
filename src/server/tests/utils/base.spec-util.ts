import { expect } from 'vitest';
import { APIResponse } from '../../../models/Base';

export const parseJson = async <ResponseData>(
  response: Response
): Promise<APIResponse<ResponseData>> => {
  const data = await response.json();
  expect(data).toBeTruthy();
  return data as APIResponse<ResponseData>;
};
