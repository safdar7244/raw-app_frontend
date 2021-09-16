import React, {useState} from "react";
import dayjs from "dayjs"
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Switch from "@material-ui/core/Switch";
import Button from "@material-ui/core/Button";
import Axios from "axios"
import PersonIcon from '@material-ui/icons/Person';

function NewUsers(){

  return (
    <div className="content">
    <div className="allContent">
    <h4 style={{color:"#ff8d55"}}>New User</h4>
      <p>{dayjs(Date.now()).format('dddd, DD MMMM  YYYY')}</p>
      <div className="users-divider">
      </div>

<div className="allContent-user">
      <div className='new-user'>
      <div className="inputs">
         <label for="first-name">First Name</label><br/>
                        <input type="text" placeholder="First Name" required name="firstName"/>
                        </div>
                <div className="inputs">
         <label for="last-name">Last Name</label><br/>
                        <input type="text" placeholder="Last Name" required name="lastName"/>
                        </div>
              </div>   
                  <div className="new-user1">   
           <div className="inputs">
         <label for="first-name">Email</label><br/>
                        <input type="text" placeholder="Email" required name="email"/>
                        </div>
 

                                 <div className="small-input1">
         <label for="first-name">City</label><br/>
                        <input type="text" placeholder="City" required name="city"/>
                        </div>
                    
           <div className="small-input2">
         <label for="first-name">State</label><br/>
                        <input type="text" placeholder="state" required name="state"/>
                        </div>

                        </div>
        <div className="new-user-button"><button type="subit">Add User</button></div>
                        
     </div>
    </div>
    </div>
  )


}
export default NewUsers;
