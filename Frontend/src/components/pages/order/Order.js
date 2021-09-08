import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router';

import Nav from '../../elements/UI/Nav';
import Footer from '../../layout/Footer';
import Bread from '../productdetail/Bread';
import OrderTable from './OrderTable'
import OrderFormContainer from './OrderFormContainer';

export default function Order() {
  // CartTableFooter'react-router-dom' > {Link}의 parameter로 변수 받기 위해 location 사용
  const location = useLocation();
  const [orderItems, setOrderItems] = useState([]);

  useEffect(() => {
    var arr = [];
    if (location.state !== undefined)
      arr = location.state.prop.map(item => item);
    setOrderItems([...arr]);
  }, []);

  return (
    <div id="wrap">
      <Nav />
      <Bread productName="ORDER" />
      <OrderTable orderItems={orderItems} />
      <OrderFormContainer />
      <Footer />
    </div>
  );
}