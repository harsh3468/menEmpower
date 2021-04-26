import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import MyButton from '../utils/MyButton';
// import LikeButton from './LikeButton';
import dayjs from 'dayjs';
import { Link } from 'react-router-dom';
// MUI Stuff
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
// Icons
import CloseIcon from '@material-ui/icons/Close';
import UnfoldMore from '@material-ui/icons/UnfoldMore';
import ChatIcon from '@material-ui/icons/Chat';
// Redux stuff
import { connect } from 'react-redux';
import { getScream, clearErrors } from '../redux/actions/dataAction';
import LikeButton from './LikeButton';
import Comments from './Comments'
import CommentForm from './CommentForm';

const styles = {
    invisibleSeparator:{
        border:'none',
        margin:'4'
    },
    profileImage:{
        maxWidth:200,
        height:200,
        borderRadius:'50%',
        objectFit:'cover'
    },
    dialogContent:{
        padding:20
    },
    closeButton:{
        position:'absolute',
        left:'90%'
    },
    expandButton:{
        left:'2%'
    },
    spinnerDiv:{
        marginLeft:'35%',
        marginTop:50,
        marginBottom:50
    },
    invisibleSeparator:{
        border:'none',
        margin:4
    },
    visibleSeparator:{
        width:'100%',
        borderBottom:'1px solid rgba(0,0,0,0.1)',
        marginBottom:20
    }
}
export class RecommendScream extends Component {
    render() {
        const {screamId,body,createdAt,likeCount,commentCount,userImage,userHandle,comments} = this.props.scream
        const dialogMarkup = 
            <Grid container spacing={16}>
            <Grid item sm={5}>
                <img src={userImage} alt="" style={{maxWidth:200,height:200,borderRadius:'50%',objectFit:'cover'}}></img>

            </Grid>
            <Grid>
                <Typography component={Link} color="primary" variant='h5' to={`/users/${userHandle}`}>
                @{userHandle}
                
                </Typography>
                <hr style={{ border:'none',margin:'4'}}/>
                <Typography variant='body2' color='textSecondary'>
                    {dayjs(createdAt).format('h:mm a,MMM DD YYYY')}
                </Typography>
                <hr style={{ border:'none',margin:'4'}}/>
                <Typography variant='body1'>
                {body}
                </Typography>
                <LikeButton screamId={screamId}></LikeButton>
                <span>{likeCount} likes</span>
                <MyButton tip='comments'>
                    <ChatIcon></ChatIcon> 
                    </MyButton>
                 <span>{commentCount} comments</span>
                    
            </Grid>
            </Grid>
        return (
            <Fragment>
                <Dialog open={this.props.openDialog} onClose={this.props.handleClose} fullWidth maxWidth="sm">
                <DialogContent style={{padding:20}}>
                {dialogMarkup}
                </DialogContent>
                
                
                </Dialog>
            
            </Fragment>
        )
    }
}
RecommendScream.propTypes = {
    UI:PropTypes.object.isRequired
}
const mapStateToProps = state=>({
    loading:state.UI.loading
})

export default connect(mapStateToProps)(withStyles(styles)(RecommendScream))
