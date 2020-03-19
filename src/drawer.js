import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button'
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MailIcon from '@material-ui/icons/Mail';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { useHistory } from "react-router-dom";
import { makeStyles, useTheme, withStyles } from '@material-ui/core/styles';

const drawerWidth = 290;

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    
  },
  drawer: {
    
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    boxShadow: 'none',
    [theme.breakpoints.up('sm')]: {
      //width: `calc(100% - ${drawerWidth}px)`,
      //marginLeft: drawerWidth,
      left:"130px",
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
    backgroundColor: '#1E2025',
  },
  content: {
    flexGrow: 1,
    //padding: theme.spacing(3),
  },
}));

function ResponsiveDrawer(props) {
    let history = useHistory();
  const { container } = props;
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  const logoutURI='https://loadout.now.sh/oauth/reauth=true'
  var clientID = '31997'

  const drawer = (
    <div>
      <div className={classes.toolbar} />
      <div style={{marginLeft: '44px',marginBottom:"70px"}}>
      <Typography variant="h4">
          Destiny Gear Center
      </Typography>
      </div>

      <div className="emblem">
        <img src = {props.emblemBackground} height="70" width="290"/>
        <div className="light-value">{props.light}</div>
        <div className="class-name">{props.characterName}</div>
    </div>
      <List className="currency">
        
          <ListItem >
            <div className='currencyIcon'>
                <img src='https://vignette.wikia.nocookie.net/destinypedia/images/c/c5/Glimmer.png/revision/latest/scale-to-width-down/96?cb=20150426060802'
                    height="24px"
                    min-width="28px"/>
            </div>
            {/* <ListItemText >Glimmer </ListItemText> */}
            {props.glimmer}
        </ListItem>
        <ListItem >
        <div className='currencyIcon'>
                <img src='https://d2.destinygamewiki.com/mediawiki/images/3/3b/Legendary_shards_icon1.png'
                    height="24px"/>
            </div>
            {/* <ListItemText >Shards </ListItemText> */}
            {props.shards}
        </ListItem>
        <ListItem >
        <div className='currencyIcon'>
                <img src='https://d2.destinygamewiki.com/mediawiki/images/b/ba/Bright_dust1.png'
                    height="24px"/>
            </div>
            {/* <ListItemText >Bright Dust </ListItemText> */}
            {props.dust}
        </ListItem>
        </List>
        <Toolbar>
        <List className="pages">
            <Typography>
            CUSTOMIZE
            </Typography>
            <ListItem button>
                <ListItemText>
                    Gear
                </ListItemText>
            </ListItem>
        </List>
        </Toolbar>
        <div className='profile'>
         <div className = "profilePic">
        <img src="https://www.bungie.net/img/profile/avatars/default_avatar.gif"
            height="46px"
        />
        </div> 
      
         {props.name && <Typography variant="h7" className='profileName'>  
           {props.name} 
        </Typography>
        }
      
        </div>
      <Button style={{bottom:0,height:52}}
        variant="contained"
        type="primary"
        className="logout-button"
        onClick={()=>
        history.push('/')
        } >
          Log out</Button>
          </div>
          
    
  );

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed"  className={classes.appBar}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
          <Typography 
            variant="h6" 
            noWrap 
            className={classes.grow}
            >
            Gear
          </Typography>
        </Toolbar>
      </AppBar>
      <nav className={classes.drawer} aria-label="mailbox folders">
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Hidden smUp implementation="css">
          <Drawer
            container={container}
            variant="temporary"
            anchor={theme.direction === 'rtl' ? 'right' : 'left'}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden xsDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            variant="permanent"
            open
          >
            {drawer}
          </Drawer>
        </Hidden>
      </nav>
      <main className={classes.content}>
        <div className={classes.toolbar} />
      </main>
    </div>
  );
}

export default ResponsiveDrawer;