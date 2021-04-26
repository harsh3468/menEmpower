import React, { Component } from 'react'
import './App.css';
import {BrowserRouter,Route,Switch} from 'react-router-dom'
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles'
import createMuiTheme from '@material-ui/core/styles/createMuiTheme'
import jwtDecode from 'jwt-decode'
import Home from './pages/home'
import Login from './pages/login'
import Signup from './pages/signup'
import Navbar from './Components/Navbar'
import AuthRoute from './utils/AuthRoute'
import {Provider} from 'react-redux'
import store from './redux/store'
import User from './pages/user'
import {SET_AUTHENTICATED, SET_UNAUTHENTICATED} from './redux/types'
import {logoutUser,getUserData} from './redux/actions/userAction'
import axios from 'axios';

axios.defaults.baseURL = "http://localhost:5000/menempower-6bfc4/us-central1/api" 
const token = localStorage.getItem('fireToken')
let authenticated;
if(token){
  const decodeToken = jwtDecode(token)
  if(decodeToken.exp * 1000 < Date.now()){
    store.dispatch(logoutUser())
    window.location.href = '/login'
  }else{
    store.dispatch({type:SET_AUTHENTICATED})
    axios.defaults.headers.common['Authorization'] = token
    store.dispatch(getUserData())
  }
}

const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#2196f3',
      main: '#5c6bc0',
      dark: '#6573c3',
      contrastText: '#fff'
    },
    secondary: {
      light: '#ff6333',
      main: '#ff3d00',
      dark: '#b22a00',
      contrastText: '#fff'
    }
  },
  typography: {
    useNextVariants: true
  },
 
})

class App extends Component {
  render() {
    return (
      <MuiThemeProvider theme={theme}>
      <Provider store={store}>

        <BrowserRouter>
          <Navbar/>
          <div className='container'>
          <Switch>
          
          <Route path="/" component={Home} exact/>
          <AuthRoute path="/login" component={Login}  />
          <AuthRoute path="/signup" component={Signup}  />
          <Route path='/user/:handle' component={User} />
          <Route path = '/users/:handle/scream/:screamId' component={User}/>
          </Switch>
          </div>
        
        </BrowserRouter>
        </Provider>
        </MuiThemeProvider>
    )
  }
}

export default App

