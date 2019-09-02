import React, { PureComponent } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';

const styles = {
  root: {
    width: '30%',
    padding: '20px',
  },
  title: {
    fontSize: 20,
    fontWeight: 600
  }
};

class RoverPhotos extends PureComponent {

  noPhotosMarkup = () => {
    const { sol : { current }, name } = this.props;
    return (
      <div>no photos were found by sol #{current} in {name}</div>
    );
  };

  render() {
    console.log(this.props);
    const { classes, photos, name, isLoading } = this.props;
    return (
      <Paper className={classes.root}>
        <Typography className={classes.title} component="h2">{name}</Typography>

        {isLoading && (
          <Typography className={classes.title} component="p">
            Loading ...
          </Typography>
        )}

        <GridList cols={3}>
          {(photos.length !== 0 && !isLoading) ? photos.map(photo => (
            <GridListTile
              key={photo.id}
              cols={Math.round(Math.random() * 3 - 0.5)}
            >
              <img src={photo.img_src} alt={photo.camera.full_name} />
            </GridListTile>
          )) : this.noPhotosMarkup()}
        </GridList>
      </Paper>
    );
  }
}

export default withStyles(styles)(RoverPhotos);
