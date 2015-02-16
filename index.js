var fs = require('fs')
  , http = require('http')
  , JSONStream = require('JSONStream')
  , es = require('event-stream')

http.createServer(function (req, res) {
  var streams = ['data1.json', 'data2.json'].map(function (f) {
    return fs.createReadStream(__dirname + '/' + f)
             .pipe(JSONStream.parse(['lifts', true]))
  })

  var result = es.merge.apply(es.merge, streams)
  result.pipe(es.stringify()).pipe(res)
}).listen(3000)
