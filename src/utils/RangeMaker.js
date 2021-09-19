module.exports = class RangeMaker {
  constructor() {
    const now = new Date();
    this.year = now.getFullYear();
    this.nthHalf = now.getMonth() > 7 ? 2 : 1;
  }

  getRange() {
    if (this.nthHalf === 1) {
      return {
        start: new Date(Date.UTC(this.year, 2, 1)),
        stop: new Date(new Date(Date.UTC(this.year, 8, 1)).getTime() - 1),
      };
    }
    // if (this.nthHalf === 2)
    return {
      start: new Date(Date.UTC(this.year, 8, 1)),
      stop: new Date(new Date(Date.UTC(this.year + 1, 2, 1)).getTime() - 1),
    };
  }

  getPrev() {
    if (this.nthHalf === 1) {
      this.year -= 1;
      this.nthHalf = 2;
      return this.getRange();
    }
    // if (this.nthHalf === 2)
    this.nthHalf = 1;
    return this.getRange();
  }

  getNext() {
    if (this.nthHalf === 1) {
      this.nthHalf = 2;
      return this.getRange();
    }
    // if (this.nthHalf === 2)
    this.year += 1;
    this.nthHalf = 1;
    return this.getRange();
  }
};
