import React, {useContext, useState, useEffect} from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import MoreIcon from '@material-ui/icons/MoreVert';

function Home(){
    return <div className="page">
        <header>
        <AppBar position="static">
        
        <Toolbar className="toolbar">
          <IconButton
            edge="start"
            className="menu-button"
            color="inherit"
            aria-label="open drawer"
          >
            <MenuIcon />
           
          </IconButton>
          <Typography className="title" variant="h5" noWrap>
            Loadouts
          </Typography>
          <IconButton aria-label="search" color="inherit">
            
          </IconButton>
          <IconButton aria-label="display more actions" edge="end" color="inherit">
            <MoreIcon />
          </IconButton>
        </Toolbar>
      </AppBar>


        </header>
        <h1>Home!</h1>
    </div>
}

export default Home