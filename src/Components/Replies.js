import React,{Fragment} from 'react'
import withStyles from '@material-ui/core/styles/withStyles';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
// MUI
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import { makeStyles } from '@material-ui/core/styles';

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
function Replies({replies}) {
 console.log(replies);
  const classes = useStyles();
 return (
  <div className="replies">
  
   <Grid container>
        {replies.map((comment, index) => {
          const { text, createdAt, senderImageUrl, senderName } = comment;
          return (
            <Fragment key={createdAt}>
              <Grid item sm={12}>
                <Grid container>
                  <Grid item sm={2}>
                    <img
                      src={senderImageUrl}
                      alt="comment"
                      className={classes.commentImage}
                      style={{width:"120px",height:"100px"}}
                    />
                  </Grid>
                  <Grid item sm={9}>
                    <div className={classes.commentData}>
                      <Typography
                        variant="h6"
                        component={Link}
                        to={`/users/${comment.senderId}`}
                        color="primary"
                      >
                        {senderName}
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
              {index !== replies.length - 1 && (
                <hr className={classes.visibleSeparator} />
              )}
            </Fragment>
          );
        })}
      </Grid>

  </div>
 )
}

export default Replies
