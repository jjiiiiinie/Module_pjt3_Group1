import { useEffect, useState } from "react";
import CartListView from "./CartListView";
import CartTableFooter from "./CartTableFooter";
import axios from "axios";

export default function CartTable() {

  const [ cartDatas, setCartDatas ] = useState([]);
  // isCheckAll: 장바구니 항목 전체 선택 여부 (default: false)
  const [ isCheckAll, setIsCheckAll ] = useState(false);
  // isCheck: 장바구니에서 선택된 항목 리스트 (default: [])
  const [ isCheck, setIsCheck ] = useState([]);
  // totalPrice: 장바구니에서 선택된 항목들의 가격 합계 (default: 0)
  const [ totalPrice, setTotalPrice ] = useState(0);
  
  // 장바구니 데이터 GET
  useEffect(() => {
    axios.get(`/cart-service/carts/user/${sessionStorage.userId}`)
    .then(res => {
      setCartDatas(res.data)
      console.log(res.data)
    })
    .catch(error => console.log(error));
  },[]);

  useEffect(() => {
    var sum = 0;
    isCheck.forEach(id => {
      cartDatas.filter(data => data.id  === id).map(data =>{
        sum += cartDatas.unitPrice * cartDatas.qty;
      });
    });
    setTotalPrice(sum);
  },[isCheck, cartDatas]);

  const handleSelectAll = () => {
    setIsCheckAll(!isCheckAll);
    setIsCheck(cartDatas.map(li => li.id));
    if (isCheckAll) {
      setIsCheck([]);
    }
  };

  const handleCheck = (e) => {
    const { id, checked } = e.target;
    setIsCheck([...isCheck, id]);
    if (!checked) {
      setIsCheck(isCheck.filter(cartDatas => cartDatas !== id));
    }
  };

  const handleCheckDelete = () =>{
    isCheck.forEach(id => {
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
    })
  };
  
  return(
    <div className="cart-main-area pt-90 pb-100">
      <div className="container">
        <h3 className="cart-page-title">Your cart cartDatass</h3>
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
                    cartDatas.map(cartDatas => (
                      <CartListView 
                        data = {cartDatas}
                        setCartDatas = {setCartDatas}
                        handleCheck = {handleCheck}
                        isChecked = {isCheck.includes(cartDatas.cartId)}
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
              <div className="col-3 row align-cartDatass-center cart-select-all">
                <input className="col-4 select-all-checkbox" type="checkbox" onChange={handleSelectAll}></input>
                <label className="col-8 m-0">Select All</label>
              </div>
              <div className="col-3 cart-delete-selected">
                <button onClick={handleCheckDelete}>Delete Selected</button>
              </div>
              <div className="col-3"></div>
              <div className="col-3 px-0 text-center cart-shiping-update">
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