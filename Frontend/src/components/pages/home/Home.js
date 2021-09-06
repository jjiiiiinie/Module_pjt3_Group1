import React, { Fragment } from 'react';
import Header from '../../layout/Header';
import Banner from '../../elements/UI/Banner' ;
import Brand from '../../../components/elements/widgets/brand/Brand';
import Deal from '../../../components/layout/Deal'
import Blog from '../../../components/layout/Blog'
import Footer from '../../layout/Footer';

export default function Home() {
  return(
    <Fragment>
      <Header></Header>
      <Deal></Deal>
      <Footer></Footer>
    </Fragment>
  );
}