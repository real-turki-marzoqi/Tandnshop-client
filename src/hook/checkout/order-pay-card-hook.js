import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Navigate } from 'react-router-dom';
import { createOrderCARD, createOrderCash } from '../../redux/actions/checkoutAction';
import { getOneUserAddress } from '../../redux/actions/userAddressesAction';
import notify from '../useNotifaction';
import GetAllUserCartHook from './../cart/get-all-user-cart-hook';


const OrderPayCardHook = (addressDetalis) => {

    const [loading, setLoading] = useState(true);
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [, , , , , cartID] = GetAllUserCartHook()

    // when user clicks
    const handelCreateOrderCARD = async () => {
        if (cartID === '0') {
            notify("Please add products to the cart first", "warn")
            return
        }
        if (addressDetalis.length <= 0) {
            notify("Please select an address first", "warn")
            return
        }
        setLoading(true)
        await dispatch(createOrderCARD(cartID, {
            shippingAddress: {
                details: addressDetalis.alias,
                phone: addressDetalis.phone,
                city: "",
                postalCode: ""
            }
        }))
        setLoading(false)
    }

    // get response for create order card
    const resOrderCard = useSelector(state => state.checkoutReducer.createOrderCard)
    useEffect(() => {
        if (loading === false) {
            if (resOrderCard && resOrderCard.status === "success") {
                //notify("Your order was created successfully", "success")
                console.log(resOrderCard.session.url)
                if (resOrderCard.session.url) {
                    window.open(resOrderCard.session.url)
                }
            } else {
                notify("Failed to complete the order, please try again", "warn")
            }
        }
    }, [loading])

    return [handelCreateOrderCARD]
}

export default OrderPayCardHook
