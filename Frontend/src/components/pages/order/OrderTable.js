import React from 'react';
import OrderListView from './OrderListView';


export default function CartContainer({ orderItems }) {

  return (
    <div className="cart-main-area pt-90 pb-100">
      <div className="container">
        <h3 className="cart-page-title">Your cart items</h3>
        <div className="row">
          <div className="col-12">
            <div className="table-content table-responsive cart-table-content order-table-content">
              <table>
                <thead>
                  <tr>
                    <th>Image</th>
                    <th>Product Name</th>
                    <th>Unit Price</th>
                    <th>Qty</th>
                    <th>Subtotal</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    orderItems && orderItems.map(item => (
                      <OrderListView data={item} />
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
              <div className="col-3 px-0 text-center cart-shiping-update">
                <a href="/">Continue Shopping</a>
              </div>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-lg-4 col-md-6" />
          <div className="col-lg-4 col-md-6" />
          <div className="col-lg-4 col-md-12">
            <div className="grand-totall">
              <div className="title-wrap">
                <h4 className="cart-bottom-title section-bg-gary-cart">Cart Total</h4>
              </div>
              {/* <h5>Total products <span>${totalPrice}</span></h5> */}
              {/* <h4 className="grand-totall-title">Grand Total <span>${totalPrice}</span></h4> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}