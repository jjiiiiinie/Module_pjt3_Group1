import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function OrderListView({ data }) {

  const [count, setCount] = useState(data.qty);

  return (
    <tr key={data.id}>
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
              <span className="amount">{(data.price * ((100 - data.discount) / 100)).toFixed(2)}</span>
            </div>
          ) : (
            <span className="amount">{data.price}</span>
          )}
      </td>
      <td className="product-quantity">
        <div className="cart-plus-minus">
          <input className="cart-plus-minus-box" type="text" readOnly value={count} />
        </div>
      </td>
      <td className="product-subtotal">${(data.price * ((100 - data.discount) / 100) * count).toFixed(2)}</td>
    </tr>
  );
}