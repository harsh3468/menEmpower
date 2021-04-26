import React, { Component,Fragment } from 'react'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Button from '@material-ui/core/Button'
import {Link} from 'react-router-dom' 
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import MyButton from '../utils/MyButton'
import HomeIcon from '@material-ui/icons/Home'
import Notifications from './Notifications'
import PostScream from './PostScream'
import SearchBar from './SearchBar'
import Favorite from '@material-ui/icons/Favorite';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import {setRecommendation,unsetRecommendation} from '../redux/actions/userAction'
import GroupAddIcon from '@material-ui/icons/GroupAdd';
class Navbar extends Component {
    handleChange =(event)=>{
        if(this.props.recommendation==false){
            this.props.setRecommendation()
        }else{
            this.props.unsetRecommendation()
        }
    }   
    render() {
        const {authenticated,recommendation} = this.props
       
        return (
            <AppBar >
                <Toolbar>
                <img src='./women-header.png' style={{width:'180px',marginTop:'6px'}}></img>
                {authenticated?<SearchBar/>:<div style={{width:'400px'}}></div>}
                <div style={{width:'600px'}}>
                </div>
                {authenticated?(
                    <Fragment style={{width:'400px'}}>
                    <FormControlLabel
                    control={<Checkbox checked={recommendation} onChange={this.handleChange} name="recommend" />}
                    label="Recommendation"
                    />
                    <MyButton tip='connect'>
                        <GroupAddIcon style={{color:'white'}} >
                        </GroupAddIcon>
                    </MyButton>
                    
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
    authenticated:state.user.authenticated,
    recommendation:state.user.recommendation,
})
const mapActionWithProps = {
    setRecommendation,unsetRecommendation
}

export default connect(mapStateToProps,mapActionWithProps)(Navbar)
