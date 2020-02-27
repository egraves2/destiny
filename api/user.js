import axios from 'axios';
var apiKey = "7f69d229fe9046a2aa2326ee4ce96f4d";

const fetch = require('node-fetch')
const root = 'https://www.bungie.net/Platform/User/GetMembershipsForCurrentUser/'
module.exports = async function(req,res){
    try {
        const {token} = req.query
        console.log("TOKEN",token)
        const r = await axios.get(root, {
          headers:{'Accept':'application/json','X-API-Key':apiKey, 'Authorization':'Bearer '+token},
        })
        console.log("r",r)

        // const result = await r.json()
        // console.log("RESULT", result)
        res.status(200).send(r)
    } catch(e) {
        res.status(500).send(e.message)
        console.log(e)
    }
}