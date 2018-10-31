'use strict';

module.exports = app => {
  const { STRING, DATE, INTEGER } = app.Sequelize;

  const Flow = app.model.define(
    'flow',
    {
      id: {
        type: INTEGER,
        primaryKey: true,
      },
      cid: {
        type: INTEGER,
        allowNull: false,
      },
      num: {
        type: INTEGER,
        defaultValue: 0,
      },
      utime: {
        type: DATE,
        allowNull: false,
      },
      date: {
        type: DATE,
        allowNull: false,
      },
    },
    {
      indexes: [
        {
          fields: [ 'date' ],
        },
        {
          fields: [ 'utime' ],
        },
      ],
    }
  );

  return Flow;
};
