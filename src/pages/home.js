import React, { Component } from 'react'
import Grid from '@material-ui/core/Grid'
import axios from 'axios'
import PropTypes from 'prop-types'
import Scream from '../Components/Scream'
import Profile from '../Components/Profile'
import {connect} from 'react-redux'
import {getScreams} from '../redux/actions/dataAction'
import ScreamSkeleton from '../Components/ScreamSkeleton'
class home extends Component {
    state={
        screams:null
    }
    componentDidMount(){
        this.props.getScreams()
    }
    render() {
        const {screams,loading}  = this.props.data
    
        let recentScreamMarkup = !loading?
            screams.map(scream=>{
                return <Scream scream={scream} key={scream.screamId}/>}):<ScreamSkeleton/>
        return (
            <Grid container spacing={5}>
            
            <Grid item sm={8} xs={12}>
                {recentScreamMarkup}
            </Grid>
            
            <Grid item sm={4} xs={12}>
                <Profile/>
            </Grid>
            </Grid>
        )
    }
}
home.propTypes = {
getScreams:PropTypes.func.isRequired,
data:PropTypes.object.isRequired
}
const mapStateToProps = state=>({
    data: state.data
}
)
export default connect(mapStateToProps,{getScreams})(home)
