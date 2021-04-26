import React, { useState } from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import {getScreams} from '../redux/actions/dataAction'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import store from '../redux/store';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
const useStyles = makeStyles((theme)=>({
  root: {
    padding: '2px 4px',
    display: 'flex',
    marginLeft:'20px',
    alignItems: 'center',
    width: 700,
  },
  input: {
    marginLeft:theme.spacing(1),
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
  divider: {
    height: 28,
    margin: 4,
  },
}));

function SearchBar(props){
  
  const handleChange=(event)=>{
  var filterScream = props.data.filter(scream=>(((scream.body.toLowerCase()).includes((event.target.value).toLowerCase())||
  (scream.tags&&(scream.tags.map(tag=>tag.toLowerCase())).includes(((event.target.value).toLowerCase()).split(' ').join('')))||(
    scream.location&&(scream.location.toLowerCase()).includes((event.target.value).toLowerCase())))))
    store.dispatch({type:'FILTER_SCREAMS',payload:filterScream})
  }
  const classes = useStyles()
  return (
    <Paper component="form" className={classes.root}>
      <InputBase
        className={classes.input}
        placeholder="Search tags,location and content"
        inputProps={{ 'aria-label': 'search scream' }}
        onChange ={handleChange}
      />
      <div className={classes.iconButton} aria-label="search">
        <SearchIcon />
      </div>
      
    </Paper>
  )
}
SearchBar.propTypes = {
  getScreams:PropTypes.func.isRequired,
  data:PropTypes.object.isRequired
  }
  const mapStateToProps = state=>({
      data: state.data.screams
  }
  )
  export default connect(mapStateToProps,{getScreams})(SearchBar)