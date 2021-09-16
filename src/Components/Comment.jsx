import React,{Fragment} from 'react'
import withStyles from '@material-ui/core/styles/withStyles';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
// MUI
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import { makeStyles } from '@material-ui/core/styles';
import Replies from './Replies'
const useStyles = makeStyles({
  commentImage: {
    maxWidth: '100%',
    height: 100,
    objectFit: 'cover',
    borderRadius: '50%'
  },
  commentData: {
    marginLeft: 20
  }
});

function Comment({comments,users}) {
 const classes = useStyles();
 console.log(users)
 return (
  <div>
  <Grid container>
        {users.map((comment, index) => {
          const { text, createdAt, userImage, user } = comment;
          return (
            <Fragment key={createdAt}>
              <Grid item sm={12}>
                <Grid container>
                  <Grid item sm={2}>
                    <img
                      src={userImage}
                      alt="comment"
                      className="cmt-img"
                      
                    />
                  </Grid>
                  <Grid item sm={9}>
                    <div className={classes.commentData}>
                      <Typography
                        variant="h6"
                        component={Link}
                        to={`/users/${comment.authorId}`}
                        color="primary"
                      >
                        {user}
                      </Typography>
                      
                      <Typography variabnt="body1">{text}</Typography>
                      <Typography variant="body2" color="textSecondary">
                        {dayjs(createdAt).format('h:mm a, MMMM DD YYYY')}
                      </Typography>
                      <hr className={classes.invisibleSeparator} />
                     {comment.replies && <Replies replies={comment.replies}/> }
                    </div>
                  </Grid>
                </Grid>
              </Grid>
              {index !== comments.length - 1 && (
                <hr className={classes.visibleSeparator} />
              )}
            </Fragment>
          );
        })}
      </Grid>
   
  <h1 style={{visibility:"hidden"}}>Grid</h1> 
  </div>
 )
}

export default Comment
