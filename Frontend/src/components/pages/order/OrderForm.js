import React from 'react';

export default function OrderForm() {

    const handleChangeForm = () => {

    }

    return (
        <div className="card-body">
            <div className="myaccount-info-wrapper">
                <div className="row">
                    <div className="col-lg-12 col-md-12">
                        <div className="billing-info">
                            <label>주문하는 사람 이름</label>
                            <input
                                type="text"
                                name="senderName"
                                onChange={handleChangeForm}
                            />
                        </div>
                    </div>
                    <div className="col-lg-12 col-md-12">
                        <div className="billing-info">
                            <label>휴대 전화 번호</label>
                            <input
                                type="tel"
                                name="senderPhone"
                                onChange={handleChangeForm}
                            />
                        </div>
                    </div>
                    <div className="col-lg-12 col-md-12">
                        <div className="billing-info">
                            <label>주문 비밀번호</label>
                            <input
                                type="password"
                                name="senderPassword"
                                onChange={handleChangeForm}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )

}