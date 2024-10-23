import React, { useState } from 'react'
import { Row, Col } from 'react-bootstrap'
import ViewAddressesHook from './../../hook/user/view-addresses-hook';
import OrderPayCashHook from './../../hook/checkout/order-pay-cash-hook';
import { ToastContainer } from 'react-toastify';
import notify from './../../hook/useNotifaction';
import OrderPayCardHook from './../../hook/checkout/order-pay-card-hook';
import GetAllUserCartHook from './../../hook/cart/get-all-user-cart-hook';

const ChoosePayMethoud = () => {

    const [res] = ViewAddressesHook()
    const [handelChooseAddress, addressDetalis, handelCreateOrderCash] = OrderPayCashHook()
    const [handelCreateOrderCARD] = OrderPayCardHook(addressDetalis)
    const [, , totalCartPrice, , totalCartPriceAfterDiscount,] = GetAllUserCartHook()

    const [type, setType] = useState('')
    const changeMathoud = (e) => {
        setType(e.target.value)
    }

    const handelPay = () => {
        if (type === "CARD") {
            console.log('order card')
            handelCreateOrderCARD()
        } else if (type === "CASH") {
            console.log('order cash')
            handelCreateOrderCash();
        } else {
            notify("Please choose a payment method", "warn")
        }
    }

    return (
        <div>
            <div className="admin-content-text pt-5">Choose Payment Method</div>
            <div className="user-address-card my-3 px-3">
                <Row className="d-flex justify-content-between ">
                    <Col xs="12" className="my-2">
                        <input
                            onChange={changeMathoud}
                            style={{ cursor: 'pointer' }}
                            name="group"
                            id="group1"
                            type="radio"
                            value="CARD"
                            className="mt-2"
                        />
                        <label style={{ cursor: 'pointer' }} className="mx-2" htmlFor="group1">
                            Pay by credit card
                        </label>
                    </Col>
                </Row>

                <Row className="mt-2">
                    <Col xs="12" className="d-flex">
                        <input style={{ cursor: 'pointer' }}
                            onChange={changeMathoud}
                            name="group"
                            id="group2"
                            type="radio"
                            value="CASH"
                            className="mt-2"
                        />
                        <label style={{ cursor: 'pointer' }} className="mx-2" htmlFor="group2">
                            Pay on delivery
                        </label>
                    </Col>
                </Row>

                <Row className="mt-2">
                    <Col xs="4" className="d-flex">
                        <select name="address" id="address" className="select mt-1 px-2 " onChange={handelChooseAddress} >
                            <option value="0">Select a shipping address</option>
                            {
                                res.data ? (res.data.map((item, index) => {
                                    return <option key={item._id} value={item._id}>{item.alias}</option>
                                })) : <option key={0} value={0}>No addresses available</option>
                            }

                        </select>
                    </Col>
                </Row>
            </div>

            <Row>
                <Col xs="12" className="d-flex justify-content-end">
                    <div className="product-price d-inline   border">

                        {
                            totalCartPriceAfterDiscount >= 1 ?
                                `${totalCartPrice} SAR ... After discount ${totalCartPriceAfterDiscount}` :
                                `${totalCartPrice} SAR`
                        }

                    </div>
                    <div onClick={handelPay} className="product-cart-add px-3 pt-2 d-inline me-2"> Complete Purchase</div>
                </Col>
            </Row>
            <ToastContainer />
        </div>
    )
}

export default ChoosePayMethoud
