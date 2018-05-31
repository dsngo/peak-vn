import { withStyles } from '@material-ui/core/styles';
// import Carousel from 'nuka-carousel';
import React from 'react';
import { resizeImg } from '../ultis';
import Slider from 'react-slick';

const styles: { [key: string]: React.CSSProperties } = {
  carousel: {
    marginBottom: 25,
  },
};

const carouselImg = [
  {
    id: 14422,
    url:
      'https://base-ec2if.akamaized.net/images/user/template/peaks8-official-ec/image-slider1_5ac33f367c2ef.jpg',
  },
  {
    id: 25125,
    url:
      'https://base-ec2if.akamaized.net/images/user/template/peaks8-official-ec/image-slider3_5ac4a8aa184d7.jpg',
  },
  {
    id: 2123,
    url:
      'https://base-ec2if.akamaized.net/images/user/template/peaks8-official-ec/image-slider5_5ac4a76cd0be8.jpg',
  },
  {
    id: 12354,
    url:
      'https://base-ec2if.akamaized.net/images/user/template/peaks8-official-ec/image-slider2_5ac33f36c6f3c.jpg',
  },
  {
    id: 5125,
    url:
      'https://base-ec2if.akamaized.net/images/user/template/peaks8-official-ec/image-slider4_5ac4aa0c080ff.jpg',
  },
];

const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
};
const Carousel = ({ classes }) => (
  <Slider {...settings} className={classes.carousel}>
    {carouselImg.map(e => (
      <img key={e.id} src={resizeImg(e.url, 1200)} alt="" />
    ))}
  </Slider>
);

export default withStyles(styles)(Carousel);
