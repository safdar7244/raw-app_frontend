import React,{useState,useEffect,useContext} from 'react';
///import Table from 'react-bootstrap/Table';
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';
import Button from 'react-bootstrap/Button';
import Axios from "axios";
import Pagination from './Pagination'
import {Link} from "react-router-dom"
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table';
import {FetchContext} from "../context/FetchContext"
import dayjs from 'dayjs';
import BlockIcon from '@material-ui/icons/Block';
import DeleteIcon from '@material-ui/icons/Delete';
import CircularProgress from '@material-ui/core/CircularProgress';
import LockOpenIcon from '@material-ui/icons/LockOpen';
export default function Users(props) {
  const [users,setUsers]=useState(null);
  const [page,setPage]=useState(null);
  const [last,setLast]=useState();
  const [first,setFirst]=useState();
  const [check,setCheck]=useState(0);
  const [error,setError]= useState(null);
  const fetchContext = useContext(FetchContext);
  const [popUp,setPopUp] = useState(null);
  const [user,setUser]= useState(null);
  const [loading , setLoading] = useState(false);
  const [query,setQuery] = useState(null);
  const [results,setResults]=useState(null);


  const handleSearch=(e)=>{
    console.log(e.target.value);
    console.log(query);
    setQuery(e.target.value);

   console.log("here");
  }

  const sortAscendingByName = ()=>{

    
    const temp=users.slice(0).sort((a,b)=>{
      return a.firstName.localeCompare(b.firstName);
    });

    console.log(temp);
    setUsers(temp);
    
  }

  const sortDescendingByName = ()=>{

    
    const temp=users.slice(0).sort((a,b)=>{
      return a.firstName.localeCompare(b.firstName);
    });

    console.log(temp);
    setUsers(temp.reverse());
    
  }

  const sortAscendingByEmail = ()=>{

    
    const temp=users.slice(0).sort((a,b)=>{
      return a.email.localeCompare(b.email);
    });

    console.log(temp);
    setUsers(temp);
    
  }

  const sortDescendingByEmail = ()=>{

    
    const temp=users.slice(0).sort((a,b)=>{
      return a.email.localeCompare(b.email);
    });

    console.log(temp);
    setUsers(temp.reverse());
    
  }

   const sortAscendingByCity = ()=>{

    
    const temp=users.slice(0).sort((a,b)=>{
      if(a.cityName && b.cityName)
      return a.cityName.localeCompare(b.cityName);
    });

    console.log(temp);
    setUsers(temp);
    
  }

  const sortDescendingByCity = ()=>{

    
    const temp=users.slice(0).sort((a,b)=>{
      if(a.cityName && b.cityName)
      return a.cityName.localeCompare(b.cityName);
    });

    console.log(temp);
    setUsers(temp.reverse());
    
  }

   const sortAscendingByState = ()=>{

    
    const temp=users.slice(0).sort((a,b)=>{
          if(a.stateName && b.stateName)
      return a.stateName.localeCompare(b.stateName);
    });

    console.log(temp);
    setUsers(temp);
    
  }

  const sortDescendingByState = ()=>{

    
    const temp=users.slice(0).sort((a,b)=>{
       if(a.stateName && b.stateName)
      return a.stateName.localeCompare(b.stateName);
    });

    console.log(temp);
    setUsers(temp.reverse());
    
  }

  useEffect(()=>{
    const search = ()=>{
    
   console.log("here");
   if(query){
    const results=users.filter((index)=>{
      console.log(index.firstName);
      if(index.firstName && index.lastName){
        if(index.firstName.toLowerCase().includes(query.toLowerCase()) || index.lastName.toLowerCase().includes(query.toLowerCase())){
          return index;
        }
      }
    })
    setResults(results);
    console.log(results);
  }else{
    setResults(null);
  }

  }
  if(users){
  search();
  }
  },[query]);


const handleBlock= async (user)=>{

  setPopUp('block');
  setUser(user);

}

const handleUnBlock= async (user)=>{

  setPopUp('unblock');
  setUser(user);

}


const handleDelete= async (user)=>{


  setPopUp("delete");
  setUser(user);

}


const blockUser = async ()=>{

  if(user){
      try{
        setLoading(true);
  const data= await fetchContext.authAxios.post("blockuser",{userId:user.userId});
  console.log(data);
      setLoading(false);
  console.log('page',page); 
  alert('User Blocked!')
  const newusers=users;
  setUsers(null);
  const index= newusers.findIndex(function (yo) {
	return yo.userId === user.userId;
  });
  console.log(index)
  newusers[index].userStatus=2;
  console.log(newusers[index])
  setUsers(newusers);
  
  

  }catch(err){
    console.log(err);
  }

  
  

}else
    alert("Error!");



}

const deleteUser = async ()=>{

  if(user){
    try{
        setLoading(true);
  const data= await fetchContext.authAxios.post("deleteuser",{userId:user.userId});
  console.log(data);
      setLoading(false);
  //setUser(null);
  alert('User Deleted!');
  const newusers=users;
  setUsers(null);
  const index= newusers.findIndex(function (yo) {
	return yo.userId === user.userId;
  });
  console.log(index)
  newusers.splice(index,1);
  setUsers(newusers);
  
  }catch(err){
    console.log(err);
  }


  }else
    alert("Error!")

}


const unblockUser = async()=>{

  if(user){
      try{
        setLoading(true);
  const data= await fetchContext.authAxios.post("unblockuser",{userId:user.userId});
  console.log(data);
      setLoading(false);
  console.log('page',page); 
  alert('User Unblocked!')
  const newusers=users;
  setUsers(null);
 const index= newusers.findIndex(function (yo) {
	return yo.userId === user.userId;
});
  console.log(index)
  newusers[index].userStatus=1;
  console.log(newusers[index])
  setUsers(newusers);
  
  

  }catch(err){
    console.log(err);
  }


  }else
      alert("Error!");
}

 const handler = ()=>{
   console.log(popUp);
    if(popUp==='delete'){
      deleteUser();

      setPopUp(null);
    }
    else if(popUp==='block'){
      blockUser();
      setUser(null);
      setPopUp(null);
    }
    else if(popUp==='unblock' ){
      unblockUser();
      setUser(null);
      setPopUp(null);
    }
 }

const onCancel = ()=>{

  setPopUp(null);
  setUser(null);
}

async function paginate(page){
console.log('page',page);
setPage(page);
setUsers([]);
    console.log("herer");
if(page==2){
  console.log("sdsdsds")
  if(last){
  try{

        setLoading(true);
  const data= await fetchContext.authAxios.post("users/next",{last:last});
    setLoading(false);
      console.log(data.data.length);
     if(data.data){

      setUsers(data.data);
      if(data.data.length>0){
       const filteredData = data.data.filter((index) =>{
        if(index.userId){
          return index;
        }
      });
      setUsers(filteredData);
      setLoading(false);
      setLast(filteredData[filteredData.length-1].userId);
      setFirst(filteredData[0].userId);
      setCheck(check+1);
    }
      }
      console.log(data.data);
  }catch(err){
    setError("An error occured!")
    console.log(err);
    }
  }
}

else if(page===1){
  try{
    setLoading(true);
  const data= await fetchContext.authAxios.post("users/prev",{first:first});
    setLoading(false);

       const filteredData = data.data.filter((index) =>{
        if(index.userId){
         
          return index;
        }
      });
      setUsers(filteredData);
      setLoading(false);
      setLast(filteredData[filteredData.length-1].userId);
      setFirst(filteredData[0].userId);
      //console.log(data.data);
      setCheck(check-1);
  }catch(err){
    setError("An error occured!")
  }
}

}
  



  useEffect(()=>{

    const getUsers=async()=>{
    try{
      setLoading(true);
      const data= await fetchContext.authAxios.get("users");


      console.log(data.data);
      const filteredData = data.data.filter((index) =>{
        if(index.userId){
           
          return index;
        }
      });

      setUsers(filteredData);
      setLoading(false);
      setLast(filteredData[filteredData.length-1].userId);
      setFirst(filteredData[0].userId);
      console.log(filteredData[0].userId)
    }catch(err){
      console.log(err);
      setError("An error occured!")  
    }
  }
    getUsers();
  },[]);

  return (
    <>

  {!error && <>
  {loading && <div className="loading"><CircularProgress /></div> }
  {!users && <>
   
  </>}
  {users &&  <div className="content"> 
      
      <div className="userss">
      <h4 style={{color:"#ff8d55"}}>Users</h4>
      <p>{dayjs(Date.now()).format('dddd, DD MMMM  YYYY')}</p>
      <input className="search-input" value={query} type="text" placeholder="Search" onChange={handleSearch}/>
      <div className="users-divider">
      </div>

      
     {popUp && <div className="popup" >
      
      <h4>Are you sure you want to {popUp} {user.firstName + " " + user.lastName} ?</h4>
        <button className="ban-button" onClick={()=>{handler();}}>Yes</button>
            <button className='cancel' onClick={onCancel}>Cancel</button>
      </div> }
      
      <Table className="users" style={{
        
      }} >
      <Thead>
        <Tr>
        
          <Th className="left">Name  <img className="up" src='../up.svg' alt="bpga" onClick={sortAscendingByName}/>
              <img className="down"  src='../down.svg' alt="bpga" onClick={sortDescendingByName}/></Th>
          <Th>Email  <img className="up1" src='../up.svg' alt="bpga" onClick={sortAscendingByEmail}/>
              <img className="down1"  src='../down.svg' alt="bpga" onClick={sortDescendingByEmail}/></Th>
          <Th>City  <img className="up" src='../up.svg' alt="bpga" onClick={sortAscendingByCity}/>
              <img className="down"  src='../down.svg' alt="bpga" onClick={sortDescendingByCity}/></Th>
          <Th>State  <img className="up" src='../up.svg' alt="bpga" onClick={sortAscendingByState}/>
              <img className="down"  src='../down.svg' alt="bpga" onClick={sortDescendingByState}/></Th>
          <Th className="right">Action</Th>
        </Tr>
      </Thead>
      <Tbody>
      {!query && users &&users.map((user,i)=>{
          return (
            <>
          {user.userId && user.userStatus!==3 && <Tr>
          
          
            <Td data-label="Name"> <Link className="users-name" to={{
            pathname: `/users/${user.userId}`,
            state:{
              yo: 123,
            }
            }}>
            {user.firstName + " " + user.lastName} </Link> 
              </Td>
            <Td data-label="Email"><p className="users-email">{user.email}</p></Td>
            <Td data-label="City"><p className="users-city">{user.cityName}</p></Td>
            <Td data-label="State"><p className="users-state">{user.stateName}</p></Td>
            <Td data-label="Action">

              <div className="user-action">
              <button className="table-button" onClick={()=>{user.userStatus && user.userStatus==2?handleUnBlock(user):handleBlock(user)
              }} >{user.userStatus && user.userStatus===2? <LockOpenIcon/> :<img className="icons" src='../ban.svg' alt="bpga"/> }</button>
              <button className="table-button" onClick={()=>{
                handleDelete(user);
              }}><img className="icons" src='../delete.svg' alt="bpga"/></button>
              
              

              </div>
            </Td>
          </Tr> }
          </>
          );
          
        })}
        
        {query && results &&results.map((user,i)=>{
          return (
            <>
          {user.userId && user.userStatus!==3 && <Tr>
          
          
            <Td data-label="Name"> <Link className="users-name" to={{
            pathname: `/users/${user.userId}`,
            state:{
              yo: 123,
            }
            }}>
            {user.firstName + " " + user.lastName} </Link>
              
              </Td>
            <Td data-label="Email"><p className="users-email">{user.email}</p></Td>
            <Td data-label="City"><p className="users-city">{user.cityName}</p></Td>
            <Td data-label="State"><p className="users-state">{user.stateName}</p></Td>
            <Td data-label="Action">

              <div className="user-action">
              <button className="table-button" onClick={()=>{
                handleDelete(user);
              }}><img className="icons" src='../delete.svg' alt="bpga"/></button>
              <button className="table-button" onClick={()=>{user.userStatus && user.userStatus==2?handleUnBlock(user):handleBlock(user)
              }} >{user.userStatus && user.userStatus===2? <LockOpenIcon/> :<img className="icons" src='../ban.svg' alt="bpga"/> }</button>
              

              </div>
            </Td>
          </Tr> }
          </>
          );
          
        })}
        

      </Tbody>
    </Table>
    </div>
    <div><Pagination onChange={paginate} check={check} /></div>
     </div>}

    </>}
    {error && <>
     <h1>An error occured!</h1>
    </>}
    </>
  );
}