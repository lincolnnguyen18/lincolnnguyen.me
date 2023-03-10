import { userHandlers } from '../handlers/userHandlers.mjs';
import { transcribeHandlers } from '../handlers/transcribeHandlers.mjs';

class DdbStreamRecordHandler {
  constructor () {
    this.handlers = [];
  }

  addHandler (handler) {
    this.handlers.push(handler);
  }

  async handle (record) {
    for (const handler of this.handlers) {
      await handler.handle(record);
    }
  }
}

const ddbStreamRecordHandler = new DdbStreamRecordHandler();
ddbStreamRecordHandler.addHandler(userHandlers);
ddbStreamRecordHandler.addHandler(transcribeHandlers);

export { ddbStreamRecordHandler };
