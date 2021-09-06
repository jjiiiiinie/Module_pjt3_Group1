import React from 'react';
import Nav from '../../elements/UI/Nav';
import Footer from '../../layout/Footer';
import Bread from '../productdetail/Bread';
import CompareTable from '../../elements/widgets/comparetable/CompareTable';

export default function Compare(){
  return(
    <div id="wrap">
      <Nav />
      <Bread productName="COMPARE"/>
      <CompareTable />
      <Footer />
    </div>
  );
}