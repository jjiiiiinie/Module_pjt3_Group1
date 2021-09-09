import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router';

import Nav from '../../elements/UI/Nav';
import Footer from '../../layout/Footer';
import Bread from '../productdetail/Bread';
import OrderTable from './OrderTable'
import OrderFormContainer from './OrderFormContainer';
import axios from 'axios';

export default function Order() {
  // CartTableFooter > {Link to='/order'}의 매개변수로 장바구니에서 선택한 항목 받음
  const location = useLocation();
  const [orderItems, setOrderItems] = useState([]);

  // orderitems 못 받아옴
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
      <OrderFormContainer orderItems={orderItems} />
      <Footer />
    </div>
  );
}