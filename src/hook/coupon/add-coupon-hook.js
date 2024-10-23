import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { addCoupon, getAllCoupon } from '../../redux/actions/couponAction';
import notify from './../useNotifaction';

const AddCouponHook = () => {
    const dispatch = useDispatch()
    const [coupnName, setCoupnName] = useState('')
    const [couponDate, setCouponDate] = useState('')
    const [couponValue, setCouponValue] = useState('')
    const [loading, setLoading] = useState(true)

    // Handle name input change
    const onChangeName = (event) => {
        event.persist();
        setCoupnName(event.target.value)
    }

    // Handle date input change
    const onChangeDate = (event) => {
        event.persist();
        setCouponDate(event.target.value)
    }

    // Handle value input change
    const onChangeValue = (event) => {
        event.persist();
        setCouponValue(event.target.value)
    }

    // Handle form submission
    const onSubmit = async () => {
        if (coupnName === "" || couponDate === "" || couponValue <= 0) {
            notify("Please complete the data", "warn")
            return
        }

        setLoading(true)
        await dispatch(addCoupon({
            name: coupnName,
            expire: couponDate,
            discount: couponValue
        }))
        setLoading(false)
    }

    const res = useSelector(state => state.couponReducer.addCoupon)

    useEffect(() => {
        if (loading === false) {
            if (res && res.status === 201) {
                notify("Coupon added successfully", "success")
                window.location.reload(false)
            } else if (res && res.status === 400) {
                notify("This coupon already exists", "error")
            } else if (res && res.status === 403) {
                notify("You are not authorized to add this", "error")
            }
        }
    }, [loading])

    useEffect(() => {
        const get = async () => {
            await dispatch(getAllCoupon())
        }
        get();
    }, [])

    const allCoupon = useSelector(state => state.couponReducer.allCoupon)

    let coupons = []
    try {
        if (allCoupon && allCoupon.data.length >= 1)
            coupons = allCoupon.data
    } catch (e) { }

    return [coupnName, couponDate, couponValue, onChangeName, onChangeDate, onChangeValue, onSubmit, coupons]
}

export default AddCouponHook
