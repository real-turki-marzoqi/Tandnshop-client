import React from 'react'
import { Row, Col } from 'react-bootstrap'
import { useParams } from 'react-router-dom'
import UserAllOrderItem from '../User/UserAllOrderItem'
import GetOrderDetalisHook from './../../hook/admin/get-order-detalis-hook';
import ChangeOrderStatusHook from './../../hook/admin/change-order-status-hook';
import { ToastContainer } from 'react-toastify';

const AdminOrderDetalis = () => {
    const { id } = useParams()
    const [orderData, cartItems] = GetOrderDetalisHook(id)

    const [formatDate, onChangePaid, changePayOrder, onChangeDeliver, changeDeliverOrder] = ChangeOrderStatusHook(id)

    return (
        <div>

            <UserAllOrderItem orderItem={orderData} />

            <Row className="justify-content-center mt-4 user-data">
                <Col xs="12" className=" d-flex">
                    <div className="admin-content-text py-2">Customer details</div>
                </Col>
                <Col xs="12" className="d-flex">
                    <div
                        style={{
                            color: "#555550",
                            fontFamily: "Almarai",
                            fontSize: "16px",
                        }}>
                        Name:
                    </div>

                    <div
                        style={{
                            color: "#979797",
                            fontFamily: "Almarai",
                            fontSize: "16px",
                        }}
                        className="mx-2">
                        {orderData ? orderData.user ? orderData.user.name : '' : ''}
                    </div>
                </Col>

                <Col xs="12" className="d-flex">
                    <div
                        style={{
                            color: "#555550",
                            fontFamily: "Almarai",
                            fontSize: "16px",
                        }}>
                        Phone number:
                    </div>

                    <div
                        style={{
                            color: "#979797",
                            fontFamily: "Almarai",
                            fontSize: "16px",
                        }}
                        className="mx-2">
                        {orderData ? orderData.user ? orderData.user.phone : '' : ''}
                    </div>
                </Col>
                <Col xs="12" className="d-flex">
                    <div
                        style={{
                            color: "#555550",
                            fontFamily: "Almarai",
                            fontSize: "16px",
                        }}>
                        Email:
                    </div>

                    <div
                        style={{
                            color: "#979797",
                            fontFamily: "Almarai",
                            fontSize: "16px",
                        }}
                        className="mx-2">
                        {orderData ? orderData.user ? orderData.user.email : '' : ''}
                    </div>
                </Col>
                <div className="d-flex mt-2 justify-content-center">
                    <div>
                        <select
                            name="pay"
                            id="paid"
                            onChange={onChangePaid}
                            className="select input-form-area mt-1  text-center w-50">
                            <option value="0">Payment</option>
                            <option value="true">Paid</option>
                            <option value="false">Not paid</option>
                        </select>
                        <button onClick={changePayOrder} className="btn-a px-2 d-inline mx-1 ">Save</button>
                    </div>
                    <div>
                        <select
                            onChange={onChangeDeliver}
                            name="deliver"
                            id="deliver"
                            className="select input-form-area mt-1  text-center  w-50">
                            <option value="0">Delivery</option>
                            <option value="true">Delivered</option>
                            <option value="false">Not delivered</option>
                        </select>
                        <button onClick={changeDeliverOrder} className="btn-a px-2 d-inline mx-1 ">Save</button>
                    </div>
                </div>
            </Row>
            <ToastContainer />
        </div>
    )
}

export default AdminOrderDetalis
