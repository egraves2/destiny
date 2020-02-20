// authorization url: 
// https://www.bungie.net/en/OAuth/Authorize?client_id={client-id}&response_type=code

var apiKey = "7f69d229fe9046a2aa2326ee4ce96f4d";
const client_id = '31997'
const client_secret = 'YOXKt1vRm25j4u6ZY3dpza-c-wdSoBj0GZwAurxvR7U'

const fetch = require('node-fetch')
const root = 'https://www.bungie.net/Platform/App/OAuth/token/'
module.exports = async function(req,res){
    try {
        const {code} = req.query
        const r = await fetch(root, {
          method:'POST',
          headers:{'Content-Type':'application/x-www-form-urlencoded'},
          body:`grant_type=authorization_code&code=${code}&client_id=${client_id}&client_secret=${client_secret}`
        })
        const result = await r.json()
        res.status(200).send(result)
    } catch(e) {
        res.status(500).send(e.message)
    }
}