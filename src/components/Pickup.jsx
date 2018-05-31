import ButtonBase from '@material-ui/core/ButtonBase';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import { withStyles } from '@material-ui/core/styles';
import React from 'react';
import { Link } from 'react-router-dom';
import { resizeImg } from '../ultis';

const styles: { [key: string]: React.CSSProperties } = {
  root: {
    width: '100%',
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    margin: 5,
    // backgroundColor: theme.palette.background.paper,
  },
  button: {
    display: 'flex',
    '&:hover': {
      zIndex: 1,
      opacity: 0.75,
      transition: 'all .5s ease',
    },
  },
};

const pickUpData = [
  {
    imgLink:
      'https://base-ec2if.akamaized.net/images/user/template/peaks8-official-ec/image-pick_img_1_5ac6ea2d6a80d.jpg',
    imgDescription: 'Facebook',
    title: 'facebook',
    description: 'Official Facebook Page',
    metalink: 'https://www.facebook.com/PeaksEight',
  },
  {
    imgLink:
      'https://base-ec2if.akamaized.net/images/user/template/peaks8-official-ec/image-pick_img_2_5ac6ea2db16b6.jpg',
    imgDescription: 'Twitter',
    title: 'twitter',
    description: 'Official Twitter Page',
    metalink: 'https://twitter.com/peaks_eight',
  },
  {
    imgLink:
      'https://base-ec2if.akamaized.net/images/user/template/peaks8-official-ec/image-pick_img_3_5ac6ea2e08c29.jpg',
    imgDescription: 'Instagram',
    title: 'instagram',
    description: 'Official Instagram Page',
    metalink: 'https://www.instagram.com/peaks_eight',
  },
];

const Pickup = ({ classes }) => (
  <div className={classes.root}>
    <GridList cols={3}>
      {pickUpData.map(e => (
        <GridListTile key={e.title}>
          <ButtonBase
            className={classes.button}
            focusRipple
            component={Link}
            to={e.metalink}
            target="_blank"
          >
            <img src={resizeImg(e.imgLink, 200)} alt="" />
            <GridListTileBar
              title={e.title.toUpperCase()}
              subtitle={e.description}
            />
          </ButtonBase>
        </GridListTile>
      ))}
    </GridList>
  </div>
);

export default withStyles(styles)(Pickup);
