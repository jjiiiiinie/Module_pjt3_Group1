import React, { Fragment, useEffect, useState } from 'react';
import { useParams } from 'react-router';

export default function ProDetRgtTop() {

  var process = require('../../../../../myprocess.json');

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
      <h2>{productData.name}</h2>
      <div className="product-details-price">
        <span>${productData.price}</span>
      </div>
      <div className="pro-details-list">
        <p>{productData.shortDescription}</p>
      </div>
    </Fragment>
  );
}
