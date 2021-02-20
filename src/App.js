import './App.css';
import { BrowserRouter, Switch, Route, useLocation } from 'react-router-dom'
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles'
import colors from './Library/colors'
import fontName from './Library/fontName'

import Form from './Form/Form'
import QRCode from './QRCode/QRCodeShow'

const theme = createMuiTheme({
  overrides:{
    MuiFormLabel: {
      root: {
        fontFamily: 'Sukhumvit Set',
        "&$focused": {
            color: colors.primary,
        },
      },
    },
    MuiInput:{
      root:{
        width: "100%",
        fontFamily: fontName.sukhumvit,
        fontSize: 18,
      },
      underline: {
        '&:hover:not($disabled):before': {
          borderBottom: '2px solid '+ colors.secondary
        },
        "&:after": {
          borderBottom: '2px solid ' + colors.primary
        }
      }
    },
    MuiFormHelperText:{
      root:{
        fontFamily: fontName.sukhumvit,
      }
    },
    MuiButton:{
      root:{
        fontFamily: fontName.sukhumvit,
        fontSize: 16
      },
      containedPrimary:{
        fontWeight: 'bold',
        fontSize: 20,
        backgroundColor: colors.primary
      }
    }
    
  }

})

function App() {
  
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Switch>
          <Route path="*">
            <QRApp/>
          </Route>
        </Switch>
      </BrowserRouter>
    </ThemeProvider>
  );
}

function QRApp(){
  let location = useLocation();
  return(
    <div id="global-container">
      <Switch location={location}>
        <Route path="/" exact
        children={<Form/>}/>
        <Route path="/show"
        children={<QRCode/>}>
          <QRCode/>
        </Route>
        
      </Switch>
    </div>
  )
}

export default App;
