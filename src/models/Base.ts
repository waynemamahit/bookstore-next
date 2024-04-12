export type ErrorResult = {
  code?: string | number;
  message: string;
};

export class BaseResult<Data> {
  data: Data | null;
  error: ErrorResult | null;

  constructor(data: Data | null = null, error: ErrorResult | null = null) {
    this.data = data;
    this.error = error;
  }
}

export class APIResponse<Data> {
  data: Data | null;
  message: string;
  code: number;
  errors: string | null = null;

  constructor(message = '', code = 200, data: Data | null = null) {
    this.message = message;
    this.code = code;
    this.data = data;
  }
}
