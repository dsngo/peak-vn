import React from 'react';
// import { clearSubmitStatus } from "./redux/actionCreators";
import connect from 'react-redux/es/connect/connect';

import { Carousel } from 'react-responsive-carousel';
import data from '../data';
// import { Divider } from 'material-ui';

// const featuredImg1 = {
//   background:
//     "url('https://everlane-2.imgix.net/i/88336c01_608a.jpg?q=65&dpr=1.5')",
//   backgroundSize: 'contain',
//   backgroundPosition: 'center',
//   backgroundRepeat: 'no-repeat',
//   height: '400px',
// };
// const featuredImg2 = {
//   background:
//     "url('https://everlane-2.imgix.net/i/81b3920b_d927.jpg?q=65&dpr=1.5')",
//   backgroundSize: 'contain',
//   backgroundPosition: 'center',
//   backgroundRepeat: 'no-repeat',
//   height: '400px',
// };
// const featuredImg3 = {
//   background:
//     "url('https://everlane-2.imgix.net/i/e9217a3d_452f.jpg?q=65&dpr=1.5')",
//   backgroundSize: 'contain',
//   backgroundPosition: 'center',
//   backgroundRepeat: 'no-repeat',
//   height: '400px',
// };

const Landing = props => (
  <React.Fragment>
    <Carousel
      showArrows
      showStatus={false}
      showThumbs={false}
      infiniteLoop
      autoPlay
    >
      {data.carouselImg.map(e => <img key={e.id} src={e.url} alt="" />)}
    </Carousel>

    <div>
      <div>
        <div className="title">The Denim Shop</div>
      </div>
      <div>
        <div className="title">Our Denim Factory</div>
      </div>
      <div>
        <div className="title">The Campaign</div>
      </div>
    </div>
  </React.Fragment>
);

export default connect()(Landing);
