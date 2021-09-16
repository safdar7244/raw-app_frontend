import React from 'react'
import ReactDOM from "react-dom";
import { Carousel } from "react-responsive-carousel";
import styles from "react-responsive-carousel/lib/styles/carousel.min.css";

function imagesCarousels(props) {
 console.log(props);
 var a = Object.values(props.data)
 console.log('a',a);

 return (
  <div className="carousel-div">
   <Carousel>
                {a.map((data,i)=>{
                  return (<div>
                    <img src={data.imageUrl} alt="img" style={{height:"50%",width:"50%"}}/>
                    {/* <p className="legend">{`Legend ${i}`}</p> */}
                 </div>
                  )
                })}
                
            </Carousel>
  </div>
 )
}

export default imagesCarousels
