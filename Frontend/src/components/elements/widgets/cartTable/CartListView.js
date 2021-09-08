import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function CartListView({data, setCartDatas, handleCheck, isChecked}) {
  
  var process = require('../../../../myprocess.json')
  
  const [ count, setCount ] = useState(data.qty);

  const minusClick = () => {
    // 장바구니 데이터 UPDATE
    if(count==1) {
      alert('1개 미만으로는 주문할 수 없습니다')
    }
    else {
      setCount(count-1)
    }
  }

  const plusClick = () => {
    // 장바구니 데이터 UPDATE
    setCount(count+1)
  }

  const handleDelete = () => {
    fetch(`/cart-service/carts/user/${sessionStorage.userId}/${data.cartId}`, {
      method: "DELETE"
    }).then(
      alert("삭제되었습니다."),
      fetch(`/cart-service/carts/user/${sessionStorage.userId}`)
      .then(res => {
        console.log("dd",res)
        return res.json();
      })
      .then(data => {
        setCartDatas(data);
        return window.location.reload();
      })
    )
  }
  

  return(
    <tr key={data.productId}>
    <td className="product-checkbox">
      <div className="form-check">
        <input id={data.productId} className="form-check-input" type="checkbox" value={data.productId} checked={isChecked} onChange={handleCheck}/>
        <label className="form-check-label d-none">
          {data.productId}
        </label>
      </div>
    </td>
      <td className="product-thumbnail">
      {/* <Link to={`/productdetail/${data.id}`}><img className="img-fluid" src={data.image[0]} alt="" /></Link> */}
      </td>
      <td className="product-name">
      <Link to={`/productdetail/${data.productId}`}>{data.productName}</Link>
      </td>
      <td className="product-price-cart">
        <span className="amount">{data.unitPrice}</span>
      </td>
      <td className="product-quantity">
        <div className="cart-plus-minus">
          <button 
            className="dec qtybutton"
            onClick={() => minusClick()}
          >
            -
          </button>
          <input className="cart-plus-minus-box" type="text" readOnly="" value={count} />
          <button 
            className="inc qtybutton"
            onClick={() => plusClick()}
          >
            +
          </button>
        </div>
      </td>
      <td className="product-subtotal">${(data.unitPrice * count)}</td>
      <td className="product-remove">
        <button
          title={data.productId}
          onClick={() => handleDelete(data.cartId)}
          value={data.productId}
        >
          <i className="fa fa-times"></i>
        </button>
      </td>
    </tr>
  );
}