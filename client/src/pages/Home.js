import React, { Fragment } from 'react';

import Navbar from '../components/layout/Navbar';
import Slider from '../components/bannerslider/Slider';
import Footer from '../components/layout/Footer';
import GradeSelection from '../components/preferences/GradeSelection';
import SubjectSelection from '../components/preferences/SubjectSelection';

const Home = () => {
  return (
    <Fragment>
      <Navbar />
      <Slider />
      <GradeSelection />
      <SubjectSelection />
      <Footer />
    </Fragment>
  );
}

export default Home;