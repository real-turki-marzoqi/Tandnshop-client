import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { resetPassword } from '../../redux/actions/authAction';
import { useNavigate } from 'react-router-dom'
import notify from '../useNotifaction';

const ResetPasswordHook = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [password, setPassword] = useState('')
    const [confirmPassword, setComfirmPassword] = useState('')
    const [loading, setLoading] = useState(true)

    const OnChangePassword = (e) => {
        setPassword(e.target.value)
    }
    const OnChangeConfirmPassword = (e) => {
        setComfirmPassword(e.target.value)
    }
    const onSubmit = async () => {
        if (password === "") {
            notify("Please enter the password", "error")
            return
        }
        if (password !== confirmPassword) {
            notify("Password does not match the confirmation", "error")
            return
        }

        setLoading(true)
        await dispatch(resetPassword({
            email: localStorage.getItem("user-email"),
            newPassword: password
        }))
        setLoading(false)
    }

    const res = useSelector(state => state.authReducer.verifyPassword)

    useEffect(() => {
        if (loading === false) {
            if (res) {
                console.log(res)
                if (res.data.status === "Success") {
                    notify("Password changed successfully", "success")
                    setTimeout(() => {
                        navigate("/login")
                    }, 1500);
                }
                if (res.data.status === "fail") {
                    notify("Please request a new code", "error")
                }
            }
        }
    }, [loading])

    return [password, confirmPassword, OnChangePassword, OnChangeConfirmPassword, onSubmit]
}

export default ResetPasswordHook
