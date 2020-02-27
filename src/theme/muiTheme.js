import React, {useContext, useState, useEffect} from 'react';
import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  palette: {
    primary:{
      main: '#3C4764',
  },
    secondary: {
      main: '#F6D04D',
    },
  },
});
export default theme;