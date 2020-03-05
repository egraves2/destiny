import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles(theme => ({
    root: {
        
      //display: 'flex',
      //flexWrap: 'wrap',
      background: '#565F77',
      borderRadius: 4,
      [theme.breakpoints.up('sm')]: {
        marginLeft:250,
        marginRight:10
      },
    },
    input: {
        color: 'white',
        fontSize: '20px',
      //border: '1px solid #ced4da',
      borderRadius: 4,
    },
    textField: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      width: 200,
      
    },
    palette: {
        primary:{
          main: '#ffffff',
      },
        secondary: {
          main: '#ffffff',
        }
    },
}));

function SearchBar() {
  const classes = useStyles();

  return (
    <form className={classes.root} noValidate autoComplete="off">
        
      <TextField 
        id="filled-secondary"
          style={{ margin: 0 }}
          InputProps={{disableUnderline: true}}
          placeholder="Search"
          fullWidth
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
          variant="filled"
          //color="secondary"
    />
    </form>
  );
}
export default SearchBar;