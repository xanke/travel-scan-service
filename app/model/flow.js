'use strict';
const moment = require('moment');

module.exports = app => {
  const { STRING, DATE, INTEGER } = app.Sequelize;

  const Flow = app.model.define(
    'flow',
    {
      code: {
        type: INTEGER,
        allowNull: false,
      },
      num: {
        type: INTEGER,
        defaultValue: 0,
      },
      maxNum: {
        type: INTEGER,
        defaultValue: 0,
      },
      utime: {
        type: DATE,
        allowNull: false,
        get() {
          return moment(this.getDataValue('utime')).format('YYYY-MM-DD HH:mm:ss');
        },
      },
      date: {
        type: DATE,
        allowNull: false,
      },
    },
    {
      indexes: [
        {
          fields: [ 'date', 'code' ],
        },
        {
          fields: [ 'utime', 'code' ],
        },
      ],
    }
  );

  return Flow;
};
