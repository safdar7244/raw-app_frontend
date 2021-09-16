import React from 'react'

function Pagination(props) {
const pages=[];
for(var i=0;i<=Math.ceil(props.totalItems/props.perPage); i++){
  pages.push(i);
  
}

return (

  <div className="pagination">
    {props.check>0 && !props.channel  && 
    <button className="page-link" onClick={(event)=>{
      console.log(1);
      event.preventDefault();
      props.onChange(1);
    }}>
    Previous
    </button>
     }

   {!props.channel && 
    <button className="page-link1" onClick={()=>{
      console.log(2);
      props.onChange(2);
    }}>
    Next
    </button>}
    
  
   
  </div>
 )
}

export default Pagination

