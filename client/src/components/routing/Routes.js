import React from 'react'
import {Route,Switch} from 'react-router-dom'
import Register from '../auth/Register'
import Login from '../auth/Login'
import Dashboard from '../dashboard/dashboard'
import PrivateRoute from '../routing/PrivateRouting'
import CreateProfile from '../profileForms/CreateProfile'
import EditProfile from '../profileForms/editProfile'
import AddExperience from '../profileForms/AddExperience'
import AddEducation from '../profileForms/AddEducation'
import Profiles from '../profiles/Profiles'
import Profile from '../profile/Profile'
import Posts from '../posts/Posts'
import Post from '../post/Post'
import NotFound from '../layout/NotFound'
import Alert from '../layout/alert'

const Routes = () => {
    return (
        <section className="container">
        <Alert/>
        <Switch>
          <Route exact path='/login' component={Login} />
          <Route exact path='/register' component={Register} />
          <PrivateRoute exact path='/dashboard' component={Dashboard} />
          <PrivateRoute exact path='/create-profile' component={CreateProfile} />
          <PrivateRoute exact path='/edit-profile' component={EditProfile} />
          <PrivateRoute exact path='/add-experience' component={AddExperience} />
          <PrivateRoute exact path='/add-education' component={AddEducation} />
          <Route exact path='/profiles' component={Profiles} />
          <Route exact path='/profile/:id' component={Profile} />
          <PrivateRoute exact path='/posts' component={Posts} />
          <PrivateRoute exact path='/post/:id' component={Post} />
          <Route  component={NotFound} />
  
        </Switch>
      </section>
    )
}

export default Routes
