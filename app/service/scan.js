'use strict';
const superagent = require('superagent');

module.exports = app => {
  class Service extends app.Service {
    async scan() {
      const data = await superagent.get('http://shanghaicity.openservice.kankanews.com/public/tour/filterinfo2');
      const list = data.body;

      const creates = [];
      list.forEach(item => {
        const { CODE: code, MAX_NUM: maxNum, NUM: num, TIME: utime } = item;

        if (!maxNum) return;
        const create = {
          code: parseInt(code),
          maxNum: parseInt(maxNum),
          num: parseInt(num),
          utime,
          date: utime.split(' ')[0],
        };
        creates.push(create);
      });

      if (!creates) {
        console.log('无数据');
        return;
      }

      // 判断记录时间是否重复或小于记录值
      const utime = creates[0].utime;
      const lastData = await this.ctx.model.Flow.findOne({
        order: [[ 'utime', 'DESC' ]],
      });
      if (lastData && utime <= lastData.utime) {
        console.log(utime, '重复');
        return;
      }

      this.ctx.model.Flow.bulkCreate(creates);
      console.log(utime, 'SUCCESS');
      return {
        lastUtime: lastData.utime,
        utime,
      };
    }
  }
  return Service;
};
