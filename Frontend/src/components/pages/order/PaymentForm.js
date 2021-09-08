export default function PaymentForm() {

    return (
        <div className="card-body">
            <div className="myaccount-info-wrapper">
                <div className="row">
                    <div className="col-lg-12 col-md-12">
                        <div className="billing-info">
                            <label>결제 방법</label>
                            <input name="paymentPlan"></input>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )

}