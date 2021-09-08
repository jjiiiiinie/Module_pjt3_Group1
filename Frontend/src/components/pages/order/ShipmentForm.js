import { useState } from 'react';
import DaumPostcode from 'react-daum-postcode';
import Modal from 'react-bootstrap/Modal';

export default function ShipmentForm() {
    const [show, setShow] = useState(false);
    const [shipInfo, setShipInfo] = useState([]);

    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);

    const handleComplete = (data) => {
        var fullAddress = data.address;
        var extraAddress = '';
        if (data.addressType === 'R') {
            if (data.bname !== '') {
                extraAddress += data.bname;
            }
            if (data.buildingName !== '') {
                extraAddress += (extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName);
            }
            fullAddress += (extraAddress !== '' ? ` (${extraAddress})` : '');
        }
        console.log(fullAddress);
        // setShipInfo({ ...shipInfo, address: `${fullAddress}` });
        // console.log(shipInfo);
        handleClose();
    }

    const handleChangeForm = () => {

    }

    return (
        <div className="card-body">
            <div className="myaccount-info-wrapper">
                <div className="row">
                    <div className="col-lg-12 col-md-12">
                        <div className="billing-info">
                            <label>받는 사람 이름</label>
                            <input
                                type="text"
                                name="recipientName"
                                onChange={handleChangeForm}
                            />
                        </div>
                    </div>
                    <div className="col-lg-12 col-md-12">
                        <div className="billing-info">
                            <button className="btn btn-secondary my-1" variant="primary" onClick={handleShow}>
                                주소 찾기
                            </button>
                            <Modal className="modal" show={show} onHide={handleClose}>
                                <Modal.Header className="modal-header" closeButton>
                                    <Modal.Title>
                                        <h4 className="data-wrapper">주소 찾기</h4>
                                    </Modal.Title>
                                </Modal.Header>
                                <Modal.Body className="modal-body">
                                    <DaumPostcode autoClose onComplete={handleComplete} />
                                </Modal.Body>
                            </Modal>
                            <div className="billing-info">
                                <label>주소</label>
                                <input
                                    type="text"
                                    name="addressPrimary"
                                    onChange={handleChangeForm}
                                    readOnly
                                />
                            </div>

                            <div className="billing-info">
                                <label>상세주소</label>
                                <input
                                    type="text"
                                    name="addressSecondary"
                                    onChange={handleChangeForm}
                                />
                            </div>
                            {/* <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-target="#postModal">
                                주소 찾기
                            </button>
                            <div className="modal fade" id="postModal" tabindex="-1" role="dialog" aria-labelledby="postModalLabel" aria-hidden="true">
                                <div className="modal-dialog" role="document">
                                    <div className="modal-content">
                                        <div className="modal-header">
                                            <h5 className="modal-title" id="PostModalLabel">주소 찾기</h5>
                                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                                <span aria-hidden="true">&times;</span>
                                            </button>
                                        </div>
                                        <div className="modal-body">
                                            <DaumPostcode autoClose onComplete={onCompletePost} />
                                        </div>
                                        <div className="modal-footer">
                                            <button type="button" className="btn btn-secondary" data-dismiss="modal">닫기</button>
                                            <button type="button" className="btn btn-primary">Save changes</button>
                                        </div>
                                    </div>
                                </div>
                            </div> */}
                            {/*<input type="text" id="sample6_postcode" placeholder="우편번호" />
                            <input type="button" onclick="sample6_execDaumPostcode()" value="우편번호 찾기" />
                            <input id="sample6_address" placeholder="주소" />
                            <input type="text" id="sample6_detailAddress" placeholder="상세주소" />
                            */}
                        </div>
                    </div>
                    <div className="col-lg-12 col-md-12">
                        <div className="billing-info">
                            <label>휴대 전화 번호</label>
                            <input
                                type="tel"
                                name="tel"
                                onChange={handleChangeForm}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )

}