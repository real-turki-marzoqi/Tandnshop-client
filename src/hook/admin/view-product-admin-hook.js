import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllProducts, getAllProductsPage } from '../../redux/actions/productsAction';

const ViewProductAdminHook = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllProducts(8));
    }, [dispatch]);

    // دالة لتحميل المنتجات بناءً على الصفحة
    const onPress = async (page) => {
        await dispatch(getAllProductsPage(page, 8));
    };

    // جلب المنتجات والنتائج
    const allProducts = useSelector((state) => state.allproducts.allProducts);

    // تهيئة العناصر والصفحات
    const items = allProducts?.data || [];
    const pagination = allProducts?.paginationResult?.numberOfPages || 0;

    return [items, pagination, onPress];
};

export default ViewProductAdminHook;
