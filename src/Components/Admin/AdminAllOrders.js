import React from 'react';
import { Row } from 'react-bootstrap';
import AdminAllOrdersItem from './AdminAllOrdersItem';
import UserGetAllOrderHook from './../../hook/user/user-get-all-order-hook';
import Pagination from '../Uitily/Pagination';

const AdminAllOrders = () => {
    const [userName, results, paginate, orderData, onPress] = UserGetAllOrderHook();

    return (
        <div>
            <div className='admin-content-text'>Manage all orders</div>
            <Row className='justify-content-start'>
                {
                    orderData && orderData.length >= 1 
                        ? orderData.map((orderItem, index) => (
                            <AdminAllOrdersItem key={index} orderItem={orderItem} />
                          ))
                        : <h6>No orders available yet</h6>
                }
                {
                    paginate && paginate.numberOfPages && paginate.numberOfPages >= 2 
                        ? <Pagination onPress={onPress} pageCount={paginate.numberOfPages} />
                        : null
                }
            </Row>
        </div>
    );
}

export default AdminAllOrders;
