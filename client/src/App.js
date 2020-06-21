import React, {Fragment,useEffect} from 'react';
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom'
import './App.css';
import Navbar from './components/layout/Navbar'
import Landing from './components/layout/Landing'
import Routes from './components/routing/Routes'
//redux
import {Provider} from "react-redux";
import store from './store'
import {loadUser} from './actions/auth'
import setAuthToken from './utils/setAuthToken';

if(localStorage.token){
  setAuthToken(localStorage.token)
  
}

/*
this will call it once the app is mounted and will loop calling
  useEffect(()=>{
    store.dispatch(loadUser())
  })
  
  but if we passed a second parameter [] it will do it once
  useEffect(()=>{
    store.dispatch(loadUser())
  },[])
  */
const App=()=> {
  useEffect(()=>{
      store.dispatch(loadUser())      
  },[])
  
  return (
<Provider store={store}>
    <Router>
    <Fragment >
    <Navbar/>
    <Switch>
    <Route exact path='/' component={Landing} />
    <Route component={Routes}></Route>
    </Switch>
    </Fragment>
    </Router>
    </Provider>
)}

export default App;
