import React, { Fragment, useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import Header from '../../layout/Header';
import Footer from '../../layout/Footer';
import Bread from './Bread';
import ProductTop from '../../elements/widgets/product/productTop/ProductTop';
import DetailInformation from './DetailInformation';

export default function ProductDetail() {

  var process = require('../../../myprocess.json');

  const { id } = useParams();
  const [ productData, setproductData ] = useState([]);

  useEffect(() => {
    fetch(`http://${process.IP}:${process.PORT}/product/${id}`)
    .then(res => {
      return res.json();
    })
    .then(data => {
      setproductData(data);
    })
    // .catch(error => console.log(error));
  },[id]);

  return(
    <Fragment>
      <Header />
      <Bread
        productName = {productData.name}
        productUrl = {`/productdetail/${productData.id}`}
      />
      <ProductTop />
      <DetailInformation />
      <Footer />
    </Fragment>
  );
}