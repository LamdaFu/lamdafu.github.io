var fs = require('fs')

var text = fs.readFileSync(__dirname + '/test.txt', 'UTF8')

var t = text.split('\n')

t.map(function(l) {
  l.split('\t').map(function(info, i) {
    console.log(i, info)
  })
})
