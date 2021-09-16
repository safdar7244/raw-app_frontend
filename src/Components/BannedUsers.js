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
import LockOpenIcon from '@material-ui/icons/LockOpen';
import CircularProgress from '@material-ui/core/CircularProgress';

function BannedUsers() {
 //#081175;
 const [users,setUsers]=useState(null);
 const [error,setError]= useState(null);
 const fetchContext = useContext(FetchContext);
  const [popUp,setPopUp] = useState(null);
  const [user,setUser]= useState(null);
   const [loading , setLoading] = useState(false);

 const handleBlock= async (user)=>{

  setPopUp('block');
  setUser(user);

//   try{
    
//   const data= await fetchContext.authAxios.post("blockuser",{userId:user.userId});
//   console.log(data);
//   console.log('page',page); 
//   alert('User Blocked!')
//   const newusers=users;
//   setUsers(null);
//  const index= newusers.findIndex(function (yo) {
// 	return yo.userId === user.userId;
// });
//   console.log(index)
//   newusers[index].userStatus=2;
//   console.log(newusers[index])
//   setUsers(newusers);
  
  

//   }catch(err){
//     console.log(err);
//   }

}

const handleUnBlock= async (user)=>{

  setPopUp('unblock');
  setUser(user);

}


const handleDelete= async (user)=>{


  setPopUp("delete");
  setUser(user);

  // try{
    
  // const data= await fetchContext.authAxios.post("deleteuser",{userId:user.userId});
  // console.log(data);
  // alert('User Deleted!')
  // }catch(err){
  //   console.log(err);
  // }

}


const blockUser = async ()=>{

  if(user){
  try{
  setLoading(true);
  const data= await fetchContext.authAxios.post("blockuser",{userId:user.userId});
  console.log(data);
  setLoading(false);
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


 useEffect(()=>{

    const getUsers=async()=>{
    try{
      setLoading(true);
      const data= await fetchContext.authAxios.get("bannedusers");
      setLoading(false);
      console.log(data.data);
      setUsers(data.data);
     
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
  {/* {!users && <>
    <h1>Loading...</h1>
  </>} */}

     {popUp && <div className="popup" >
      
      <h4>Are you sure you want to {popUp} {user.firstName + " " + user.lastName} ?</h4>
        <button className="ban-button" onClick={()=>{handler();}}>Yes</button>
            <button className='cancel' onClick={onCancel}>Cancel</button>
      </div> }

  {users &&  <div className="content"> 
      
      <div className="userss">
      <h4 style={{color:"#ff8d55"}}>Banned Users</h4>
      <p>{dayjs(Date.now()).format('dddd, DD MMMM  YYYY')}</p>
      <div className="users-divider">
      </div>
      <Table className="users" style={{
        
      }} >
      <Thead>
        <Tr>
        
          <Th className="left">Name</Th>
          <Th>Email</Th>
          <Th>City</Th>
          <Th>State</Th>
          <Th className="right">Action</Th>
        </Tr>
      </Thead>
      <Tbody>
      {users.map((user,i)=>{
          return (
          <Tr>
          
            <Td data-label="Name"> <Link to={{
            pathname: `/users/${user.userId}`,
            state:{
              yo: 123,
            }
            }}>
            {user.firstName + " " + user.lastName} </Link>
              
              </Td>
            <Td data-label="Email"><p>{user.email}</p></Td>
            <Td data-label="City"><p>{user.cityName}</p></Td>
            <Td data-label="State"><p>{user.stateName}</p></Td>
            <Td data-label="Action">

              <div className="user-action">
              <button className="table-button" onClick={()=>{
                handleDelete(user);
              }}><DeleteIcon/></button>
              <button className="table-button" onClick={()=>{user.userStatus && user.userStatus==2?handleUnBlock(user):handleBlock(user)
              }} >{user.userStatus && user.userStatus===2? <LockOpenIcon/> :< BlockIcon/> }</button>
              
              </div>
            </Td>
          </Tr>
          
          );
          
        })}
        
      </Tbody>
    </Table>
    </div>
  
     </div>}

    </>}
    {error && <>
     <h1>An error occured!</h1>
    </>}
    </>
  );
}

export default BannedUsers
