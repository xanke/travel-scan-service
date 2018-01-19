const FlowScan = require('../lib/mongo').FlowScan

module.exports = {
  insert: async data => {
    return FlowScan.create(data).exec()
  },
  find: async find => {
    let data = await FlowScan.findOne(find).exec()
    return data
  }
}
