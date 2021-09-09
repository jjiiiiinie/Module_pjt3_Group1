import { useEffect, useState } from "react";
import HistoryListView from "./HistoryListView";
import axios from 'axios';

export default function HistoryTable() {

  const [historyDatas, setHistoryDatas] = useState([]);
  // 주문내역 데이터 GET
  // 사용자: 로그인된 사용자 정보와 함께 해당 사용자의 주문 내역 응답 GET 요청
  // 관리자: GET 요청, 응답
  // 'historyDatas' 포맷
  /*
    cartList: [
      {
        cartId,
        productId,
        qty,
        unitPrice,
        totalPrice,
        userId
      },
    ],
    recipientName: '',
    recipientAddress: '',
    recipientPhone: '',
    senderName: '',
    senderPhone: '',
    senderPassword: '',
    paymentPlan: ''
  */


  useEffect(() => {
    axios.get(`/order-service/${sessionStorage.userId}/orders`)
      .then(res => {
        console.log(res.data);
        setHistoryDatas(res.data);
      })
      .catch()
  }, []);

  return (
    <div className="cart-main-area pt-90 pb-100">
      <div className="container">
        <h3 className="cart-page-title">Order History</h3>
        <div className="row">
          <div className="col-12">
            <div className="table-content table-responsive cart-table-content">
              <table>
                <thead>
                  <tr>
                    <th>주문 번호</th>
                    <th>주문인 ID</th>
                    <th>주문 상품</th>
                    <th>주문 수량</th>
                    <th>주문 일자</th>
                    <th>주문 상태</th>
                    <th>주문 상태 변경</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    historyDatas.map(item => (
                      <HistoryListView
                        data={item}
                      />
                    ))
                  }
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}