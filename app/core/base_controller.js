'use strict';
const { Controller } = require('egg');
class BaseController extends Controller {
  success(data = {}, msg = '') {
    this.ctx.body = {
      code: 1,
      result: data,
      msg,
    };
  }
  fail(data, msg) {
    this.ctx.body = {
      code: 0,
      result: data,
      msg,
    };
  }
}
module.exports = BaseController;