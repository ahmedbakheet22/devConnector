import React ,{Fragment,useState}from 'react'
import {Link,withRouter} from 'react-router-dom'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {addEducation} from'../../actions/profile'


const AddEducation = ({addEducation,history}) => {

    const [formData,setFormData]=useState({
        school:'',
        degree:'',
        fieldofstudy:'',
        from:'',
        to:'',
        current:false,
        description:''
    })

    const [toDateDisabled,toggleDisabled]=useState(false)

    const {
        school,
        degree,
        fieldofstudy,
        from,
        to,
        current,
        description
    }=formData

    const handleChange=(e)=>setFormData({...formData,[e.target.name]:e.target.value})

    return (
        <Fragment>
            <h1 className="large text-primary">
       Add An Education
      </h1>
      <p className="lead">
        <i className="fas fa-code-branch"></i> Add any school/degree that you have had in the past
      </p>
      <small>* = required field</small>
      <form className="form" onSubmit={e=>{
          e.preventDefault()
          addEducation(formData,history)
      }}>
        <div className="form-group">
          <input type="text" placeholder="* school/bootcamp" name="school" required value={school} onChange={(e)=>{handleChange(e)}}/>
        </div>
        <div className="form-group">
          <input type="text" placeholder="* degree/certificate" name="degree" required value={degree} onChange={(e)=>{handleChange(e)}}/>
        </div>
        <div className="form-group">
          <input type="text" placeholder="field of study" name="fieldofstudy" value={fieldofstudy} onChange={(e)=>{handleChange(e)}}/>
        </div>
        <div className="form-group">
          <h4>From Date</h4>
          <input type="date" name="from" value={from} onChange={(e)=>{handleChange(e)}}/>
        </div>
         <div className="form-group">
          <p><input type="checkbox" name="current" value="" checked={current} onChange={(e)=>{
                setFormData({...formData,current:!current})
                toggleDisabled(!toDateDisabled)
          }}/> {' '} Current program</p>
        </div>
        <div className="form-group">
          <h4>To Date</h4>
          <input type="date" name="to" value={to} onChange={(e)=>{handleChange(e)}} disabled={toDateDisabled?'disabled':''}/>
        </div>
        <div className="form-group">
          <textarea
            name="description"
            cols="30"
            rows="5"
            placeholder="program Description"
            value={description} onChange={(e)=>{handleChange(e)}}
          ></textarea>
        </div>
        <input type="submit" className="btn btn-primary my-1" />
        <a className="btn btn-light my-1" href="dashboard.html">Go Back</a>
      </form>
        </Fragment>
    )
}

AddEducation.propTypes = {
    addEducation:PropTypes.func.isRequired,
}

export default connect(null,{addEducation})(withRouter(AddEducation))
