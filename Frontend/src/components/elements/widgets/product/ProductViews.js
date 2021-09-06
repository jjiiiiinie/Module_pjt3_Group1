import React, { useState, useEffect } from 'react';
import {Link} from 'react-router-dom';
import Rating from '../../UI/Rating'

export default function ProductViews({categoryName, sliceNumber, columnNumber}) {

  var process = require('../../../../myprocess.json');

  const [ newData, setnewData ] = useState([]);
  const [ categoryLists, setCategoryLists ] = useState([]);
  
  useEffect(() => {
    fetch(`http://${process.IP}:${process.PORT}/product`)
    .then(res => {
      return res.json();
    })
    .then(data => {
      setnewData(data);
    })
    // .catch(error => console.log(error));
  },[]);

  const searchData = categoryName
  ? newData.filter(
    item => item.category.filter(single => single === categoryName)[0]
  )
  : newData;

  const handlePutWishList = (id) => {
    fetch(`http://${process.IP}:${process.PORT}/product/${id}`)
    .then(res => {
      return res.json();
    })
    .then(data => {
      fetch(`http://${process.IP}:${process.PORT}/wish`, {
        method: "POST",
        headers: {
          "Content-Type" : "application/json",
        },
        body: JSON.stringify({
          id: data.id,
          name: data.name,
          image: data.image,
          price: data.price,
          discount: data.discount
        })
      })
    }).then(
      alert("success")
    )
  }

  const handlePutCompareList = (id) => {
    fetch(`http://${process.IP}:${process.PORT}/product/${id}`)
    .then(res => {
      return res.json();
    })
    .then(data => {
      fetch(`http://${process.IP}:${process.PORT}/compare`, {
        method: "POST",
        headers: {
          "Content-Type" : "application/json",
        },
        body: JSON.stringify({
          id: data.id,
          name: data.name,
          image: data.image,
          price: data.price,
          discount: data.discount,
          shortDescription : data.shortDescription,
          rating : data.rating
        })
      })
    }).then(
      alert("success")
    )
  }

  const productmenu = searchData.map(item => (
    <div className={`col-xl-${columnNumber} col-md-6 col-lg-${columnNumber} col-sm-6`} key={item.id}>
      <div className="product-wrap mb-25">
        <div className="product-img">
          <Link to={`/productdetail/${item.id}`}>
            <img className="default-img" src="assets/img/product/fashion/8.jpg" alt="" />
            <img className="hover-img" src="/assets/img/product/fashion/6.jpg" alt="" />
          </Link>
          {/* 길이 꽉차게 */}
          <div className="product-action">
            <div className="pro-same-action pro-cart">
              <button 
                disabled="" 
                className="active"
              >
                BUY
              </button>
            </div>
            {/* 관리자만 볼 수 있음, 해당 상품 Delete */}
            <div className="pro-same-action pro-quickview">
              <button
                value={item.id}
                onClick=""
              >
                <i className="las la-trash-alt"></i>
              </button>
            </div>
          </div>
        </div>
        <div className="product-content text-center">
          <Link to={`/productdetail/${item.id}`}></Link>
          <p className="productTitle">{item.name}</p>
          {/* <p className="productScore">
          {
            item.rating && item.rating > 0 ? (
              <Rating ratingValue={item.rating}></Rating>
            ) : (
            " "
          )}
          </p> */}
          <div className="product-price">
            {/* {
              item.discount && item.discount != 0 ? (
                <div>
                  <span>{(item.price * ((100-item.discount)/100)).toFixed(2)}</span>
                  <span className="old">{item.price}</span>    
                </div>
              ) : ( */}
                <span>{item.price}</span>
            {/* )} */}
          </div>
        </div>
      </div>
    </div>
  )).slice(0,sliceNumber);
  
  return(
    <div className="row mt-5">
      {productmenu}
    </div>
  );
}