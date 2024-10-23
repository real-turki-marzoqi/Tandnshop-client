import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllProducts } from '../../redux/actions/productsAction';

const ViewHomeProductsHook = () => {
    const [items, setItems] = useState([]); // تهيئة `items` كمصفوفة فارغة
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllProducts());
    }, [dispatch]);

    const allProducts = useSelector((state) => state.allproducts.allProducts);

    const itemss = allProducts && allProducts.data ? allProducts.data.slice(0, 4) : [];

    useEffect(() => {
        setItems(itemss); // تحديث حالة `items` بناءً على `allProducts`
    }, [allProducts]);

    return [items];
};

export default ViewHomeProductsHook;
