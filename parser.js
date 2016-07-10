var AWS = require('aws-sdk')
var uuid = require('node-uuid')
var async = require('async')

AWS.config.region = 'us-west-2'

var db = new AWS.DynamoDB.DocumentClient()

var fs = require('fs')

var text = fs.readFileSync(__dirname + '/test.txt', 'UTF8')

var t = text.split('\n')

async.eachSeries(t, function(l, callback) {
  var info = l.split('\t')
  var params = {
    TableName: 'Numbers',
    Item: {
      'id': uuid.v4(),
      'url': info[0],
      'raw': info[1],
      'number': info[2]
    }
  }
  db.put(params, function(err, data) {
    if (err) throw err
    console.log("Added item", info[0])
    callback(null)
  })
}, function() {
  console.log("Migration complete!")
})
