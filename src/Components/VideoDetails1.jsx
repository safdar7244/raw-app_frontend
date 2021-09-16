import React,{useState,useEffect,useContext} from 'react'
import Axios from 'axios'
import {FetchContext} from "../context/FetchContext"
import ImageCarousel from "./ImagesCarousels"
import Comments from "./Comment"
import dayjs from "dayjs"
import Carousel from 'react-gallery-carousel';
import Videos from './Videos'
import {Link} from "react-router-dom"
import 'react-gallery-carousel/dist/index.css';
import WarningOutlinedIcon from '@material-ui/icons/WarningOutlined';

function VideoDetails1(props) {

  console.log('id',props.match.params.id)
 const [data,setData]=useState(null);
 const [admin,setAdmin]=useState({});
 const [images,setImages]=useState(null);
 const [voiceOvers,setVoiceOVers]=useState(null);
 const [comments,setComments]=useState([]);
  const fetchContext = useContext(FetchContext);
  
  
const getData = async(url)=>{  
  const data = await fetchContext.authAxios.post("/videodetails",{videoId: props.match.params.id});
  console.log('dataaaaaaaaa',data.data);
  setData(data.data);
  console.log("sdasd",data.data.user);
  setAdmin(data.data.user);
  console.log("data",data)
  
  const yoo=[]
  for(var i=0 ; i<data.data.comments.length;i++){
    var replies=null;
    if(data.data.comments[i].replies){
      replies=Object.values(data.data.comments[i].replies)
    }
    const com = {
      authorId:data.data.comments[i].authorId,
      createdAt:data.data.comments[i].createdDate,
      text:data.data.comments[i].text,
      user:data.data.users[i].firstName + " " + data.data.users[i].lastName,
      userImage:data.data.users[i].imageUrl,
      replies:replies?replies:null
    }

    yoo.push(com);
  }

  console.log('yoooooo',yoo)
  setComments(yoo);
  console.log(comments);

if(data.data.videos.singleImagesList){
 var a = Object.values(data.data.videos.singleImagesList);
 
 console.log('a',a);
 
  const voiceOver=a.map((img) => ({
      videoUrl:img.voiceUrl
  }));  
 const image = a.map((img) => ({
    src: img.imageUrl
  }));

  console.log(image);
  console.log("voice",voiceOver);  
  setImages(image);
  setVoiceOVers(voiceOver)
}
  }

  useEffect(()=>{
    getData();
  },[])
 

  const Ban = async(id)=>{

    try{
     const data= await fetchContext.authAxios.post("banvideo",{id:props.match.params.id});

     alert("Banned");
    }catch(err){
      console.log(err);
    }
  }

  const Delete = async(id)=>{

    try{
     const data= await fetchContext.authAxios.post("banvideo",{id:props.match.params.id});

     alert("Deleted!");
    }catch(err){
      console.log(err);
    }
  }
  
  const adminName= admin.firstName + " "+  admin.lastName;

 return (
  <div> 

  {data && <div className="content">
   
   <div className="video-detspg">
      <h4 style={{color:"#ff8d55"}}>Video Details</h4>
      <p>{dayjs(Date.now()).format('dddd, DD MMMM  YYYY')}</p>

  <div className="vid-dets1">
  <div className="video-dets">
  <video className="vid-dets" width="400px" height="400px" controls>
        <source src={data.videos.videoUrl} type="video/mp4" />
      </video>

   <div className="par">
   <h3>Admin:</h3>
   <Link to={{
            pathname: `/users/${admin.userId}`,
            state:{
              yo: 123,
            }
            }}>
   <h3 className="val">{adminName}</h3>
   </Link>
   <h3>Channel:</h3>
   
   <h3 className="val">{data.videos.channel}</h3>
    
    <h3>Views:</h3>
    
   <h3 className="val">{data.videos.viewsCount}</h3>

   
    <h3>Comments Count:</h3>
    
   <h3 className="val">{data.videos.commentsCount}</h3>

   <h3>Description:</h3>
    
   <h3 className="val">{data.videos.description}</h3>
   
</div>
  <div className="opt">

  <div className="offe">
   {/* <WarningOutlinedIcon className='ic'/> &nbsp; <h5> Offensive Content</h5>  */}
  </div>
  
  <button className="ban" onClick={Ban}>Ban</button>
            <button className='delete1' onClick={Delete} >Delete</button>

  </div>
  </div>
      {data.comments && <Comments comments={data.comments} users={comments}/>}
       {images && <Carousel images={images}/> }
       
  </div>
  </div>
  <div>

      {voiceOvers && <center> <h3>Voice Overs</h3></center> }
       {voiceOvers && <Videos data={voiceOvers}/>}
       </div>
  <h1 style={{visibility:"hidden"}}>Grid</h1>
   </div>
  }
  </div>
 )
}

export default VideoDetails1
