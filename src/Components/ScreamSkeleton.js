import React , {Component,Fragment} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Skeleton from '@material-ui/lab/Skeleton';

const useStyles = makeStyles((theme) => ({
  card: {
    margin: theme.spacing(2),
  },
  media: {
    height: 300,
  },
}));

export default function ScreamSkeleton() {
  const classes = useStyles();

  return (
    <Fragment>
    <Card className={classes.card}>
      <CardHeader
        avatar={
            <Skeleton animation="wave" variant="circle" width={40} height={40} />
        }
        action={
          null
        }
        title={
            <Skeleton animation="wave" height={10} width="80%" style={{ marginBottom: 6 }} />
        }
        subheader={ <Skeleton animation="wave" height={10} width="40%" /> }
      />
      { <Skeleton animation="wave" variant="rect" className={classes.media} /> }

      <CardContent>
        <React.Fragment>
            <Skeleton animation="wave" height={10} style={{ marginBottom: 6 }} />
            <Skeleton animation="wave" height={10} width="80%" />
          </React.Fragment>
        
      </CardContent>
    </Card>
    
    
    <Card className={classes.card}>
      <CardHeader
        avatar={
            <Skeleton animation="wave" variant="circle" width={40} height={40} />
        }
        action={
          null
        }
        title={
            <Skeleton animation="wave" height={10} width="80%" style={{ marginBottom: 6 }} />
        }
        subheader={ <Skeleton animation="wave" height={10} width="40%" /> }
      />
      { <Skeleton animation="wave" variant="rect" className={classes.media} /> }

      <CardContent>
        <React.Fragment>
            <Skeleton animation="wave" height={10} style={{ marginBottom: 6 }} />
            <Skeleton animation="wave" height={10} width="80%" />
          </React.Fragment>
        
      </CardContent>
    </Card>
    
    
    <Card className={classes.card}>
      <CardHeader
        avatar={
            <Skeleton animation="wave" variant="circle" width={40} height={40} />
        }
        action={
          null
        }
        title={
            <Skeleton animation="wave" height={10} width="80%" style={{ marginBottom: 6 }} />
        }
        subheader={ <Skeleton animation="wave" height={10} width="40%" /> }
      />
      { <Skeleton animation="wave" variant="rect" className={classes.media} /> }

      <CardContent>
        <React.Fragment>
            <Skeleton animation="wave" height={10} style={{ marginBottom: 6 }} />
            <Skeleton animation="wave" height={10} width="80%" />
          </React.Fragment>
        
      </CardContent>
    </Card>
    
    
    <Card className={classes.card}>
      <CardHeader
        avatar={
            <Skeleton animation="wave" variant="circle" width={40} height={40} />
        }
        action={
          null
        }
        title={
            <Skeleton animation="wave" height={10} width="80%" style={{ marginBottom: 6 }} />
        }
        subheader={ <Skeleton animation="wave" height={10} width="40%" /> }
      />
      { <Skeleton animation="wave" variant="rect" className={classes.media} /> }

      <CardContent>
        <React.Fragment>
            <Skeleton animation="wave" height={10} style={{ marginBottom: 6 }} />
            <Skeleton animation="wave" height={10} width="80%" />
          </React.Fragment>
        
      </CardContent>
    </Card>
    </Fragment>
  );
}


