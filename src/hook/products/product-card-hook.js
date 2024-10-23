import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addProductToWishList, removeProductToWishList } from './../../redux/actions/wishListAction';
import notify from './../../hook/useNotifaction';
import favoff from '../../images/fav-off.png';
import favon from '../../images/fav-on.png';

const ProductCardHook = (item, favProd) => {
    const dispatch = useDispatch();
    const [favImg, setFavImg] = useState(favoff);
    const [isFav, setIsFav] = useState(favProd.some(fitem => fitem === item._id));
    const [loadingAdd, setLoadingAdd] = useState(false);
    const [loadingRemove, setLoadingRemove] = useState(false);

    // Update isFav based on favorite products
    useEffect(() => {
        setIsFav(favProd.some(fitem => fitem === item._id));
    }, [favProd, item._id]);

    // Update favorite image based on isFav state
    useEffect(() => {
        setFavImg(isFav ? favon : favoff);
    }, [isFav]);

    const resAdd = useSelector(state => state.addToWishListReducer.addWishList);
    const resRemove = useSelector(state => state.addToWishListReducer.removeWishList);

    // Handle adding/removing product from wishlist
    const handelFav = () => {
        if (isFav) {
            removeToWishListData();
        } else {
            addToWishListData();
        }
    };

    // Add product to wishlist
    const addToWishListData = async () => {
        setIsFav(true);
        setLoadingAdd(true);
        await dispatch(addProductToWishList({ productId: item._id }));
        setLoadingAdd(false);
    };

    // Remove product from wishlist
    const removeToWishListData = async () => {
        setIsFav(false);
        setLoadingRemove(true);
        await dispatch(removeProductToWishList(item._id));
        setLoadingRemove(false);
    };

    // Handle the response after adding a product to the wishlist
    useEffect(() => {
        if (!loadingAdd && resAdd) {
            if (resAdd.status === 200) {
                notify('Product successfully added to wishlist', 'success');
            } else if (resAdd.status === 401) {
                notify('You are not registered', 'error');
            }
        }
    }, [loadingAdd, resAdd]);

    // Handle the response after removing a product from the wishlist
    useEffect(() => {
        if (!loadingRemove && resRemove) {
            if (resRemove.status === 'success') {
                notify('Product successfully removed from wishlist', 'warn');
            } else if (resRemove.status === 401) {
                notify('You are not registered', 'error');
            }
        }
    }, [loadingRemove, resRemove]);

    return [handelFav, favImg];
};

export default ProductCardHook;
