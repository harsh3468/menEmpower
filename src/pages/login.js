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
import {loginUser} from '../redux/actions/userAction'

const styles = {
    form:{
        textAlign:'centre',
      },
      pageTitle:{
          fontSize:'45px',
          margin:'20px auto 20px 9rem'
      },
      images:{
          width:'300px',
          margin:'20px auto 20px 50px'
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

class login extends Component {
    constructor(){
        super()
        this.state={
            email:'',
            password:'',
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
        const userData = {
            email:this.state.email,
            password:this.state.password
            }
            this.props.loginUser(userData,this.props.history)
        
    }
    render() {
        const {classes,UI:{loading}} = this.props
        const {errors} = this.state
        return (
            <Grid container className={classes.form}> 
            <Grid item sm/>
            <Grid item lg className={classes.innerBody}>
            {loading?<LinearProgress color="primary" />:''}
            <img src='./men.jpg' alt='MenEmpower' className={classes.images}></img>
            <Typography className={classes.pageTitle} >Login</Typography>
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
            {errors.general && (
                <Typography variant='body2' className={classes.customError}>
                    {errors.general}
                </Typography>)}
            <Button type='submit' variant='contained' color='primary' className={classes.button}>Login</Button>
            <small style={{marginLeft:'15px',fontSize:'16px' }}>don't have an account ? signup <Link to='/signup'>here</Link></small>
            </form>
            </Grid>
            <Grid item sm/>

            </Grid>

        )
    }
}
login.propTypes = {
    classes:PropTypes.object.isRequired,
    loginUser:PropTypes.func.isRequired,
    user:PropTypes.object.isRequired,
    UI:PropTypes.object.isRequired

}
const mapStateToProps =(state)=>({
user:state.user,
UI:state.UI
})
const mapActionsToProps = {
    loginUser
}
export default connect(mapStateToProps,mapActionsToProps)(withStyles(styles)(login))
