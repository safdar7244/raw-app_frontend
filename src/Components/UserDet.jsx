import React from 'react'
import { propTypes } from 'react-bootstrap/esm/Image'

function UserDet(props) {
  console.log(props);
 return (
  <div>
   
  <div className="main-content">
    
    <div className="  container-fluid mt--12 card-outer-div">
      <div className=" row row-div ">
 
        <div className=" card col-xl-8 order-l-1 card-div ">
          {/* <div className="card bg-secondary shadow "> */}
            <div className=" card-header bg-black border-0 ">
              <div className=" bogarow align-items-center">
              </div>
            </div>
            <div className=" card-body ">
              <form>
                <h6 className="heading-small text-muted mb-4">User information</h6>
                <div className="pl-sm-12">
                <div className="row">
                  
                  <div className="col-sm-3">
                  <img src={props.user.imageUrl} class="img-fluid img-thumbnail" alt="Responsive"/>
                  </div>
                </div>
                  <div className="row">
                    <div className="col-sm-6">
                      <div className="form-group focused">
                        <label className="form-control-label" for="input-username"> First Name</label>
                        <input disabled type="text" id="input-username" className="form-control form-control-alternative" placeholder="Name" value={props.user.firstName}/>
                      </div>
                    </div>
                    <div className="col-sm-6">
                      <div className="form-group">
                        <label className="form-control-label" for="input-email">Last Name</label>
                        <input disabled type="text" id="input-email" className="form-control form-control-alternative" value={props.user.lastName}/>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-lg-6">
                      <div className="form-group focused">
                        <label className="form-control-label" for="input-first-name">Email</label>
                        <input disabled type="text" id="input-first-name" className="form-control form-control-alternative" placeholder="First name" value={props.user.email}/>
                      </div>
                    </div>
                    <div className="col-sm-6">
                      <div className="form-group focused">
                        <label className="form-control-label" for="input-last-name">City</label>
                        <input disabled type="text" id="input-last-name" className="form-control form-control-alternative" placeholder="Last name" value={props.user.city?props.user.city: "Null" }/>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-sm-3">
                      <div className="form-group focused">
                        <label className="form-control-label" for="input-last-name">Profile Level</label>
                        <input disabled type="text" id="input-last-name" className="form-control form-control-alternative" placeholder="Profile Level" value={props.user.profileLevel }/>
                      </div>
                    </div>

                    <div className="col-sm-3">
                      <div className="form-group focused">
                        <label className="form-control-label" for="input-last-name">Profile Rating</label>
                        <input disabled type="text" id="input-last-name" className="form-control form-control-alternative" placeholder="Profile Level" value={props.user.profileRating}/>
                      </div>
                    </div>

                    <div className="col-sm-3">
                      <div className="form-group focused">
                        <label className="form-control-label" for="input-last-name">Total Videos</label>
                        <input disabled type="text" id="input-last-name" className="form-control form-control-alternative" placeholder="Profile Level" value={props.user.totalVideos }/>
                      </div>
                    </div>

                    
                    <div className="col-sm-3">
                      <div className="form-group focused">
                        <label className="form-control-label" for="input-last-name">Total Views</label>
                        <input disabled type="text" id="input-last-name" className="form-control form-control-alternative" placeholder="Profile Level" value={props.user.totalViews }/>
                      </div>
                    </div>

                  </div>
                </div>
                
              </form>
            </div>
          {/* </div> */}
        </div>
      </div>
    </div>
  </div>
  
  </div>
 )
}

export default UserDet
