class StopWatch {
  constructor() {
    this.time = new Date().getTime();
  }

  start() {
    this.time = new Date().getTime();
    return this;
  }

  getTime() {
    const newTime = new Date().getTime();
    const oldTime = this.time;
    return 1e-3 * (newTime - oldTime);
  }

  reset() {
    const newTime = new Date().getTime();
    const oldTime = this.time;
    this.time = newTime;
    return 1e-3 * (newTime - oldTime);
  }
}

export default StopWatch;
