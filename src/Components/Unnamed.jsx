import React from 'react'


function Unnamed(props) {
 
 return (
  <div>
   <div className="container"><img></img>
   </div>
    <div className="container">
        <div className="row">
            <div className="col-md-6"><span>First Name: {props.user.firstName}</span></div>
            <div classNmae="col-md-6"><span>Last Name: {props.user.lastName}</span></div>
        </div>
    </div>
    <div className="container">
        <div className="row">
            <div className="col-md-6"><span>Email: {props.user.email}</span></div>
            <div className="col-md-6"><span>City: {props.user.cityName}</span></div>
        </div>
    </div>
    <div className="container">
        <div className="row">
            <div className="col-md-12"><span>Description:</span>
                <p>{props.user.description}</p>
            </div>
        </div>
    </div>

  </div>
 )
}

export default Unnamed
