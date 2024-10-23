import React, { useState, useEffect } from 'react';
import { updateUserPassword, updateUserProfileData } from './../../redux/actions/authAction';
import { useDispatch, useSelector } from 'react-redux';
import notify from './../useNotifaction';
import { useNavigate } from 'react-router-dom';

const ProfileHook = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    let user = [];
    if (localStorage.getItem("user") !== null)
        user = JSON.parse(localStorage.getItem("user"));

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [name, setName] = useState(user.name);
    const [email, setEmail] = useState(user.email);
    const [phone, setPhone] = useState(user.phone);
    const [loading, setLoading] = useState(true);

    // Handle name input change
    const onChangeName = (event) => {
        event.persist();
        setName(event.target.value);
    };

    // Handle email input change
    const onChangeEmail = (event) => {
        event.persist();
        setEmail(event.target.value);
    };

    // Handle phone input change
    const onChangePhone = (event) => {
        event.persist();
        setPhone(event.target.value);
    };

    // Handle profile update submission
    const handelSubmit = async () => {
        let body;
        if (user.email === email) {
            body = {
                name,
                phone
            };
        } else {
            body = {
                name,
                email,
                phone
            };
        }
        setLoading(true);
        await dispatch(updateUserProfileData(body));
        setLoading(false);
        setShow(false);
    };

    const res = useSelector(state => state.authReducer.userProfile);

    useEffect(() => {
        if (loading === false) {
            console.log(res);
            if (res && res.status === 200) {
                notify("Profile updated successfully", "success");
                localStorage.setItem("user", JSON.stringify(res.data.data.user));
                setTimeout(() => {
                    window.location.reload(false);
                }, 1500);
            } else {
                notify("Update failed", "warn");
            }
        }
    }, [loading]);

    // Change user password
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');
    const [loadingPass, setLoadingPass] = useState(true);

    // Handle old password input change
    const onChangeOldPass = (event) => {
        event.persist();
        setOldPassword(event.target.value);
    };

    // Handle new password input change
    const onChangeNewPass = (event) => {
        event.persist();
        setNewPassword(event.target.value);
    };

    // Handle confirm password input change
    const onChangeConfirmPass = (event) => {
        event.persist();
        setConfirmNewPassword(event.target.value);
    };

    // Change password submission
    const changePassword = async () => {
        if (confirmNewPassword !== newPassword) {
            notify("Password confirmation does not match", "warn");
            return;
        }
        setLoadingPass(true);
        await dispatch(updateUserPassword({
            currentPassword: oldPassword,
            password: newPassword,
            passwordConfirm: confirmNewPassword
        }));
        setLoadingPass(false);
    };

    const resPass = useSelector(state => state.authReducer.userChangePassword);

    useEffect(() => {
        if (loadingPass === false) {
            console.log(resPass);
            if (resPass && resPass.status === 200) {
                notify("Password changed successfully", "success");
                setTimeout(() => {
                    localStorage.removeItem("user");
                    localStorage.removeItem("token");
                    navigate('/login');
                }, 1500);
            } else {
                notify("Password update failed", "warn");
            }
        }
    }, [loadingPass]);

    return [
        user,
        show,
        handleClose,
        handleShow,
        handelSubmit,
        name,
        email,
        phone,
        onChangeName,
        onChangeEmail,
        onChangePhone,
        changePassword,
        oldPassword,
        newPassword,
        confirmNewPassword,
        onChangeOldPass,
        onChangeNewPass,
        onChangeConfirmPass
    ];
};

export default ProfileHook;
