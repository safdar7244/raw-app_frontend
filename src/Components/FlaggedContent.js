import React,{useState,useEffect,useContext} from 'react'
import dayjs from "dayjs"
import {FetchContext} from "../context/FetchContext"
import ReportedVideos from "./ReportedVideos"
import CircularProgress from '@material-ui/core/CircularProgress';



function FlaggedContent() {
  const fetchContext = useContext(FetchContext);
  const [vids,setVids] = useState(null);
   const [loading , setLoading] = useState(false);

 useEffect(()=>{

  const getReports = async()=>{
  setLoading(true);
   const data = await fetchContext.authAxios.get("flaggedcontent");
   
   console.log(data);
   setLoading(false);
   setVids(data.data);
   
  }

  getReports();

 },[])




 return (
  <div className="content">
{loading && <div className="loading"><CircularProgress /></div> }
   <div className="userss">
      <h4 style={{color:"#ff8d55"}}>Flagged Content</h4>
      <p>{dayjs(Date.now()).format('dddd, DD MMMM  YYYY')}</p>
      <div className="users-divider">
      </div>

      </div>
    {/* {!vids && <h1>Loading....</h1>} */}
    { vids && <ReportedVideos data= {vids}/> }
  </div>
 )
}

export default FlaggedContent
