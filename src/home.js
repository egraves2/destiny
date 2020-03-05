import React, {useContext, useState, useEffect} from 'react';
import {Link,BrowserRouter,Route,Redirect} from 'react-router-dom'
import CssBaseline from "@material-ui/core/CssBaseline";
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';  
import HamMenu from './drawer.js'
import SearchBar from './searchbar.js'
import Button from '@material-ui/core/Button'
import './App.css';
import Pagination from '@material-ui/lab/Pagination';
import createBreakpoints from '@material-ui/core/styles/createBreakpoints'
const breakpoints = createBreakpoints({})
const theme = createMuiTheme({

  palette: {
    type: 'dark',

    primary:{
      main: '#3C4764',
      sidebar: '#1E2025',
  },
    secondary: {
      main: '#F6D04D',
    },
  },
  overrides: {
    MuiTab: {
    root: {
      [breakpoints.up('sm')]: {
        marginLeft:250,
        marginRight:10
      },
    }}

  }
});

function Home(){
  
  document.body.style.backgroundImage = "linear-gradient(to top, #2C3040, #3C4764)";
  const [user,setUser] = useState({})
  async function getUser(){

    const root = 'https://www.bungie.net/Platform/User/GetMembershipsForCurrentUser/'
    var token = localStorage.getItem("token");
     
     // TEMPORARY FIX
      const r = await fetch(root, {
      method:'GET',
      headers:{'X-API-Key':'7f69d229fe9046a2aa2326ee4ce96f4d', 'Authorization':`Bearer ${token}`},
      })
      const response = await r.json()
      var membershipType = response.Response.destinyMemberships[0].membershipType
      localStorage.setItem('membershipType', membershipType)
      var membershipId = response.Response.destinyMemberships[0].membershipId
      localStorage.setItem('membershipId', membershipId)
      console.log(response)
      
      
      
  }
  
  async function getManifest(){
    let root = 'https://www.bungie.net/Platform'
    var manifestEP = '/Destiny2/Manifest/'
    const url = root + manifestEP
    const r = await fetch(url, {
      method: 'GET'
    })
    const response = await r.json()
    console.log(response)
  }

  async function getProfile(){
    let root = 'https://www.bungie.net/Platform'
    //var destinyMembershipId = localStorage.getItem('membershipID')
    var token = localStorage.getItem("token");
    var membershipType = localStorage.getItem('membershipType')
    var destinyMembershipId = localStorage.getItem('membershipId')
    var profileEP = `/Destiny2/${membershipType}/Profile/${destinyMembershipId}/?components=100,103,200,201,205`
    const url = root + profileEP
    const r = await fetch(url, {
        method:'GET',
        headers:{'X-API-Key':'7f69d229fe9046a2aa2326ee4ce96f4d', 'Authorization':`Bearer ${token}`},
        })
    const response = await r.json()
    var character = response.Response.profile.data.characterIds[0]
    var emblem = response.Response.characters.data[character].emblemBackgroundPath
    const user = {
      name: response.Response.profile.data.userInfo.displayName,
      characterId: response.Response.profile.data.characterIds[0],
      light: response.Response.characters.data[character].light,
      classHash: 'Null',
      emblemBackground: 'https://www.bungie.net' + emblem,
      glimmer: response.Response.profileCurrencies.data.items[0].quantity,
      shards: '0',
      dust: response.Response.profileCurrencies.data.items[1].quantity,
    }
    console.log(user)
    setUser(user)
    console.log(response)
  }
  useEffect(()=>{
    getManifest()
    getUser()
    getProfile()
  },[])

    return (<section id="homepage">
      <div className="home">
      
        <header>
          <MuiThemeProvider theme = {theme}
          >
            <CssBaseline/>
            <HamMenu {...user}/>
            <SearchBar/>
            <div className = "bottomElements">
            <Button 
              variant="contained" color="secondary"
              style={{width:344,height:48}}
              onClick={()=>window.location.assign('/loadoutSearch')}>
                NEW
            </Button>
            <Pagination className="pagination"
              count={4} 
              shape="rounded" 
              />
            </div>
          </MuiThemeProvider>
        </header>
          
      </div>
    </section>
    );
}

export default Home;