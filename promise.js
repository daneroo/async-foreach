/* eslint-disable no-alert, no-console */

// this is the Promise version of request
const rp = require('request-promise')

// Extened promise library with the .each method we want:
// .each serialises the iterated functions, waiting for one promise to resolve, before invoking the next.
const bluebird = require('bluebird')
const jsonfile = require('jsonfile')

const prefix='http://live.nhl.com/GameData'
const datadir='data'
rp({
  uri: `${prefix}/SeasonSchedule-20152016.json`,
  json: true // Automatically parses the JSON string in the response
})
  .then((schedule) => {
    jsonfile.writeFileSync(`${datadir}/schedule20152016.json`, schedule)
    console.log(`Fetched schedule (${schedule.length} games)`)
    return bluebird.each(schedule, (row) => {
      const id = row.id
      console.log(`-fectching game id:${id}`)
      return rp({
        uri: `${prefix}/20152016/${id}/PlayByPlay.json`,
        json: true // Automatically parses the JSON string in the response
      })
        .then((game) => {
          jsonfile.writeFileSync(`${datadir}/game-${id}.json`, game)
          console.log(`-wrote     game id:${row.id}`)
        })
    })
  })
  .then(()=>{
    console.log('Done!')
  })




