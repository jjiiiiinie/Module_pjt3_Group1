import axios from 'axios';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function HistoryListView({ data }) {
    const [newState, setNewState] = useState('');

    const handleChange = e => {
        console.log(e.target.value);
        setNewState(e.target.value);
    }

    console.log(data)
    const handleSubmit = e => {
        e.preventDefault();
        // 선택된 status 백엔드에 반영 요청
        axios.put(`/order-service/orders/${data.orderId}/state/${newState}`,
        {},
            {
                headers: {
                    'Authorization': sessionStorage.token
                }
            })
            .then(res => {
                console.log(res.data);
                alert("변경")
                window.location.href = '/history'
            })
            .catch((err) => {
                console.log(err)
            })
    }

    return (
        <tr key={data.order_id}>
            <td className="order-id" aria-readonly>
                {data.orderId}
            </td>
            <td className="order-user-id">
                {data.userId}
            </td>
            <td className="order-UUID">
                {data.orderUuid}
            </td>
            <td className="order-product-name">
                <Link to={`/productdetail/${data.productId}`}>{data.productName}</Link>
            </td>
            <td className="order-product-qty">
                {data.qty}
            </td>
            <td className="order-date">
                {data.createdAt}
            </td>

            <td className="order-status-select">
                {
                    sessionStorage.userId !== undefined && sessionStorage.email.includes('admin') ?
                        <select value={data.orderState} onChange={handleChange}>
                            <option value="1">결제 완료</option>
                            <option value="2">배송 중</option>
                            <option value="3">배송 완료</option>
                        </select> :
                        `${data.orderState}`
                }
            </td>
            {
                sessionStorage.userId !== undefined && sessionStorage.email.includes('admin') ?
                    <td className="order-status-confirm">
                        <button type="submit" onClick={handleSubmit}>변경</button>
                    </td> :
                    null
            }

        </tr>
    );
}