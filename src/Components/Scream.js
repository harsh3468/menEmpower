import React, { Component, Fragment } from 'react'
import withStyles from '@material-ui/core/styles/withStyles'

//
import CardHeader from '@material-ui/core/CardHeader';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import { red } from '@material-ui/core/colors';




//
import PropTypes from 'prop-types'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime' // load on demand
import {Link} from 'react-router-dom'
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import {connect} from 'react-redux';
import {likeScream,unlikeScream} from '../redux/actions/dataAction'
import MyButton from '../utils/MyButton'
import ChatIcon from '@material-ui/icons/Chat'
import DeleteScream from '../Components/DeleteScream'
import ScreamDialog from './ScreamDialog'
import LikeButton  from './LikeButton'

const styles = {
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
      },
      avatar: {
        backgroundColor: red[500],
    },    
    card:{
        marginBottom:20
    },
    // image:{
    //     minWidth:200,
    // },
   
}


class Scream extends Component {

    render() {
        dayjs.extend(relativeTime)
        const {classes,scream:{body,createdAt,userImage,userHandle,screamId,likeCount,commentCount},user:{authenticated,credentials:{handle}}} = this.props
        const deleteButton = authenticated && userHandle===handle?(
           <DeleteScream screamId={screamId}/>
        ):(null)
        return (
    <Fragment>
    <Card className={classes.card} >
      <CardHeader
        avatar={
          <Avatar   src={userImage} title='Profile Pic' className={classes.avatar}/>
        }
        action={deleteButton}
        title = {<Link to={`user/${userHandle}`}>{userHandle}</Link>}
        // title=<Typography color='primary' variant='h5' component={Link} }></Typography>}
        subheader= {dayjs(createdAt).fromNow()}
      />
      <CardActions disableSpacing>
      <LikeButton screamId={screamId}></LikeButton>
      <span>{likeCount} likes</span>
      <MyButton tip='comments'>
      <ChatIcon></ChatIcon> 
      </MyButton>
      <span>{commentCount} comments</span>
      <ScreamDialog screamId={screamId} userHandle={userHandle} openDialog={this.props.openDialog}></ScreamDialog>
  
    </CardActions>
    <CardContent>
    <Typography variant='body1' color='textSecondary' style={{wordBreak:'break-word'}}>{body}</Typography>

    </CardContent>
        </Card>
        </Fragment>
        )
    }
}
Scream.propTypes = {
    user:PropTypes.object.isRequired,
    scream:PropTypes.object.isRequired,
    classes:PropTypes.object.isRequired,
    openDialog:PropTypes.bool

}
const mapStateToProps = state=>({
    user:state.user
})
const mapActionsToProps = {
    likeScream,unlikeScream
}

export default connect(mapStateToProps,mapActionsToProps)(withStyles(styles)(Scream))
