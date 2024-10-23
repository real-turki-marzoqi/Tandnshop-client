import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addCoupon, editCoupon, getAllCoupon, getOneCoupon } from '../../redux/actions/couponAction';
import notify from './../useNotifaction';

const EditCouponHook = (id) => {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [coupnName, setCoupnName] = useState('')
    const [couponDate, setCouponDate] = useState('')
    const [couponValue, setCouponValue] = useState('')
    const [loading, setLoading] = useState(true)
    const [loadingData, setLoadingData] = useState(true)

    const oneCoupon = useSelector(state => state.couponReducer.oneCoupon)

    useEffect(() => {
        const get = async () => {
            setLoadingData(true)
            await dispatch(getOneCoupon(id))
            setLoadingData(false)
        }
        get();
    }, [])

    // Format date to a more readable format
    const formatDate = (dateString) => {
        const options = { year: "numeric", month: "numeric", day: "numeric" }
        return new Date(dateString).toLocaleDateString(undefined, options)
    }

    useEffect(() => {
        if (loadingData === false) {
            if (oneCoupon.data) {
                setCoupnName(oneCoupon.data.name)
                setCouponDate(formatDate(oneCoupon.data.expire))
                setCouponValue(oneCoupon.data.discount)
            }
        }
    }, [loadingData])

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
        await dispatch(editCoupon(id, {
            name: coupnName,
            expire: couponDate,
            discount: couponValue
        }))
        setLoading(false)
    }

    const res = useSelector(state => state.couponReducer.editCoupon)

    useEffect(() => {
        if (loading === false) {
            if (res && res.status === 200) {
                notify("Edit operation completed successfully", "success")
                setTimeout(() => {
                    navigate('/admin/addcoupon')
                }, 1000);
            } else {
                notify("Edit operation failed", "error")
            }
        }
    }, [loading])

    return [coupnName, couponDate, couponValue, onChangeName, onChangeDate, onChangeValue, onSubmit]
}

export default EditCouponHook
