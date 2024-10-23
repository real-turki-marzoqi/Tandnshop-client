import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Navigate } from 'react-router-dom';
import { createOrderCash } from '../../redux/actions/checkoutAction';
import { getOneUserAddress } from '../../redux/actions/userAddressesAction';
import notify from '../useNotifaction';
import GetAllUserCartHook from './../cart/get-all-user-cart-hook';

const OrderPayCashHook = () => {
    const [loading, setLoading] = useState(true);
    const [loadingCreate, setLoadingCreate] = useState(true);
    const [addressDetalis, setAddressDetalis] = useState([]);
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [, , , , , cartID] = GetAllUserCartHook()

    // when the user changes the address
    const handelChooseAddress = (e) => {
        setAddressDetalis([])
        if (e.target.value != '0')
            get(e.target.value);
    }

    const get = async (id) => {
        setLoading(true)
        await dispatch(getOneUserAddress(id))
        setLoading(false)
    }

    // get address details for the user
    const resAddress = useSelector(state => state.userAddressesReducer.oneAddress)
    useEffect(() => {
        if (loading === false) {
            if (resAddress && resAddress.status === "success") {
                setAddressDetalis(resAddress.data)
            } else
                setAddressDetalis([])
        }
    }, [loading])

    // when the user clicks
    const handelCreateOrderCash = async () => {
        if (cartID === '0') {
            notify("Please add products to the cart first", "warn")
            return
        }
        if (addressDetalis.length <= 0) {
            notify("Please select an address first", "warn")
            return
        }
        setLoadingCreate(true)
        await dispatch(createOrderCash(cartID, {
            shippingAddress: {
                details: addressDetalis.alias,
                phone: addressDetalis.phone,
                city: "",
                postalCode: ""
            }
        }))
        setLoadingCreate(false)
    }

    // get response for creating a cash order
    const resOrserCash = useSelector(state => state.checkoutReducer.createOrderCash)
    useEffect(() => {
        if (loadingCreate === false) {
            if (resOrserCash && resOrserCash.status === 201) {
                notify("Your order has been created successfully", "success")
                setTimeout(() => {
                    navigate('/user/allorders')
                }, 1500);
            } else {
                notify("Failed to complete the order, please try again", "warn")
            }
        }
    }, [loadingCreate])

    return [handelChooseAddress, addressDetalis, handelCreateOrderCash]

}

export default OrderPayCashHook
