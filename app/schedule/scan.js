'use strict';

const { Subscription } = require('egg');

class Scan extends Subscription {
  static get schedule() {
    return {
      interval: '5m',
      type: 'all',
    };
  }

  async subscribe() {
    this.ctx.service.scan.scan();
  }
}

module.exports = Scan;
