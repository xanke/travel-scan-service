const config = require('config-lite')(__dirname)
const tool = require('./lib/tool')
const FlowScanModel = require('./models/flow_scan')
const moment = require('moment')

var start = async () => {
  let scan = await tool.requestData({
    url: 'http://shanghaicity.openservice.kankanews.com/public/tour/filterinfo2'
  })
  scan = scan.body
  let date = moment().format('YYYYMMDD')

  let data = []
  scan.forEach(element => {
    let {
      NAME: name,
      CODE: code,
      TYPE: type,
      NUM: num,
      SSD: ssd,
      TIME: time,
      R_TIME: rTime,
      MAX_NUM: maxNum,
      START_TIME: startTime,
      END_TIME: endTime
    } = element

    data.push({
      name,
      code,
      num,
      ssd,
      time,
      rTime,
      maxNum,
      startTime,
      endTime,
      date
    })
    // console.log(name, code, num, ssd, time, rTime, maxNum, startTime, endTime)
  })
  await FlowScanModel.insert(data)
  console.log('采集完毕')
  process.exit()
}

start()

var closeScan = () => {
  console.log('超时关闭')
  process.exit()
}

var scan_close = setTimeout(closeScan, 1000 * 60)
