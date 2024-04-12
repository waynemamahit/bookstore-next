import { BaseResult } from '../../models/Base';

export default class BaseService {
  protected checkDBError<Data>(result: BaseResult<Data>) {
    if (result.error !== null) {
      const errMsg = result.error.message.split('\n');
      if (errMsg.length > 0) {
        result.error.message = errMsg[errMsg.length - 1];
      }
      throw result;
    }
  }
}
