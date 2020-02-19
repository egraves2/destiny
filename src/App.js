import React, {useContext, useState, useEffect} from 'react';
import './App.css';
import Button from '@material-ui/core/Button'
import {Link,BrowserRouter,Route} from 'react-router-dom'
import { getDefaultNormalizer } from '@testing-library/react';

function App() {

  return (<BrowserRouter>
    
    <Route exact path="/" component={Main} />
    <Route path="/oauth" component={OauthCallback} />

  </BrowserRouter>);

}

function Main(){

  function oauth(){
    var clientID = '31997'
    const redirectURI='https://loadout.now.sh/oauth'
    window.location.assign(`https://www.bungie.net/en/OAuth/Authorize?client_id=${clientID}&response_type=code&redirect_uri=${redirectURI}`)
  }
  
  return (<div className="App">
  <header className="App-header">
  
  <Button variant="contained" color="primary"
    onClick = {oauth}>
    Log in
  </Button>
        
  </header>
  
</div>)
}

function OauthCallback(props){
  console.log(props)

  async function getToken(){
    var authCode = props.location.search.split('=')[1]
    console.log(authCode)
    const url = `https://www.bungie.net/Platform/App/OAuth/Token/`
    const r = await fetch(url, {
      headers:{
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': "Basic YOXKt1vRm25j4u6ZY3dpza-c-wdSoBj0GZwAurxvR7U",
        'grant_type': `authorization_code&code=${authCode}`
      }
    })
    const json = await r.json()
    console.log(json)
    var token = ''
    localStorage.setItem('token', token)
    // redirect to main app
  }

  useEffect(()=>{
    getToken()
  },[])

  return (<div>oauth</div>)
}

export default App;
