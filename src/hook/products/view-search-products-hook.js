import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { getAllProductsSearch } from '../../redux/actions/productsAction';

const ViewSearchProductsHook = () => {
    let limit = 8;
    const dispatch = useDispatch();

    const getProduct = async () => {
        getStorge();
        sortData();
    
        let queryString = `sort=${sort}&limit=${limit}`;
        if (word) queryString += `&keyword=${word}`;
        if (queryCat) queryString += `&category=${queryCat}`;
        if (brandCat) queryString += `&brand=${brandCat}`;
        if (pricefromString) queryString += `${pricefromString}`;
        if (priceToString) queryString += `${priceToString}`;
    
        console.log('Query String:', queryString);  // للتحقق من سلسلة الاستعلام
    
        try {
            await dispatch(getAllProductsSearch(queryString));
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };
    
    useEffect(() => {
        getProduct();
    }, []);

   
    const allProducts = useSelector((state) => state.allproducts.allProducts)// تأكد من أن المسار هو state.products وليس state.allproducts

    let items = [];
    let pagination = 0;
    let results = 0;

    if (allProducts) {
        items = allProducts.data || [];
        pagination = allProducts.paginationResult?.numberOfPages || 0;
        results = allProducts.results || 0;
    }

    // عند الضغط على تغيير الصفحة
    const onPress = async (page) => {
        getStorge();
        sortData();
        let queryString = `sort=${sort}&limit=${limit}&page=${page}`;
        if (word) queryString += `&keyword=${word}`;
        if (queryCat) queryString += `&category=${queryCat}`;
        if (brandCat) queryString += `&brand=${brandCat}`;
        if (pricefromString) queryString += `${pricefromString}`;
        if (priceToString) queryString += `${priceToString}`;
    
        try {
            await dispatch(getAllProductsSearch(queryString));
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };

    // جلب القيم من localStorage
    let pricefromString = "", priceToString = "";
    let word = "", queryCat = "", brandCat = "", priceTo = "", priceFrom = "";

    const getStorge = () => {
        if (localStorage.getItem("searchWord")) word = localStorage.getItem("searchWord");
        if (localStorage.getItem("catCecked")) queryCat = localStorage.getItem("catCecked");
        if (localStorage.getItem("brandCecked")) brandCat = localStorage.getItem("brandCecked");
        if (localStorage.getItem("priceTo")) priceTo = localStorage.getItem("priceTo");
        if (localStorage.getItem("priceFrom")) priceFrom = localStorage.getItem("priceFrom");

        if (priceFrom && priceFrom > 0) {
            pricefromString = `&price[gt]=${priceFrom}`;
        }

        if (priceTo && priceTo > 0) {
            priceToString = `&price[lte]=${priceTo}`;
        }
    };

    // ترتيب البيانات بناءً على نوع الترتيب
    let sortType = "", sort = "";
    const sortData = () => {
        if (localStorage.getItem("sortType")) {
            sortType = localStorage.getItem("sortType");
        }

        switch (sortType) {
            case "السعر من الاقل للاعلي":
                sort = "+price";
                break;
            case "السعر من الاعلي للاقل":
                sort = "-price";
                break;
            case "الاكثر مبيعا":
                sort = "-sold";
                break;
            case "الاعلي تقييما":
                sort = "-quantity";
                break;
            default:
                sort = "";
                break;
        }
    };

    return [items, pagination, onPress, getProduct, results];
};

export default ViewSearchProductsHook;
