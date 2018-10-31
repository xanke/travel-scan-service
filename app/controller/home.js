'use strict';
const pkg = require('../../package.json');
const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    const { name, version } = pkg;
    this.ctx.body = { name, version };
  }

  async install() {
    await this.ctx.model.Flow.sync({ force: true });
  }

  async scan() {
    this.ctx.body = await this.ctx.service.scan.scan();
  }
}

module.exports = HomeController;
