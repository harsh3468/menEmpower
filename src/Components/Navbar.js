import React, { Component,Fragment } from 'react'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import {Link} from 'react-router-dom' 
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import MyButton from '../utils/MyButton'
import AddIcon from '@material-ui/icons/Add'
import HomeIcon from '@material-ui/icons/Home'
import Notifications from './Notifications'
import PostScream from './PostScream'
class Navbar extends Component {
    render() {
        const {authenticated} = this.props
        return (
            <AppBar >
                <Toolbar>
                <img src='./men-header.png' style={{width:'200px',marginTop:'6px'}}></img>
                <Grid container>
                <Grid item ></Grid>
                </Grid>
                {authenticated?(
                    <Fragment >
                    <PostScream/>
                    <Link to='/'>
                    
                    <MyButton tip='Home'>
                    <HomeIcon  style={{color:'white'}}></HomeIcon>
                    </MyButton>
                    </Link>

                    <Notifications/>
                    </Fragment>
                ):(
                    <Fragment>
                    <Button  color='inherit' component={Link} to='/'>Home</Button>
                    </Fragment>
                    )}
                </Toolbar>

            </AppBar>
        )
    }
}
Navbar.propTypes = {
    authenticated:PropTypes.object.isRequired
}
const mapStateToProps = state=>({
    authenticated:state.user.authenticated
})


export default connect(mapStateToProps)(Navbar)
