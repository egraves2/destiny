import React, {useContext, useState, useEffect} from 'react';
import {Link,BrowserRouter,Route,Redirect} from 'react-router-dom'
import CssBaseline from "@material-ui/core/CssBaseline";
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { fade, makeStyles, withStyles } from '@material-ui/core/styles';
import HamMenu from './drawer.js'
import TabPanel from './tabpanel.js'
import SearchBar from './searchbar.js'
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Button from '@material-ui/core/Button'
import './App.css';
import Pagination from '@material-ui/lab/Pagination';
import createBreakpoints from '@material-ui/core/styles/createBreakpoints'
import { useHistory } from "react-router-dom";
import Tooltip from '@material-ui/core/Tooltip';
const breakpoints = createBreakpoints({})

const useStyles = makeStyles(theme => ({
  flexGrow: 1,
  arrow: {
    color: theme.palette.common.black,
  },
  tooltip: {
    fontSize: '16px',
    backgroundColor: theme.palette.common.black,
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
    
     
  },
}));

const theme = createMuiTheme({
  typography: {
    "fontFamily": "\"Archivo\", \"Helvetica\", \"Arial\", sans-serif",
    "fontSize": 14,
    //"fontWeightRegular": 400,
    "fontWeightMedium": 500
  },
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

  
});

const ItemTooltip = withStyles(theme => ({
  tooltip: {
    backgroundColor: '#1E2025',
    color: 'white',
    maxWidth: 220,
    fontSize: theme.typography.pxToRem(18),
    fontWeight: '500',
  },
}))(Tooltip);



function Home({user,setUser,items,addItem,state,setState,home}){
  let history = useHistory();
  document.body.style.backgroundImage = "linear-gradient(to top, #2C3040, #3C4764)";
  
  async function getUser(){

    const root = 'https://www.bungie.net/Platform/User/GetMembershipsForCurrentUser/'
    var token = localStorage.getItem("token");
     
     // TEMPORARY FIX
      const r = await fetch(root, {
      method:'GET',
      headers:{'X-API-Key':'7f69d229fe9046a2aa2326ee4ce96f4d', 'Authorization':`Bearer ${token}`},
      })
      const response = await r.json()
      //var membershipType = response.Response.destinyMemberships[0].membershipType
      var membershipType = "3"
      localStorage.setItem('membershipType', membershipType)
      let membershipId
      response.Response.destinyMemberships.map(m=>{
        if(m.membershipType=="3")
          membershipId = m.membershipId
      })
      localStorage.setItem('membershipId', membershipId)
      console.log(response)
  }
  async function getProfile(){
    let root = 'https://www.bungie.net/Platform'
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
    const prof = response.Response
    console.log(response)

    var character = prof.profile.data.characterIds[0]
    localStorage.setItem('character', character)
    var itemArray = prof.characterEquipment.data[character].items
    var emblem = prof.characters.data[character].emblemBackgroundPath
    var characterName = ''
    if(prof.characters.data[character].classHash=='671679327') {
      characterName= 'Hunter'
    } else if (prof.characters.data[character].classHash=='3655393761') {
      characterName= "Titan"
    } else if (prof.characters.data[character].classHash=='3111576190') {
      characterName= "Warlock"
    }
    const user = {
      name: prof.profile.data.userInfo.displayName,
      itemIdArray: prof.characterInventories.data[character].items.map(c=> {
        return c.itemInstanceId
      }),
      characterName: characterName,
      itemHashArray: prof.characterInventories.data[character].items.map(c=> {
        return c
      }),
      equippedItemArray: prof.characterEquipment.data[character].items.map(e=> {
        return e
      }),
      light: prof.characters.data[character].light,
      classHash: 'Null',
      emblemBackground: 'https://www.bungie.net' + emblem,
      glimmer: prof.profileCurrencies.data.items.map(g=> {
        if(g.itemHash=="3159615086"){
          return g.quantity.toString()
        }
      }),
      shards: prof.profileCurrencies.data.items.map(g=> {
        if(g.itemHash=="1022552290"){
          return g.quantity.toString()
        }
      }),
      dust: prof.profileCurrencies.data.items.map(g=> {
        if(g.itemHash=="2817410917"){
          return g.quantity.toString()
        }
      }),
    }
    
    console.log(user)
    setUser(user)
/*
    user.itemIdArray.forEach((itemIdArray,i)=>{
      setTimeout(()=>{
        getInstancedItem(itemIdArray.itemHash)
      },i*100)
    })
    */
    
    user.itemHashArray.forEach((itemHashArray,i)=>{
        setTimeout(()=>{
          getItemDef(itemHashArray,false)
        },i*100
        )
    })
   
    user.equippedItemArray.forEach((equippedItemArray,i)=>{
      setTimeout(()=>{
        getItemDef(equippedItemArray,true)
      },i*100
      )
    })
  }

  async function getItemDef(inventoryItem,equipped){
    var hashIdentifier = inventoryItem.itemHash
    var itemInstanceId = inventoryItem.itemInstanceId
    if (!hashIdentifier) return
    var token = localStorage.getItem("token");
    let root = 'https://www.bungie.net/Platform'
    var itemEP = `/Destiny2/Manifest/DestinyInventoryItemDefinition/${hashIdentifier}/`
    const url = root + itemEP
    const r = await fetch(url, {
      method:'GET',
      headers:{'X-API-Key':'7f69d229fe9046a2aa2326ee4ce96f4d'},
      })
    const response = await r.json()
    const item = response.Response
    item.equipped = equipped
    item.itemId = itemInstanceId

    if(item.itemType=='3' || item.itemType=='2'){
      addItem(item)
    }
    
  }

  async function getInstancedItem(item){
    var itemInstanceId = item.itemId
    if (!itemInstanceId) return
    var membershipType = localStorage.getItem('membershipType')
    var destinyMembershipId = localStorage.getItem('membershipId')
    let url = 'https://www.bungie.net/Platform'
    var instanceEP = `/Destiny2/${membershipType}/Profile/${destinyMembershipId}/Item/${itemInstanceId}/?components=300`
    url += instanceEP
    var token = localStorage.getItem("token");
    const r = await fetch(url, {
        method:'GET',
        headers:{'X-API-Key':'7f69d229fe9046a2aa2326ee4ce96f4d', 'Authorization':`Bearer ${token}`},
        })
    const response = await r.json()
    if(response.Response.instance){
      item.power = response.Response.instance.data.primaryStat.value
    }
    /*
    if(item.instance && item.instance.data.canEquip=='true'){
      console.log(response)
      }
      */
}

  async function equipItem(itemId){
    var membershipType = localStorage.getItem('membershipType')
    var characterId = localStorage.getItem('character')
    var refreshToken = localStorage.getItem("refreshToken")
    console.log(itemId)
    console.log(characterId)
    const r = await fetch(`/api/equipItems?itemId=${itemId}&membershipType=${membershipType}&characterId=${characterId}&token=${refreshToken}`)
    console.log(r)
    const json = await r.json()
    console.log(json)
    
  }
  useEffect(()=>{
    getUser()
    getProfile()
  },[])

  function a11yProps(index) {
    return {
      id: `full-width-tab-${index}`,
      'aria-controls': `full-width-tabpanel-${index}`,
    };
  }

/*
  function ItemTooltip(props) {
    const classes = useStyles();
  
    return <Tooltip arrow classes={classes} {...props} />;
  }
*/


  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = index => {
    setValue(index);
  };


    return (<section id="homepage">
      <div className="home">
      
        <header>
          <MuiThemeProvider theme = {theme}
          >
            <CssBaseline/>
            <HamMenu {...user}/>
            <div className={classes.root}>
              <AppBar position="static">
              <div style={{position: "fixed", bottom:"0", width:"100%"}}>
                <Tabs value={value} variant="fullwidth" onChange={handleChange} 
                   position="fixed" aria-label="full width tabs example"
                  className="tabbar">
                  <Tab label="WEAPONS" {...a11yProps(0)} />
                  <Tab label="ARMOR" {...a11yProps(1)} />
                </Tabs>
                </div>
              </AppBar>
            
            
            {/* <SearchBar/> */}
            <div className = "searchResults">
            <TabPanel value={value} index={0} dir={theme.direction}>
              <div className="pageContent">
              <div className="categoryTitle">
                Kinetic
              </div>
              <div className="category">
                    {items.map(item=>{
                        const image = item.displayProperties.icon
                        const screenshot = item.screenshot
                        const imageUrl = "https://www.bungie.net" + image
                        const screenshotUrl = "https://www.bungie.net" + screenshot
                        getInstancedItem(item)
                        if(item.equipped && item.equippingBlock.equipmentSlotTypeHash=='1498876634'){
                          //console.log(item)
                        return (
                        <div className="itemImage">
                            
                        <ItemTooltip arrow
                        title={
                        <React.Fragment>
                          <div className="detailedImage">
                          <img src={screenshotUrl}
                          width="220"/>
                          </div>
                          <div className="title">
                          {item.displayProperties.name}
                          </div>
                          <div className = "item-type">
                            {item.itemTypeDisplayName}
                          </div>
                          <div className="description">
                            {item.displayProperties.description}
                          </div>
                          <hr/>
                          <div className="power">
                          {item.power}
                          </div>
                          
                          </React.Fragment>
                        }
                        >
                          <img src={imageUrl}
                            height="100"
                          />
                          
                        </ItemTooltip>
                        </div>
                        
                        )}
                      })}
                    <div className="unequipped">
                    {items.map(item=>{
                        const image = item.displayProperties.icon
                        const screenshot = item.screenshot
                        const imageUrl = "https://www.bungie.net" + image
                        const screenshotUrl = "https://www.bungie.net" + screenshot
                        getInstancedItem(item)
                        if(!item.equipped && item.equippingBlock.equipmentSlotTypeHash=='1498876634'){
                        return (<div className="itemImage">
                        <ItemTooltip arrow
                        title={
                        <React.Fragment>
                          <div className="detailedImage">
                          <img src={screenshotUrl}
                          width="220"/>
                          </div>
                          <div className="title">
                          {item.displayProperties.name}
                          </div>
                          <div className = "item-type">
                            {item.itemTypeDisplayName}
                          </div>
                          <div className="description">
                            {item.displayProperties.description}
                          </div>
                          <hr/>
                          <div className="power">
                          {item.power}
                          </div>
                          
                          </React.Fragment>
                        }
                        >
                          <img src={imageUrl}
                            height="70"
                        />
                        </ItemTooltip>
                        </div>
                        )}
                    })}
                    </div>
                    </div>
              <div className="categoryTitle">
                Energy
              </div>
              <div className = "category">
                    {items.map(item=>{
                        const image = item.displayProperties.icon
                        const screenshot = item.screenshot
                        const imageUrl = "https://www.bungie.net" + image
                        const screenshotUrl = "https://www.bungie.net" + screenshot
                        getInstancedItem(item)
                        if(item.equipped && item.equippingBlock.equipmentSlotTypeHash=='2465295065'){
                        return (<div className="itemImage">
                          <ItemTooltip arrow
                        title={
                        <React.Fragment>
                          <div className="detailedImage">
                          <img src={screenshotUrl}
                          width="220"/>
                          </div>
                          <div className="title">
                          {item.displayProperties.name}
                          </div>
                          <div className = "item-type">
                            {item.itemTypeDisplayName}
                          </div>
                          <div className="description">
                            {item.displayProperties.description}
                          </div>
                          <hr/>
                          <div className="power">
                          {item.power}
                          </div>
                          
                          </React.Fragment>
                        }
                        >
                          <img src={imageUrl}
                            height="100"
                        />
                        </ItemTooltip>
                        </div>
                        )}
                    })}
                    <div className="unequipped">
                    {items.map(item=>{
                        const image = item.displayProperties.icon
                        const screenshot = item.screenshot
                        const imageUrl = "https://www.bungie.net" + image
                        const screenshotUrl = "https://www.bungie.net" + screenshot
                        getInstancedItem(item)
                        if(!item.equipped && item.equippingBlock.equipmentSlotTypeHash=='2465295065'){
                        return (<div className="itemImage">
                        <ItemTooltip arrow
                        
                        title={
                        <React.Fragment>
                          <div className="detailedImage">
                          <img src={screenshotUrl}
                          width="220"/>
                          </div>
                          <div className="title">
                          {item.displayProperties.name}
                          </div>
                          <div className = "item-type">
                            {item.itemTypeDisplayName}
                          </div>
                          <div className="description">
                            {item.displayProperties.description}
                          </div>
                          <hr/>
                          <div className="power">
                          {item.power}
                          </div>
                          
                          </React.Fragment>
                        }
                        >
                          <img src={imageUrl}
                            height="70"
                        />
                        </ItemTooltip>
                        </div>
                        )}
                    })}
                    </div>
                    </div>
                    <div className="categoryTitle">
                Power
              </div>
              <div className = "category">
                    {items.map(item=>{
                        const image = item.displayProperties.icon
                        const screenshot = item.screenshot
                        const imageUrl = "https://www.bungie.net" + image
                        const screenshotUrl = "https://www.bungie.net" + screenshot
                        getInstancedItem(item)
                        if(item.equipped && item.equippingBlock.equipmentSlotTypeHash=='953998645'){
                        return (<div className="itemImage">
                          <ItemTooltip arrow
                        
                        title={
                        <React.Fragment>
                          <div className="detailedImage">
                          <img src={screenshotUrl}
                          width="220"/>
                          </div>
                          <div className="title">
                          {item.displayProperties.name}
                          </div>
                          <div className = "item-type">
                            {item.itemTypeDisplayName}
                          </div>
                          <div className="description">
                            {item.displayProperties.description}
                          </div>
                          <hr/>
                          <div className="power">
                          {item.power}
                          </div>
                          
                          </React.Fragment>
                        }
                        >
                          <img src={imageUrl}
                            height="100"
                        />
                        </ItemTooltip>
                        </div>
                        )}
                    })}
                    <div className="unequipped">
                    {items.map(item=>{
                        const image = item.displayProperties.icon
                        const screenshot = item.screenshot
                        const imageUrl = "https://www.bungie.net" + image
                        const screenshotUrl = "https://www.bungie.net" + screenshot
                        getInstancedItem(item)
                        if(!item.equipped && item.equippingBlock.equipmentSlotTypeHash=='953998645'){
                        return (<div className="itemImage">
                          <ItemTooltip arrow
                        title={
                        <React.Fragment>
                          <div className="detailedImage">
                          <img src={screenshotUrl}
                          width="220"/>
                          </div>
                          <div className="title">
                          {item.displayProperties.name}
                          </div>
                          <div className = "item-type">
                            {item.itemTypeDisplayName}
                          </div>
                          <div className="description">
                            {item.displayProperties.description}
                          </div>
                          <hr/>
                          <div className="power">
                          {item.power}
                          </div>
                          
                          </React.Fragment>
                        }
                        >
                          <img src={imageUrl}
                            height="70"
                        />
                        </ItemTooltip>
                        </div>
                        )}
                    })}
                    </div>
                    </div>
                    </div>
            </TabPanel>
            <TabPanel value={value} index={1} dir={theme.direction}>
              <div className="pageContent">
              <div className="categoryTitle">
                  Helmet
                </div>
                <div className="category">
                    {items.map(item=>{
                        const image = item.displayProperties.icon
                        const screenshot = item.screenshot
                        const imageUrl = "https://www.bungie.net" + image
                        const screenshotUrl = "https://www.bungie.net" + screenshot
                        getInstancedItem(item)
                        if(item.equipped && item.itemType=='2' && item.itemCategoryHashes[1]=='45'){
                        return (<div className="itemImage">
                          <ItemTooltip arrow
                        title={
                        <React.Fragment>
                          <div className="detailedImage">
                          <img src={screenshotUrl}
                          width="220"/>
                          </div>
                          <div className="title">
                          {item.displayProperties.name}
                          </div>
                          <div className = "item-type">
                            {item.itemTypeDisplayName}
                          </div>
                          <div className="description">
                            {item.displayProperties.description}
                          </div>
                          <hr/>
                          <div className="power">
                          {item.power}
                          </div>
                          
                          </React.Fragment>
                        }
                        >
                          <img src={imageUrl}
                            height="100"
                        />
                        </ItemTooltip>
                        </div>
                        )}
                      })} 
                    <div className="unequipped">
                    {items.map(item=>{
                        const image = item.displayProperties.icon
                        const screenshot = item.screenshot
                        const imageUrl = "https://www.bungie.net" + image
                        const screenshotUrl = "https://www.bungie.net" + screenshot
                        getInstancedItem(item)
                        if(!item.equipped && item.itemType=='2' && item.itemCategoryHashes[1]=='45'){
                        return (<div className="itemImage">
                          <ItemTooltip arrow
                        title={
                        <React.Fragment>
                          <div className="detailedImage">
                          <img src={screenshotUrl}
                          width="220"/>
                          </div>
                          <div className="title">
                          {item.displayProperties.name}
                          </div>
                          <div className = "item-type">
                            {item.itemTypeDisplayName}
                          </div>
                          <div className="description">
                            {item.displayProperties.description}
                          </div>
                          <hr/>
                          <div className="power">
                          {item.power}
                          </div>
                          
                          </React.Fragment>
                        }
                        >
                          <img src={imageUrl}
                            height="70"
                        />
                        </ItemTooltip>
                        </div>
                        )}
                    })}  
                  </div>  
                  </div> 
                  <div className="categoryTitle">
                  Gauntlets
                </div>
                <div className="category">
                    {items.map(item=>{
                        const image = item.displayProperties.icon
                        const screenshot = item.screenshot
                        const imageUrl = "https://www.bungie.net" + image
                        const screenshotUrl = "https://www.bungie.net" + screenshot
                        getInstancedItem(item)
                        if(item.equipped && item.itemType=='2' && item.itemCategoryHashes[1]=='46'){
                        return (<div className="itemImage">
                         <ItemTooltip arrow
                        title={
                        <React.Fragment>
                          <div className="detailedImage">
                          <img src={screenshotUrl}
                          width="220"/>
                          </div>
                          <div className="title">
                          {item.displayProperties.name}
                          </div>
                          <div className = "item-type">
                            {item.itemTypeDisplayName}
                          </div>
                          <div className="description">
                            {item.displayProperties.description}
                          </div>
                          <hr/>
                          <div className="power">
                          {item.power}
                          </div>
                          
                          </React.Fragment>
                        }
                        >
                          <img src={imageUrl}
                            height="100"
                        />
                        </ItemTooltip>
                        </div>
                        )}
                    })} 
                    <div className="unequipped">
                    {items.map(item=>{
                        const image = item.displayProperties.icon
                        const screenshot = item.screenshot
                        const imageUrl = "https://www.bungie.net" + image
                        const screenshotUrl = "https://www.bungie.net" + screenshot
                        getInstancedItem(item)
                        if(!item.equipped && item.itemType=='2' && item.itemCategoryHashes[1]=='46'){
                        return (<div className="itemImage">
                          <ItemTooltip arrow
                        title={
                        <React.Fragment>
                          <div className="detailedImage">
                          <img src={screenshotUrl}
                          width="220"/>
                          </div>
                          <div className="title">
                          {item.displayProperties.name}
                          </div>
                          <div className = "item-type">
                            {item.itemTypeDisplayName}
                          </div>
                          <div className="description">
                            {item.displayProperties.description}
                          </div>
                          <hr/>
                          <div className="power">
                          {item.power}
                          </div>
                          
                          </React.Fragment>
                        }
                        >
                          <img src={imageUrl}
                            height="70"
                        />
                        </ItemTooltip>
                        </div>
                        )}
                    })}  
                  </div>  
                  </div>
                  <div className="categoryTitle">
                  Chest Armor
                </div>
                <div className="category">
                    {items.map(item=>{
                        const image = item.displayProperties.icon
                        const screenshot = item.screenshot
                        const imageUrl = "https://www.bungie.net" + image
                        const screenshotUrl = "https://www.bungie.net" + screenshot
                        getInstancedItem(item)
                        if(item.equipped && item.itemType=='2' && item.itemCategoryHashes[1]=='47'){
                        return (<div className="itemImage">
                          <ItemTooltip arrow
                        title={
                        <React.Fragment>
                          <div className="detailedImage">
                          <img src={screenshotUrl}
                          width="220"/>
                          </div>
                          <div className="title">
                          {item.displayProperties.name}
                          </div>
                          <div className = "item-type">
                            {item.itemTypeDisplayName}
                          </div>
                          <div className="description">
                            {item.displayProperties.description}
                          </div>
                          <hr/>
                          <div className="power">
                          {item.power}
                          </div>
                          
                          </React.Fragment>
                        }
                        >
                          <img src={imageUrl}
                            height="100"
                        />
                        </ItemTooltip>
                        </div>
                        )}
                    })} 
                    <div className="unequipped">
                    {items.map(item=>{
                        const image = item.displayProperties.icon
                        const screenshot = item.screenshot
                        const imageUrl = "https://www.bungie.net" + image
                        const screenshotUrl = "https://www.bungie.net" + screenshot
                        getInstancedItem(item)
                        if(!item.equipped && item.itemType=='2' && item.itemCategoryHashes[1]=='47'){
                        return (<div className="itemImage">
                         <ItemTooltip arrow
                        title={
                        <React.Fragment>
                          <div className="detailedImage">
                          <img src={screenshotUrl}
                          width="220"/>
                          </div>
                          <div className="title">
                          {item.displayProperties.name}
                          </div>
                          <div className = "item-type">
                            {item.itemTypeDisplayName}
                          </div>
                          <div className="description">
                            {item.displayProperties.description}
                          </div>
                          <hr/>
                          <div className="power">
                          {item.power}
                          </div>
                          
                          </React.Fragment>
                        }
                        >
                          <img src={imageUrl}
                            height="70"
                        />
                        </ItemTooltip>
                        </div>
                        )}
                    })}  
                  </div>  
                  </div>
                  <div className="categoryTitle">
                  Leg Armor
                </div>
                <div className="category">
                    {items.map(item=>{
                        const image = item.displayProperties.icon
                        const screenshot = item.screenshot
                        const imageUrl = "https://www.bungie.net" + image
                        const screenshotUrl = "https://www.bungie.net" + screenshot
                        getInstancedItem(item)
                        if(item.equipped && item.itemType=='2' && item.itemCategoryHashes[1]=='48'){
                        return (<div className="itemImage">
                          <ItemTooltip arrow
                        title={
                        <React.Fragment>
                          <div className="detailedImage">
                          <img src={screenshotUrl}
                          width="220"/>
                          </div>
                          <div className="title">
                          {item.displayProperties.name}
                          </div>
                          <div className = "item-type">
                            {item.itemTypeDisplayName}
                          </div>
                          <div className="description">
                            {item.displayProperties.description}
                          </div>
                          <hr/>
                          <div className="power">
                          {item.power}
                          </div>
                          
                          </React.Fragment>
                        }
                        >
                          <img src={imageUrl}
                            height="100"
                        />
                        </ItemTooltip>
                        </div>
                        )}
                    })} 
                    <div className="unequipped">
                    {items.map(item=>{
                        const image = item.displayProperties.icon
                        const screenshot = item.screenshot
                        const imageUrl = "https://www.bungie.net" + image
                        const screenshotUrl = "https://www.bungie.net" + screenshot
                        getInstancedItem(item)
                        if(!item.equipped && item.itemType=='2' && item.itemCategoryHashes[1]=='48'){
                        return (<div className="itemImage">
                         <ItemTooltip arrow
                        title={
                        <React.Fragment>
                          <div className="detailedImage">
                          <img src={screenshotUrl}
                          width="220"/>
                          </div>
                          <div className="title">
                          {item.displayProperties.name}
                          </div>
                          <div className = "item-type">
                            {item.itemTypeDisplayName}
                          </div>
                          <div className="description">
                            {item.displayProperties.description}
                          </div>
                          <hr/>
                          <div className="power">
                          {item.power}
                          </div>
                          
                          </React.Fragment>
                        }
                        >
                          <img src={imageUrl}
                            height="70"
                        />
                        </ItemTooltip>
                        </div>
                        )}
                    })}  
                  </div> 
                  </div>
                  <div className="categoryTitle">
                  Class Item
                </div>
                <div className="category">
                    {items.map(item=>{
                        const image = item.displayProperties.icon
                        const screenshot = item.screenshot
                        const imageUrl = "https://www.bungie.net" + image
                        const screenshotUrl = "https://www.bungie.net" + screenshot
                        getInstancedItem(item)
                        if(item.equipped && item.itemType=='2' && item.itemCategoryHashes[1]=='49'){
                        return (<div className="itemImage">
                          <ItemTooltip arrow
                        title={
                        <React.Fragment>
                          <div className="detailedImage">
                          <img src={screenshotUrl}
                          width="220"/>
                          </div>
                          <div className="title">
                          {item.displayProperties.name}
                          </div>
                          <div className = "item-type">
                            {item.itemTypeDisplayName}
                          </div>
                          <div className="description">
                            {item.displayProperties.description}
                          </div>
                          <hr/>
                          <div className="power">
                          {item.power}
                          </div>
                          
                          </React.Fragment>
                        }
                        >
                          <img src={imageUrl}
                            height="100"
                        />
                        </ItemTooltip>
                        </div>
                        )}
                    })} 
                    <div className="unequipped">
                    {items.map(item=>{
                        const image = item.displayProperties.icon
                        const screenshot = item.screenshot
                        const imageUrl = "https://www.bungie.net" + image
                        const screenshotUrl = "https://www.bungie.net" + screenshot
                        getInstancedItem(item)
                        if(!item.equipped && item.itemType=='2' && item.itemCategoryHashes[1]=='49'){
                        return (<div className="itemImage">
                          <ItemTooltip arrow
                        title={
                        <React.Fragment>
                          <div className="detailedImage">
                          <img src={screenshotUrl}
                          width="220"/>
                          </div>
                          <div className="title">
                          {item.displayProperties.name}
                          </div>
                          <div className = "item-type">
                            {item.itemTypeDisplayName}
                          </div>
                          <div className="description">
                            {item.displayProperties.description}
                          </div>
                          <hr/>
                          <div className="power">
                          {item.power}
                          </div>
                          
                          </React.Fragment>
                        }
                        >
                          <img src={imageUrl}
                            height="70"
                        />
                        </ItemTooltip>
                        </div>
                        )}
                    })}  
                  </div> 
                  </div>
                  </div>
            </TabPanel>
            </div>
            </div>
            
            {/* <div className = "bottomElements">
            <Button 
              variant="contained" color="secondary"
              style={{width:344,height:48}}
              onClick={()=>history.push('/loadoutSearch')}>
                NEW
            </Button>
            <Pagination className="pagination"
              count={4} 
              shape="rounded" 
              />
            </div> */}
            {/* </div> */}
          </MuiThemeProvider>
        </header>
          
      </div>
    </section>
    );
}

export default Home;