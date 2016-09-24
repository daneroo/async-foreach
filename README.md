# asynchronous iteration

Scenario:
- iterate through loop executing an async action
- wait for an action to complete before executing the next

for each id in `http://live.nhl.com/GameData/SeasonSchedule-20152016.json`
I want to read all of the {id} from this url and request and build the followgin URL
 `http://live.nhl.com/GameData/20152016/{id}/PlayByPlay.json`  

