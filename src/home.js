import React, {useContext, useState, useEffect} from 'react';
import axios from 'axios';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import MoreIcon from '@material-ui/icons/MoreVert';
import CssBaseline from '@material-ui/core/CssBaseline';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';  
import HamMenu from './drawer.js'
import SearchBar from './searchbar.js'

const theme = createMuiTheme({
  palette: {
    primary:{
      main: '#3C4764',
  },
    secondary: {
      main: '#F6D04D',
    },
    background: {
      default: '#3C4764',
    }
  },
});






function Home(){
  async function getUser(){
    const root = 'https://www.bungie.net/Platform/User/GetMembershipsForCurrentUser/'
    var token = localStorage.getItem("token");
    /*
    //try{
      axios.get(`/api/user?token=${token}`)
      //const json = await r.json()
      .then((response)=>{
        console.log(response.data)
      })
      .catch((e) => {
      console.log(e)
    })
      //console.log(json)
      */
     
     // TEMPORARY FIX
      const r = await fetch(root, {
      method:'GET',
      headers:{'X-API-Key':'7f69d229fe9046a2aa2326ee4ce96f4d', 'Authorization':`Bearer ${token}`},
      })
      const response = await r.json()
      console.log(response)
      const username = response.Response.destinyMemberships[0].displayName
      console.log(username)
  }
  useEffect(()=>{
    getUser()
  },[])




    return (<section id="homepage">
      <div className="home">
      
        <header>
          
          <MuiThemeProvider theme = {theme}>
            <HamMenu/>
            <SearchBar/>
        </MuiThemeProvider>
          </header>
          
      </div>
    </section>
    );
}

export default Home;