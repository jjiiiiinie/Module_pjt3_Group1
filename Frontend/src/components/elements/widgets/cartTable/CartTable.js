import { useEffect, useState } from "react";
import CartListView from "./CartListView";
import CartTableFooter from "./CartTableFooter";
import axios from "axios";

export default function CartTable() {

  var process = require('../../../../myprocess.json');
  const [ cartDatas, setCartDatas ] = useState([]);
  const [ totalPrice, setTotalPrice ] = useState(0);
  
  useEffect(() => {
    fetch(`http://${process.IP}:${process.PORT}/cart`)
    .then(res => {
      return res.json();
    })
    .then(data => {
      setCartDatas(data);
    })
    // .catch(error => console.log(error));
  },[process.IP, process.PORT]);

  return(
    <div className="cart-main-area pt-90 pb-100">
      <div className="container">
        <h3 className="cart-page-title">Your cart items</h3>
        <div className="row">
          <div className="col-12">
            <div className="table-content table-responsive cart-table-content">
              <table>
                <thead>
                  <tr>
                    <th>Select</th>
                    <th>Image</th>
                    <th>Product Name</th>
                    <th>Unit Price</th>
                    <th>Qty</th>
                    <th>Subtotal</th>
                    <th>action</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    cartDatas.map(item => (
                      <CartListView 
                        data = {item}
                        setCartDatas = {setCartDatas}
                        // handleCheck = {handleCheck}
                        // isChecked={isChecked}
                      />
                    ))
                  }
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-lg-12">
            <div className="cart-shiping-update-wrapper">
              <div className="cart-select-all">
                <button>Select All</button>
              </div>
              <div className="cart-delete-selected">
                <button>Delete Selected</button>
              </div>
              <div className="col-4"/>
              <div className="cart-shiping-update">
                <a href="/">Continue Shopping</a>
              </div>
            </div>
          </div>
        </div>
          <CartTableFooter totalPrice = {totalPrice}/>
      </div>
    </div>
  );
}