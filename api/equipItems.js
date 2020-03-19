const fetch = require('node-fetch')
let root = 'https://www.bungie.net/Platform'
    var equipEP = `/Destiny2/Actions/Items/EquipItem/`
    const url = root + equipEP
module.exports = async function(req,res){ 
    try {
    const {itemId} = req.query.itemId
    const {characterId} = req.query.characterId
    const {membershipType} = req.query.membershipType
    const {token} = req.query.token
    console.log(itemId)
  const r = await fetch(url, {
    method:'POST',
    headers:{ 
      'Authorization':`Bearer ${token}`, 
      "Content-Type":"application/x-www-form-urlencoded",
    },
    body: `itemId=${itemId}&characterId=${characterId}&membershipType=${membershipType}`
    })
    console.log(r)
  const result= await r.json()
  console.log(result)
  res.status(200).send(result)
  } catch(e) {
      res.status(500).send(e.message)
  }
}