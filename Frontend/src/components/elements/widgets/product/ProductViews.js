import axios from 'axios';
import React, { useState, useEffect } from 'react';
import {Link} from 'react-router-dom';

export default function ProductViews({sliceNumber, columnNumber}) {

  const [ books, setbooks ] = useState([]);

  useEffect(() => {
    axios.get('/catalog-service/catalogs')
    .then(res => {
      setbooks(res.data);
    })
    .catch()
  },[])

  // const newUrl = window.location.pathname.split('/')[2];
  // const [ books, setbooks ] = useState([]);
  
  // useEffect(() => {
  //   axios.get(`/catalog-service/catalogs/client/${newUrl}`)
  //   .then(res => {
  //     setbooks(res.data);
  //   })
  //   .catch()
  // },[])

  // const [ count, setCount ] = useState(1);

  // const handlePutCartList = (e) => {
  //   let url = '/cart-service/carts'
  //   let Item = {
  //     'productId' : productId,
  //     'qty' : count,
  //     'unitPrice' : unitPrice,
  //     'totalPrice' : count * unitPrice,
  //     'userId' : 1
  //   }
  //   var config = {
  //     headers:{
  //       "Content-Type" : "application/json",
  //     }
  //   }
  //   axios.post(url, Item, config)
  //   .then((res) => {
  //     alert("카트에 상품이 담겼습니다.")
  //     console.log(res)
  //   }).catch((err) => {
  //     alert("상품 담기 실패")
  //     console.log(err);
  //   })
  // }

  const booklist = books.map((book) => {
    return (
      <div className={`col-xl-${columnNumber} col-md-6 col-lg-${columnNumber} col-sm-6`} >
        {/* <p>{books.category}</p> */}
        <div className="product-wrap mb-25">
          <div className="product-img">
            <Link 
              to={`/productdetail/${book.productId}`}
            >
              <img className="default-img" src="assets/img/product/fashion/8.jpg" alt="" />
              <img className="hover-img" src="/assets/img/product/fashion/6.jpg" alt="" />
            </Link>
            {/* 길이 꽉차게 */}
            <div className="product-action">
              <div className="pro-same-action pro-cart">
                <button 
                  disabled="" 
                  className="active"
                  // onClick = {handlePutCartList}
                >
                  BUY
                </button>
              </div>
              {/* 관리자만 볼 수 있음, 해당 상품 Delete */}
              <div className="pro-same-action pro-quickview">
                <button
                  value={book.productId}
                  onClick=""
                >
                  <i className="las la-trash-alt"></i>
                </button>
              </div>
            </div>
          </div>
          <div className="product-content text-center">
            <Link to={`/productdetail/${book.productId}`}></Link>
            <p className="productTitle">{book.productName}</p>
            <div className="product-price">
              <span>{book.unitPrice}원</span>
            </div>
          </div>
        </div>
      </div>
    )}
  )

  return(
    <div>
      <div className="row mt-5">
        {booklist}
      </div>
    </div>
  );
}