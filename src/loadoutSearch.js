import React, {useContext, useState, useEffect} from 'react';
import {Link,BrowserRouter,Route,Redirect} from 'react-router-dom'
import CssBaseline from "@material-ui/core/CssBaseline";
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';  
import { fade, makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Input from '@material-ui/core/Input';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import SearchBar from './searchbar.js'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import './App.css';
import createBreakpoints from '@material-ui/core/styles/createBreakpoints'




const useStyles = makeStyles(theme => ({
    grow: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
      
    },
    title: {
      display: 'none',
      [theme.breakpoints.up('sm')]: {
        display: 'block',
      },
    },
    search: {
      position: 'relative',
      borderRadius: theme.shape.borderRadius,
      backgroundColor: fade(theme.palette.common.white, 0.15),
      '&:hover': {
        backgroundColor: fade(theme.palette.common.white, 0.25),
      },
      marginRight: theme.spacing(2),
      marginLeft: 0,
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(3),
        width: 'auto',
      },
    },
    searchIcon: {
      width: theme.spacing(7),
      height: '100%',
      position: 'absolute',
      pointerEvents: 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    inputRoot: {
      color: 'inherit',
    },
    inputInput: {
      padding: theme.spacing(1, 1, 1, 7),
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('md')]: {
        width: 200,
      },
    },
    textField: {
        width: 300,
        height: 48,
        marginLeft: 50,
    },
    sectionDesktop: {
      display: 'none',
      [theme.breakpoints.up('md')]: {
        display: 'flex',
      },
    },
    sectionMobile: {
      display: 'flex',
      [theme.breakpoints.up('md')]: {
        display: 'none',
      },
      sectionBody: {
        [theme.breakpoints.up('sm')]: {
            marginLeft:250,
            marginRight:10
          },
      }
    },
  }));


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

function LoadoutSearch(props) {
    const [text, setText] = useState('')
    //const [items, setItems] = useState([])
    document.body.style.backgroundImage = "linear-gradient(to top, #2C3040, #3C4764)";

    
    /*
    async function getItems(){
        setItems([])
        let url = 'https://www.bungie.net/Platform/Destiny2/Armory/Search/DestinyInventoryItemDefinition/'
        url += text
        var token = localStorage.getItem("token");
        const r = await fetch(url, {
            method:'GET',
            headers:{'X-API-Key':'7f69d229fe9046a2aa2326ee4ce96f4d', 'Authorization':`Bearer ${token}`},
            })
        const response = await r.json()
        console.log(response)
        setItems(response.results)
        setText('')
        
    }
    console.log(items)
    */
    
    console.log(props.items)
     
    const classes = useStyles();
    
    return (<section id="search">
      <div className="home">
      
        <header>
          <MuiThemeProvider theme = {theme}
          >
            {//<CssBaseline/>
            }
            <div className={classes.grow}>
            <AppBar
                
                position="static">
                <Toolbar>
                    
                    <IconButton
                        edge="start"
                        className={classes.menuButton}
                        color="inherit"
                        aria-label="open drawer"
                        onClick={()=>window.location.assign('/home')}
                    >
              <ArrowBackIcon />
              </IconButton>
              <div className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              
                     <InputBase
                    placeholder="Search"
                    value={text}
                    onChange={e=> setText(e.target.value)}
                    /*
                    onKeyPress={e=>{
                    if(e.key==='Enter')
                        getItems()
                    }}
                    */
                    //className={classes.textField}
                    classes={{
                        root: classes.inputRoot,
                        input: classes.inputInput,
                      }}
                    
                    />
                    </div> 
                    <div className={classes.grow} />
                     <div className={classes.sectionDesktop}></div>
                    
                    
                    </Toolbar>
            </AppBar>
                
            </div>
            {console.log(props.items)}
            <div className = "searchResults">
                    {props.items.map(item=>{
                        console.log(item)
                        const image = item.displayProperties.icon
                        const imageUrl = "https://www.bungie.net" + image
                        return (<div className="itemImage">
                            <img src={imageUrl}
                            height="50"
                            padding="20"/>
                        </div>)
                    })}

            </div>

            <div className = "bottomElements">
            <Button 
              variant="contained" color="secondary"
              style={{width:344,height:48}}
              onClick={()=><Redirect to='/loadoutSearch' />}>
                SELECT
            </Button>
            </div>
          </MuiThemeProvider>
        </header>
          
      </div>
    </section>
    );
}

export default LoadoutSearch;