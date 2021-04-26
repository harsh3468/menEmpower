import React,{useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import { Filter } from '@material-ui/icons';
import { RecommendScream } from './RecommendScream';

const useStyles = makeStyles((theme) => ({
  root1: {
    width: '360px',
    maxWidth: '38ch',
    overflow:'scroll',
    height:'450px',
    backgroundColor: theme.palette.background.paper,
    position:'fixed',
    top:450
  },
  root2: {
    width: '100%',
    maxWidth: '38ch',
    backgroundColor: theme.palette.background.paper,
    position:'fixed',
    top:450
  }
  ,
  inline: {
    display: 'inline',
  },
  text: {
    whiteSpace:'nowrap', 
    overflow:'hidden',
    textOverflow: 'ellipsis',
  }
}));

export default function AlignItemsList(props) {
  const classes = useStyles();
  const [toggle,setToggle] = useState({open:false,scream:''})
  const handleClick = (scream)=>{
    if(toggle.open!=true)
    setToggle({open:true,scream:scream})
    else
    setToggle({open:false,scream:''})
  }
  var userLikedTags = new Set()
  var setLikedScream = new Set()
  var setLocationsScream = new Set();
  props.likes.forEach(like=>{
      props.screams.forEach(scream=>{
          if(scream.screamId==like.screamId){
            setLocationsScream.add(scream.location)
          }
          if(scream.screamId==like.screamId&&scream.userHandle!=like.userHandle){
            setLikedScream.add(scream)
            scream.tags.forEach(tag=>userLikedTags.add(tag))
          }
      });
  })
  var likedScream = Array.from(setLikedScream)
  var userUniqueTags = Array.from(userLikedTags)
  var locationUserPrefer = Array.from(setLocationsScream)
  var filterRecommend = new Set() 

  var mayRecommendScream = props.screams.map(scream=>scream)
  likedScream.forEach(likedOne=>{
      mayRecommendScream.forEach((scream,index)=>{
        if(scream.screamId==likedOne.screamId){
          mayRecommendScream.splice(index,1)
        }
    })
  })
  mayRecommendScream.forEach((scream,index)=>{
    console.log(scream.userHandle+" "+props.userHandle)
      if(scream.userHandle==props.userHandle){
        mayRecommendScream.splice(index,1)
      }
  }) 
 
  mayRecommendScream.forEach(scream=>{
    locationUserPrefer.forEach(location=>{
      if(scream.location==location&&scream.userHandle!=props.credentials.handle)
          filterRecommend.add(scream)
    })
  })
  console.log(userUniqueTags)
  mayRecommendScream.forEach((scream)=>{
      userUniqueTags.forEach((tag,index)=>{
          if(scream.tags.includes(tag)){
              filterRecommend.add(scream)
          }
      })
  })
  var recommendArray = Array.from(filterRecommend)

  return (
    <>
    <RecommendScream key={toggle.scream.screamId} scream={toggle.scream} handleClose={()=>handleClick('')} openDialog={toggle.open}/>
    <List className={props.recommendation?classes.root1:classes.root2}>

        {props.authenticated?props.recommendation?(recommendArray[0]!=undefined?recommendArray.map(scream=>(
            <>
            <ListItem alignItems="flex-start" button onClick={()=>handleClick(scream)}>
            <ListItemAvatar>
              <Avatar alt="Remy Sharp" src={scream.userImage} />
            </ListItemAvatar>
            <ListItemText
              primary="Hey we recommend you this post."
              secondary={
                <React.Fragment>
                  <Typography
                    component="span"
                    variant="body2"
                    className={classes.inline}
                    color="textPrimary"
                  >
                    {scream.userHandle}
                  </Typography>
                    <div className={classes.text} >{`${scream.body}`}</div>
                </React.Fragment>
              }
            />
          </ListItem>
          </>
        )
        ):<Typography variant='h6' align='center'> Oops! nothing available of your interest.</Typography>):<><ListItem alignItems="flex-start">
        <ListItemAvatar>
          <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
        </ListItemAvatar>
        <ListItemText
          primary="Hey! We Can Recommend You."
          secondary={
            <React.Fragment>
              <Typography
                component="span"
                variant="body2"
                className={classes.inline}
                color="textPrimary"
              >
                @Support
              </Typography>
              {" — please click on the recommendation button."}
            </React.Fragment>
          }
        />
      </ListItem>
      </>:''}
    </List>
    </>
  );
}
