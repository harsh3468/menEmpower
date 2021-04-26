import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import withStyles from '@material-ui/core/styles/withStyles'
import {Link} from 'react-router-dom'
import Button from '@material-ui/core/Button'
import { connect } from 'react-redux'
import { Paper, Typography, Toolbar} from '@material-ui/core'
import MuiLink from '@material-ui/core/Link'
import LinkIcon from '@material-ui/icons/Link'
import CalendarToday from '@material-ui/icons/CalendarToday'
import LocationOn from '@material-ui/icons/LocationOn'
import dayjs from 'dayjs'
import IconButton from '@material-ui/core/IconButton'
import EditIcon from '@material-ui/icons/Edit'
import Tooltip from '@material-ui/core/Tooltip'
import {logoutUser,uploadImage} from '../redux/actions/userAction' 
import KeyboardReturn from '@material-ui/icons/KeyboardReturn'
import EditDetails from './EditDetails'
import ProfileSkeleton from './ProfileSkeleton'
const styles = {
    form: {
        textAlign: 'center'
      },
      image: {
        margin: '20px auto 20px auto'
      },
      pageTitle: {
        margin: '10px auto 10px auto'
      },
      textField: {
        margin: '10px auto 10px auto'
      },
      button: {
        marginTop: 20,
        position: 'relative'
      },
      customError: {
        color: 'red',
        fontSize: '0.8rem',
        marginTop: 10
      },
      progress: {
        position: 'absolute'
      },
      invisibleSeparator: {
        border: 'none',
        margin: 4
      },
      visibleSeparator: {
        width: '100%',
        borderBottom: '1px solid rgba(0,0,0,0.1)',
        marginBottom: 20
      },
      paper: {
        padding: 20
      },
      profile: {
        '& .image-wrapper': {
          textAlign: 'center',
          position: 'relative',
          '& button': {
            position: 'absolute',
            top: '80%',
            left: '70%'
          }
        },
        '& .profile-image': {
          width: 150,
          height: 150,
          objectFit: 'cover',
          maxWidth: '100%',
          borderRadius: '50%'
        },
        '& .profile-details': {
          textAlign: 'center',
          '& span, svg': {
            verticalAlign: 'middle'
          },
          '& a': {
            color: '#00bcd4'
          }
        },
        '& hr': {
          border: 'none',
          margin: '0 0 10px 0'
        },
        '& svg.button': {
          '&:hover': {
            cursor: 'pointer'
          }
        }
      },
      buttons: {
        textAlign: 'center',
        '& a': {
          margin: '20px 10px'
        }
      }
    
}

class Profile extends Component {
    handleImageChange = (event)=>{
        const fileInput = event.target.files[0]
        const formData = new FormData()
        formData.append('image',fileInput,fileInput.name)
        this.props.uploadImage(formData)
    }

    handleEditPicture = ()=>{
        const fileInput = document.getElementById('imageInput');
        fileInput.click()
    }

    handleLogout = ()=>{
        this.props.logoutUser()
    }

    render() {

        const {classes,user:{credentials:{handle,createdAt,imageUrl,bio,website,location},loading,authenticated}} = this.props
        let profileMarkup = (!loading ? (authenticated?(
            <Paper className={classes.paper} style={{position:'fixed',width:'300px'}}>
            <div className={classes.profile}>
                <div className='image-wrapper'>
                    <img src={imageUrl} alt='profile' className='profile-image'/>
                    <input type='file' id='imageInput' hidden='hidden' onChange={this.handleImageChange}/>
                    

                    
                    <Tooltip title='edit profile pic' placement='top' arrow>
                    <IconButton onClick={this.handleEditPicture} className='button'>
                    <EditIcon color='primary'></EditIcon>
                    </IconButton>
                    </Tooltip>
                
                </div>
                <hr/>
                <div className='profile-details'>
                    <MuiLink component={Link} to={`/users/${handle}`} color="primary" variant='h5'>
                    @{handle}
                    </MuiLink>
                <hr/>
                {bio && <Typography variant='body2'>{bio}</Typography>}                
                <hr/>
                {location&& 
                    <Fragment>
                    <LocationOn color='primary'/><span>{location}</span>
                    </Fragment>
                }
                <hr/>
                {website&&(
                    <Fragment>
                        <LinkIcon color='primary'/>
                        <a href={website} target='blank' rel='nopener noreferrer'>{website}</a>
                    </Fragment>
                )}

                <CalendarToday color='primary'/>{' '}
                <span>Joined{dayjs(createdAt).format('MMM YYYY')}</span>
                </div>
                <Tooltip title='logout' placement='top' arrow>
                <IconButton onClick={this.handleLogout}>
                <KeyboardReturn color='primary'></KeyboardReturn>
                </IconButton>
                
                </Tooltip>
                <EditDetails/>
                </div>

            </Paper>
        ):(
            <Paper className={classes.paper}>
            <Typography variant='body2' align='centre' style={{marginLeft:'50px',fontSize:'17px'}}>
                No profile found, please login again
            </Typography>
            <div className={classes.buttons}>
                <Button variant='contained' color='primary' component={Link} to='/login'>Login</Button>
            
                <Button variant='contained' color='primary' component={Link} to='/Signup'>SignUp</Button>
            </div>
            
            </Paper>
        )) :(<ProfileSkeleton/>))
        return (profileMarkup)
    }
}
const mapStateToProps = (state)=>({
    user:state.user
})
const mapActionToProps = {
    logoutUser,uploadImage
}
Profile.propTypes = {
    user:PropTypes.object.isRequired,
    classes:PropTypes.object.isRequired,
    logoutUser:PropTypes.func.isRequired,
    uploadImage:PropTypes.func.isRequired,
}

export default connect(mapStateToProps,mapActionToProps)(withStyles(styles)(Profile))
