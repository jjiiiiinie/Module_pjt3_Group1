import React, { Fragment, useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import Header from '../../layout/Header';
import Footer from '../../layout/Footer';
import Bread from './Bread';
import ProductTop from '../../elements/widgets/product/productTop/ProductTop';
import DetailInformation from './DetailInformation';
import axios from 'axios';

export default function ProductDetail() {

  // var process = require('../../../myprocess.json');

  const { id } = useParams();
  const [ books, setbooks ] = useState([]);
  // const [ productData, setproductData ] = useState([]);

  const get_book = (e) => {
    axios.get(`/catalog-service/catalogs/${id}`)
    .then((res)=>{
      setbooks(res.data);
    })
  }
  // useEffect(() => {
  //   fetch(`http://${process.IP}:${process.PORT}/product/${id}`)
  //   .then(res => {
  //     return res.json();
  //   })
  //   .then(data => {
  //     setproductData(data);
  //   })
  //   // .catch(error => console.log(error));
  // },[id]);

  return(
    <Fragment>
      <Header />
      <Bread
        productName = {books.productName}
        productUrl = {`/productdetail/${books.id}`}
      />
      <ProductTop />
      <DetailInformation />
      <Footer />
    </Fragment>
  );
}