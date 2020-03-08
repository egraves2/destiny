import React, {useContext, useState, useEffect} from 'react';
import './App.css';
import Home from './home'
import LoadoutSearch from './loadoutSearch'
import Button from '@material-ui/core/Button'
import {Link,BrowserRouter,Route,Redirect} from 'react-router-dom'
import { getDefaultNormalizer } from '@testing-library/react';

function App() {
  const [user,setUser] = useState({})
  const [state,setState] = useState(true)
  const [items,setItems] = useState([])
  /*
  const [currentItem,setCurrentItem] = useState([])
  */
  function addItem(item){
    setItems(current=>[...current,item])
  }
  
  return (<BrowserRouter>
    
    <Route exact path="/" component={Main} />
    <Route path="/home" exact render={props=><Home {...props }user={user} 
      setUser={setUser} items={items} addItem={addItem}
      state={state} setState={setState}/>} />
    <Route path="/oauth" component={OauthCallback} />
    <Route path="/loadoutSearch" render={props=>(<LoadoutSearch {...props } 
      items={items} state={state} setState={setState}/>)} />
    

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
    var code = props.location.search.split('=')[1]
    const r = await fetch(`/api?code=${code}`)
    const json = await r.json()
    console.log(json)
    var token = json.access_token
    var membershipID = json.membership_id
    localStorage.setItem('token', token)
    localStorage.setItem('membershipID', membershipID)
  }
  useEffect(()=>{
    getToken()
  },[])
  return (<Redirect to='/home' />)
}

export default App;
