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
import CircularProgress from '@material-ui/core/CircularProgress';


function ReportedVideoDetails(props) {

   console.log('id',props.match.params.id)
 const [video,setVideo]=useState(null);
 const [report,setReport]=useState(null);
 const [loading , setLoading] = useState(false);
   const fetchContext = useContext(FetchContext);

 useEffect(()=>{

  const getData = async()=>{

   try{
    setLoading(true);
    const data = await fetchContext.authAxios.post("/videodetails",{videoId: props.match.params.id});
    const data1 = await fetchContext.authAxios.post("/reportdetails",{id: props.match.params.id});
    console.log(data1);
  
    setVideo(data.data.videos);
    const rep = data1.data;

    console.log(rep[Object.keys(rep)].reportedByName);
     const rep1 ={
      description:rep[Object.keys(rep)].description,
      reportedBy: rep[Object.keys(rep)].reportedByName,
      reason: rep[Object.keys(rep)].reason?rep[Object.keys(rep)].reason : rep[Object.keys(rep)].reasons,
      approved:rep[Object.keys(rep)].approved,
      reportedById: rep[Object.keys(rep)].reportedById,
     }
      setLoading(false);
     console.log(rep1);
     setReport(rep1);

   }catch(err){
    console.log(err);
   }

  }

  getData();
 },[]);

  const Ban = async(id)=>{

    try{
      setLoading(true);
     const data= await fetchContext.authAxios.post("banvideo",{id:props.match.params.id});
      setLoading(false);
     alert("Banned");
    }catch(err){
      console.log(err);
    }
  }

  const Delete = async(id)=>{

    try{
      setLoading(true);
     const data= await fetchContext.authAxios.post("banvideo",{id:props.match.params.id});
      setLoading(false);
     alert("Deleted!");
    }catch(err){
      console.log(err);
    }
  }

 return (
  <div> 
{loading && <div className="loading"><CircularProgress /></div> }
  {video && <div className="content">
   
   <div className="video-detspg">
      <h4 style={{color:"#ff8d55"}}>Video Details</h4>
      <p>{dayjs(Date.now()).format('dddd, DD MMMM  YYYY')}</p>

  <div className="vid-dets1">
  <div className="video-dets">
  <video className="vid-dets" width="400px" height="400px" controls>
        <source src={video.videoUrl} type="video/mp4" />
      </video>

 {report &&  <div className="par">
   <h3>Reported By:</h3>
    <Link to={{
            pathname: `/users/${report.reportedById}`,
            state:{
              yo: 123,
            }
            }}>
  <h3 className="val">{report.reportedBy}</h3> 
  </Link>
   <h3>Reason:</h3>
   
   <h3 className="val">{report.reason}</h3>
    
    <h3>Approved:</h3>
    
   <h3 className="val">{report.approved? "True" : "False"}</h3>

   
   <h3>Description:</h3>
    
   <h3 className="val">{report.description}</h3>
   
</div> }
  <div className="opt">

  <div className="offe">
  <WarningOutlinedIcon className='ic'/> &nbsp; <h5> Offensive Content</h5> 
  </div>
  
  <button className="ban" onClick={Ban}>Ban</button>
            <button className='delete1' onClick={Delete}>Delete</button>

  </div>
  </div>
  </div>
  </div>
  <h1 style={{visibility:"hidden"}}>Grid</h1>
  </div>
  }
  </div>
 )
}

export default ReportedVideoDetails
