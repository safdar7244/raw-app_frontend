import React,{useState,useContext,useEffect} from 'react'
import {FetchContext} from "../context/FetchContext"
import {Link} from "react-router-dom"
import Typography from '@material-ui/core/Typography';
import dayjs from "dayjs"
import Videos from './Videos'
import CircularProgress from '@material-ui/core/CircularProgress';
function Stats() {
const fetchContext = useContext(FetchContext);

const [topUsers,setTopUSers]=useState(null);
const [topVids,setTopVides]=useState(null);
const [sortTopUsers,setSortTopUsers]=useState(null);
const [sortTopVids,setSortTopVids]=useState(null);
 const [loading , setLoading] = useState(false);


const handleTopUsers=(e)=>{

  console.log(e.target.value);
  setSortTopUsers(e.target.value);
}

const handleTopVids=(e)=>{

  console.log(e.target.value);
  setSortTopVids(e.target.value);
}

const getTopUsers= async()=>{

  try{
    setLoading(true);
const data =  await fetchContext.authAxios.get('/stats/users/profilelevel');

const data1 =  await fetchContext.authAxios.get('/stats/videos/views');
console.log("data",data.data)
setTopUSers(data.data);
setTopVides(data1.data);
setLoading(false);

  }catch(err){

  }

 }
 useEffect(()=>{

  getTopUsers();

 },[])

const getTopUsers1= async ()=>{
  try{
    setLoading(true);
    setTopUSers(null);
  const data =  await fetchContext.authAxios.get(`/stats/users/${sortTopUsers}`);
    setLoading(false);
console.log("data",data.data)
setTopUSers(data.data);

  }catch(err){

  }
}
useEffect(()=>{

  getTopUsers1();

},[sortTopUsers])


const getTopVids1= async ()=>{
  try{
    setLoading(true);
    setTopVides(null);
  const data =  await fetchContext.authAxios.get(`/stats/videos/${sortTopVids}`);
setLoading(false);
console.log("vidssssss",data.data)
setTopVides(data.data);

  }catch(err){

  }
}

useEffect(()=>{

  getTopVids1();
},[sortTopVids])

 return (
  <div className="content">
  {loading && <div className="loading"><CircularProgress /></div> }

  <div className="stats">
  
      <h4 style={{color:"#ff8d55"}}>Stats</h4>
      <p>{dayjs(Date.now()).format('dddd, DD MMMM  YYYY')}</p>

    <div className="allcontent-head">
      
      
      
      </div>


    <div className= "user-grandparent">

     <center> <h3>Top Users</h3></center>
    
     <select onChange={handleTopUsers} >
        <option value="profilelevel">Profile Level</option>
        <option value="profilerating">Profile Rating</option>
        <option value="totalviews">Total Views</option>
      </select>
    <div className="user-parent">
  
  
    {topUsers && topUsers.map((u)=>{
      if(u.userId){
      return (
        <div className="user">

          <img src={u.imageUrl} alt=""/>
          <Link className="video-button" to = {{
            pathname: `/users/${u.userId}`,
         }}> Details</Link>

        </div>
      )
      }
      else
        return null;
    })}

    </div>
    </div>
    
    <div className= "user-grandparent">

     <center> <h3>Top Videos</h3></center>

     <select onChange={handleTopVids} >
        <option value="views">Views Count</option>
        <option value="commentscount">Comments Count</option>
      </select>

    {topVids && <Videos data = {topVids}/> }

     </div>

    
  <h1 style={{visibility:"hidden"}}>Grid</h1>


  </div>

  </div>
 )
}

export default Stats
