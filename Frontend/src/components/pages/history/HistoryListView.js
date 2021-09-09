import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function HistoryListView({ data }) {

    const optionsState = 'packing';
    const handleChange = () => {

    }

    return (
        <tr key={data.orderId}>
            <td className="order-id">
                {data.orderId}
            </td>
            <td className="order-user-id">
                {data.userId}
            </td>
            <td className="order-product-name">
                <Link to={`/productdetail/${data.productId}`}>{data.productId}</Link>
            </td>
            <td className="order-product-qty">
                {data.qty}
            </td>
            <td className="order-date">
                {/* {data.qty} */}
            </td>
            <td className="order-status">
                {/* {data.status} */}
            </td>
            <td className="order-status-select">
                <select value={optionsState} onChange={handleChange}>
                    <option value="ordered">결제 완료</option>
                    <option value="packing">배송준비중</option>
                    <option value="shipped">배송 중</option>
                    <option value="delivered">배송 완료</option>
                </select>
            </td>
        </tr>
    );
}