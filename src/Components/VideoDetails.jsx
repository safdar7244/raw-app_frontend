import React,{useState,useEffect,useContext} from 'react'
import Axios from 'axios'
import {FetchContext} from "../context/FetchContext"
import ImageCarousel from "./ImagesCarousels"
import Comments from "./Comment"
function VideoDetails(props) {

 const [data,setData]=useState(null);
 const [admin,setAdmin]=useState({});
 
  const fetchContext = useContext(FetchContext);
  const getData = async(url)=>{
   
   const data = await fetchContext.authAxios.post("/videodetails",{videoId: props.match.params.id});
   console.log(data.data);
   setData(data.data);
   console.log("sdasd",data.data.user);
   setAdmin(data.data.user);
   console.log("data",data)
  }

  useEffect(()=>{
    getData();
  },[])
 console.log(props.match.params.id);
 return (
  <>
 {data && <div className="content1">
 <div class="parent1">
  <div class="child1">
        <video className="vid" width="76%" height="75.3%" controls>
        <source src={data.videos.videoUrl} type="video/mp4" />
      </video>
      <div class="visual green"></div>
      
  </div>
  <div className="child1">
      {/* <h3>Posted by: {`${admin.firstName} ${admin.lastName}` }</h3>
      <h3>Channel: {data.videos.channel }</h3>
      <h3>Description: <p> {data.videos.description }</p></h3>
      <h3>Views: {data.videos.viewsCount }</h3>
      <h3>Comment Count: {data.videos.commentsCount }</h3> */}
<div className="main-content">
    
    <div className="container-fluid mt--12 card-outer-div">
      <div className=" row row-div ">
 
        <div className=" card col-xl-11 order-l-1 card-div ">
          {/* <div className="card bg-secondary shadow "> */}
            <div className="card-header bg-black border-0 ">
              <div className="row align-items-center">
              </div>
            </div>
            <div className="card-body ">
              <form>
                <h6>Video information</h6>
                <div className="pl-sm-12">
                <div className="row">
                  
                  <div className="col-sm-3">
                  </div>
                </div>
                  <div className="row">
                    <div className="col-sm-12">
                      <div className="form-group focused">
                        <label className="vid-lable form-control-label" for="input-username"> Admin</label>
                        <input disabled type="text" id="input-username" className="form-control form-control-alternative" placeholder="Name" value={`${admin.firstName} ${admin.lastName}`}/>
                      </div>
                    </div>
                    
                  </div>
                  <div className="row">
                    <div className="col-sm-6">
                      <div className="form-group">
                        <label className="vid-lable form-control-label" for="input-email">Channel</label>
                        <input disabled type="text" className="form-control form-control-alternative" value={data.videos.channel}/>
                      </div>
                    </div>
                    <div className="col-sm-6">
                      <div className="form-group focused">
                        <label className="vid-lable form-control-label" for="input-first-name">Views</label>
                        <input disabled type="text" id="input-first-name" className="form-control form-control-alternative" placeholder="First name" value={data.videos.viewsCount}/>
                      </div>
                    </div>
                    
                  </div>
                  <div className="row">

                    <div className="col-sm-12">
                      <div className="form-group">
                        <label className="vid-lable form-control-label" for="input-email">Comments Count</label>
                        <input disabled type="text" id="input-email" className="form-control form-control-alternative" value={data.videos.commentsCount}/>
                      </div>
                    </div>

                  </div>
                  <div className="row">

                    <div className="col-sm-12">
                      <div className="form-group">
                        <label className="vid-lable form-control-label" for="input-email">Description</label>
                        <input disabled type="text" id="input-email" className="form-control form-control-alternative" value={data.videos.description}/>
                      </div>
                    </div>

                  </div>
                </div>
                
              </form>
            </div>
          {/* </div> */}
        </div>
      </div>
    </div>
  </div>
  
  </div>

      {data.videos.singleImagesList &&< div className="child1">
          
        {data.videos.singleImagesList &&<ImageCarousel data={data.videos.singleImagesList} />}
        
        </div>}

      {data.comments && <Comments comments={data.comments}/>}

      </div>

      <div>
   
  {/* <div class="parent">
    <div class="card blue">
      <h1>Caption: {data.videos.caption}</h1>
         <video width="100%" height="auto" controls>
        <source src={data.videos.videoUrl} type="video/mp4" />
      </video>
      <div class="visual green"></div>
      <div className="video-details">
      <h3>Posted by: {`${admin.firstName} ${admin.lastName}` }</h3>
      <h3>Channel: {data.videos.channel }</h3>
      <h3>Description: <p> {data.videos.description }</p></h3>
      <h3>Views: {data.videos.viewsCount }</h3>
      <h3>Comment Count: {data.videos.commentsCount }</h3>
      </div>
    </div>
  </div> */}
  </div>
  </div>}
  </>
 )
}

export default VideoDetails;
