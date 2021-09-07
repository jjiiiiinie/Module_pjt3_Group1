import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function CartListView({data, setCartDatas, handleCheck, isChecked}) {
  
  var process = require('../../../../myprocess.json')
  
  const [ count, setCount ] = useState(data.qty);

  const minusClick = () => {
    if(count==1) {
      alert('1개 미만으로는 주문할 수 없습니다')
    }
    else {
      setCount(count-1)
    }
  }

  const plusClick = () => {
    setCount(count+1)
  }

  const handleDelete = (id) => {
    fetch(`http://${process.IP}:${process.PORT}/cart/${id}`, {
      method: "DELETE"
    }).then(
      alert("삭제되었습니다."),
      fetch(`http://${process.IP}:${process.PORT}/cart`)
      .then(res => {
        return res.json();
      })
      .then(data => {
        setCartDatas(data);
      })
    )
  }

  return(
    <tr key={data.id}>
    <td className="product-checkbox">
      <div className="form-check">
        <input id={data.id} className="form-check-input" type="checkbox" value={data.id} checked={isChecked} onChange={handleCheck}/>
        <label className="form-check-label d-none">
          {data.id}
        </label>
      </div>
    </td>
      <td className="product-thumbnail">
      <Link to={`/productdetail/${data.id}`}><img className="img-fluid" src={data.image[0]} alt="" /></Link>
      </td>
      <td className="product-name">
      <Link to={`/productdetail/${data.id}`}>id:{data.id} / name:{data.name}</Link>
        <div className="cart-item-variation">
          <span>Color: {data.color}</span>
          <span>Size: {data.size}</span>
        </div>
      </td>
      <td className="product-price-cart">
        {
          data.discount && data.discount != 0 ? (
            <div>
              <span className="amount old">{data.price}</span>    
              <span className="amount">{(data.price * ((100-data.discount)/100)).toFixed(2)}</span>
            </div>
          ) : (
            <span className="amount">{data.price}</span>
        )}
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
      <td className="product-subtotal">${(data.price * ((100-data.discount)/100) * count).toFixed(2)}</td>
      <td className="product-remove">
        <button
          title={data.id}
          onClick={() => handleDelete(data.id)}
          value={data.id}
        >
          <i className="fa fa-times"></i>
        </button>
      </td>
    </tr>
  );
}