import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import withStyles from '@material-ui/core/styles/withStyles'
import {connect} from 'react-redux'
import {editProfile} from '../redux/actions/userAction'
import Tooltip from '@material-ui/core/Tooltip'
import IconButton from '@material-ui/icons/Edit'
import EditIcon from '@material-ui/icons/Edit'
import { Dialog, DialogTitle, DialogContent, TextField, DialogActions, Button } from '@material-ui/core'
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
        position: 'relative',
        float:'right'
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
          width: 200,
          height: 200,
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
export class EditDetails extends Component {
    state = {
        bio:'',
        location:'',
        open:false

    }

    mapUserDetails = (credentials)=>{
      this.setState ({
          bio:credentials.bio?credentials.bio:'',
          location:credentials.location?credentials.location:''
      })
    }

    handleOpen = ()=>{
        this.setState({open:true})
        this.mapUserDetails(this.props.credentials)
    }

    handleClose = ()=>{
        this.setState({open:false})
            }
            
    componentDidMount(){
    const {credentials} = this.props;
    this.setState ({
        bio:credentials.bio?credentials.bio:'',
        location:credentials.location?credentials.location:''
    })
    }
    
    handleSubmit=()=>{
      const userDetails = {
        bio:this.state.bio,
        location:this.state.location
      }
      this.props.editProfile(userDetails)
      this.handleClose()
    }
    handleChange = (event)=>{
      this.setState({
      [event.target.name]:event.target.value
      })
    }
    
    render() {
        const {classes} = this.props
              return (
                 <Fragment>
                 <Tooltip title='Edit profile' placement='top' arrow>
                 <IconButton onClick={this.handleOpen} className={classes.button}>
                 
                        <EditIcon color="primary"/>

                 </IconButton>
                 </Tooltip>
                 
                 <Dialog open={this.state.open} onClose={this.handleClose} fullWidth maxWidth='sm'>
                 <DialogTitle>Edit Profile</DialogTitle>
                 <DialogContent>
                      <form>

                          <TextField
                          name="bio"
                          type="text"
                          label='Bio'
                          multiline
                          rows="2"
                          placeholder="A short bio about yourself"
                          className={classes.textField}
                          value={this.state.bio}
                          onChange={this.handleChange}
                          fullWidth
                          />

                          <TextField
                          name="location"
                          type="text"
                          label='Location'
                          placeholder="About your place"
                          className={classes.textField}
                          value={this.state.location}
                          onChange={this.handleChange}
                          fullWidth
                          />
                          
                      </form>
                 
                 </DialogContent>
                 
                 <DialogActions>
                  <Button onClick={this.handleClose} color='primary'>
                  Cancel
                  </Button>
                  <Button onClick={this.handleSubmit} color='primary'>
                  Save
                  </Button>
                 </DialogActions>
                 </Dialog>

                 </Fragment>
        )
    }
}
const mapStateToProps =(state)=> ({
    credentials:state.user.credentials
})
EditDetails.propTypes = {
    classes:PropTypes.object.isRequired,
    editProfile:PropTypes.func.isRequired
}

export default connect(mapStateToProps,{editProfile})(withStyles(styles)(EditDetails))
