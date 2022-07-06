import { logEvents } from "./event-logger.js";

function hundleError(err, req, res, next) {
  logEvents(`${err.name}: ${err.message}`, 'errr-log.txt')
  console.log(err.stack);
  res.status(500).json({ error: err.message });

}

export default hundleError;
