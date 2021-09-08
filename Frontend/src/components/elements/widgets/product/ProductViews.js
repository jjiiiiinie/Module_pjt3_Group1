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


  // const categorylist = ['소설', '시/에세이', '경제/경영', '자기계발', '인문', '역사/문화', '종교', '정치/사회', '예술/대중문화', '과학', '기술/공학', '컴퓨터/IT']
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
      {/* {categorylist} */}
      <div className="row mt-5">
        {booklist}
      </div>
    </div>
  );
}