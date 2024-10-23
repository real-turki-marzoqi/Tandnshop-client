import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addUserAddress } from '../../redux/actions/userAddressesAction';
import notify from './../useNotifaction';
import { useNavigate } from 'react-router-dom';

const AddAddressHook = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [alias, setAlias] = useState('');
    const [detalis, setDetalis] = useState('');
    const [phone, setPhone] = useState('');
    const [loading, setLoading] = useState(true);

    // Handle changes in the alias input
    const onChangeAlias = (event) => {
        event.persist();
        setAlias(event.target.value);
    };

    // Handle changes in the details input
    const onChangeDetalis = (event) => {
        event.persist();
        setDetalis(event.target.value);
    };

    // Handle changes in the phone input
    const onChangePhone = (event) => {
        event.persist();
        setPhone(event.target.value);
    };

    // Handle form submission
    const onSubmit = async () => {
        if (alias === "" || detalis === "" || phone === "") {
            notify("Please complete the data", "warn");
            return;
        }
        setLoading(true);
        await dispatch(addUserAddress({
            alias: alias,
            details: detalis,
            phone: phone,
            city: '',
            postalCode: ""
        }));
        setLoading(false);
    };

    const res = useSelector(state => state.userAddressesReducer.addUserAddress);

    useEffect(() => {
        if (loading === false) {
            if (res && res.status === 200) {
                notify("Address added successfully", "success");
                setTimeout(() => {
                    navigate('/user/addresses');
                }, 1000);
            } else {
                notify("There was an issue with the addition process", "error");
            }
        }
    }, [loading]);

    return [alias, detalis, phone, onChangeAlias, onChangeDetalis, onChangePhone, onSubmit];
};

export default AddAddressHook;
