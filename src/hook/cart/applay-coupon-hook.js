import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { createBrand } from '../../redux/actions/brandAction'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import notify from '../../hook/useNotifaction'
import { applayCoupnCart } from '../../redux/actions/cartAction';
import cartReducer from './../../redux/reducers/cartReducer';
import GetAllUserCartHook from './get-all-user-cart-hook';
import { Link, useNavigate } from 'react-router-dom'

const ApplayCouponHook = (cartItems) => {
    const dispatch = useDispatch();

    const [couponName, setCouponName] = useState('')
    const [loading, setLoading] = useState(true)

    const onChangeCoupon = (e) => {
        setCouponName(e)
    }

    const handelSubmitCoupon = async () => {
        if (couponName === "") {
            notify("Please enter the coupon", "warn")
            return
        }
        setLoading(true)
        await dispatch(applayCoupnCart({
            couponName: couponName
        }))
        setLoading(false)
    }

    const res = useSelector(state => state.cartReducer.applayCoupon)

    useEffect(() => {

        if (loading === false) {
            console.log(res)
            if (res && res.status === 200) {
                notify("Coupon applied successfully", "success")
                setTimeout(() => {
                    window.location.reload(false)
                }, 1000);

            } else {
                notify("This coupon is invalid or expired", "warn")
                setTimeout(() => {
                    window.location.reload(false)
                }, 1000);
            }
        }
    }, [loading])

    const navigate = useNavigate()
    const handelCheckout = () => {
        if (cartItems.length >= 1) {
            navigate('/order/paymethoud')
        }
        else {
            notify("Please add items to the cart first", "warn")
        }
    }

    return [couponName, onChangeCoupon, handelSubmitCoupon, handelCheckout]

}

export default ApplayCouponHook
