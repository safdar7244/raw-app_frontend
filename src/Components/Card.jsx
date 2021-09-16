import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import {Link} from "react-router-dom"
const useStyles = makeStyles({
  root: {
    minWidth: "30",
    maxHeigh:400,
    maxWidth:"90%",
    color:"#1F1B24" 
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

export default function SimpleCard(props) {
  const classes = useStyles();
  const bull = <span className={classes.bullet}>•</span>;
  console.log(props);
  return (
    <Card variant="outlined" className={classes.root}>
      <CardContent>
       <video width="80%" height="380" controls>
        <source src={props.videoUrl} type="video/mp4" />
      </video>
      <Typography className={classes.title} color="textSecondary" gutterBottom>
         {props.caption}
          {props.caption}
          <Link to={{
            pathname: `/videos/${props.id}`,
            state:{
              yo: 123,
            }
            }}>Details</Link>
        </Typography>
      </CardContent>
    </Card>
  );
}
