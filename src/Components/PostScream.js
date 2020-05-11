import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import withStyles from '@material-ui/core/styles/withStyles'
import {connect} from 'react-redux'
import {editProfile} from '../redux/actions/userAction'
import Tooltip from '@material-ui/core/Tooltip'
import IconButton from '@material-ui/icons/Edit'
import EditIcon from '@material-ui/icons/Edit'
import LinearProgress from '@material-ui/core/LinearProgress'
import { Dialog, DialogTitle, DialogContent, TextField, Button } from '@material-ui/core'
import {postScream,clearErrors} from '../redux/actions/dataAction'
import AddIcon from '@material-ui/icons/Add'
import CloseIcon from '@material-ui/icons/Close'
import MyButton from '../utils/MyButton'
const styles={
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
      closeButton:{
        position:'absolute',
        left:'90%' 
      },
      buttons: {
        textAlign: 'center',
        '& a': {
          margin: '20px 10px'
        }
      }
       
      

}
class PostScream extends Component{
    state = {
        open:false,
        body:'',
        errors:{}
    }
    componentWillReceiveProps(nextProps){
        if(nextProps.UI.errors){
            this.setState({
                errors:nextProps    
            })
        }
        if(!nextProps.UI.errors&&!nextProps.UI.loading){
            this.setState({body:'',open:false,errors:{}})

        }
    }
    handleOpen = ()=>{
        this.setState({open:true})
    }
    handleClose = ()=>{
      this.props.clearErrors()
        this.setState({open:false,errors:{}})
    }
    handleChange = (event)=>{
        this.setState({[event.target.name]:event.target.value})
    }
    handleSubmit = (event)=>{
        event.preventDefault();
        this.props.postScream({body:this.state.body})
    }
    render(){
        const {errors} = this.state
        const {classes,UI:{loading}} = this.props
        return(
            <Fragment>
            <MyButton tip='Post a Scream' onClick={this.handleOpen} >
                    <AddIcon  style={{color:'white'}}></AddIcon>
            </MyButton>
            <Dialog open={this.state.open} onClose={this.handleClose} fullWidth maxWidth="sm">
                <MyButton tip='close' onClick={this.handleClose} tipClassName={classes.closeButton}>
                <CloseIcon/>
                </MyButton>
                <DialogTitle>Post a new scream</DialogTitle>
                <DialogContent>
                    <form onSubmit={this.handleSubmit}>
                    
                    {loading?<LinearProgress color='primary'></LinearProgress>:''}
                    <TextField
                    name='body' type='text' label='Scream' multiline rows="3" placeholder='post content here' helperText={errors.body} error={errors.body?true:false} className={classes.textField} onChange={this.handleChange} fullWidth>
                    
                    </TextField>
                    <Button type='submit' variant='contained' color='primary' className={classes.submitButton } disabled={loading} >
                        Post
                    </Button>
                    </form>
                
                </DialogContent>
            </Dialog>
            
            </Fragment>
        )



    }
}
PostScream.propTypes = {
    postScream:PropTypes.func.isRequired,
    clearErrors:PropTypes.func.isRequired,
    UI:PropTypes.object.isRequired
}

const mapStateToProps = (state)=>({
    UI:state.UI
})
const mapActionsToProps = {
  clearErrors,postScream
}

export default connect(mapStateToProps,mapActionsToProps)(withStyles(styles)(PostScream))