import React, { useEffect, useState } from 'react';
import HomeCategory from '../../Components/Home/HomeCategory';
import CardProductsContainer from '../../Components/Products/CardProductsContainer';
import NavBarLogin from '../../Components/Uitily/NavBarLogin';
import Silder from './../../Components/Home/Silder';
import DiscountSection from './../../Components/Home/DiscountSection';
import BrandFeatured from '../../Components/Brand/BrandFeatured';
import Footer from '../../Components/Uitily/Footer';
import ViewHomeProductsHook from './../../hook/products/view-home-products-hook';

const HomePage = () => {
    const [products, setProducts] = useState([]);
    const [items] = ViewHomeProductsHook();

    useEffect(() => {
        if (items.length > 0) {
            setProducts(items);  // تحديث حالة products عند توفر البيانات
        }
    }, [items]);

    return (
        <div className='font' style={{ minHeight: '670px' }}>
        <Silder />
        <HomeCategory />
        <CardProductsContainer products={products} title="Best Sellers" btntitle="More" pathText="/products" />
        <DiscountSection />
        <BrandFeatured title="Popular Brands" btntitle="More" />
    </div>
    
    );
};

export default HomePage;
