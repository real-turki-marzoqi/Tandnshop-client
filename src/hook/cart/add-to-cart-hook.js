import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { addProductToCart } from './../../redux/actions/cartAction';
import notify from '../../hook/useNotifaction';

const AddToCartHook = (prdID, item) => {

    const dispatch = useDispatch();

    const [indexColor, setIndexColor] = useState('')
    const [colorText, setColorText] = useState('')
    const [loading, setLoading] = useState(true)
    
    // handle color selection
    const colorClick = (index, color) => {
        setIndexColor(index)
        setColorText(color)
    }

    // add product to cart
    const addToCartHandel = async () => {
        if (item.availableColors.length >= 1) {
            if (colorText === "") {
                notify("Please select a color for the product first", "warn")
                return
            }
        } else {
            setColorText('')
        }
        setLoading(true)
        await dispatch(addProductToCart({
            productId: prdID,
            color: colorText
        }))
        setLoading(false)
    }

    const res = useSelector(state => state.cartReducer.addToCart)

    useEffect(() => {
        if (loading === false) {
            if (res && res.status === 200) {
                notify("Product added to cart successfully", "success")
                setTimeout(() => {
                    window.location.reload(false)
                }, 1000);
            } else {
                notify("Please log in first", "warn")
            }
        }
    }, [loading])

    return [colorClick, indexColor, addToCartHandel]
}

export default AddToCartHook
