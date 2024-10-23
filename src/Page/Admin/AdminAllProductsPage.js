import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import AdminSideBar from '../../Components/Admin/AdminSideBar';
import AdminAllProducts from '../../Components/Admin/AdminAllProducts';
import Pagination from '../../Components/Uitily/Pagination';
import ViewProductAdminHook from './../../hook/admin/view-product-admin-hook';
import { useDispatch } from "react-redux";

const AdminAllProductsPage = () => {
    const dispatch = useDispatch();
    const [items, pagination, onPress] = ViewProductAdminHook();

    // حالة تحميل للتحقق من انتظار جلب البيانات
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (items.length > 0) {
            setLoading(false);  // إيقاف حالة التحميل عند وجود منتجات
        }
    }, [items]);

    const pageCount = pagination || 0;

    return (
        <Container>
            <Row className='py-3'>
                <Col sm="3" xs="2" md="2">
                    <AdminSideBar />
                </Col>

                <Col sm="9" xs="10" md="10">
                    {loading ? (
                        <p>Loading...</p>  // عرض رسالة تحميل أثناء انتظار المنتجات
                    ) : (
                        <>
                            <AdminAllProducts products={items} />
                            {pageCount > 1 && (
                                <Pagination pageCount={pageCount} onPress={onPress} />
                            )}
                        </>
                    )}
                </Col>
            </Row>
        </Container>
    );
}

export default AdminAllProductsPage;
