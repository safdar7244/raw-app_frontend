import React,{useEffect,useState,useContext} from 'react'
import { withRouter } from "react-router";
import axios from 'axios'
import {Grid} from "@material-ui/core"
import Typography from '@material-ui/core/Typography'
import { createMuiTheme, responsiveFontSizes, ThemeProvider } from '@material-ui/core/styles';
import Videos from "./Videos"
import Card from "./Card"
import UserDet from "./UserDet"
import { makeStyles } from '@material-ui/core/styles';
import {FetchContext} from "../context/FetchContext"
import dayjs from "dayjs"

const useStyles = makeStyles({
  gridContainer:{
   paddingLeft: "0px",
   paddingRight:"0px" 
  }
});





function UserDeatails(props) {
 
const classes = useStyles();
 const [data,setData]=useState(null);
 const [videos,setVideos]=useState([]);
 let theme = createMuiTheme();
 theme = responsiveFontSizes(theme);
 const fetchContext = useContext(FetchContext);

const handleBlock= async (userr)=>{

  try{
    
  const data1= await fetchContext.authAxios.post("blockuser",{userId:userr.userId});
  console.log(data1);
  
  alert('User Blocked!')

  const user= data;
  setData(null);
  console.log("sdasd",user);
  user.userStatus=2;
  
  setData(user);
  
  

  }catch(err){
    console.log(err);
  }

}

const handleUnBlock= async (userr)=>{

  try{
    
  const data1= await fetchContext.authAxios.post("unblockuser",{userId:userr.userId});
  console.log(data1);
  
  alert('User Unblocked!')
  
  const user= data;
  setData(null);
  user.userStatus=1;
  
  setData(user);
  
  
  

  }catch(err){
    console.log(err);
  }

}


const handleDelete= async (user)=>{

  try{
    
  const data= await fetchContext.authAxios.post("deleteuser",{userId:user.userId});
  console.log(data);
  alert('User Deleted!')
  }catch(err){
    console.log(err);
  }

}

 const url = "https://secret-ravine-90423.herokuapp.com/userdetails";
 const getData = async(url)=>{
   
   const data = await fetchContext.authAxios.post("/userdetails",{userId: props.match.params.id});
   console.log("bogaaa",data.data.user);
   setData(data.data.user);
   setVideos(data.data.videos);

  }
 useEffect(()=>{
  
  console.log("dasdasdas");


  
  getData(url);
  
 },[]);

 return (
     <div >
     
     {data && <div className="content">
     {/* <UserDet user={data.user}/> */}
     
     <div className="user-details">
        <h4 style={{color:"#ff8d55"}}>User Details</h4>
      <p>{dayjs(Date.now()).format('dddd, DD MMMM  YYYY')}</p>
      <div className="allcontent-head">
      </div>
      <div className="userdet-parent">
      
        <div className="det-child1">
          <img src={data.imageUrl} className="user-img" alt="Responsive"/>
          <div className="details-u">
          <h5>{data.firstName} {data.lastName}</h5>
          <p>{data.email}</p>
          <div className="options">
            <button  onClick={()=>{data.userStatus && data.userStatus==2?handleUnBlock(data):handleBlock(data)
              }}  className="ban">{data.userStatus && data.userStatus===2? 'Unblock' :'Block' }</button>
            <button onClick={()=>{
                handleDelete(data);
              }} className='delete'>Delete</button>
          </div>
          </div>
          </div>
          
        <div className="det-child2">
        <div className="profile-details">

        <h5>Profile Level </h5>  
        
        <h5>Profile Rating</h5>  
        </div>
        <div className="atts">
        <p>{data.profileLevel} </p>
        <p>{data.profileLevel} </p>
        </div>
          <div className="profile-details1">

        <h5>Total Videos</h5>  
        
        <h5>Total Views</h5>  
        </div> 
        <div className="atts">
        <p>{data.totalVideos?data.totalVideos:'Null' } </p>
        <p>{data.totalViews} </p>
        </div>

        </div>
      </div>
      

    {videos.length<1? <h3 style={{textAlign:"center"}}>No Videos posted!</h3>:null}
    </div>
    <Videos data={videos}/>   
    
  <h1 style={{visibility:"hidden"}}>Grid</h1>  
  </div>
  }
    
  </div>
  )
}

export default (UserDeatails)
