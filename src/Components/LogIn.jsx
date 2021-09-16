import React,{useState,useContext} from 'react'
import Axios from 'axios'
import {AuthContext} from "../context/AuthContext"
import CircularProgress from '@material-ui/core/CircularProgress';
function LogIn() {
const [userData,setUserData]=useState({});
const authContext = useContext(AuthContext);
const [loading , setLoading] = useState(false);
const [err,setErr] = useState(null);

    const handleChange=(e)=>{
    const {name,value}=e.target;

    setUserData((prev)=>{
            return {
                ...prev,
                [name]:value
            }
        });

}

const handleSubmit=async (e)=>{
    e.preventDefault()
    console.log(userData);
    try{
        setLoading(true);
    const data = await Axios.post('https://secret-ravine-90423.herokuapp.com/login',userData);
    console.log(data);
    authContext.setAuthState(data.data);
    setLoading(false);
    window.location="/"
    }catch(err){
        //console.log("yo",err);
           console.log(err);
      const { data } = err.response;
      console.log("ssad",data);
      //setLoginError(data.message);
        setErr(data.msg);
    }
}


return (
    <div className="main-bg" >
     {loading && <div className="loading"><CircularProgress /></div> }
    {err && <h2 style={{color:"white", textAlign:"center"}}>{err}</h2>}
        <div className="login">
                
               <h1> <img src='../icon_psd.png' alt="bpga"/> </h1>
               <p className="raw">Raw</p>
                <h5>Welcome Back!</h5>
                <p>Sign In to Raw</p>
                    <form  onSubmit={handleSubmit}>
                    <div className="text_field">
                          <label for="email">Email</label><br></br>
                        <input type="text" placeholder="Email" required name="email" onChange={handleChange}/>

                    </div>

                    <div className="text_field">
                        
                        
                          <label for="password">Password</label><br></br>
                        <input type="password" placeholder="Password"  name="password" onChange={handleChange} required/>

                    </div>
                    <button type="submit">Log In</button>
                    </form>
        
        </div>
        
  </div>
 )
}
export default LogIn
