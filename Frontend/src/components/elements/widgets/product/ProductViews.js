import axios from 'axios';
import React, { useState } from 'react';
import {Link} from 'react-router-dom';

// export default function ProductViews({categoryName, sliceNumber, columnNumber}) {
export default function ProductViews({sliceNumber, columnNumber}) {

  const [ books, setbooks ] = useState([]);

  const get_book = (e) => {
    axios.get('/catalog-service/catalogs')
    .then((res)=>{
      setbooks(res.data);
    })
  }

  const booklist = books.map((book) => {
    return (
      <div className={`col-xl-${columnNumber} col-md-6 col-lg-${columnNumber} col-sm-6`} key={book.id}>
        <div className="product-wrap mb-25">
          <div className="product-img">
            <Link to={`/productdetail/${book.id}`}>
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
                  value={book.id}
                  onClick=""
                >
                  <i className="las la-trash-alt"></i>
                </button>
              </div>
            </div>
          </div>
          <div className="product-content text-center">
            <Link to={`/productdetail/${book.id}`}></Link>
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
    <div className="row mt-5">
      {booklist}
      <button onClick={get_book}>책목록</button>

      {/* <div className={`col-xl-${columnNumber} col-md-6 col-lg-${columnNumber} col-sm-6`} >
        <div className="product-wrap mb-25">
          <div className="product-img">
            <Link to={`/productdetail`}>
              <img className="default-img" src="assets/img/product/ele.jpg" alt="" />
              <img className="hover-img" src="/assets/img/product/ele.jpg" alt="" />
            </Link>
            {/* 길이 꽉차게 */}
            {/* <div className="product-action">
              <div className="pro-same-action pro-cart">
                <button 
                  disabled="" 
                  className="active"
                >
                  BUY
                </button>
              </div> */}
              {/* 관리자만 볼 수 있음, 해당 상품 Delete */}
              {/* <div className="pro-same-action pro-quickview">
                <button
                  value=""
                  onClick=""
                >
                  <i className="las la-trash-alt"></i>
                </button>
              </div>
            </div>
          </div>
          <div className="product-content text-center">
            <Link to={`/productdetail`}></Link>
            <p className="productTitle"><b>[인문]</b>모기 뒤에 숨은 코끼리</p>
            <div className="product-price">
              <span>16,800원</span>
            </div>
          </div>
        </div>
      </div>

      <div className={`col-xl-${columnNumber} col-md-6 col-lg-${columnNumber} col-sm-6`} >
        <div className="product-wrap mb-25">
          <div className="product-img">
            <Link to={`/productdetail`}>
              <img className="default-img" src="assets/img/product/unnamed.jpg" alt="" />
              <img className="hover-img" src="/assets/img/product/unnamed.jpg" alt="" />
            </Link>
            {/* 길이 꽉차게 */}
            {/* <div className="product-action">
              <div className="pro-same-action pro-cart">
                <button 
                  disabled="" 
                  className="active"
                >
                  BUY
                </button>
              </div> */}
              {/* 관리자만 볼 수 있음, 해당 상품 Delete
              <div className="pro-same-action pro-quickview">
                <button
                  value=""
                  onClick=""
                >
                  <i className="las la-trash-alt"></i>
                </button>
              </div>
            </div>
          </div>
          <div className="product-content text-center">
            <Link to={`/productdetail`}></Link>
            <p className="productTitle"><b>[인문]</b>모기 뒤에 숨은 코끼리</p>
            <div className="product-price">
              <span>16,800원</span>
            </div>
          </div>
        </div>
      </div> */}
    </div>
  );
}