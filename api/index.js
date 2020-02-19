// authorization url: 
// https://www.bungie.net/en/OAuth/Authorize?client_id={client-id}&response_type=code
var request = require("request");

var apiKey = "7f69d229fe9046a2aa2326ee4ce96f4d";


function getAccessTokens(){

    var options = {
        method: 'POST',
        url: 'https://www.bungie.net/Platform/App/OAuth/Token/',
        headers: {'content-type': 'application/x-www-form-urlencoded'},
        form: {
          response_type: 'code',
          grant_type: 'authorization_code&code={auth-code}',
          client_id: 'YOUR_CLIENT_ID',
          state: '',
          code: 'YOUR_AUTHORIZATION_CODE',
      }
    };

    request(options, function (error, response, body) {
      if (error) throw new Error(error);
      console.log(body);
    });

  }