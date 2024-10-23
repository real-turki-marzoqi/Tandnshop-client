import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { createBrand } from '../../redux/actions/brandAction'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import notify from '../../hook/useNotifaction'
import { clearAllCartItem, deleteCartItem, updateCartItem } from './../../redux/actions/cartAction';

const DeleteCartHook = (item) => {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true)
    const [itemCount, setItemCount] = useState(0)

    // To handle deleting the entire cart
    const handelDeleteCart = async () => {
        setLoading(true)
        await dispatch(clearAllCartItem())
        setLoading(false)
    }

    // To handle changes in the item count
    const onChangeCount = (e) => {
        setItemCount(e.target.value)
    }

    useEffect(() => {
        if (item)
            setItemCount(item.count)
    }, [])

    const res = useSelector(state => state.cartReducer.clearCart)

    useEffect(() => {
        if (loading === false) {
            if (res === "") {
                notify("Deleted successfully", "success")
                setTimeout(() => {
                    window.location.reload(false)
                }, 1000);
            } else {
                // No additional action needed here
            }
        }
    }, [loading])

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    // To handle deleting a single item
    const handelDeleteItem = async () => {
        await dispatch(deleteCartItem(item._id))
        setShow(false);
        window.location.reload(false);
    }

    // To handle updating the cart
    const handeleUpdateCart = async () => {
        await dispatch(updateCartItem(item._id, {
            count: itemCount
        }))
        window.location.reload(false);
    }

    return [handelDeleteCart, show, handleClose, handleShow, handelDeleteItem, itemCount, onChangeCount, handeleUpdateCart]
}

export default DeleteCartHook
