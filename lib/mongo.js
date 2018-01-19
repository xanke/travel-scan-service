const config = require('config-lite')(__dirname)
const Mongolass = require('mongolass')
const mongolass = new Mongolass()
mongolass.connect(config.mongodb)

// 流量信息
exports.FlowScan = mongolass.model('FlowScan')
exports.FlowScan.index({ date: 1, code: 1 }).exec()
