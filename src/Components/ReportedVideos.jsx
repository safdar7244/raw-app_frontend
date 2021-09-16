import React from 'react'
import {Link} from "react-router-dom"
function Videos(props) {
 console.log(props);
 return (
  
    <div className="vid-parent">
      
        
    {props.data.length<1 ? <h1> No videos found!</h1> : null}
    {  props.data.map((vid)=>{

     if(vid.videoUrl && !vid.isBanOrDeleted){
      return (
             <div className="video">
  
     <video className="video" width="250px" height="350px" controls>
        <source src={vid.videoUrl} type="video/mp4" />
      </video> 
      

   {vid.id && <Link className="video-button" to = {{
            pathname: `/reportedvideos/${vid.id}`,
     }}> Details</Link>
     }
     </div>)
     }
     else
     return null;
    

      

    })

    }

    </div>
   
  
 )
}

export default Videos
