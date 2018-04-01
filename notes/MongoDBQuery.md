
All operations are based on `db.links`

Find all entries  
`db.links.find({})`

Find entries by condition  
`db.links.find({_id: 'GSGD2C'})`

Delete all entries  
`db.links.remove({})`

All column to all entries  
`db.links.updateMany({}, { $set: {visible: true}})`
