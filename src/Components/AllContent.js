import React,{useState,useEffect,useContext} from 'react'
import Axios from "axios"
import Pagination from "./Pagination"
import Videos from "./Videos"
import {FetchContext} from "../context/FetchContext"
import dayjs from 'dayjs';
import CircularProgress from '@material-ui/core/CircularProgress';

function AllContent() {
const [content,setContent]=useState(null);
const [page,setPage]=useState(null);
const [last,setLast]=useState();
const [first,setFirst]=useState();
const [check,setCheck]=useState(0);
const [error,setError]= useState(null);
const [channel,setChannel]=useState(null);
const fetchContext = useContext(FetchContext);
const [loading , setLoading] = useState(false);

const channelSelect=async(e)=>{
     
      console.log(e.target.value);
      setChannel(e.target.value);
     // setContent(null);
      // try{
      // const {data}= await fetchContext.authAxios.post("/videos/channel",{channel})
      //     console.log(data);
      //     setContent(data);
          
      // }catch(err){
      //     console.log(err);

      // }
}

async function paginate(page){
console.log(page);
setPage(page);
setContent([]);
if(channel==="All" || channel==null){
if(page===2){
  try{
      setLoading(true);
     const data= await fetchContext.authAxios.post("/videos/next",{last:last});
     setLoading(false);
      console.log(data.data);
      setContent(data.data);
      if(data.data.length>0){
      if(data.data[data.data.length-1].admin){
      setLast(data.data[data.data.length-1].id);
      setFirst(data.data[0].id);
      }
      setCheck(check+1);
      }
      console.log(last);
  }catch(err){
    setError("An error occured")
  }

}

else if(page===1){

      try{
        setLoading(true);
      const data= await fetchContext.authAxios.post("/videos/prev",{first:first});
        setLoading(false);
      console.log(data.data);
      setContent(data.data);
      setLast(data.data[data.data.length-1].id);
      setFirst(data.data[0].id);
      setCheck(check-1);
      //console.log(data.data);
      }catch(err){
        
        setError("An error occured")
      }



  }

}
else{
  console.log(channel);
//    if(page===2){
//   try{
//   const data= await fetchContext.authAxios.post("/videos/channel/next",{channel,last:last});

//       console.log(data.data);
//       setContent(data.data);
//       setLast(data.data[data.data.length-1].id);
//       setFirst(data.data[0].id);
//       setCheck(check+1);
//       //console.log(data.data);
//   }catch(err){
//     setError("An error occured")
//   }

// }

// else if(page===1){

//       try{
//       const data= await fetchContext.authAxios.post("/videos/channel/prev",{
//         channel,first:first});

//       console.log(data.data);
//       setContent(data.data);
//       setLast(data.data[data.data.length-1].id);
//       setFirst(data.data[0].id);
//       setCheck(check-1);
//       //console.log(data.data);
//       }catch(err){
        
//         setError("An error occured")
//       }



//   } 
  }
}


const allcontent = "https://secret-ravine-90423.herokuapp.com/allcontent/videos";
const getUsers=async(url)=>{
      console.log(" getusers called");
    try{

      console.log("gfdhfh");
      setLoading(true);
      const data= await fetchContext.authAxios.post("/allcontent/videos");
      setLoading(false);
      console.log("bogaboga",data.data);
      setContent(data.data);
      setFirst(data.data[0].id);
      setLast(data.data[data.data.length-1].id);
    }catch(err){
      console.log(err); 
      setError("An error occured") 
    }
  }

  
useEffect(()=>{


    getUsers(allcontent);
  },[]);


  const getData=async()=>{
     try{
       setContent(null);
       setLoading(true);
      const {data}= await fetchContext.authAxios.post("/videos/channel",{channel})
          setLoading(false);
          console.log(data);
          setContent(data);
          setLast(data[data.length-1].id);
          setFirst(data[0].id);
          
      }catch(err){
          console.log(err);

      }

  }


  useEffect(()=>{

    if(channel){
      if(channel==='All'){
        getUsers(allcontent);
      }
      else
    getData();
    }
  },[channel])

return (
  <>
  {!error && <>
  
   {loading && <div className="loading"><CircularProgress /></div> }
  <div className="content">
  
  <div className="allContent">
  
      <h4 style={{color:"#ff8d55"}}>All Content</h4>
      <p>{dayjs(Date.now()).format('dddd, DD MMMM  YYYY')}</p>

      <select onChange={channelSelect}>
        <option value="All">All</option>
        <option value="Art">Art</option>
        <option value="Comedy">Comedy</option>
        <option value="Car & Auto">Car & Auto</option>
        <option value="Dance">Dance</option>
        <option value="Entertainment">Entertainment</option>
        <option value="Family & Kids">Family & Kids</option>
        <option value="Fashion<">Fashion</option>
        <option value="Fitness">Fitness</option>
        <option value="Food & Cooking<">Food & Cooking</option>
        <option value="Gaming">Gaming</option>
        <option value="Hair & Nails">Hair & Nails</option>
        <option value="Inspiration">Inspiration</option>
        <option value="Modeling">Modeling</option>
        <option value="Music & Sound">Music & Sound</option>
        <option value="Product & Services">Product & Services</option>
        <option value="Rapping">Rapping</option>
        <option value="Skits">Skits</option>
        <option value="Singing">Singing</option>
        <option value="Sports">Sports</option>
        <option value="Travel">Travel</option>
        

      </select>
      




  <div className="allcontent-head">
      
      
      
      </div>

      
      
    </div>

    {!content && <>

    </>
  }
  
  {content && <> 
    
  <Videos data={content} />
  <Pagination onChange={paginate}  check={check} channel={channel}/> </>
  }
  
  </div>
  </>}
  {error && <div className="content">


    <div>{error}</div>
  </div>}
  </>
  );

}

export default AllContent

