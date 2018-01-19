var superAgent = require('superagent')

function requestData(opt) {
  let { headers, url, method = 'get', send } = opt
  let set = {
    'User-Agent':
      'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/60.0.3112.7 Safari/537.36',
    'Content-Type': 'application/json'
  }

  for (let key in headers) {
    let item = headers[key]
    set[key] = item
  }

  return new Promise((reslove, reject) => {
    if (method == 'get') {
      superAgent
        .get(url)
        .set(set)
        .end((err, res) => {
          if (res) {
            reslove(res)
          }
          if (err) {
            reject(res)
          }
        })
    } else if (method == 'post') {
      superAgent
        .post(url)
        .set(set)
        .send(send)
        .end((err, res) => {
          if (res) {
            reslove(res)
          }
          if (err) {
            reject(res)
          }
        })
    }
  })
}

function removeByValue(arr, val) {
  for (var i = 0; i < arr.length; i++) {
    if (arr[i] == val) {
      arr.splice(i, 1)
      break
    }
  }
}

exports.requestData = requestData
exports.removeByValue = removeByValue
