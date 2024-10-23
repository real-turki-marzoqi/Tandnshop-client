import React from 'react';
import { Col, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const AdminAllOrdersItem = ({ orderItem }) => {
    console.log(orderItem);

    return (
        <Col sm="12">
            <Link
                to={`/admin/orders/${orderItem?._id || ''}`}
                className="cart-item-body-admin my-2 px-1 d-flex px-2"
                style={{ textDecoration: "none" }}
            >
                <div className="w-100">
                    <Row className="justify-content-between">
                        <Col sm="12" className="d-flex flex-row justify-content-between">
                            <div className="d-inline pt-2 cat-text">
                                Order number #{orderItem?.id || 'N/A'}
                            </div>
                        </Col>
                    </Row>
                    <Row className="justify-content-center mt-2">
                        <Col sm="12" className="d-flex flex-row justify-content-start">
                            <div className="d-inline pt-2 cat-title">
                                Order from.. {orderItem?.user?.name || 'Unknown User'}
                            </div>
                            <div style={{ color: 'black' }} className="d-inline pt-2 cat-rate me-2">
                                {orderItem?.user?.email || 'No Email'}
                            </div>
                        </Col>
                    </Row>

                    <Row className="d-flex justify-content-between">
                        <Col xs="6" className="d-flex">
                            <div>
                                <div style={{ color: 'black' }} className="d-inline"> Delivery</div>
                                <div className="d-inline mx-2 stat">
                                    {orderItem?.isDelivered === true ? 'Delivered' : 'Not yet'}
                                </div>
                            </div>
                            <div>
                                <div style={{ color: 'black' }} className="d-inline"> Payment</div>
                                <div className="d-inline mx-2 stat">
                                    {orderItem?.isPaid === true ? 'Paid' : 'Not yet'}
                                </div>
                            </div>
                            <div>
                                <div style={{ color: 'black' }} className="d-inline">Payment method</div>
                                <div className="d-inline mx-2 stat">
                                    {orderItem?.paymentMethodType === 'cash' ? 'Cash' : 'Credit card'}
                                </div>
                            </div>
                        </Col>
                        <Col xs="6" className="d-flex justify-content-end">
                            <div>
                                <div className="barnd-text">
                                    {orderItem?.totalOrderPrice || 0} SAR
                                </div>
                            </div>
                        </Col>
                    </Row>
                </div>
            </Link>
        </Col>
    );
};

export default AdminAllOrdersItem;
