import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { createBrand } from '../../redux/actions/brandAction'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import notify from '../../hook/useNotifaction'
import avatar from '../../images/avatar.png'

const AddBrandHook = () => {
 
    const dispatch = useDispatch();
    const [img, setImg] = useState(avatar)
    const [name, setName] = useState('')
    const [selectedFile, setSelectedFile] = useState(null)
    const [loading, setLoading] = useState(true)
    const [isPress, setIsPress] = useState(false)

    // to change name state
    const onChangeName = (event) => {
        event.persist();
        setName(event.target.value)
    }

    // when image change save it 
    const onImageChange = (event) => {
        if (event.target.files && event.target.files[0]) {
            setImg(URL.createObjectURL(event.target.files[0]))
            setSelectedFile(event.target.files[0])
        }
    }
    const res = useSelector(state => state.allBrand.brand)

    // save data in database
    const handelSubmit = async (event) => {
        event.preventDefault();
        if (name === "" || selectedFile === null) {
            console.log('Please complete the data')
            notify('Please complete the data', "warn");
            return;
        }
        const formData = new FormData();
        formData.append("name", name)
        formData.append("image", selectedFile)
        setLoading(true)
        setIsPress(true)
        await dispatch(createBrand(formData))
        setLoading(false)
    }

    useEffect(() => {
        if (loading === false) {
            setImg(avatar)
            setName("")
            setSelectedFile(null)
            console.log('Done')
            setLoading(true)
            setTimeout(() => setIsPress(false), 1000)

            if (res.status === 201) {
                notify('Added successfully', "success");
            }
            else {
                notify('There was a problem adding', "error");
            }
        }
    }, [loading])

    return [img, name, loading, isPress, handelSubmit, onImageChange, onChangeName]
};

export default AddBrandHook
