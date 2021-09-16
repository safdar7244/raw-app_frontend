import { Grid } from '@material-ui/core/Grid';
import React,{useState,useEffect,useContext} from 'react'
import Axios from "axios"
import Pagination from "./Pagination"
import dayjs from "dayjs"
import Videos from "./Videos"
import {FetchContext} from "../context/FetchContext"
import CircularProgress from '@material-ui/core/CircularProgress';

function RecentVideos() {
console.log("boga boga");
const [content,setContent]=useState();
const [page,setPage]=useState(null);
const [last,setLast]=useState();
const [first,setFirst]=useState();
const [check,setCheck]=useState(0);
const [error,setError]= useState(null);
const [time,setTime]=useState("daily");
const fetchContext = useContext(FetchContext);
const [noVids,SetNoVids]=useState(null);
 const [loading , setLoading] = useState(false);
function handleChange(e){
  setTime(e.target.value);
  console.log(time);
}

async function paginate(page){
console.log(page);
setPage(page);
setContent([]);
if(page===2){
const data= await fetchContext.authAxios.post("/newvideos/next",{last:last});

      console.log(data.data);
      setContent(data.data);
      setLast(data.data[data.data.length-1].createdAt);
      setFirst(data.data[0].createdAt);
      setCheck(check+1);
      //console.log(data.data);
}

else if(page===1){
      const data= await fetchContext.authAxios.post("/newvideos/prev",{first:first});

      console.log(data.data);
      setContent(data.data);
      setLast(data.data[data.data.length-1].createdAt);
      setFirst(data.data[0].createdAt);
      setCheck(check-1);
      //console.log(data.data);



}

}


const allcontent = "https://secret-ravine-90423.herokuapp.com/newvideos";
const getUsers=async(url)=>{

      console.log(" getusers called");
    try{

      console.log("gfdhfh");
      const data= await fetchContext.authAxios.get("/newvideos/daily");
      
      console.log("bogaboga",data.data);
      if(data.data.length < 1){
        SetNoVids(true);
      }
      if(data){
      console.log(data)}
      setContent(data.data);
      setFirst(data.data[0].createdAt);
      setLast(data.data[data.data.length-1].createdAt);
    }catch(err){
      console.log("yo",err);
      setError("An error occured!")  
    }
  }

  
// useEffect(()=>{


//     getUsers(allcontent);
//   },[]);


useEffect(()=>{

  const getUsers=async(url)=>{
      console.log(" getusers called");
    try{

      console.log("new effect",time);
      const data= await fetchContext.authAxios.get(`/newvideos/${time}`);
      console.log(data);
      if(data.data.length>0){
      console.log("bogaboga",data.data);
      setContent(data.data);
      setFirst(data.data[0].createdAt);
      setLast(data.data[data.data.length-1].createdAt);
      }else
      setContent(data.data);
      SetNoVids(true);
    }catch(err){
      console.log(err);
      setError("An error occured!")  
    }
  }
  getUsers();

},[time])

return (
  <div className="content">
   {loading && <div className="loading"><CircularProgress /></div> }
  {!error && <>
  <div className="recentVideos">
     
      <h4 style={{color:"#ff8d55"}}>Recent Videos</h4>
      <p>{dayjs(Date.now()).format('dddd, DD MMMM  YYYY')}</p>

      <select onChange={handleChange}>
        <option value="daily">Last 24 hours</option>
        <option value="weekly">Last Week</option>
        <option value="monthly">Last Month</option>
        
 

      </select>
      
  <div className="allcontent-head">
      
      
      
      </div>

  </div>
  {content && <><Videos data={content} />
  <h1 style={{visibility:"hidden"}}>Grid</h1> </>
  }
  

  {!content && <>
    <h1>Loading.....</h1>
  </>
  }
  

  </> }
  {error && <>
    <h1>{error}</h1>
  </>}
  </div>
)
}

export default RecentVideos
