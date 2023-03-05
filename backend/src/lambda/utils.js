class Logger {
  constructor (active = false) {
    this.active = active;
  }

  log (...args) {
    if (this.active) {
      console.log(...args);
    }
  }
}

const logger = new Logger(false);

export { Logger, logger };
