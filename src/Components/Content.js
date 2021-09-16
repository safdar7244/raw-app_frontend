import React,{useState,useEffect} from 'react'
import Axios from "axios"
import CardDeck from 'react-bootstrap/CardDeck'
import {Grid} from "@material-ui/core"
import Pagination from "./Pagination"
import Card from "./Card"
import { makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles({
  gridContainer:{
   paddingLeft: "0px",
   paddingRight:"0px" 
  }
});
function Content(props) {

const classes = useStyles();
return ( 
<>
  <Grid container spacing={0.5} classNmae={classes.gridContainer} >
    
    {props.data.map((c,i)=>{
      console.log("yo",Date.UTC());
      return (
        <>
        <Grid item xs={12} sm={6} md={4}>
        <Card videoUrl={c.videoUrl} key={i} videoTitle = {c.videoTitle} caption={c.caption} id={c.id}/>
        </Grid>
        </>
      );
    })}
  </Grid>
</>
)
}

export default Content;