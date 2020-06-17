import React, {Fragment,useEffect} from 'react';
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom'
import './App.css';
import Navbar from './components/layout/Navbar'
import Landing from './components/layout/Landing'
import Register from './components/auth/Register'
import Login from './components/auth/Login'
//redux
import {Provider} from "react-redux";
import store from './store'
import Alert from './components/layout/alert'
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
    <Route exact path='/' component={Landing} />
    <section className="container">
      <Alert/>
      <Switch>
        <Route exact path='/login' component={Login} />
        <Route exact path='/register' component={Register} />
      </Switch>
    </section>
    </Fragment>
    </Router>
    </Provider>
)}

export default App;
