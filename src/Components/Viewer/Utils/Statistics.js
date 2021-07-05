/**
 * Inspired by https://en.wikipedia.org/wiki/Algorithms_for_calculating_variance
 * Hope it works, didn't found good lib in js for this.
 */

export default class Statistics {
  constructor() {
    this._count = 0;
    this._mean = 0;
    this._M2 = 0;
  }

  update(x) {
    this._count += 1;
    const delta = x - this._mean;
    this._mean += delta / this._count;
    const delta2 = x - this._mean;
    this._M2 += delta * delta2;
    return this;
  }

  get count() {
    return this._count;
  }

  get mean() {
    if (this._count < 2) {
      return Number.NaN;
    }
    return this._mean;
  }

  get variance() {
    if (this._count < 2) {
      return Number.NaN;
    }
    return this._M2 / this._count;
  }

  get sampleVar() {
    if (this._count < 2) {
      return Number.NaN;
    }
    return this._M2 / (this._count - 1);
  }

  isOutlier(x, sigmas = 3) {
    const zScore = (x - this.mean) / Math.sqrt(this.variance);
    return Number.isNaN(zScore) || Math.abs(zScore) > sigmas;
  }
}
