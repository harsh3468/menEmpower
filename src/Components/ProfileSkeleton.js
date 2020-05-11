import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Skeleton from '@material-ui/lab/Skeleton'
const useStyles = makeStyles({
  media: {
      marginTop:'20px',
    marginLeft:'110px'
  },
});

export default function ProfileSkeleton() {
  const classes = useStyles();

  return (
    <Card >
      <CardActionArea>
      <Skeleton variant="circle" width={150} height={150} className={classes.media} />
        <CardContent>
        <Skeleton animation="wave" />
        <Skeleton animation="wave" />
        <Skeleton animation="wave" />
        <Skeleton animation="wave" />
        <Skeleton animation="wave" />
        <Skeleton animation="wave" />
        <Skeleton animation="wave" />
        <Skeleton animation="wave" />
        <Skeleton animation="wave" />
        <Skeleton animation="wave" />
        <Skeleton animation="wave" />
        <Skeleton animation="wave" />
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
