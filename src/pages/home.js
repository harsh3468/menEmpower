import React, { Component } from 'react'
import Grid from '@material-ui/core/Grid'
import axios from 'axios'
import PropTypes from 'prop-types'
import Scream from '../Components/Scream'
import Profile from '../Components/Profile'
import {connect} from 'react-redux'
import {getScreams} from '../redux/actions/dataAction'
import ScreamSkeleton from '../Components/ScreamSkeleton'
import { Typography } from '@material-ui/core'
import {getRecommendation} from '../redux/actions/userAction'
import RecommendList from '../Components/RecommendList'
class home extends Component {
    state={
        screams:null
    }
    componentDidMount(){
        this.props.getScreams()
        this.props.getRecommendation()
        
    }
    render() {
        const {screams,filterScreams,loading}  = this.props.data
        let recentScreamMarkup = !loading?
            (filterScreams[0]!=undefined?filterScreams.map(scream=>{
                return <Scream scream={scream} key={scream.screamId}/>}):<Typography variant='h5' align='center' >No search available</Typography>):<ScreamSkeleton/>
        return (
            <Grid container spacing={5}>
            
            <Grid item sm={8} xs={12}>
                {recentScreamMarkup}
            </Grid>
            <Grid item sm={4} xs={12}>
                <Profile/><br/>
                <RecommendList screams={screams} authenticated={this.props.user.authenticated} likes={this.props.user.likes} credentials={this.props.user.credentials}  recommendation={this.props.user.recommendation}/>
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
    data: state.data,
    user:state.user
}
)
export default connect(mapStateToProps,{getScreams,getRecommendation})(home)
