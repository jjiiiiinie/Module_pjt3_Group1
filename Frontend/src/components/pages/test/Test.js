import React, { Fragment } from 'react';
import Nav from '../../elements/UI/Nav';
import Footer from '../../layout/Footer';
import Bread from '../productdetail/Bread';
import TestTable from '../../elements/widgets/Test/TestTable';

export default function Test(){
  return(
    <Fragment>
      <Nav/>
      <Bread productName ="Test List" />
      <TestTable />
      <Footer/>
    </Fragment>
  );
}