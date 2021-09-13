import axios from "axios";
import { useState, useEffect } from "react";

export default function AddBuyAndCart({stock, productId, unitPrice}) {

  const [ count, setCount ] = useState(1);

  const [ cartDatas, setCartDatas ] = useState([]);
  useEffect(() => {
    axios.get(`/cart-service/carts/user/${sessionStorage.userId}`)
    .then(res => {
      setCartDatas(res.data)
    })
    .catch(error => console.log(error));
  },[]); 

  const handleCountAdd = () => {
    setCount(count+1)
  }

  const handleCountMinus = () => {
    if(count == 1){
      alert('1개 미만으로는 주문할 수 없습니다.')
    }
    else {
      setCount(count-1)
    }
  }
  const handlePutCartList = (e) => {
    let url = '/cart-service/carts/'
    let Item = {
      'productId' : productId,
      'qty' : count,
      'unitPrice' : unitPrice,
      'totalPrice' : count * unitPrice,
      'userId' : sessionStorage.userId
    }
    var config = {
      headers:{
        "Content-Type" : "application/json",
      }
    }
    
    // if (cartDatas.map(cartdata => cartdata.productId==productId)){
    //   console.log(cartdata.productId)
    //   console.log(productId)
    //   alert("이미 장바구니에 담긴 상품입니다.")
    //   return
    // }
    // else (
      axios.post(url, Item, config)
      .then((res) => {
        alert("카트에 상품이 담겼습니다.")
        console.log(res)
      }).catch((err) => {
        alert("상품 담기 실패")
        console.log(err);
      })
    // )
  }

  return(
    <div className="pro-details-quality">
      <div className="cart-plus-minus">
        <button className="dec qtybutton" onClick={() => handleCountMinus()}>-</button>
        <input className="cart-plus-minus-box" type="text" readOnly="" value={count}/>
        <button className="inc qtybutton" onClick={() => handleCountAdd()}>+</button>
      </div>
      <div className="pro-details-cart btn-hover">
        <button onClick={() => handlePutCartList()}>Add To Cart</button>
      </div>
      <div className="pro-details-cart btn-hover ml-0"> 
        <a href="/">Buy Now</a>
      </div>
      <div className="pro-details-cart btn-hover ml-0">
        재고수량 : {stock}
      </div>
    </div>
  );
}