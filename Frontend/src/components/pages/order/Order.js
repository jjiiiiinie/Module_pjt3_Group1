import React from 'react';

import Nav from '../../elements/UI/Nav';
import Footer from '../../layout/Footer';
import Bread from '../productdetail/Bread';
import OrderContainer from './OrderContainer';
import CartContainer from './CartContainer'

export default function Order() {
  return (
    <div id="wrap">
      <Nav />
      <Bread productName="ORDER" />
      <CartContainer />
      <OrderContainer />
      <Footer />
    </div>
  );
}