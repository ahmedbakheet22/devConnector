import React,{useEffect, Fragment} from 'react'
import PropTypes from 'prop-types'
import {connect } from 'react-redux'
import {getCurrentProfile} from '../../actions/profile'
import Spinner from'../layout/spinner' 
import {Link} from 'react-router-dom'
import DashboardActions from './DashboardActions'
import Experience from './Experience'
import Education from './Education'
import {deleteAccount} from '../../actions/profile'
const Dashboard = ({
    getCurrentProfile,
    deleteAccount,
    auth:{user},
    profile:{profile,loading}}) => {

    useEffect(()=>{
        getCurrentProfile();
    },[getCurrentProfile])

    return loading&&profile==null?
    <Spinner/>
    :
    <Fragment>
        <h1 className='large text-primary'>Dashboard</h1>
        <p className='lead'>
            <i className='fas fa-user'/> Welcome {user && user.name}
        </p>
        {profile!==null?
            <Fragment>
                <DashboardActions/>
                {profile.education.length>0 &&
                <Education education={profile.education}></Education>
            }
                {profile.experience.length>0 &&
                <Experience experience={profile.experience}/>
                }
                <div className='my-2'>
                    <button className='btn btn-danger'
                    onClick={()=>{
                        deleteAccount()


                    }}>
                        <i className='fas fa-user-minus'></i>
                {' '}Delete My Account
                    </button>
                </div>
            </Fragment>
            :
            <Fragment>
                <p>You don't have profile Yet, it's better to add some info now!</p>
                <Link to='/create-profile' className='btn btn-primary my-1'>
                    Create Profile
                </Link>
            </Fragment>
            }
    </Fragment>
}

Dashboard.propTypes = {
    getCurrentProfile:PropTypes.func.isRequired,
    auth:PropTypes.object.isRequired,
    profile:PropTypes.object.isRequired,
    deleteAccount:PropTypes.func.isRequired,
}

const mapStateToProps=state=>({
auth:state.auth,
profile:state.profile 
})

export default connect(mapStateToProps,{getCurrentProfile,deleteAccount})(Dashboard)
