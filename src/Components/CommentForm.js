import React, { Component } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
// MUI Stuff
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
// Redux stuff
import { connect } from 'react-redux';
import { submitComment} from '../redux/actions/dataAction';
import Snackbar from '@material-ui/core/Snackbar'
import Alert from '@material-ui/lab/Alert'

const styles = () => ({
});

class CommentForm extends Component {
  state = {
    body: '',
    open:false,
    errors: {}
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.UI.errors) {
      this.setState({ errors: nextProps.UI.errors });
    }
    if (!nextProps.UI.errors && !nextProps.UI.loading) {
      this.setState({ body: '' });
    }
  }
  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };
  handleOpen = ()=>{
    this.setState({open:true})
  }
  handleSubmit = (event) => {
    this.setState({errors : {}})
    event.preventDefault();
    this.props.submitComment(this.props.screamId, { body: this.state.body })
    setTimeout(()=>{
      if(!this.props.UI.errors){
      this.handleOpen()}
    },1000)

  };
  
  handleClose = ()=>{
    this.setState({open:false})
  }
  render() {
    const { classes, authenticated } = this.props;
    const errors = this.state.errors;
    const commentFormMarkup = authenticated ? (
      <Grid item sm={12} style={{ textAlign: 'center' }}>
      <Snackbar open={this.state.open} autoHideDuration={2000} onClose={this.handleClose}><Alert onClose={this.handleClose} severity="success">
      commented
    </Alert></Snackbar>
        <form onSubmit={this.handleSubmit}>
          <TextField
            name="body"
            type="text"
            label="Comment on scream"
            error={errors.comment ? true : false}
            helperText={errors.comment}
            value={this.state.body}
            onChange={this.handleChange}
            fullWidth
            className={classes.textField}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            className={classes.button}
          >
            Submit
          </Button>
        </form>
        <hr className={classes.visibleSeparator} />
      </Grid>
    ) : null;
    return commentFormMarkup;
  }
}

CommentForm.propTypes = {
  submitComment: PropTypes.func.isRequired,
  UI: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  screamId: PropTypes.string.isRequired,
  authenticated: PropTypes.bool.isRequired,
  stopLoad:PropTypes.func.isRequired

};

const mapStateToProps = (state) => ({
  UI: state.UI,
  authenticated: state.user.authenticated
});
const mapActionsToProps = {
   submitComment 
}
export default connect(
  mapStateToProps,
  mapActionsToProps
)(withStyles(styles)(CommentForm));
