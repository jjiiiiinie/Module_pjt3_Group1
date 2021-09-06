import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Rating from '../../UI/Rating';

export default function CompareTable() {

  const [ compareDatas, setCompareDatas ] = useState([]);

  var process = require('../../../../myprocess.json');

  useEffect(() => {
    fetch(`http://${process.IP}:${process.PORT}/compare`)
    .then(res => {
      return res.json();
    })
    .then(data => {
      setCompareDatas(data);
    })
    // .catch(error => console.log(error));
  },[]);
  
  const handleDelete = (id) => {
    fetch(`http://${process.IP}:${process.PORT}/compare/${id}`, {
      method: "DELETE"
    }).then(
      alert("삭제되었습니다."),
      fetch(`http://${process.IP}:${process.PORT}/compare`)
      .then(res => {
        return res.json();
      })
      .then(data => {
        setCompareDatas(data);
      })
    )
  }

  const compareProductInfo = compareDatas.map(item => (
    <td className="product-image-title" key={item.id}>
      <div className="compare-remove">
        <button
          title={item.id}
          onClick={() => handleDelete(item.id)}
          value={item.id}
        >
          <i className="las la-trash"></i>
        </button>
      </div>
      <Link className="image" to={`/productdetail/${item.id}`}><img className="img-fluid" src={item.image[0]} alt="" /></Link>
      <div className="product-title">
        <Link to={`/productdetail/${item.id}`}>{item.name}</Link>
      </div>
      <div className="compare-btn">
        <a href="/product/2">Select Option</a>
      </div>
    </td>
  )).slice(0,3);

  const comparePrice = compareDatas.map(item => (
    <td className="product-price" key={item.id}>
      <span className="amount old">${item.price}</span>
      <span className="amount">${(item.price * ((100-item.discount)/100)).toFixed(2)}</span>
    </td>
  )).slice(0,3);

  const compareDescription = compareDatas.map(item => (
    <td className="product-desc" key={item.id}>
      <p>
        {item.shortDescription}
      </p>
    </td>
  )).slice(0,3);

  const compareRating = compareDatas.map(item => (
    <td className="product-rating" key={item.id}>
      {
        item.rating && item.rating > 0 ? (
          <Rating ratingValue={item.rating}></Rating>
        ) : (
        " "
      )}
    </td>
  )).slice(0,3);

  return(
    <div className="compare-main-area pt-90 pb-100">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="compare-page-content">
              <div className="compare-table table-responsive">
                <table className="table table-bordered mb-0">
                  <tbody>
                    <tr>
                      <th className="title-column">Product Info</th>
                      {compareProductInfo}
                    </tr>
                    <tr>
                      <th className="title-column">Price</th>
                      {comparePrice}
                    </tr>      
                    <tr>
                      <th className="title-column">Description</th>
                      {compareDescription}
                    </tr>
                    <tr>
                      <th className="title-column">Rating</th>
                      {compareRating}
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}