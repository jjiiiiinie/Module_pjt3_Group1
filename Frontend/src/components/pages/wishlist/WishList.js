import React from 'react';
import Nav from '../../elements/UI/Nav';
import Footer from '../../layout/Footer';
import Bread from '../productdetail/Bread';
import WishTable from '../../elements/widgets/wishtable/WishTable';

export default function WishList() {

  return(
    <div id="wrap">
      <Nav />
      <Bread productName="WISHLIST" />
      <WishTable />
      <Footer />
    </div>
  );
}