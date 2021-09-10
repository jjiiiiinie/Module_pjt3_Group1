import { useEffect, useState } from "react";
import HistoryListView from "./HistoryListView";
import axios from 'axios';

export default function HistoryTable() {
  const [keyword, setKeyword] = useState('');
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

  // 검색 키워드 change state에 반영
  const handleChange = (e) => {
    setKeyword(e.target.value);
  }

  // 검색 실행
  const handleClick = () => {
    // historyDatas에서 필터링
    historyDatas.filter()

  }

  useEffect(() => {
    // 세션 정보별 사용자/관리자 구분
    if (sessionStorage.userId !== undefined && sessionStorage.userId.includes("admin")) {
      axios.get(`/order-service/orders`)
        .then(res => {
          console.log(res.data);
          setHistoryDatas(res.data);
        })
        .catch()
    }
    else {
      axios.get(`/order-service/${sessionStorage.userId}/orders`)
        .then(res => {
          console.log(res.data);
          setHistoryDatas(res.data);
        })
        .catch()
    }
  }, []);

  return (
    // 세션 정보 확인하여 선택적 렌더링 
    <div className="cart-main-area pt-90 pb-100">
      <div className="container">
        <h3 className="cart-page-title">Order History</h3>
        <div className="mb-1 order-search-box row col-12">
          <input className="col-3" type="text" onChange={handleChange} />
          <button className="col-1" type="button" onClick={handleClick}>검색</button>
        </div>
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
                    {
                      sessionStorage.userId !== undefined && sessionStorage.userId.includes('admin') ?
                        <th>주문 상태 변경</th> :
                        null
                    }
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