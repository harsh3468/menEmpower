import React, { Component } from 'react'
import TextField from '@material-ui/core/TextField'
import withStyles from '@material-ui/core/styles/withStyles'
import PropTypes from 'prop-types'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import { Button } from '@material-ui/core'
import {Link} from 'react-router-dom'
import LinearProgress from '@material-ui/core/LinearProgress'
import {connect} from 'react-redux'
import {signupUser} from '../redux/actions/userAction'

const styles = {
    form:{
        textAlign:'centre',
      },
      pageTitle:{
          fontSize:'45px',
          margin:'20px auto 20px 8rem'
      },
      images:{
          width:'160px',
          margin:'5px auto 5px 120px'
      },
      innerBody:{
          background:'white',
      
      },
      button:{
          marginTop:20,
      },
      customError:{
          color:'red',
          fontSize:'0.8rem',
          marginTop:10
      },
      TextField:{
          padding:'20px'
      }
}

class signup extends Component {
    constructor(){
        super()
        this.state={
            email:'',
            password:'',
            confirmPassword:'',
            handle:'',
            loading:false,
            errors:{}
            
        }
    }
    componentWillReceiveProps(nextProps){
        if(nextProps.UI.errors){
        this.setState({
            errors:nextProps.UI.errors
        })}
    }
    handleChange=(e)=>{
        e.preventDefault()
        this.setState({
            [e.target.name]:e.target.value,
        })
    }
    handleSubmit = (e)=>{
        e.preventDefault()
        this.setState({
            loading:true
        })
        const newUserData = {
            email:this.state.email,
            password:this.state.password,
            confirmPassword:this.state.confirmPassword,
            handle:this.state.handle
            }
        this.props.signupUser(newUserData,this.props.history)
    }
    render() {
        const {classes,UI:{loading}} = this.props
        const {errors} = this.state
        return (
            <Grid container className={classes.form}> 
            <Grid item sm/>
            <Grid item lg className={classes.innerBody}>
            {loading?<LinearProgress color="primary" />:''}
            <img src='./8200.png' alt='MenEmpower' className={classes.images}></img>
            <Typography className={classes.pageTitle} >Signup</Typography>
            <form noValidate onSubmit={this.handleSubmit} className={classes.TextField} >
            <TextField
            id="outlined-email-input"
            label="Email"
            name='email'
            type="email"
            helperText={errors.email}
            error = {errors.email?true:false}
            autoComplete="current-email"
            variant="outlined" onChange={this.handleChange} fullWidth/>

            <TextField style={{marginTop:'15px'}}
            id="outlined-password-input"
            label="Password"
            name='password'
            type="password"
            helperText={errors.password}
            error = {errors.password?true:false}
            autoComplete="current-password"
            variant="outlined" onChange={this.handleChange} fullWidth/>
            
            <TextField style={{marginTop:'15px'}}
            id="outlined-password-input"
            label="ConfirmPassword"
            name='confirmPassword'
            type="password"
            helperText={errors.confirmPassword}
            error = {errors.confirmPassword?true:false}
            autoComplete="current-password"
            variant="outlined" onChange={this.handleChange} fullWidth/>
            
            <TextField style={{marginTop:'15px'}}
            id="outlined-password-input"
            label="Handle"
            name='handle'
            type="text"
            helperText={errors.handle}
            error = {errors.handle?true:false}
            autoComplete="current-password"
            variant="outlined" onChange={this.handleChange} fullWidth/>
            
            {errors.general && (
                <Typography variant='body2' className={classes.customError}>
                    {errors.general}
                </Typography>)}
            <Button type='submit' variant='contained' color='primary' className={classes.button}>Signup</Button>
            <small style={{marginLeft:'10px',fontSize:'16px' }}>already have an account ? Login <Link to='/login'>here</Link></small>
            </form>
            </Grid>
            <Grid item sm/>

            </Grid>

        )
    }
}
signup.propTypes = {
    classes:PropTypes.object.isRequired,
    user:PropTypes.object.isRequired,
    UI:PropTypes.object.isRequired,
    logoutUser:PropTypes.func.isRequired
}
const mapStateWithProps = (state) =>({
    user:state.user,
    UI:state.UI

})
export default  connect(mapStateWithProps,{signupUser})(withStyles(styles)(signup))
