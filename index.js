var fs = require('fs')
  , JSONStream = require('JSONStream')
  , es = require('event-stream')

var streams = ['data1.json', 'data2.json'].map(function (f) {
  return fs.createReadStream(__dirname + '/data1.json')
           .pipe(JSONStream.parse(['lifts', true]))
})

var result = es.merge.apply(es.merge, streams)

// Result is a stream of EVERYTHING
result.on('data', function (lift) {
  console.log(lift)
})
