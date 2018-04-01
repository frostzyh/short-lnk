
All operations are based on `db.links`

Find all entries  
`db.links.find({})`

Find entries by condition  
`db.links.find({_id: 'GSGD2C'})`

Delete all entries  
`db.links.remove({})`

All column to all entries  
`db.links.updateMany({}, { $set: {visible: true}})`   
`db.links.updateMany({}, { $set: {visitedCount: NumberInt(0), lastVisitedAt: null}})`
'Links.update({_id},{$set: {lastVisitedAt: new Date().getTime()},$inc: {visitedCount: 1}});'
