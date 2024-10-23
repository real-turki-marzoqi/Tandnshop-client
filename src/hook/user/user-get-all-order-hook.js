import React, { useEffect, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getAllOrders } from '../../redux/actions/ordersAction';

const UserGetAllOrderHook = () => {
    const [loading, setLoading] = useState(true);
    const [results, setResult] = useState(0);
    const [paginate, setPaginate] = useState({});
    const [orderData, setOrderData] = useState([]);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const user = JSON.parse(localStorage.getItem('user')) || null;
    const userName = user ? user.name : '';

    const fetchOrders = useCallback(async (page = '', limit = 5) => {
        setLoading(true);
        try {
            await dispatch(getAllOrders(page, limit));
        } catch (error) {
            console.error("Error fetching orders:", error);
        } finally {
            setLoading(false);
        }
    }, [dispatch]);

    useEffect(() => {
        fetchOrders();
    }, [fetchOrders]);

    const onPress = async (page) => {
        await fetchOrders(page);
    };

    // get address details for user
    const resAllOrder = useSelector((state) => state.orderReducer.getAllOrders);
    useEffect(() => {
        if (!loading && resAllOrder) {
            setResult(resAllOrder?.results || 0);
            setPaginate(resAllOrder?.paginationResult || {});
            setOrderData(resAllOrder?.data || []);
        }
    }, [loading, resAllOrder]);

    return [userName, results, paginate, orderData, onPress];
};

export default UserGetAllOrderHook;
