import React, { Fragment } from 'react';

import Navbar from '../components/layout/Navbar';
import Slider from '../components/bannerslider/Slider';
import Footer from '../components/layout/Footer';
import GradeSelection from '../components/layout/GradeSelection';

const Home = () => {
  return (
    <Fragment>
      <Navbar />
      <Slider />
      <GradeSelection />
      <Footer />
    </Fragment>
  );
}

export default Home;