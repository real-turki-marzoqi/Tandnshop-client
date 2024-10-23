import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProductWishList } from './../../redux/actions/wishListAction';

const CardContainerHook = () => {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true);
    const [favProd, setFavProd] = useState([]);
    const res = useSelector(state => state.addToWishListReducer.allWishList);

    useEffect(() => {
        const fetchWishList = async () => {
            setLoading(true);
            await dispatch(getProductWishList());
            setLoading(false);
        };

        fetchWishList();
    }, [dispatch]);

    useEffect(() => {
        if (!loading && res && res.data) {
            if (res.data.length >= 1) {
                setFavProd(res.data.map(item => item._id));
            } else {
                setFavProd([]);
            }
        }
    }, [loading, res]);

    return [favProd];
};

export default CardContainerHook;
