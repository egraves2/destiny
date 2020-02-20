// authorization url: 
// https://www.bungie.net/en/OAuth/Authorize?client_id={client-id}&response_type=code

var apiKey = "7f69d229fe9046a2aa2326ee4ce96f4d";


const fetch = require('node-fetch')
const root = 'https://www.bungie.net/Platform/App/OAuth/token/'
module.exports = async function(req,res){
    try {
        const {code} = req.query
        const r = await fetch(root, {
          method:'POST',
          headers:{'Content-Type':'application/x-www-form-urlencoded'},
          body:`grant_type=authorization_code&code=${code}`
        })
        const res = await r.json()
        res.status(200).send(res)
    } catch(e) {
        res.status(500).send(e.message)
    }
}