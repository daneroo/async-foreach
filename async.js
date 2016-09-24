/* eslint-disable no-alert, no-console */

var async = require('async')
var request = require('request')
var jsonfile = require('jsonfile')

request('http://live.nhl.com/GameData/SeasonSchedule-20152016.json', function (error, response, body) {
  if (error || response.statusCode !== 200) {
    console.log('error',error)
    return
  }
  var importedJSON = JSON.parse(body)
  jsonfile.writeFileSync('data/schedule20152016.json', importedJSON)

  // console.log(importedJSON);    

  // this is a regular iteration
  // importedJSON.forEach(r=>{
  //   // console.log('row: ',r.id,r.est,r.a,r.h)
  //   const URL = `http://live.nhl.com/GameData/20142015/${r.id}/PlayByPlay.json`
  //   console.log(`get URL: ${URL}`)
  // });

  // now do it with async package
  async.eachSeries(importedJSON, function (row, callback) {

    const id = row.id
    const URL = `http://live.nhl.com/GameData/20152016/${id}/PlayByPlay.json`
    console.log(`get URL: ${URL}`)
    request(URL, function (error, response, body) {
      if (error) {
        callback(error)
      } else {
        jsonfile.writeFileSync(`data/game-${id}.json`, JSON.parse(body))
        callback()
      }
    }, function (err) {
      // if any of the file processing produced an error, err would equal that error
      if (err) {
        // One of the iterations produced an error.
        // All processing will now stop.
        console.log('A URL failed to process')
      } else {
        console.log('All URLs have been processed successfully')
      }
    })
  })

})
