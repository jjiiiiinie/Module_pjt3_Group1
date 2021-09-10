import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function HistoryListView({ data }) {
    const [status, setStatus] = useState(data.order_state);


    const handleChange = (e) => {
        console.log(e.target.value());
        setStatus(e.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        // 선택된 status 백엔드에 반영 요청
        axios.put(`/order-service/orders/${data.orderId}`, { orderId: data.orderId, newStatus: status })
            .then(res => {
                console.log(res.data);
            })
            .catch()
    }

    return (
        <tr key={data.order_id}>
            <td className="order-id" aria-readonly>
                {data.order_id}
            </td>
            <td className="order-user-id">
                {data.user_id}
            </td>
            <td className="order-product-name">
                <Link to={`/productdetail/${data.product_id}`}>{data.product_id}</Link>
            </td>
            <td className="order-product-qty">
                {data.qty}
            </td>
            <td className="order-date">
                {data.created_at}
            </td>
            
            <td className="order-status-select">
                {
                    sessionStorage.userId !== undefined && sessionStorage.userId.includes('admin') ?
                        <select value={status} onChange={handleChange}>
                            <option value="1">결제 완료</option>
                            <option value="2">배송 중</option>
                            <option value="3">배송 완료</option>
                        </select> :
                        `${data.order_state}`
                }
            </td>
            {
                sessionStorage.userId !== undefined && sessionStorage.userId.includes('admin') ?
                    <td className="order-status-confirm">
                        <input type="submit" onSubmit={handleSubmit}>변경 반영</input>
                    </td> :
                    null
            }
           
        </tr>
    );
}